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
          "linear-gradient(180deg, #fff 0%, var(--color-brand-bg) 30%, var(--color-brand-bg) 70%, #fff 100%)",
      }}
    >
      {/* Decorative watermark */}
      <div
        className="pointer-events-none absolute top-1/2 left-8 -translate-y-1/2 select-none text-[180px] font-bold leading-none opacity-[0.015] hidden lg:block"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-brand-primary)",
        }}
      >
        名刺
      </div>

      {/* Gold decorative lines */}
      <div
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 h-px w-48"
        style={{ backgroundColor: "var(--color-brand-accent)", opacity: 0.3 }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-6 h-px w-12" style={{ backgroundColor: "var(--color-brand-accent)" }} />

          <h2
            className="text-3xl font-bold md:text-4xl"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-text)",
              lineHeight: "1.2",
              letterSpacing: "-0.02em",
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
              href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
              className="group inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-base font-bold shadow-xl transition-all duration-200 hover:shadow-2xl cursor-pointer"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                color: "var(--color-brand-dark)",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 8px 32px rgba(200,164,78,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 40px rgba(200,164,78,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 8px 32px rgba(200,164,78,0.25)";
              }}
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
                  style={{ color: "var(--color-brand-accent)" }}
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
