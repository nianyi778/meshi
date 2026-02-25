"use client";

import {
  Palette,
  Settings,
  Smartphone,
  ClipboardCopy,
  Download,
  Mail,
} from "lucide-react";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Feature data                                                       */
/* ------------------------------------------------------------------ */

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
  wide?: boolean;
}

const FEATURES: Feature[] = [
  {
    icon: <Palette size={24} />,
    title: "豊富なテンプレート",
    description: "5つのプロデザインテンプレートから選択。クラシック、モダン、ミニマル、コーポレート、エレガント。",
    wide: true,
  },
  {
    icon: <Settings size={24} />,
    title: "フルカスタマイズ",
    description: "色、フォント、レイアウトを自由に変更。あなたのブランドに合わせて。",
  },
  {
    icon: <Smartphone size={24} />,
    title: "レスポンシブ対応",
    description: "PC・スマートフォンで美しく表示。どのメールクライアントでも崩れません。",
  },
  {
    icon: <ClipboardCopy size={24} />,
    title: "ワンクリックコピー",
    description: "HTMLをコピーしてメールに貼り付けるだけ。技術知識は不要です。",
  },
  {
    icon: <Download size={24} />,
    title: "画像ダウンロード",
    description: "高解像度PNGで保存。SNSやメッセンジャーでも使用可能。",
  },
  {
    icon: <Mail size={24} />,
    title: "Gmail連携",
    description: "ワンクリックでGmail署名に直接設定。Outlookにも対応しています。",
    wide: true,
  },
];

/* ------------------------------------------------------------------ */
/*  Feature card component                                             */
/* ------------------------------------------------------------------ */

function FeatureCard({ feature }: { feature: Feature }) {
  return (
    <StaggerItem
      className={feature.wide ? "md:col-span-2" : ""}
    >
      <div
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: "var(--color-brand-border)" }}
      >
        {/* Hover gradient accent */}
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(186,230,253,0.06) 100%)",
          }}
        />

        <div className="relative">
          {/* Icon */}
          <div
            className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--color-brand-bg)",
              color: "var(--color-brand-primary)",
            }}
          >
            {feature.icon}
          </div>

          {/* Title */}
          <h3
            className="mb-2 text-base font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-text)",
            }}
          >
            {feature.title}
          </h3>

          {/* Description */}
          <p
            className="text-sm leading-[1.8]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-brand-text-muted)",
            }}
          >
            {feature.description}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  Features section                                                   */
/* ------------------------------------------------------------------ */

export function Features() {
  return (
    <section id="features" className="py-20 md:py-28" style={{ backgroundColor: "var(--color-brand-surface-alt)" }}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
        {/* Section heading */}
        <FadeInUp>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold md:text-3xl"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                lineHeight: "1.2",
              }}
            >
              すべてが無料、すべてがプロ品質
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              Meishiは、ビジネスに必要なすべての機能を無料で提供します。
            </p>
          </div>
        </FadeInUp>

        {/* Bento grid */}
        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.06}
        >
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} feature={feature} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
