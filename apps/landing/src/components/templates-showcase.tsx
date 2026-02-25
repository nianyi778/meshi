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
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sky-500 text-xs font-bold text-white">
            山
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-slate-800">{SAMPLE.name}</p>
            <p className="text-[10px] text-slate-400">{SAMPLE.nameEn}</p>
            <p className="mt-0.5 text-[11px] font-medium text-slate-600">{SAMPLE.title}</p>
            <p className="text-[10px] text-slate-400">{SAMPLE.company}</p>
            <div className="mt-2 border-t border-gray-100 pt-2">
              <p className="text-[10px] text-slate-500">{SAMPLE.email}</p>
              <p className="text-[10px] text-slate-500">{SAMPLE.phone}</p>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "modern",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left">
        <div className="mb-2 h-1 w-10 rounded-full bg-orange-500" />
        <p className="text-sm font-bold text-slate-800">{SAMPLE.name}</p>
        <p className="text-[11px] font-medium text-orange-500">{SAMPLE.title}</p>
        <p className="text-[10px] text-slate-400">{SAMPLE.company}</p>
        <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
          <span className="text-[10px] text-slate-500">{SAMPLE.email}</span>
          <span className="text-[10px] text-slate-500">{SAMPLE.phone}</span>
        </div>
      </div>
    ),
  },
  {
    id: "minimal",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-left">
        <p className="text-sm font-bold text-slate-800">{SAMPLE.name}</p>
        <p className="text-[11px] text-slate-500">{SAMPLE.title} | {SAMPLE.company}</p>
        <div className="mt-2 h-px w-8 bg-slate-200" />
        <p className="mt-2 text-[10px] text-slate-400">
          {SAMPLE.email} · {SAMPLE.phone}
        </p>
      </div>
    ),
  },
  {
    id: "corporate",
    render: () => (
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white text-left">
        <div className="bg-sky-600 px-4 py-2">
          <p className="text-xs font-bold text-white">{SAMPLE.company}</p>
        </div>
        <div className="p-4">
          <p className="text-sm font-bold text-slate-800">{SAMPLE.name}</p>
          <p className="text-[11px] text-sky-600">{SAMPLE.title}</p>
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-0.5">
            <span className="text-[10px] text-slate-500">{SAMPLE.email}</span>
            <span className="text-[10px] text-slate-500">{SAMPLE.phone}</span>
          </div>
        </div>
      </div>
    ),
  },
  {
    id: "elegant",
    render: () => (
      <div className="rounded-lg border border-gray-200 bg-white p-4 text-center">
        <p className="text-sm font-bold tracking-wider text-slate-800">{SAMPLE.name}</p>
        <p className="text-[10px] tracking-widest text-slate-400 uppercase">{SAMPLE.nameEn}</p>
        <div className="mx-auto my-2 h-px w-12 bg-amber-400" />
        <p className="text-[11px] font-medium text-slate-600">{SAMPLE.title}</p>
        <p className="text-[10px] text-slate-400">{SAMPLE.company}</p>
        <div className="mt-2 flex justify-center gap-3">
          <span className="text-[10px] text-slate-500">{SAMPLE.email}</span>
          <span className="text-[10px] text-slate-500">{SAMPLE.phone}</span>
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
        <div
          className="p-4 transition-transform duration-300 group-hover:scale-[1.01]"
          style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
        >
          {template.render()}
        </div>

        <div className="border-t bg-white px-5 py-4" style={{ borderColor: "var(--color-brand-border)" }}>
          <div className="flex items-baseline gap-2">
            <h3
              className="text-sm font-bold"
              style={{
                fontFamily: "var(--font-heading)",
                color: "var(--color-brand-text)",
              }}
            >
              {t(`templates.${template.id}.name`)}
            </h3>
          </div>
          <p
            className="mt-1 text-xs leading-[1.8]"
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
      className="py-20 md:py-28"
      style={{ backgroundColor: "var(--color-brand-surface-alt)" }}
    >
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
