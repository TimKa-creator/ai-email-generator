import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

import { getSupabaseAdmin } from "@/lib/supabase-admin";
import {
  FREE_WORD_LIMIT,
  FREE_WORDS_PER_EMAIL,
  MAX_WORDS_PER_EMAIL,
  countWords,
  currentPeriodStart,
} from "@/lib/quota";
import { isLocale, localeToLanguage } from "@/i18n/locales";

type RefineAction = "shorter" | "formal" | "emoji";

interface GenerateRequestBody {
  topic: string;
  tone: string;
  words: number;
  locale: string;
  action: RefineAction;
  text: string;
}

interface UsageRow {
  words_used: number;
  period_start: string;
}

const REFINE_INSTRUCTIONS: Record<RefineAction, string> = {
  shorter:
    "Rewrite the following email to be noticeably more concise and shorter, while keeping the key message and a natural tone.",
  formal:
    "Rewrite the following email to be more formal and professional, while keeping the original meaning.",
  emoji:
    "Rewrite the following email adding a few tasteful, relevant emojis to make it friendlier. Do not overdo it.",
};

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GenerateRequestBody>;
    const { topic, tone, words, locale, action, text } = body;

    const isRefine = Boolean(action);

    if (isRefine) {
      if (!action || !REFINE_INSTRUCTIONS[action] || !text?.trim()) {
        return NextResponse.json(
          { error: "Missing or invalid refinement request." },
          { status: 400 }
        );
      }
    } else if (!topic?.trim() || !tone) {
      return NextResponse.json(
        { error: "Missing required fields: topic and tone are required." },
        { status: 400 }
      );
    }

    // --- Auth -----------------------------------------------------------------
    const admin = getSupabaseAdmin();
    if (!admin) {
      console.error("[/api/generate] SUPABASE_SERVICE_ROLE_KEY is not configured.");
      return NextResponse.json(
        { error: "The service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const token = request.headers
      .get("Authorization")
      ?.replace(/^Bearer\s+/i, "")
      .trim();

    if (!token) {
      return NextResponse.json(
        { error: "You must be signed in to generate emails." },
        { status: 401 }
      );
    }

    const { data: userData, error: userError } = await admin.auth.getUser(token);
    if (userError || !userData.user) {
      return NextResponse.json(
        { error: "Your session has expired. Please sign in again." },
        { status: 401 }
      );
    }
    const userId = userData.user.id;

    // --- Read usage and apply the monthly reset -------------------------------
    const periodStart = currentPeriodStart();
    const { data: usageData } = await admin
      .from("usage")
      .select("words_used, period_start")
      .eq("user_id", userId)
      .maybeSingle<UsageRow>();

    const sameMonth = usageData ? usageData.period_start >= periodStart : false;
    const wordsUsed = sameMonth ? usageData?.words_used ?? 0 : 0;

    // --- Word gates (new generations only) ------------------------------------
    let targetWords = 0;
    if (!isRefine) {
      if (wordsUsed >= FREE_WORD_LIMIT) {
        return NextResponse.json(
          {
            error:
              "You've reached your monthly word limit. Upgrade to Pro for more.",
            code: "word_limit",
          },
          { status: 403 }
        );
      }

      const requestedWords = Number(words) || 100;
      if (requestedWords > FREE_WORDS_PER_EMAIL) {
        return NextResponse.json(
          {
            error: `Emails over ${FREE_WORDS_PER_EMAIL} words require a Pro plan.`,
            code: "pro_required",
          },
          { status: 403 }
        );
      }
      targetWords = Math.min(Math.max(requestedWords, 10), MAX_WORDS_PER_EMAIL);
    }

    // --- Build the prompt -----------------------------------------------------
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[/api/generate] GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { error: "The email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const language = isLocale(locale) ? localeToLanguage[locale] : "English";

    const prompt =
      isRefine && action
        ? `${REFINE_INSTRUCTIONS[action]}

Write the email in ${language}. Return only the rewritten email, with no commentary or markdown code fences.

Email:
${text!.trim()}`
        : `Write an email of approximately ${targetWords} words in a ${tone!.toLowerCase()} tone about the following topic.

Topic: ${topic!.trim()}

Write the email in ${language}.

Guidelines:
- Return only the email itself (greeting, body, and sign-off).
- Do not include any commentary, explanations, or markdown code fences before or after the email.
- Aim for about ${targetWords} words and use natural line breaks between paragraphs.`;

    // --- Stream the response and record word usage afterwards -----------------
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const encoder = new TextEncoder();
    const stream = new ReadableStream<Uint8Array>({
      async start(controller) {
        let full = "";
        try {
          const result = await model.generateContentStream(prompt);
          for await (const chunk of result.stream) {
            const chunkText = chunk.text();
            if (chunkText) {
              full += chunkText;
              controller.enqueue(encoder.encode(chunkText));
            }
          }
        } catch (error) {
          console.error("[/api/generate] Streaming failed:", error);
          controller.error(error);
          return;
        }

        // Track words for new generations (refinements don't count toward the quota).
        if (!isRefine) {
          try {
            await admin.from("usage").upsert(
              {
                user_id: userId,
                words_used: wordsUsed + countWords(full),
                period_start: periodStart,
                updated_at: new Date().toISOString(),
              },
              { onConflict: "user_id" }
            );
          } catch (error) {
            console.error("[/api/generate] Failed to record usage:", error);
          }
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("[/api/generate] Failed to generate email:", error);
    return NextResponse.json(
      { error: "Failed to generate the email. Please try again later." },
      { status: 500 }
    );
  }
}
