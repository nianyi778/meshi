"use client";

import { Heart } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const COLUMNS = [
    {
      title: t("landing.footer.product"),
      links: [
        { label: t("landing.footer.createSignature"), href: `/${locale}/generator` },
        { label: t("landing.footer.viewTemplates"), href: "#templates" },
        { label: t("landing.footer.viewFeatures"), href: "#features" },
      ],
    },
    {
      title: t("landing.footer.support"),
      links: [
        { label: t("landing.footer.howToUse"), href: "#how-it-works" },
        { label: t("landing.footer.faq"), href: "#" },
      ],
    },
    {
      title: t("landing.footer.legal"),
      links: [
        { label: t("landing.footer.privacy"), href: "#" },
        { label: t("landing.footer.terms"), href: "#" },
      ],
    },
  ];

  return (
    <footer className="bg-slate-900 pt-16 pb-10">
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-xl font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Meishi
              </span>
              <span className="rounded-md bg-sky-500 px-1.5 py-0.5 text-xs font-bold text-white">
                名刺
              </span>
            </div>
            <p
              className="mt-3 max-w-xs text-sm leading-[1.8] text-slate-400"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("landing.footer.tagline")}
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-4 text-sm font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors duration-200 hover:text-white"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 h-px w-full bg-slate-800" />

        <div className="mt-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p
            className="text-xs text-slate-500"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            {t("landing.footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p
            className="inline-flex items-center gap-1 text-xs text-slate-500"
            style={{ fontFamily: "var(--font-sans)" }}
          >
            Made with
            <Heart size={12} className="text-red-400" fill="currentColor" />
            in Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
