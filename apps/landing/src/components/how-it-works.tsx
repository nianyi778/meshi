"use client";

import { PenLine, Paintbrush, Copy } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Step definitions                                                   */
/* ------------------------------------------------------------------ */

interface StepDef {
  number: string;
  key: string;
  icon: ReactNode;
  illustration: ReactNode;
}

const STEP_DEFS: StepDef[] = [
  {
    number: "01",
    key: "step1",
    icon: <PenLine size={20} />,
    illustration: (
      <div className="grid grid-cols-3 gap-1.5">
        {[1, 2, 3].map((i) => (
          <div key={i} className="rounded-lg border border-[var(--color-brand-border)] bg-white p-2.5">
            <div className="h-1.5 w-full rounded bg-[var(--color-brand-border)]" />
            <div className="mt-1.5 h-1 w-3/4 rounded bg-[var(--color-brand-border)]" />
            <div className="mt-1 h-1 w-1/2 rounded bg-[var(--color-brand-border)]" />
          </div>
        ))}
      </div>
    ),
  },
  {
    number: "02",
    key: "step2",
    icon: <Paintbrush size={20} />,
    illustration: (
      <div className="rounded-lg border border-[var(--color-brand-border)] bg-white p-3">
        <div className="flex gap-2 mb-2.5">
          {["#1E293B", "#C8A44E", "#94A3B8", "#059669"].map((c) => (
            <div key={c} className="h-5 w-5 rounded-full" style={{ backgroundColor: c }} />
          ))}
        </div>
        <div className="h-1.5 w-full rounded bg-[var(--color-brand-border)]" />
        <div className="mt-1.5 h-1 w-2/3 rounded bg-[var(--color-brand-border)]" />
        <div className="mt-3 flex gap-1.5">
          <div className="h-6 flex-1 rounded bg-[var(--color-brand-accent)]/20" />
          <div className="h-6 flex-1 rounded bg-[var(--color-brand-border)]" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    key: "step3",
    icon: <Copy size={20} />,
    illustration: (
      <div className="rounded-lg border border-[var(--color-brand-border)] bg-white p-3">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-7 flex-1 rounded-lg" style={{ backgroundColor: "var(--color-brand-accent)" }}>
            <div className="flex h-full items-center justify-center">
              <div className="h-1.5 w-12 rounded bg-white/60" />
            </div>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-6 flex-1 rounded border border-[var(--color-brand-border)]" />
          <div className="h-6 flex-1 rounded border border-[var(--color-brand-border)]" />
        </div>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Step card — alternating left/right layout                          */
/* ------------------------------------------------------------------ */

function StepRow({ step, index }: { step: StepDef; index: number }) {
  const t = useTranslations();
  const isEven = index % 2 === 0;

  const content = (
    <div className="flex flex-col items-start">
      {/* Icon */}
      <div
        className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl"
        style={{
          backgroundColor: "rgba(200,164,78,0.1)",
          color: "var(--color-brand-accent)",
        }}
      >
        {step.icon}
      </div>
      <h3
        className="text-lg font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-brand-text)",
        }}
      >
        {t(`landing.howItWorks.steps.${step.key}.title`)}
      </h3>
      <p
        className="mt-2 max-w-sm text-sm leading-[1.8]"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-brand-text-muted)",
        }}
      >
        {t(`landing.howItWorks.steps.${step.key}.description`)}
      </p>
    </div>
  );

  const illustration = (
    <div className="w-full max-w-[260px]">
      {step.illustration}
    </div>
  );

  return (
    <FadeInUp delay={index * 0.12}>
      <div className="relative flex flex-col items-center gap-8 lg:flex-row lg:gap-16">
        {/* Center number circle */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 lg:static lg:translate-x-0 lg:mx-0 z-10">
          <div
            className="flex h-14 w-14 items-center justify-center rounded-full border-2 text-lg font-bold"
            style={{
              borderColor: "var(--color-brand-accent)",
              color: "var(--color-brand-accent)",
              backgroundColor: "var(--color-brand-surface)",
              fontFamily: "var(--font-display)",
            }}
          >
            {step.number}
          </div>
        </div>

        {/* Content + illustration */}
        <div className={`flex flex-1 flex-col items-center gap-8 pt-20 lg:pt-0 lg:flex-row lg:gap-12 ${isEven ? "" : "lg:flex-row-reverse"}`}>
          <div className="flex-1">{content}</div>
          <div className="flex-shrink-0">{illustration}</div>
        </div>
      </div>
    </FadeInUp>
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
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Top decorative line */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brand-border) 20%, var(--color-brand-border) 80%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <div className="mx-auto mb-6 h-px w-12" style={{ backgroundColor: "var(--color-brand-accent)" }} />
            <h2
              className="text-2xl font-bold md:text-[32px]"
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

        <div className="flex flex-col gap-16 lg:gap-20">
          {STEP_DEFS.map((step, i) => (
            <StepRow key={step.number} step={step} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
