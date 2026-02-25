"use client";

import { ArrowRight, Check } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { FadeInUp, ScaleIn } from "./animations";

export function CTASection() {
  const t = useTranslations();
  const locale = useLocale();

  const TRUST_SIGNALS = [
    t("landing.cta.trust1"),
    t("landing.cta.trust2"),
    t("landing.cta.trust3"),
  ];

  return (
    <section
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background:
          "linear-gradient(180deg, var(--color-brand-surface-alt) 0%, #fff 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.04]"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      />
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.03]"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <FadeInUp>
          <h2
            className="text-3xl font-extrabold md:text-4xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-text)",
              lineHeight: "1.2",
            }}
          >
            {t("landing.cta.title")}
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.08}>
          <p
            className="mx-auto mt-5 max-w-lg text-base leading-[1.8]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-brand-text-muted)",
            }}
          >
            {t("landing.cta.subtitle")}
          </p>
        </FadeInUp>

        <ScaleIn delay={0.16}>
          <div className="mt-10">
            <a
              href={`/${locale}/generator`}
              className="group inline-flex items-center gap-2.5 rounded-2xl px-8 py-4 text-base font-bold text-white shadow-xl transition-all duration-200 hover:shadow-2xl"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                fontFamily: "var(--font-sans)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-cta-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  "var(--color-brand-cta)")
              }
            >
              {t("landing.cta.button")}
              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </ScaleIn>

        <FadeInUp delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {TRUST_SIGNALS.map((signal) => (
              <span
                key={signal}
                className="inline-flex items-center gap-1.5 text-sm"
                style={{
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-brand-text-muted)",
                }}
              >
                <Check
                  size={15}
                  strokeWidth={2.5}
                  style={{ color: "var(--color-brand-primary)" }}
                />
                {signal}
              </span>
            ))}
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
