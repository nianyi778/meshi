"use client";

import { Heart, Github, Star } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const t = useTranslations();
  const locale = useLocale();

  const GITHUB_URL = "https://github.com/nianyi778/meshi";

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
        { label: t("landing.footer.faq"), href: "#faq" },
      ],
    },
    {
      title: t("landing.footer.legal"),
      links: [
        { label: t("landing.footer.privacy"), href: `/${locale}/privacy` },
        { label: t("landing.footer.terms"), href: `/${locale}/terms` },
      ],
    },
  ];

  return (
    <footer
      className="relative pt-20 pb-12"
      style={{ backgroundColor: "var(--color-brand-dark)" }}
    >
      {/* Top gold accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-brand-accent) 50%, transparent 100%)",
          opacity: 0.4,
        }}
      />

      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5">
              <span
                className="text-xl font-extrabold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Meishi
              </span>
              <span
                className="h-4 w-px"
                style={{ backgroundColor: "var(--color-brand-accent)" }}
              />
              <span
                className="text-sm font-medium tracking-wider text-white/60"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                名刺
              </span>
            </div>
            <p
              className="mt-4 max-w-xs text-sm leading-[1.8]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.4)",
              }}
            >
              {t("landing.footer.tagline")}
            </p>
          </div>

          {/* GitHub / Open Source column */}
          <div className="lg:col-span-1">
            <h4
              className="mb-5 text-xs font-bold uppercase tracking-wider"
              style={{
                fontFamily: "var(--font-sans)",
                color: "rgba(255,255,255,0.6)",
              }}
            >
              {t("landing.footer.openSource")}
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm transition-colors duration-200 cursor-pointer text-white/40 hover:text-[var(--color-brand-accent)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <Github size={13} />
                  {t("landing.footer.github")}
                </a>
              </li>
              <li>
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm transition-colors duration-200 cursor-pointer text-white/40 hover:text-[var(--color-brand-accent)]"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  <Star size={13} />
                  {t("landing.footer.starOnGithub")}
                </a>
              </li>
            </ul>
          </div>

          {/* Link columns */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                className="mb-5 text-xs font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {col.title}
              </h4>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm transition-colors duration-200 cursor-pointer text-white/40 hover:text-[var(--color-brand-accent)]"
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

        {/* Divider */}
        <div
          className="mt-16 h-px w-full"
          style={{ backgroundColor: "rgba(255,255,255,0.06)" }}
        />

        {/* Bottom bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p
            className="text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.3)",
            }}
          >
            {t("landing.footer.copyright", { year: new Date().getFullYear() })}
          </p>
          <p
            className="inline-flex items-center gap-1.5 text-xs"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.3)",
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
