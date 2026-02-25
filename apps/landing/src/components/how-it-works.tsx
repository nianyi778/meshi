"use client";

import { PenLine, Paintbrush, Copy } from "lucide-react";
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
}

const STEP_DEFS: StepDef[] = [
  { number: "01", key: "step1", icon: <PenLine size={22} /> },
  { number: "02", key: "step2", icon: <Paintbrush size={22} /> },
  { number: "03", key: "step3", icon: <Copy size={22} /> },
];

/* ------------------------------------------------------------------ */
/*  Step card component                                                */
/* ------------------------------------------------------------------ */

function StepCard({ step, isLast }: { step: StepDef; isLast: boolean }) {
  const t = useTranslations();
  return (
    <StaggerItem className="relative flex flex-1 flex-col items-center text-center">
      {!isLast && (
        <>
          <div
            className="absolute top-7 left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] lg:block"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
          <div
            className="absolute top-16 left-1/2 h-[calc(100%-32px)] w-px -translate-x-1/2 lg:hidden"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
        </>
      )}

      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      >
        {step.number}
      </div>

      <div
        className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "var(--color-brand-bg)",
          color: "var(--color-brand-primary)",
        }}
      >
        {step.icon}
      </div>

      <h3
        className="mt-4 text-base font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-brand-text)",
        }}
      >
        {t(`landing.howItWorks.steps.${step.key}.title`)}
      </h3>

      <p
        className="mt-2 max-w-[240px] text-sm leading-[1.8]"
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
      className="py-20 md:py-28"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold md:text-3xl"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                lineHeight: "1.2",
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
