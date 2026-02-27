"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";
import { FadeInUp } from "./animations";

/* ------------------------------------------------------------------ */
/*  Shared sample data                                                 */
/* ------------------------------------------------------------------ */

const SAMPLE = {
  name: "山田 太郎",
  nameEn: "Taro Yamada",
  title: "シニアプロダクトマネージャー",
  company: "スカイテック株式会社",
  email: "t.yamada@skytech.co.jp",
  phone: "03-1234-5678",
  website: "skytech.co.jp",
} as const;

/* ------------------------------------------------------------------ */
/*  Template definitions with inline mock previews                     */
/* ------------------------------------------------------------------ */

interface TemplateDef {
  id: string;
  render: () => React.ReactNode;
}

const TEMPLATE_DEFS: TemplateDef[] = [
  {
    id: "classic",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "#1E293B" }}>
            山
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
            <p className="text-[10px] text-gray-400">{SAMPLE.nameEn}</p>
            <p className="mt-0.5 text-[11px] font-medium text-gray-600">{SAMPLE.title}</p>
            <p className="text-[10px] text-gray-400">{SAMPLE.company}</p>
            <div className="mt-2.5 border-t border-gray-100 pt-2.5">
              <p className="text-[10px] text-gray-500">{SAMPLE.email}</p>
              <p className="text-[10px] text-gray-500">{SAMPLE.phone}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modern",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
        <div className="mb-3 h-1 w-10 rounded-full" style={{ backgroundColor: "#C8A44E" }} />
        <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
        <p className="text-[11px] font-medium" style={{ color: "#C8A44E" }}>{SAMPLE.title}</p>
        <p className="text-[10px] text-gray-400">{SAMPLE.company}</p>
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-[10px] text-gray-500">{SAMPLE.email}</span>
          <span className="text-[10px] text-gray-500">{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
        <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
        <p className="text-[11px] text-gray-400">{SAMPLE.title} | {SAMPLE.company}</p>
        <div className="mt-2.5 h-px w-8 bg-gray-200" />
        <p className="mt-2.5 text-[10px] text-gray-500">
          {SAMPLE.email} · {SAMPLE.phone}
        </p>
      </div>
    ),
  },
  {
    id: "corporate",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm">
        <div className="px-5 py-2.5" style={{ backgroundColor: "#0F172A" }}>
          <p className="text-xs font-bold text-white">{SAMPLE.company}</p>
        </div>
        <div className="p-5">
          <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
          <p className="text-[11px]" style={{ color: "#C8A44E" }}>{SAMPLE.title}</p>
          <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="text-[10px] text-gray-500">{SAMPLE.email}</span>
            <span className="text-[10px] text-gray-500">{SAMPLE.phone}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "elegant",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-5 text-center shadow-sm">
        <p className="text-sm font-bold tracking-wider" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
        <p className="text-[10px] uppercase tracking-widest text-gray-400">{SAMPLE.nameEn}</p>
        <div className="mx-auto my-3 h-px w-12" style={{ backgroundColor: "#C8A44E" }} />
        <p className="text-[11px] font-medium text-gray-600">{SAMPLE.title}</p>
        <p className="text-[10px] text-gray-400">{SAMPLE.company}</p>
        <div className="mt-2.5 flex justify-center gap-3">
          <span className="text-[10px] text-gray-500">{SAMPLE.email}</span>
          <span className="text-[10px] text-gray-500">{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
  {
    id: "creative",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-5 text-left shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-14 w-1 rounded-full" style={{ background: "linear-gradient(180deg, #C8A44E, #1E293B)" }} />
          <div>
            <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
            <p className="text-[11px] font-medium" style={{ color: "#C8A44E" }}>{SAMPLE.title}</p>
            <p className="text-[10px] text-gray-400">{SAMPLE.company}</p>
          </div>
        </div>
        <div className="mt-3 flex flex-wrap gap-x-3 pl-4">
          <span className="text-[10px] text-gray-500">{SAMPLE.email}</span>
          <span className="text-[10px] text-gray-500">{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
  {
    id: "professional",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm">
        <div className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-bold" style={{ color: "#1E293B" }}>{SAMPLE.name}</p>
              <p className="text-[10px] text-gray-400">{SAMPLE.nameEn}</p>
            </div>
            <div className="flex h-8 w-8 items-center justify-center rounded text-[9px] font-bold text-white" style={{ backgroundColor: "#1E293B" }}>
              S
            </div>
          </div>
          <p className="mt-1 text-[11px] font-medium text-gray-600">{SAMPLE.title}</p>
          <div className="mt-2.5 h-px w-full" style={{ backgroundColor: "#C8A44E" }} />
          <div className="mt-2.5 flex flex-wrap gap-x-3">
            <span className="text-[10px] text-gray-500">{SAMPLE.email}</span>
            <span className="text-[10px] text-gray-500">{SAMPLE.phone}</span>
          </div>
        </div>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Templates Showcase — interactive gallery                           */
/* ------------------------------------------------------------------ */

export function TemplatesShowcase() {
  const t = useTranslations();
  const locale = useLocale();
  const [activeIndex, setActiveIndex] = useState(0);
  const [userInteracted, setUserInteracted] = useState(false);

  const handleSelect = useCallback((index: number) => {
    setActiveIndex(index);
    setUserInteracted(true);
  }, []);

  // Auto-rotate (pauses on interaction, resumes after 8s)
  useEffect(() => {
    if (userInteracted) {
      const timeout = setTimeout(() => setUserInteracted(false), 8000);
      return () => clearTimeout(timeout);
    }
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TEMPLATE_DEFS.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [userInteracted]);

  const activeTemplate = TEMPLATE_DEFS[activeIndex]!;

  return (
    <section
      id="templates"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "var(--color-brand-bg)" }}
    >
      {/* Subtle radial gradient */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background:
            "radial-gradient(ellipse at 30% 20%, var(--color-brand-primary) 0%, transparent 50%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-14 max-w-2xl text-center">
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
              {t("landing.templatesShowcase.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t("landing.templatesShowcase.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <div className="flex flex-col items-center">
            {/* Large preview card */}
            <div className="relative w-full max-w-lg">
              <div
                className="overflow-hidden rounded-2xl border p-6 shadow-xl md:p-8"
                style={{
                  borderColor: "var(--color-brand-border)",
                  backgroundColor: "var(--color-brand-surface-alt)",
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    {activeTemplate.render()}
                  </motion.div>
                </AnimatePresence>

                {/* Template name + CTA */}
                <div className="mt-5 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--color-brand-border)" }}>
                  <div>
                    <h3
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-heading)",
                        color: "var(--color-brand-text)",
                      }}
                    >
                      {t(`templates.${activeTemplate.id}.name`)}
                    </h3>
                    <p
                      className="mt-0.5 text-xs leading-[1.7]"
                      style={{
                        fontFamily: "var(--font-sans)",
                        color: "var(--color-brand-text-muted)",
                      }}
                    >
                      {t(`templates.${activeTemplate.id}.description`)}
                    </p>
                  </div>
                  <a
                    href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
                    className="group inline-flex shrink-0 items-center gap-1 text-xs font-semibold transition-colors duration-200 cursor-pointer"
                    style={{ color: "var(--color-brand-accent)" }}
                  >
                    {t("landing.templatesShowcase.useTemplate")}
                    <ArrowRight
                      size={12}
                      className="transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* Thumbnail selector */}
            <div className="mt-8 flex flex-wrap justify-center gap-2 sm:gap-3">
              {TEMPLATE_DEFS.map((template, i) => (
                <button
                  key={template.id}
                  type="button"
                  onClick={() => handleSelect(i)}
                  className="group relative cursor-pointer rounded-xl border px-4 py-2.5 text-xs font-medium transition-all duration-200"
                  style={{
                    borderColor:
                      i === activeIndex
                        ? "var(--color-brand-accent)"
                        : "var(--color-brand-border)",
                    backgroundColor:
                      i === activeIndex
                        ? "rgba(200,164,78,0.08)"
                        : "var(--color-brand-surface)",
                    color:
                      i === activeIndex
                        ? "var(--color-brand-accent)"
                        : "var(--color-brand-text-muted)",
                    fontFamily: "var(--font-sans)",
                  }}
                >
                  {t(`templates.${template.id}.name`)}
                  {i === activeIndex && (
                    <motion.div
                      layoutId="template-indicator"
                      className="absolute -bottom-px left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full"
                      style={{ backgroundColor: "var(--color-brand-accent)" }}
                      transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
