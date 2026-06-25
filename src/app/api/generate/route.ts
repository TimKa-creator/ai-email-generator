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

interface GenerateRequestBody {
  topic: string;
  tone: string;
  words: number;
  locale: string;
}

interface UsageRow {
  words_used: number;
  period_start: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<GenerateRequestBody>;
    const { topic, tone, words, locale } = body;

    if (!topic?.trim() || !tone) {
      return NextResponse.json(
        { error: "Missing required fields: topic and tone are required." },
        { status: 400 }
      );
    }

    // --- Auth: validate the caller's Supabase access token --------------------
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

    // --- Quota: read current usage and reset if a new month started -----------
    const periodStart = currentPeriodStart();
    const { data: usageData } = await admin
      .from("usage")
      .select("words_used, period_start")
      .eq("user_id", userId)
      .maybeSingle<UsageRow>();

    let wordsUsed = 0;
    if (usageData) {
      wordsUsed =
        usageData.period_start < periodStart ? 0 : usageData.words_used ?? 0;
    }

    if (wordsUsed >= FREE_WORD_LIMIT) {
      return NextResponse.json(
        {
          error:
            "You've reached your monthly word limit. Upgrade to Pro for more.",
          usage: { wordsUsed, limit: FREE_WORD_LIMIT },
        },
        { status: 403 }
      );
    }

    // --- Generate -------------------------------------------------------------
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error("[/api/generate] GEMINI_API_KEY is not configured.");
      return NextResponse.json(
        { error: "The email service is not configured. Please try again later." },
        { status: 500 }
      );
    }

    const requestedWords = Number(words) || 100;

    // Per-email Pro gate: Free users are limited to FREE_WORDS_PER_EMAIL words.
    if (requestedWords > FREE_WORDS_PER_EMAIL) {
      return NextResponse.json(
        {
          error: `Emails over ${FREE_WORDS_PER_EMAIL} words require a Pro plan.`,
          code: "pro_required",
        },
        { status: 403 }
      );
    }

    const targetWords = Math.min(
      Math.max(requestedWords, 10),
      MAX_WORDS_PER_EMAIL
    );
    const language = isLocale(locale) ? localeToLanguage[locale] : "English";

    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Write an email of approximately ${targetWords} words in a ${tone.toLowerCase()} tone about the following topic.

Topic: ${topic.trim()}

Write the email in ${language}.

Guidelines:
- Return only the email itself (greeting, body, and sign-off).
- Do not include any commentary, explanations, or markdown code fences before or after the email.
- Aim for about ${targetWords} words and use natural line breaks between paragraphs.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text().trim();

    if (!text) {
      return NextResponse.json(
        { error: "The AI did not return any content. Please try again." },
        { status: 500 }
      );
    }

    // --- Record usage ---------------------------------------------------------
    const newTotal = wordsUsed + countWords(text);
    const { error: upsertError } = await admin.from("usage").upsert(
      {
        user_id: userId,
        words_used: newTotal,
        period_start: periodStart,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id" }
    );
    if (upsertError) {
      // Don't fail the request over a tracking error — the user already has text.
      console.error("[/api/generate] Failed to record usage:", upsertError);
    }

    return NextResponse.json({
      text,
      usage: { wordsUsed: newTotal, limit: FREE_WORD_LIMIT },
    });
  } catch (error) {
    console.error("[/api/generate] Failed to generate email:", error);
    return NextResponse.json(
      { error: "Failed to generate the email. Please try again later." },
      { status: 500 }
    );
  }
}
