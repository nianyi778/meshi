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
}

const FEATURE_DEFS: FeatureDef[] = [
  { key: "templates", icon: <Palette size={24} />, wide: true },
  { key: "customization", icon: <Settings size={24} /> },
  { key: "preview", icon: <Smartphone size={24} /> },
  { key: "export", icon: <ClipboardCopy size={24} /> },
  { key: "gmail", icon: <Download size={24} /> },
  { key: "free", icon: <Mail size={24} />, wide: true },
];

/* ------------------------------------------------------------------ */
/*  Feature card component                                             */
/* ------------------------------------------------------------------ */

function FeatureCard({ def }: { def: FeatureDef }) {
  const t = useTranslations();
  return (
    <StaggerItem className={def.wide ? "md:col-span-2" : ""}>
      <div
        className="group relative h-full cursor-pointer overflow-hidden rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: "var(--color-brand-border)" }}
      >
        <div
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "linear-gradient(135deg, rgba(14,165,233,0.03) 0%, rgba(186,230,253,0.06) 100%)",
          }}
        />
        <div className="relative">
          <div
            className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl"
            style={{
              backgroundColor: "var(--color-brand-bg)",
              color: "var(--color-brand-primary)",
            }}
          >
            {def.icon}
          </div>
          <h3
            className="mb-2 text-base font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-text)",
            }}
          >
            {t(`landing.features.items.${def.key}.title`)}
          </h3>
          <p
            className="text-sm leading-[1.8]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-brand-text-muted)",
            }}
          >
            {t(`landing.features.items.${def.key}.description`)}
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
  const t = useTranslations();
  return (
    <section id="features" className="py-20 md:py-28" style={{ backgroundColor: "var(--color-brand-surface-alt)" }}>
      <div className="mx-auto max-w-6xl px-5 lg:px-8">
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
          stagger={0.06}
        >
          {FEATURE_DEFS.map((def) => (
            <FeatureCard key={def.key} def={def} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
