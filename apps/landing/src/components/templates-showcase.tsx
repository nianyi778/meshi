"use client";

import { useTranslations } from "next-intl";
import { FadeInUp, StaggerContainer, StaggerItem } from "./animations";

/* ------------------------------------------------------------------ */
/*  Shared sample data for all template mocks                          */
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
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white" style={{ backgroundColor: "var(--color-brand-primary)" }}>
            山
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold" style={{ color: "var(--color-brand-text)" }}>{SAMPLE.name}</p>
            <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.nameEn}</p>
            <p className="mt-0.5 text-[11px] font-medium" style={{ color: "var(--color-brand-text-body)" }}>{SAMPLE.title}</p>
            <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.company}</p>
            <div className="mt-2 border-t pt-2" style={{ borderColor: "var(--color-brand-border)" }}>
              <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.email}</p>
              <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.phone}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modern",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
        <div className="mb-2.5 h-1 w-10 rounded-full" style={{ backgroundColor: "var(--color-brand-cta)" }} />
        <p className="text-sm font-bold" style={{ color: "var(--color-brand-text)" }}>{SAMPLE.name}</p>
        <p className="text-[11px] font-medium" style={{ color: "var(--color-brand-cta)" }}>{SAMPLE.title}</p>
        <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.company}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.email}</span>
          <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left shadow-sm">
        <p className="text-sm font-bold" style={{ color: "var(--color-brand-text)" }}>{SAMPLE.name}</p>
        <p className="text-[11px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.title} | {SAMPLE.company}</p>
        <div className="mt-2 h-px w-8" style={{ backgroundColor: "var(--color-brand-border)" }} />
        <p className="mt-2 text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>
          {SAMPLE.email} · {SAMPLE.phone}
        </p>
      </div>
    ),
  },
  {
    id: "corporate",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left shadow-sm">
        <div className="px-4 py-2" style={{ backgroundColor: "var(--color-brand-dark)" }}>
          <p className="text-xs font-bold text-white">{SAMPLE.company}</p>
        </div>
        <div className="p-4">
          <p className="text-sm font-bold" style={{ color: "var(--color-brand-text)" }}>{SAMPLE.name}</p>
          <p className="text-[11px]" style={{ color: "var(--color-brand-primary)" }}>{SAMPLE.title}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.email}</span>
            <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.phone}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "elegant",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-center shadow-sm">
        <p className="text-sm font-bold tracking-wider" style={{ color: "var(--color-brand-text)" }}>{SAMPLE.name}</p>
        <p className="text-[10px] tracking-widest uppercase" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.nameEn}</p>
        <div className="mx-auto my-2.5 h-px w-12" style={{ backgroundColor: "var(--color-brand-cta)" }} />
        <p className="text-[11px] font-medium" style={{ color: "var(--color-brand-text-body)" }}>{SAMPLE.title}</p>
        <p className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.company}</p>
        <div className="mt-2 flex justify-center gap-3">
          <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.email}</span>
          <span className="text-[10px]" style={{ color: "var(--color-brand-text-muted)" }}>{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
];

/* ------------------------------------------------------------------ */
/*  Template card component                                            */
/* ------------------------------------------------------------------ */

function TemplateCard({ template }: { template: TemplateDef }) {
  const t = useTranslations();
  return (
    <StaggerItem>
      <div
        className="group cursor-pointer overflow-hidden rounded-2xl border transition-all duration-300 hover:shadow-lg"
        style={{ borderColor: "var(--color-brand-border)" }}
      >
        {/* Preview area */}
        <div
          className="relative overflow-hidden p-5 transition-all duration-300"
          style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
        >
          {/* Decorative dot */}
          <div
            className="pointer-events-none absolute top-3 right-3 h-2 w-2 rounded-full opacity-40"
            style={{ backgroundColor: "var(--color-brand-primary)" }}
          />
          <div className="transition-transform duration-300 group-hover:scale-[1.02]">
            {template.render()}
          </div>
        </div>

        {/* Label area */}
        <div
          className="border-t bg-white px-5 py-4"
          style={{ borderColor: "var(--color-brand-border)" }}
        >
          <h3
            className="text-sm font-bold"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--color-brand-text)",
            }}
          >
            {t(`templates.${template.id}.name`)}
          </h3>
          <p
            className="mt-1 text-xs leading-[1.7]"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-brand-text-muted)",
            }}
          >
            {t(`templates.${template.id}.description`)}
          </p>
        </div>
      </div>
    </StaggerItem>
  );
}

/* ------------------------------------------------------------------ */
/*  Templates Showcase section                                         */
/* ------------------------------------------------------------------ */

export function TemplatesShowcase() {
  const t = useTranslations();
  return (
    <section
      id="templates"
      className="relative py-24 md:py-32"
      style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
    >
      {/* Subtle radial gradient texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          background: "radial-gradient(ellipse at 30% 20%, var(--color-brand-primary) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--color-brand-dark) 0%, transparent 50%)",
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

        <StaggerContainer
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
        >
          {TEMPLATE_DEFS.map((template) => (
            <TemplateCard key={template.id} template={template} />
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
