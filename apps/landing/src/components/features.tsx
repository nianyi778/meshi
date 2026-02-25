"use client";

import {
  Palette,
  Settings,
  Smartphone,
  ClipboardCopy,
  Download,
  Mail,
} from "lucide-react";
import { useTranslations } from "next-intl";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";
import { type ReactNode } from "react";

/* ------------------------------------------------------------------ */
/*  Feature definitions (icons only — text from i18n)                  */
/* ------------------------------------------------------------------ */

interface FeatureDef {
  key: string;
  icon: ReactNode;
  wide?: boolean;
  tall?: boolean;
  accent?: string;
}

const FEATURE_DEFS: FeatureDef[] = [
  {
    key: "templates",
    icon: <Palette size={26} />,
    wide: true,
    accent: "var(--color-brand-primary)",
  },
  {
    key: "customization",
    icon: <Settings size={24} />,
    accent: "#8B5CF6",
  },
  {
    key: "preview",
    icon: <Smartphone size={24} />,
    accent: "#059669",
  },
  {
    key: "export",
    icon: <ClipboardCopy size={24} />,
    accent: "var(--color-brand-cta)",
  },
  {
    key: "gmail",
    icon: <Download size={24} />,
    accent: "#0369A1",
  },
  {
    key: "free",
    icon: <Mail size={26} />,
    wide: true,
    accent: "#059669",
  },
];

/* ------------------------------------------------------------------ */
/*  Bento grid cell sizes                                              */
/* ------------------------------------------------------------------ */

const GRID_CLASSES = [
  "sm:col-span-2 lg:col-span-2 lg:row-span-1",   // templates — wide
  "sm:col-span-1 lg:col-span-1",                   // customization
  "sm:col-span-1 lg:col-span-1",                   // preview
  "sm:col-span-1 lg:col-span-1",                   // export
  "sm:col-span-1 lg:col-span-1",                   // gmail
  "sm:col-span-2 lg:col-span-2 lg:row-span-1",   // free — wide
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
      <div
        className="group relative flex h-full cursor-pointer overflow-hidden rounded-2xl border bg-white/80 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: "var(--color-brand-border)" }}
      >
        {/* Hover gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(186,230,253,0.05) 100%)`,
          }}
        />

        {/* Decorative corner accent */}
        <div
          className="pointer-events-none absolute -top-8 -right-8 h-24 w-24 rounded-full opacity-[0.05] transition-opacity duration-300 group-hover:opacity-[0.08]"
          style={{ backgroundColor: def.accent }}
        />

        <div className={`relative flex flex-1 ${isWide ? "flex-row items-center gap-6 p-6 md:p-7" : "flex-col p-6"}`}>
          {/* Icon */}
          <div
            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105"
            style={{
              backgroundColor: "var(--color-brand-bg)",
              color: def.accent || "var(--color-brand-primary)",
            }}
          >
            {def.icon}
          </div>

          <div className={isWide ? "" : "mt-5"}>
            <h3
              className="text-[15px] font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
              }}
            >
              {t(`landing.features.items.${def.key}.title`)}
            </h3>
            <p
              className="mt-1.5 text-sm leading-[1.8]"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
            >
              {t(`landing.features.items.${def.key}.description`)}
            </p>
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
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
    >
      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-brand-primary) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 lg:px-8">
        <FadeInUp>
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <h2
              className="text-2xl font-extrabold md:text-[32px]"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
                lineHeight: "1.2",
                letterSpacing: "-0.01em",
              }}
            >
              {t("landing.features.title")}
            </h2>
            <p
              className="mt-4 text-sm leading-[1.8] md:text-base"
              style={{
                fontFamily: "var(--font-sans)",
                color: "var(--color-brand-text-muted)",
              }}
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
