"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
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
      className="w-full rounded-xl border bg-white p-5 shadow-lg"
      style={{ borderColor: "var(--color-brand-border)" }}
    >
      {/* Top accent bar */}
      <div
        className="mb-4 h-1 w-12 rounded-full"
        style={{ backgroundColor: sig.accent }}
      />

      {/* Content */}
      <div className="flex gap-4">
        {/* Avatar placeholder */}
        <div
          className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-lg font-bold text-white"
          style={{ backgroundColor: sig.accent }}
        >
          {sig.name.charAt(0)}
        </div>

        <div className="min-w-0 flex-1">
          <p
            className="text-base font-bold leading-tight"
            style={{ color: "var(--color-brand-text)" }}
          >
            {sig.name}
          </p>
          <p
            className="mt-0.5 text-xs"
            style={{ color: "var(--color-brand-text-muted)" }}
          >
            {sig.nameEn}
          </p>
          <p
            className="mt-1 text-sm font-medium"
            style={{ color: "var(--color-brand-text-body)" }}
          >
            {sig.title}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-brand-text-muted)" }}
          >
            {sig.company}
          </p>

          {/* Divider */}
          <div
            className="my-2.5 h-px w-full"
            style={{ backgroundColor: "var(--color-brand-border)" }}
          />

          {/* Contact row */}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs">
            <span style={{ color: "var(--color-brand-text-body)" }}>
              ✉ {sig.email}
            </span>
            <span style={{ color: "var(--color-brand-text-body)" }}>
              ☎ {sig.phone}
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % SIGNATURES.length);
    }, 3600);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24"
      style={{
        background:
          "linear-gradient(135deg, #F0F9FF 0%, #E0F2FE 50%, #BAE6FD 100%)",
      }}
    >
      {/* Decorative grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(var(--color-brand-primary) 1px, transparent 1px), linear-gradient(90deg, var(--color-brand-primary) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Decorative radial glow */}
      <div
        className="pointer-events-none absolute top-1/4 -right-32 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{ backgroundColor: "var(--color-brand-primary)" }}
      />
      <div
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full opacity-15 blur-3xl"
        style={{ backgroundColor: "#BAE6FD" }}
      />

      <div className="relative mx-auto grid max-w-6xl gap-12 px-5 lg:grid-cols-2 lg:items-center lg:gap-16 lg:px-8">
        {/* ---- Text column ---- */}
        <div>
          {/* Badge */}
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
              <Sparkles
                size={13}
                style={{ color: "var(--color-brand-cta)" }}
              />
              完全無料 · コード不要 · Gmail対応
            </span>
          </FadeInUp>

          {/* Headline */}
          <FadeInUp delay={0.08}>
            <h1
              className="mt-6 font-extrabold leading-[1.15]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
              }}
            >
              メールに、名刺を。
            </h1>
          </FadeInUp>

          {/* Sub-headline */}
          <FadeInUp delay={0.16}>
            <p
              className="mt-5 max-w-lg text-base leading-[1.8] md:text-lg"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-body)",
              }}
            >
              プロフェッショナルなメール署名を30秒で作成。
              <br className="hidden sm:block" />
              5つのテンプレート、フルカスタマイズ。
            </p>
          </FadeInUp>

          {/* CTAs */}
          <FadeInUp delay={0.24}>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              {/* Primary CTA */}
              <a
                href="/generator"
                className="group inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-white shadow-lg transition-all duration-200 hover:shadow-xl"
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
                無料で署名を作成する
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                />
              </a>

              {/* Secondary CTA */}
              <a
                href="#templates"
                className="inline-flex items-center gap-1.5 rounded-xl border-2 px-5 py-3 text-sm font-semibold transition-colors duration-200"
                style={{
                  borderColor: "var(--color-brand-primary)",
                  color: "var(--color-brand-primary)",
                  fontFamily: "var(--font-sans)",
                }}
              >
                テンプレートを見る
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* ---- Signature preview column ---- */}
        <FadeInUp delay={0.2} className="relative">
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            {/* Background card decoration */}
            <div
              className="absolute top-4 right-4 -z-10 h-full w-full rounded-2xl"
              style={{ backgroundColor: "rgba(14,165,233,0.06)" }}
            />

            {/* Animated signature cards */}
            <div className="relative h-[220px] sm:h-[200px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, y: 16, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.97 }}
                  transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                  className="absolute inset-0"
                >
                  <SignatureCard sig={SIGNATURES[currentIndex]!} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Dots indicator */}
            <div className="mt-5 flex justify-center gap-2">
              {SIGNATURES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  aria-label={`署名プレビュー ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? "24px" : "8px",
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
