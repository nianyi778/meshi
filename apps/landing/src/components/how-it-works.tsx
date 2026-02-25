"use client";

import { PenLine, Paintbrush, Copy, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

interface StepDef {
  number: string;
  key: string;
  icon: ReactNode;
  accent: string;
}

const STEP_DEFS: StepDef[] = [
  { number: "01", key: "step1", icon: <PenLine size={22} />, accent: "var(--color-brand-primary)" },
  { number: "02", key: "step2", icon: <Paintbrush size={22} />, accent: "#8B5CF6" },
  { number: "03", key: "step3", icon: <Copy size={22} />, accent: "#059669" },
];

/* ------------------------------------------------------------------ */
/*  Step card component                                                */
/* ------------------------------------------------------------------ */

function StepCard({ step, isLast }: { step: StepDef; isLast: boolean }) {
  const t = useTranslations();
  return (
    <StaggerItem className="relative flex flex-1 flex-col items-center text-center">
      {/* Desktop connector arrow */}
      {!isLast && (
        <div className="absolute top-7 left-[calc(50%+44px)] hidden items-center lg:flex" style={{ width: "calc(100% - 88px)" }}>
          <div
            className="h-px flex-1"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
          <ChevronRight
            size={14}
            className="mx-1 shrink-0"
            style={{ color: "var(--color-brand-border)" }}
          />
        </div>
      )}

      {/* Mobile connector line */}
      {!isLast && (
        <div
          className="absolute top-16 left-1/2 h-[calc(100%-32px)] w-px -translate-x-1/2 lg:hidden"
          style={{ backgroundColor: "var(--color-brand-border)" }}
        />
      )}

      {/* Step number circle */}
      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: step.accent }}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div
        className="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "var(--color-brand-bg)",
          color: step.accent,
        }}
      >
        {step.icon}
      </div>

      <h3
        className="mt-4 text-[15px] font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-brand-text)",
        }}
      >
        {t(`landing.howItWorks.steps.${step.key}.title`)}
      </h3>

      <p
        className="mt-2 max-w-[260px] text-sm leading-[1.8]"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-brand-text-muted)",
        }}
      >
        {t(`landing.howItWorks.steps.${step.key}.description`)}
      </p>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works section                                               */
/* ------------------------------------------------------------------ */

export function HowItWorks() {
  const t = useTranslations();
  return (
    <section
      id="how-it-works"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Diagonal decorative line */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background: "linear-gradient(90deg, transparent 0%, var(--color-brand-border) 20%, var(--color-brand-border) 80%, transparent 100%)",
        }}
      />

      {/* Subtle background pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.012]"
        style={{
          backgroundImage:
            "linear-gradient(45deg, var(--color-brand-primary) 25%, transparent 25%, transparent 75%, var(--color-brand-primary) 75%)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold md:text-[32px]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              {t("landing.howItWorks.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t("landing.howItWorks.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer
          className="flex flex-col gap-16 lg:flex-row lg:gap-8"
          stagger={0.12}
        >
          {STEP_DEFS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={i === STEP_DEFS.length - 1}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
