"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles, Mail, Phone, ChevronDown } from "lucide-react";
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
    accent: "#C8A44E",
  },
  {
    name: "佐藤 花子",
    nameEn: "Hanako Sato",
    title: "デザインディレクター",
    company: "クリエイティブスタジオ合同会社",
    email: "h.sato@creativestudio.jp",
    phone: "06-9876-5432",
    accent: "#94A3B8",
  },
  {
    name: "鈴木 一郎",
    nameEn: "Ichiro Suzuki",
    title: "シニアエンジニア",
    company: "イノベーション・ラボ株式会社",
    email: "i.suzuki@innovlab.co.jp",
    phone: "045-555-0123",
    accent: "#D4AF37",
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
    <div className="w-full rounded-2xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-md">
      {/* Top accent bar */}
      <div
        className="mb-5 h-0.5 w-16 rounded-full"
        style={{ backgroundColor: sig.accent }}
      />
      <div className="flex gap-4">
        <div
          className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-base font-bold"
          style={{
            backgroundColor: `${sig.accent}20`,
            color: sig.accent,
          }}
        >
          {sig.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[15px] font-bold leading-tight text-white"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {sig.name}
          </p>
          <p className="mt-0.5 text-[11px] tracking-wide text-white/40">
            {sig.nameEn}
          </p>
          <p className="mt-1.5 text-[13px] font-medium text-white/70">
            {sig.title}
          </p>
          <p className="text-[11px] text-white/40">
            {sig.company}
          </p>
          <div className="my-3 h-px w-full bg-white/10" />
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px]">
            <span className="inline-flex items-center gap-1.5 text-white/60">
              <Mail size={11} strokeWidth={2} style={{ color: sig.accent }} />
              {sig.email}
            </span>
            <span className="inline-flex items-center gap-1.5 text-white/60">
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
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 pt-28 pb-16 md:pt-32 md:pb-24"
      style={{
        background:
          "linear-gradient(165deg, #0F172A 0%, #1E293B 40%, #0F172A 80%, #1a2540 100%)",
      }}
    >
      {/* Subtle grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(200,164,78,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(200,164,78,0.3) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      {/* Gold radial glow — top right */}
      <div
        className="pointer-events-none absolute -top-32 -right-32 h-[500px] w-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(200,164,78,0.06) 0%, transparent 60%)",
        }}
      />

      {/* Decorative large kanji watermark */}
      <div
        className="pointer-events-none absolute -bottom-16 -left-8 select-none text-[280px] font-bold leading-none opacity-[0.02] hidden lg:block"
        style={{
          fontFamily: "var(--font-heading)",
          color: "#fff",
        }}
      >
        名
      </div>

      {/* Blue-ish radial glow — bottom left */}
      <div
        className="pointer-events-none absolute -bottom-48 -left-48 h-[400px] w-[400px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(30,41,59,0.5) 0%, transparent 60%)",
        }}
      />

      {/* Content — centered single column */}
      <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
        {/* Badge */}
        <FadeInUp>
          <span
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium"
            style={{
              borderColor: "rgba(200,164,78,0.25)",
              color: "var(--color-brand-accent)",
              backgroundColor: "rgba(200,164,78,0.08)",
              fontFamily: "var(--font-sans)",
            }}
          >
            <Sparkles size={13} style={{ color: "var(--color-brand-accent)" }} />
            {t("landing.hero.badge")}
          </span>
        </FadeInUp>

        {/* Headline */}
        <FadeInUp delay={0.08}>
          <h1
            className="mt-8 font-bold leading-[1.15]"
            style={{
              fontFamily: "var(--font-heading)",
              color: "#fff",
              fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)",
              letterSpacing: "-0.02em",
            }}
          >
            {t("landing.hero.title")}
          </h1>
        </FadeInUp>

        {/* Subtitle */}
        <FadeInUp delay={0.16}>
          <p
            className="mt-6 max-w-xl text-base leading-[1.9] md:text-[17px]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "rgba(255,255,255,0.55)",
            }}
          >
            {t("landing.hero.subtitle")}
          </p>
        </FadeInUp>

        {/* CTA Buttons */}
        <FadeInUp delay={0.24}>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`https://dashboard.ekagu.qzz.io/${locale}/generator`}
              className="group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-sm font-bold shadow-lg transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "var(--color-brand-cta)",
                color: "var(--color-brand-dark)",
                fontFamily: "var(--font-sans)",
                boxShadow: "0 4px 24px rgba(200,164,78,0.25)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-brand-cta-hover)";
                e.currentTarget.style.boxShadow = "0 4px 32px rgba(200,164,78,0.4)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "var(--color-brand-cta)";
                e.currentTarget.style.boxShadow = "0 4px 24px rgba(200,164,78,0.25)";
              }}
            >
              {t("landing.hero.cta")}
              <ArrowRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#templates"
              className="inline-flex items-center gap-1.5 rounded-xl border-2 px-6 py-3.5 text-sm font-semibold transition-all duration-200 cursor-pointer text-white/70 hover:text-white hover:border-white/40"
              style={{
                borderColor: "rgba(255,255,255,0.2)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {t("landing.hero.secondaryCta")}
            </a>
          </div>
        </FadeInUp>
      </div>

      {/* Signature preview carousel */}
      <FadeInUp delay={0.3} className="relative z-10 mt-16 w-full max-w-md">
        {/* Decorative shadow cards */}
        <div className="absolute top-4 right-4 -z-10 h-full w-full rounded-2xl bg-white/[0.02]" />
        <div className="absolute top-8 right-8 -z-20 h-full w-full rounded-2xl bg-white/[0.01]" />

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
              type="button"
              onClick={() => setCurrentIndex(i)}
              aria-label={`Signature preview ${i + 1}`}
              className="h-2 rounded-full transition-all duration-300 cursor-pointer"
              style={{
                width: i === currentIndex ? "28px" : "8px",
                backgroundColor:
                  i === currentIndex
                    ? "var(--color-brand-accent)"
                    : "rgba(255,255,255,0.15)",
              }}
            />
          ))}
        </div>
      </FadeInUp>

      {/* Scroll hint */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <ChevronDown size={18} className="text-white/20" />
      </motion.div>
    </section>
  );
}
