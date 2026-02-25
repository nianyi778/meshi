export const locales = ["ja", "zh", "en", "ko", "th", "vi", "id"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "ja";

export const localeNames: Record<Locale, string> = {
  ja: "日本語",
  zh: "中文",
  en: "English",
  ko: "한국어",
  th: "ภาษาไทย",
  vi: "Tiếng Việt",
  id: "Bahasa Indonesia",
};

export const localeFlagEmoji: Record<Locale, string> = {
  ja: "🇯🇵",
  zh: "🇨🇳",
  en: "🇺🇸",
  ko: "🇰🇷",
  th: "🇹🇭",
  vi: "🇻🇳",
  id: "🇮🇩",
};
