"use client";

import { Check, X } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { FadeInUp } from "./animations";

const ROW_KEYS = [
  "free",
  "watermark",
  "noregister",
  "png",
  "japanese",
  "opensource",
  "privacy",
  "lang",
] as const;

export function CompareSection() {
  const t = useTranslations();
  const locale = useLocale();

  return (
    <section
      id="compare"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "var(--color-brand-surface-dark)" }}
    >
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,164,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,78,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12" style={{ backgroundColor: "var(--color-brand-accent)" }} />
            <h2
              className="text-2xl font-bold text-white md:text-[32px]"
              style={{
                fontFamily: "var(--font-heading)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              {t("landing.compare.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] text-white/50 md:text-base"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("landing.compare.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="overflow-hidden rounded-2xl border border-white/[0.08]">
            {/* Header */}
            <div className="grid grid-cols-[1fr_160px_160px] items-center bg-white/[0.03]">
              <div className="px-6 py-4" />

              {/* Meishi column header */}
              <div
                className="flex flex-col items-center justify-center border-l border-white/[0.08] px-4 py-5"
                style={{ backgroundColor: "var(--color-brand-accent)" }}
              >
                <span
                  className="text-[15px] font-extrabold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-brand-dark)",
                  }}
                >
                  {t("landing.compare.meishi")}
                </span>
                <span
                  className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide"
                  style={{
                    backgroundColor: "rgba(15,23,42,0.15)",
                    color: "var(--color-brand-dark)",
                  }}
                >
                  無料
                </span>
              </div>

              {/* Others column header */}
              <div className="flex flex-col items-center justify-center border-l border-white/[0.08] px-4 py-5">
                <span
                  className="text-[13px] font-bold text-white/80"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("landing.compare.others")}
                </span>
                <span
                  className="mt-0.5 text-[10px] leading-tight text-center text-white/40"
                  style={{ fontFamily: "var(--font-sans)" }}
                >
                  {t("landing.compare.othersSub")}
                </span>
              </div>
            </div>

            {/* Rows */}
            {ROW_KEYS.map((key, i) => {
              const row = t.raw(`landing.compare.rows.${key}`) as {
                label: string;
                meishi: boolean;
                others: string;
              };
              const isEven = i % 2 === 0;
              return (
                <div
                  key={key}
                  className="grid grid-cols-[1fr_160px_160px] items-center border-t border-white/[0.06] transition-colors duration-200 hover:bg-white/[0.02]"
                  style={{
                    backgroundColor: isEven
                      ? "rgba(255,255,255,0.02)"
                      : "transparent",
                  }}
                >
                  {/* Feature label */}
                  <div className="px-6 py-4">
                    <span
                      className="text-sm font-medium text-white/70"
                      style={{ fontFamily: "var(--font-sans)" }}
                    >
                      {row.label}
                    </span>
                  </div>

                  {/* Meishi cell */}
                  <div
                    className="flex items-center justify-center border-l border-white/[0.06] py-4"
                    style={{ backgroundColor: "rgba(200,164,78,0.04)" }}
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ backgroundColor: "var(--color-brand-accent)" }}
                    >
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        style={{ color: "var(--color-brand-dark)" }}
                      />
                    </div>
                  </div>

                  {/* Others cell */}
                  <div className="flex flex-col items-center justify-center border-l border-white/[0.06] px-3 py-3 text-center">
                    {key === "free" ? (
                      <span
                        className="text-[12px] font-semibold"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "#F87171",
                        }}
                      >
                        {row.others}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: "rgba(239,68,68,0.15)" }}
                        >
                          <X
                            size={12}
                            strokeWidth={2.5}
                            style={{ color: "#F87171" }}
                          />
                        </div>
                        <span
                          className="text-[11px] leading-tight text-white/40"
                          style={{ fontFamily: "var(--font-sans)" }}
                        >
                          {row.others}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="mt-10 flex justify-center">
            <a
              href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
              className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                color: "var(--color-brand-dark)",
                boxShadow: "0 4px 20px rgba(200,164,78,0.2)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 28px rgba(200,164,78,0.35)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = "0 4px 20px rgba(200,164,78,0.2)";
              }}
            >
              {t("landing.cta.button")}
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
