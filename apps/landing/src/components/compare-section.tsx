"use client";

import { Check, X } from "lucide-react";
import { useTranslations } from "next-intl";
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

  return (
    <section
      id="compare"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-brand-bg)" }}
    >
      {/* Background grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold md:text-[32px]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              {t("landing.compare.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t("landing.compare.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div
            className="overflow-hidden rounded-2xl border"
            style={{ borderColor: "var(--color-brand-border)" }}
          >
            {/* Header */}
            <div
              className="grid grid-cols-[1fr_140px_140px] items-center"
              style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
            >
              <div className="px-6 py-4" />

              {/* Meishi column header */}
              <div
                className="flex flex-col items-center justify-center border-l px-4 py-5"
                style={{
                  borderColor: "var(--color-brand-border)",
                  backgroundColor: "var(--color-brand-primary)",
                }}
              >
                <span
                  className="text-[15px] font-extrabold text-white"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {t("landing.compare.meishi")}
                </span>
                <span
                  className="mt-0.5 rounded px-1.5 py-0.5 text-[10px] font-bold tracking-wide text-white/80"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
                >
                  無料
                </span>
              </div>

              {/* Others column header */}
              <div
                className="flex flex-col items-center justify-center border-l px-4 py-5"
                style={{ borderColor: "var(--color-brand-border)" }}
              >
                <span
                  className="text-[13px] font-bold"
                  style={{
                    fontFamily: "var(--font-heading)",
                    color: "var(--color-brand-text)",
                  }}
                >
                  {t("landing.compare.others")}
                </span>
                <span
                  className="mt-0.5 text-[10px] leading-tight text-center"
                  style={{
                    fontFamily: "var(--font-sans)",
                    color: "var(--color-brand-text-muted)",
                  }}
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
                  className="grid grid-cols-[1fr_140px_140px] items-center border-t"
                  style={{
                    borderColor: "var(--color-brand-border)",
                    backgroundColor: isEven
                      ? "rgba(255,255,255,0.6)"
                      : "rgba(255,255,255,0.3)",
                  }}
                >
                  {/* Feature label */}
                  <div className="px-6 py-4">
                    <span
                      className="text-sm font-medium"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-brand-text-body)",
                      }}
                    >
                      {row.label}
                    </span>
                  </div>

                  {/* Meishi cell */}
                  <div
                    className="flex items-center justify-center border-l py-4"
                    style={{
                      borderColor: "var(--color-brand-border)",
                      backgroundColor: "rgba(14,165,233,0.04)",
                    }}
                  >
                    <div
                      className="flex h-6 w-6 items-center justify-center rounded-full"
                      style={{ backgroundColor: "#059669" }}
                    >
                      <Check
                        size={13}
                        strokeWidth={2.5}
                        className="text-white"
                      />
                    </div>
                  </div>

                  {/* Others cell */}
                  <div
                    className="flex flex-col items-center justify-center border-l px-3 py-3 text-center"
                    style={{ borderColor: "var(--color-brand-border)" }}
                  >
                    {key === "free" ? (
                      <span
                        className="text-[12px] font-semibold"
                        style={{
                          fontFamily: "var(--font-sans)",
                          color: "#DC2626",
                        }}
                      >
                        {row.others}
                      </span>
                    ) : (
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className="flex h-6 w-6 items-center justify-center rounded-full"
                          style={{ backgroundColor: "#FEE2E2" }}
                        >
                          <X
                            size={12}
                            strokeWidth={2.5}
                            style={{ color: "#DC2626" }}
                          />
                        </div>
                        <span
                          className="text-[11px] leading-tight"
                          style={{
                            fontFamily: "var(--font-sans)",
                            color: "var(--color-brand-text-muted)",
                          }}
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
        </FadeInUp>
      </div>
    </section>
  );
}
