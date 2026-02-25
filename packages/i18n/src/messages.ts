import type { Locale } from "./config";

import ja from "./messages/ja.json";
import en from "./messages/en.json";
import zh from "./messages/zh.json";
import ko from "./messages/ko.json";
import th from "./messages/th.json";
import vi from "./messages/vi.json";
import id from "./messages/id.json";

const messages: Record<Locale, Record<string, unknown>> = {
  ja,
  en,
  zh,
  ko,
  th,
  vi,
  id,
};

export function getMessagesByLocale(locale: string): Record<string, unknown> {
  return messages[locale as Locale] ?? messages.ja;
}

export { messages };
