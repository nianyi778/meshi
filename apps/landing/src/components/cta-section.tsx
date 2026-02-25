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
      className="relative overflow-hidden py-28 md:py-36"
      style={{
        background:
          "linear-gradient(180deg, #fff 0%, var(--color-brand-bg) 30%, var(--color-brand-bg) 70%, #fff 100%)",
      }}
    >
      {/* Japanese-inspired concentric circles */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[600px] w-[600px] rounded-full opacity-[0.035]"
          style={{
            border: "1px solid var(--color-brand-primary)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[440px] w-[440px] rounded-full opacity-[0.04]"
          style={{
            border: "1px solid var(--color-brand-primary)",
          }}
        />
      </div>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className="h-[280px] w-[280px] rounded-full opacity-[0.05]"
          style={{
            border: "1px solid var(--color-brand-primary)",
          }}
        />
      </div>

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-brand-primary) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
        <FadeInUp>
          {/* Decorative dash */}
          <div
            className="mx-auto mb-8 h-px w-16"
            style={{ backgroundColor: "var(--color-brand-primary)" }}
          />

          <h2
            className="text-3xl font-extrabold md:text-4xl"
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
              href={`https://app.ekagu.qzz.io/${locale}/generator`}
              className="group inline-flex items-center gap-2.5 rounded-2xl px-9 py-4 text-base font-bold text-white shadow-xl transition-all duration-200 hover:shadow-2xl cursor-pointer"
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
