"use client";

import { useTranslations } from "next-intl";
import { CountUp } from "./animations";

const STATS = [
  { key: "templates", end: 7, suffix: "+", prefix: "" },
  { key: "creationTime", end: 30, suffix: "", prefix: "" },
  { key: "cost", end: 0, suffix: "", prefix: "¥" },
  { key: "languages", end: 7, suffix: "", prefix: "" },
] as const;

export function SocialProof() {
  const t = useTranslations();

  return (
    <section className="relative border-y bg-white" style={{ borderColor: "var(--color-brand-border)" }}>
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center divide-x divide-[var(--color-brand-border)] py-10 md:py-12">
        {STATS.map((stat) => (
          <div
            key={stat.key}
            className="flex flex-col items-center px-8 py-3 sm:px-12 md:px-16"
          >
            <CountUp
              end={stat.end}
              prefix={stat.prefix}
              suffix={stat.suffix}
              className="text-3xl font-bold tracking-tight md:text-4xl"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-brand-primary)",
              }}
            />
            <span
              className="mt-1.5 text-xs font-medium tracking-wide md:text-sm"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t(`landing.socialProof.${stat.key}`)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
