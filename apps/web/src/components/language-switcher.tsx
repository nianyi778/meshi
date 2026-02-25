"use client";

import { useState, useRef, useEffect } from "react";
import { useLocale } from "next-intl";
import { Globe } from "lucide-react";
import { locales, localeNames, localeFlagEmoji } from "@meishi/i18n";
import type { Locale } from "@meishi/i18n";

export function LanguageSwitcher() {
  const currentLocale = useLocale() as Locale;
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSwitch = (locale: Locale) => {
    setOpen(false);
    // Replace current locale segment in URL
    const currentPath = window.location.pathname;
    const segments = currentPath.split("/");
    // segments[1] is the locale
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = locale;
    } else {
      segments.splice(1, 0, locale);
    }
    window.location.pathname = segments.join("/");
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 rounded-md px-2 py-1.5 text-sm text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
        aria-label="Switch language"
      >
        <Globe className="h-4 w-4" />
        <span className="hidden sm:inline">
          {localeFlagEmoji[currentLocale]} {localeNames[currentLocale]}
        </span>
        <span className="sm:hidden">{localeFlagEmoji[currentLocale]}</span>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 w-48 rounded-lg border border-slate-200 bg-white py-1 shadow-lg">
          {locales.map((locale) => (
            <button
              key={locale}
              onClick={() => handleSwitch(locale)}
              className={`flex w-full items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-slate-50 ${
                locale === currentLocale
                  ? "bg-sky-50 font-medium text-sky-700"
                  : "text-slate-700"
              }`}
            >
              <span>{localeFlagEmoji[locale]}</span>
              <span>{localeNames[locale]}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
