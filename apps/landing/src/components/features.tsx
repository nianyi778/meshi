"use client";

import {
  Palette,
  Settings,
  Smartphone,
  ClipboardCopy,
  Download,
  Heart,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Feature definitions                                                */
/* ------------------------------------------------------------------ */

interface FeatureDef {
  key: string;
  icon: ReactNode;
  wide?: boolean;
  highlight?: ReactNode;
}

const FEATURE_DEFS: FeatureDef[] = [
  {
    key: "templates",
    icon: <Palette size={24} />,
    wide: true,
    highlight: (
      <div className="mt-4 flex gap-2">
        {["Classic", "Modern", "Minimal"].map((name) => (
          <div key={name} className="flex-1 rounded-lg bg-white/[0.06] p-2.5 text-center">
            <div className="mx-auto mb-1.5 h-1 w-6 rounded-full bg-[var(--color-brand-accent)]/40" />
            <div className="h-1 w-full rounded bg-white/10" />
            <div className="mt-1 h-1 w-3/4 rounded bg-white/8" />
            <p className="mt-2 text-[9px] text-white/30">{name}</p>
          </div>
        ))}
      </div>
    ),
  },
  {
    key: "customization",
    icon: <Settings size={22} />,
  },
  {
    key: "preview",
    icon: <Smartphone size={22} />,
  },
  {
    key: "export",
    icon: <ClipboardCopy size={22} />,
  },
  {
    key: "gmail",
    icon: <Download size={22} />,
  },
  {
    key: "free",
    icon: <Heart size={24} />,
    wide: true,
    highlight: (
      <div className="mt-3 flex items-baseline gap-1">
        <span
          className="text-4xl font-bold"
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-brand-accent)",
          }}
        >
          ¥0
        </span>
        <span className="text-sm text-white/40">/ 永久無料</span>
      </div>
    ),
  },
];

const GRID_CLASSES = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-1",
  "sm:col-span-1 lg:col-span-1",
  "sm:col-span-1 lg:col-span-1",
  "sm:col-span-1 lg:col-span-1",
  "sm:col-span-1 lg:col-span-1",
  "sm:col-span-2 lg:col-span-2 lg:row-span-1",
];

/* ------------------------------------------------------------------ */
/*  Feature card component                                             */
/* ------------------------------------------------------------------ */

function FeatureCard({
  def,
  gridClass,
}: {
  def: FeatureDef;
  gridClass: string;
}) {
  const t = useTranslations();
  const isWide = def.wide;

  return (
    <StaggerItem className={gridClass}>
      <div className="group relative flex h-full cursor-default overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-sm transition-all duration-300 hover:border-[var(--color-brand-accent)]/30 hover:bg-white/[0.05]">
        {/* Hover gradient overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: "linear-gradient(135deg, rgba(200,164,78,0.03) 0%, transparent 60%)",
          }}
        />

        {/* Decorative corner accent */}
        <div
          className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-[0.06] transition-opacity duration-300 group-hover:opacity-[0.1]"
          style={{ backgroundColor: "var(--color-brand-accent)" }}
        />

        <div className={`relative flex flex-1 ${isWide ? "flex-col p-6 md:flex-row md:items-start md:gap-6 md:p-7" : "flex-col p-6"}`}>
          {/* Icon */}
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: "rgba(200,164,78,0.1)",
              color: "var(--color-brand-accent)",
            }}
          >
            {def.icon}
          </div>

          <div className={isWide ? "mt-4 md:mt-0 flex-1" : "mt-5"}>
            <h3
              className="text-[15px] font-bold text-white"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {t(`landing.features.items.${def.key}.title`)}
            </h3>
            <p
              className="mt-1.5 text-sm leading-[1.8] text-white/50"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t(`landing.features.items.${def.key}.description`)}
            </p>
            {def.highlight}
          </div>
        </div>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  Features section                                                   */
/* ------------------------------------------------------------------ */

export function Features() {
  const t = useTranslations();
  return (
    <section
      id="features"
      className="relative py-20 md:py-28"
      style={{ backgroundColor: "var(--color-brand-surface-dark)" }}
    >
      {/* Subtle dot texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(rgba(200,164,78,0.4) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-14 max-w-2xl text-center">
            {/* Gold decorative line */}
            <div className="mx-auto mb-6 h-px w-12" style={{ backgroundColor: "var(--color-brand-accent)" }} />
            <h2
              className="text-2xl font-bold text-white md:text-[32px]"
              style={{
                fontFamily: "var(--font-heading)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              {t("landing.features.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] text-white/50 md:text-base"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {t("landing.features.subtitle")}
            </p>
          </div>
        </FadeInUp>

        <StaggerContainer
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {FEATURE_DEFS.map((def, i) => (
            <FeatureCard key={def.key} def={def} gridClass={GRID_CLASSES[i]!} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
