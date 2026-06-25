/** Free plan: total words a user can generate per calendar month. */
export const FREE_WORD_LIMIT = 2000;

/** Free plan: max words allowed in a single email. Beyond this requires Pro. */
export const FREE_WORDS_PER_EMAIL = 200;

/** Word-count presets offered in the generator (all within the Free per-email cap). */
export const WORD_PRESETS = [50, 100, 150, 200] as const;

/** Absolute hard cap on the requested length of a single email. */
export const MAX_WORDS_PER_EMAIL = 1000;

/** Count words in a piece of text. */
export const countWords = (text: string): number =>
  text.trim().split(/\s+/).filter(Boolean).length;

/** First day of the current month as an ISO date string (YYYY-MM-DD, UTC). */
export const currentPeriodStart = (): string => {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1))
    .toISOString()
    .slice(0, 10);
};
