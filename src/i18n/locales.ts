export type Locale = "en" | "uk" | "ru" | "de";

export const LOCALES: Locale[] = ["en", "uk", "ru", "de"];

export const DEFAULT_LOCALE: Locale = "en";

/** Native names shown in the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  uk: "Українська",
  ru: "Русский",
  de: "Deutsch",
};

/** Short codes for compact UI. */
export const localeShort: Record<Locale, string> = {
  en: "EN",
  uk: "UK",
  ru: "RU",
  de: "DE",
};

/** English language name used to instruct the AI which language to write in. */
export const localeToLanguage: Record<Locale, string> = {
  en: "English",
  uk: "Ukrainian",
  ru: "Russian",
  de: "German",
};

export const isLocale = (value: unknown): value is Locale =>
  typeof value === "string" && (LOCALES as string[]).includes(value);
