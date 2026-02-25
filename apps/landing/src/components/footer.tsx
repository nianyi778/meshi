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
        { label: t("landing.footer.createSignature"), href: `https://dashboard.ekagu.qzz.io/${locale}/generator` },
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
    <footer
      className="relative pt-20 pb-12"
      style={{
        backgroundColor: "var(--color-brand-text)",
      }}
    >
      {/* Subtle top border gradient */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-brand-primary) 50%, transparent 100%)",
          opacity: 0.3,
        }}
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-xl font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Meishi
              </span>
              <span
                className="rounded-md px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white"
                style={{ backgroundColor: "var(--color-brand-primary)" }}
              >
                名刺
              </span>
            </div>
            <p
              className="mt-4 max-w-xs text-sm leading-[1.8]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.5)",
              }}
            >
              {t("landing.footer.tagline")}
            </p>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-5 text-xs font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-heading)",
                  color: "rgba(255,255,255,0.7)",
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 cursor-pointer"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "rgba(255,255,255,0.45)",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.9)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.color = "rgba(255,255,255,0.45)";
                      }}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div
          className="mt-16 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.08)" }}
        />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            {t("landing.footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p
            className="inline-flex items-center gap-1.5 text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            Made with
            <Heart
              size={12}
              className="text-red-400"
              fill="currentColor"
            />
            in Japan
          </p>
        </div>
      </div>
    </footer>
  );
}
