"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";

/* ------------------------------------------------------------------ */
/*  FAQ item component                                                 */
/* ------------------------------------------------------------------ */

function FAQItem({ question, answer, isOpen, onToggle }: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <StaggerItem>
      <button
        className="w-full text-left py-5 flex items-start justify-between gap-4 group cursor-pointer"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span
          className="text-[15px] font-semibold leading-[1.6] flex-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-text)",
          }}
        >
          {question}
        </span>
        <span
          className="shrink-0 mt-0.5 flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300"
          style={{
            backgroundColor: isOpen ? "var(--color-brand-accent)" : "var(--color-brand-surface-alt)",
            color: isOpen ? "var(--color-brand-dark)" : "var(--color-brand-text-muted)",
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
          }}
        >
          <ChevronDown size={14} />
        </span>
      </button>

      <div
        className="overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: isOpen ? "400px" : "0px" }}
      >
        <p
          className="pb-5 text-sm leading-[1.9]"
          style={{
            fontFamily: "var(--font-sans)",
            color: "var(--color-brand-text-muted)",
          }}
        >
          {answer}
        </p>
      </div>

      <div
        className="h-px w-full"
        style={{ backgroundColor: "var(--color-brand-border)" }}
      />
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  FAQ section                                                        */
/* ------------------------------------------------------------------ */

const FAQ_KEYS = ["q1", "q2", "q3", "q4", "q5", "q6"] as const;

export function FAQ() {
  const t = useTranslations();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "#fff" }}
    >
      {/* Top border */}
      <div
        className="pointer-events-none absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, var(--color-brand-border) 20%, var(--color-brand-border) 80%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto max-w-4xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mb-14 text-center">
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
              {t("landing.faq.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t("landing.faq.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <div
          className="h-px w-full mb-0"
          style={{ backgroundColor: "var(--color-brand-border)" }}
        />

        <StaggerContainer stagger={0.06}>
          {FAQ_KEYS.map((key, i) => (
            <FAQItem
              key={key}
              question={t(`landing.faq.items.${key}.q`)}
              answer={t(`landing.faq.items.${key}.a`)}
              isOpen={openIndex === i}
              onToggle={() => toggle(i)}
            />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
