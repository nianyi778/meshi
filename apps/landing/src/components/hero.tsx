"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslations, useLocale } from "next-intl";
import { FadeInUp } from "./animations";

/* ------------------------------------------------------------------ */
/*  Mock signature data                                                */
/* ------------------------------------------------------------------ */

const SIGNATURES = [
  {
    name: "田中 太郎",
    nameEn: "Taro Tanaka",
    title: "プロダクトマネージャー",
    company: "テックコーポレーション株式会社",
    email: "t.tanaka@techcorp.co.jp",
    phone: "03-1234-5678",
    accent: "#0EA5E9",
  },
  {
    name: "佐藤 花子",
    nameEn: "Hanako Sato",
    title: "デザインディレクター",
    company: "クリエイティブスタジオ合同会社",
    email: "h.sato@creativestudio.jp",
    phone: "06-9876-5432",
    accent: "#8B5CF6",
  },
  {
    name: "鈴木 一郎",
    nameEn: "Ichiro Suzuki",
    title: "シニアエンジニア",
    company: "イノベーション・ラボ株式会社",
    email: "i.suzuki@innovlab.co.jp",
    phone: "045-555-0123",
    accent: "#059669",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Signature Card component                                           */
/* ------------------------------------------------------------------ */

function SignatureCard({
  sig,
}: {
  sig: (typeof SIGNATURES)[number];
}) {
  return (
    <div
      className="w-full rounded-2xl border bg-white/90 p-6 shadow-xl backdrop-blur-sm"
      style={{ borderColor: "var(--color-brand-border)" }}
    >
      {/* Top accent bar */}
      <div
        className="mb-5 h-0.5 w-16 rounded-full"
        style={{ backgroundColor: sig.accent }}
      />
      <div className="flex gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold text-white"
          style={{ backgroundColor: sig.accent }}
        >
          {sig.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[15px] font-bold leading-tight"
            style={{ color: "var(--color-brand-text)", fontFamily: "var(--font-heading)" }}
          >
            {sig.name}
          </p>
          <p
            className="mt-0.5 text-[11px] tracking-wide"
            style={{ color: "var(--color-brand-text-muted)" }}
          >
            {sig.nameEn}
          </p>
          <p
            className="mt-1.5 text-[13px] font-medium"
            style={{ color: "var(--color-brand-text-body)" }}
          >
            {sig.title}
          </p>
          <p
            className="text-[11px]"
            style={{ color: "var(--color-brand-text-muted)" }}
          >
            {sig.company}
          </p>
          <div
            className="my-3 h-px w-full"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--color-brand-text-body)" }}
            >
              <Mail size={11} strokeWidth={2} style={{ color: sig.accent }} />
              {sig.email}
            </span>
            <span
              className="inline-flex items-center gap-1.5"
              style={{ color: "var(--color-brand-text-body)" }}
            >
              <Phone size={11} strokeWidth={2} style={{ color: sig.accent }} />
              {sig.phone}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Hero section                                                       */
/* ------------------------------------------------------------------ */

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const t = useTranslations();
  const locale = useLocale();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SIGNATURES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28"
      style={{
        background:
          "linear-gradient(165deg, #F0F9FF 0%, #E0F2FE 40%, #F0F9FF 70%, #BAE6FD 100%)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Japanese-inspired decorative circle — top right */}
      <div
        className="pointer-events-none absolute -top-20 -right-20 h-[420px] w-[420px] rounded-full opacity-[0.06]"
        style={{
          background: "radial-gradient(circle, var(--color-brand-primary) 0%, transparent 70%)",
        }}
      />

      {/* Decorative circle — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-32 -left-32 h-[320px] w-[320px] rounded-full opacity-[0.04]"
        style={{
          background: "radial-gradient(circle, var(--color-brand-dark) 0%, transparent 70%)",
        }}
      />

      {/* Decorative dot pattern — zen-like */}
      <div
        className="pointer-events-none absolute top-32 left-8 opacity-[0.06] hidden lg:block"
        style={{
          width: "100px",
          height: "100px",
          backgroundImage:
            "radial-gradient(var(--color-brand-primary) 1.5px, transparent 1.5px)",
          backgroundSize: "16px 16px",
        }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-20 lg:px-8">
        {/* ---- Text column ---- */}
        <div>
          <FadeInUp>
            <span
              className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
              style={{
                borderColor: "var(--color-brand-border)",
                color: "var(--color-brand-text-body)",
                backgroundColor: "rgba(255,255,255,0.7)",
                fontFamily: "var(--font-sans)",
              }}
            >
              <Sparkles size={13} style={{ color: "var(--color-brand-cta)" }} />
              {t("landing.hero.badge")}
            </span>
          </FadeInUp>

          <FadeInUp delay={0.08}>
            <h1
              className="mt-7 font-extrabold leading-[1.12]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)",
                letterSpacing: "-0.02em",
              }}
            >
              {t("landing.hero.title")}
            </h1>
          </FadeInUp>

          <FadeInUp delay={0.16}>
            <p
              className="mt-6 max-w-lg text-base leading-[1.9] md:text-[17px]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-body)",
              }}
            >
              {t("landing.hero.subtitle")}
            </p>
          </FadeInUp>

          <FadeInUp delay={0.24}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={`https://app.ekagu.qzz.io/${locale}/generator`}
                className="group inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl cursor-pointer"
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
                {t("landing.hero.cta")}
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>
              <a
                href="#templates"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-all duration-200 cursor-pointer hover:bg-white/50"
                style={{
                  borderColor: "var(--color-brand-primary)",
                  color: "var(--color-brand-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                {t("landing.hero.secondaryCta")}
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* ---- Signature preview column ---- */}
        <FadeInUp delay={0.2} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Decorative shadow card behind */}
            <div
              className="absolute top-5 right-5 -z-10 h-full w-full rounded-2xl"
              style={{ backgroundColor: "rgba(14,165,233,0.05)" }}
            />
            <div
              className="absolute top-10 right-10 -z-20 h-full w-full rounded-2xl"
              style={{ backgroundColor: "rgba(14,165,233,0.025)" }}
            />

            <div className="relative h-[240px] sm:h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -14, scale: 0.97 }}
                  transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <SignatureCard sig={SIGNATURES[currentIndex]!} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dot indicators */}
            <div className="mt-6 flex justify-center gap-2">
              {SIGNATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`Signature preview ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300 cursor-pointer"
                  style={{
                    width: i === currentIndex ? "28px" : "8px",
                    backgroundColor:
                      i === currentIndex
                        ? "var(--color-brand-primary)"
                        : "var(--color-brand-border)",
                  }}
                />
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
