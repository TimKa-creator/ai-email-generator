import { supabase } from "@/lib/supabase";

export interface GenerateError extends Error {
  code?: string;
}

/**
 * Calls the streaming /api/generate endpoint and reads the response chunk by
 * chunk, invoking `onChunk` with the accumulated text so the UI can render the
 * email as it is written. Returns the final text. Throws a GenerateError whose
 * `code` (e.g. "word_limit", "pro_required") lets callers react to specific failures.
 */
export async function streamGeneration(
  body: Record<string, unknown>,
  onChunk: (textSoFar: string) => void
): Promise<string> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  const token = session?.access_token;

  if (!token) {
    const error: GenerateError = new Error("You must be signed in.");
    error.code = "no_auth";
    throw error;
  }

  const res = await fetch("/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok || !res.body) {
    let message = "Something went wrong. Please try again.";
    let code: string | undefined;
    try {
      const data = (await res.json()) as { error?: string; code?: string };
      message = data.error ?? message;
      code = data.code;
    } catch {
      // response had no JSON body
    }
    const error: GenerateError = new Error(message);
    error.code = code;
    throw error;
  }

  const reader = res.body.getReader();
  const decoder = new TextDecoder();
  let acc = "";

  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    acc += decoder.decode(value, { stream: true });
    onChunk(acc);
  }
  acc += decoder.decode();
  onChunk(acc);

  return acc;
}
