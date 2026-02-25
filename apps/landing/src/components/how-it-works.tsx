"use client";

import { PenLine, Paintbrush, Copy } from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Steps data                                                         */
/* ------------------------------------------------------------------ */

interface Step {
  number: string;
  icon: ReactNode;
  title: string;
  description: string;
}

const STEPS: Step[] = [
  {
    number: "01",
    icon: <PenLine size={22} />,
    title: "情報を入力",
    description: "名前・会社名・連絡先を入力するだけ。必要な項目だけ選べます。",
  },
  {
    number: "02",
    icon: <Paintbrush size={22} />,
    title: "デザインを選択",
    description: "テンプレートと色を選んでカスタマイズ。リアルタイムプレビューで確認。",
  },
  {
    number: "03",
    icon: <Copy size={22} />,
    title: "コピーして完成",
    description: "HTMLをコピーしてメール署名に貼り付け。たった30秒で完成します。",
  },
];

/* ------------------------------------------------------------------ */
/*  Step card component                                                */
/* ------------------------------------------------------------------ */

function StepCard({ step, isLast }: { step: Step; isLast: boolean }) {
  return (
    <StaggerItem className="relative flex flex-1 flex-col items-center text-center">
      {/* Connector line (horizontal on desktop, vertical on mobile) */}
      {!isLast && (
        <>
          {/* Desktop: horizontal connector */}
          <div
            className="absolute top-7 left-[calc(50%+32px)] hidden h-px w-[calc(100%-64px)] lg:block"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
          {/* Mobile: vertical connector */}
          <div
            className="absolute top-16 left-1/2 h-[calc(100%-32px)] w-px -translate-x-1/2 lg:hidden"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
        </>
      )}

      {/* Number circle */}
      <div
        className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full text-sm font-bold text-white shadow-md"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      >
        {step.number}
      </div>

      {/* Icon */}
      <div
        className="mt-5 inline-flex h-10 w-10 items-center justify-center rounded-lg"
        style={{
          backgroundColor: "var(--color-brand-bg)",
          color: "var(--color-brand-primary)",
        }}
      >
        {step.icon}
      </div>

      {/* Title */}
      <h3
        className="mt-4 text-base font-bold"
        style={{
          fontFamily: "var(--font-heading)",
          color: "var(--color-brand-text)",
        }}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className="mt-2 max-w-[240px] text-sm leading-[1.8]"
        style={{
          fontFamily: "var(--font-sans)",
          color: "var(--color-brand-text-muted)",
        }}
      >
        {step.description}
      </p>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  How It Works section                                               */
/* ------------------------------------------------------------------ */

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="py-20 md:py-28"
      style={{ backgroundColor: "#fff" }}
    >
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Section heading */}
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
              3ステップで完成
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              難しい設定は一切不要。誰でも簡単にプロ品質の署名を作成できます。
            </p>
          </div>
        </FadeInUp>

        {/* Steps */}
        <StaggerContainer
          className="flex flex-col gap-16 lg:flex-row lg:gap-8"
          stagger={0.12}
        >
          {STEPS.map((step, i) => (
            <StepCard
              key={step.number}
              step={step}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
