"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { FadeInUp } from "./animations";

/* ------------------------------------------------------------------ */
/*  Shared legal page layout                                           */
/* ------------------------------------------------------------------ */

interface Section {
  title: string;
  body: string;
}

interface LegalPageProps {
  titleKey: string;       // e.g. "landing.privacy.title"
  lastUpdatedKey: string; // e.g. "landing.privacy.lastUpdated"
  introKey: string;
  sectionKeys: string[];  // e.g. ["collect", "use", "cookies", ...]
  sectionsNsKey: string;  // e.g. "landing.privacy.sections"
  date: string;
}

export function LegalPage({
  titleKey,
  lastUpdatedKey,
  introKey,
  sectionKeys,
  sectionsNsKey,
  date,
}: LegalPageProps) {
  const t = useTranslations();
  const locale = useLocale();

  const sections: Section[] = sectionKeys.map((key) => ({
    title: t(`${sectionsNsKey}.${key}.title`),
    body: t(`${sectionsNsKey}.${key}.body`),
  }));

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: "#fafafa" }}
    >
      {/* Top accent bar */}
      <div
        className="h-1 w-full"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      />

      <div className="mx-auto max-w-3xl px-5 py-16 lg:px-8 lg:py-24">
        {/* Back link */}
        <FadeInUp>
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 text-sm transition-colors duration-200 mb-12"
            style={{ color: "var(--color-brand-text-muted)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-brand-primary)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "var(--color-brand-text-muted)";
            }}
          >
            <ArrowLeft size={14} />
            <span style={{ fontFamily: "var(--font-sans)" }}>
              {t("common.back")}
            </span>
          </Link>
        </FadeInUp>

        {/* Header */}
        <FadeInUp delay={0.05}>
          <div className="mb-12">
            <h1
              className="text-3xl font-extrabold md:text-4xl"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                letterSpacing: "-0.02em",
                lineHeight: "1.15",
              }}
            >
              {t(titleKey)}
            </h1>
            <p
              className="mt-3 text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t(lastUpdatedKey, { date })}
            </p>
          </div>
        </FadeInUp>

        {/* Divider */}
        <div
          className="mb-10 h-px w-full"
          style={{ backgroundColor: "var(--color-brand-border)" }}
        />

        {/* Intro */}
        <FadeInUp delay={0.1}>
          <p
            className="mb-10 text-sm leading-[1.9] md:text-base"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-brand-text-muted)",
            }}
          >
            {t(introKey)}
          </p>
        </FadeInUp>

        {/* Sections */}
        <div className="space-y-10">
          {sections.map((section, i) => (
            <FadeInUp key={section.title} delay={0.12 + i * 0.04}>
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: "#fff", border: "1px solid var(--color-brand-border)" }}
              >
                <h2
                  className="mb-4 text-base font-bold md:text-lg"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-brand-text)",
                  }}
                >
                  {section.title}
                </h2>
                <div>
                  {section.body.split("\n").map((line, j) => (
                    <p
                      key={j}
                      className={`text-sm leading-[1.9] ${j > 0 ? "mt-3" : ""}`}
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-brand-text-muted)",
                      }}
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>
            </FadeInUp>
          ))}
        </div>
      </div>
    </div>
  );
}
