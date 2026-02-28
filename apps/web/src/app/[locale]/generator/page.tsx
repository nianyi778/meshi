"use client";

import { useState, lazy, Suspense } from "react";
import { motion } from "framer-motion";
import { useTranslations, useLocale } from "next-intl";
import { SignatureForm } from "@/components/form/signature-form";
import { StylePanel } from "@/components/form/style-panel";
import SignaturePreview from "@/components/signature/signature-preview";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AuthButton } from "@/components/auth/auth-button";
import { SignatureManager } from "@/components/auth/signature-manager";
import {
  ArrowLeft,
  PenLine,
  Palette,
  Download,
  ClipboardCopy,
  Mail,
} from "lucide-react";

const ExportPanel = lazy(() =>
  import("@/components/export/export-panel").then((m) => ({
    default: m.ExportPanel,
  })),
);

type EditorTab = "data" | "style";

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState<EditorTab>("data");
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col" style={{ backgroundColor: "var(--color-brand-bg)" }}>
      {/* Header — dark theme */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: "rgba(15,23,42,0.97)", backdropFilter: "blur(16px)" }}>
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <a
              href={`https://meishi.ekagu.qzz.io/${locale}`}
              className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium transition-all duration-150 cursor-pointer text-white/40 hover:text-[var(--color-brand-accent)]"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
              {t("common.back")}
            </a>
            <div className="h-5 w-px bg-white/10" />
            <div className="flex items-center gap-2.5">
              <span
                className="text-lg font-bold tracking-tight text-white"
                style={{ fontFamily: "var(--font-display, var(--font-heading))" }}
              >
                Meishi
              </span>
              <span className="h-4 w-px" style={{ backgroundColor: "var(--color-brand-accent)" }} />
              <span className="text-xs font-medium text-white/50">
                {t("generator.title")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AuthButton />
            <LanguageSwitcher />
          </div>
        </div>
        {/* Gold accent bottom line */}
        <div className="h-px" style={{ background: "linear-gradient(90deg, transparent, var(--color-brand-accent), transparent)", opacity: 0.3 }} />
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
        {/* Left Panel — Editor */}
        <aside className="flex w-full flex-col lg:w-[420px] lg:min-w-[420px]">
          {/* Tab Switcher — with animated indicator */}
          <div className="relative mb-5 flex rounded-xl p-1" style={{ backgroundColor: "var(--color-brand-surface-alt)" }}>
            {(["data", "style"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-colors duration-150 cursor-pointer ${
                  activeTab === tab
                    ? "text-white"
                    : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-editor-tab"
                    className="absolute inset-0 rounded-lg shadow-sm"
                    style={{ backgroundColor: "var(--color-brand-primary)" }}
                    transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "data" ? <PenLine className="h-4 w-4" /> : <Palette className="h-4 w-4" />}
                  {tab === "data" ? t("generator.tabs.info") : t("generator.tabs.style")}
                </span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-[var(--color-brand-border)] bg-white p-5 shadow-sm lg:max-h-[calc(100vh-160px)] lg:p-6">
            {activeTab === "data" ? <SignatureForm /> : <StylePanel />}
            {/* Cloud Signature Manager */}
            <div className="mt-6 border-t border-[var(--color-brand-border)] pt-5">
              <SignatureManager />
            </div>
          </div>
        </aside>

        {/* Right — Preview + Export */}
        <section className="flex flex-1 flex-col gap-5">
          {/* Preview Card */}
          <div className="flex flex-1 flex-col rounded-2xl border border-[var(--color-brand-border)] bg-white shadow-lg shadow-slate-200/50">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-[var(--color-brand-border)] px-6 py-2.5">
              <span className="text-xs font-semibold tracking-wide" style={{ color: "var(--color-brand-text-muted)" }}>
                {t("generator.preview")}
              </span>
              <span className="rounded px-2 py-0.5 font-mono text-[10px]" style={{ backgroundColor: "var(--color-brand-surface-alt)", color: "var(--color-brand-text-muted)" }}>
                100%
              </span>
            </div>

            {/* Preview Area */}
            <div className="relative flex min-h-[240px] flex-1 items-start justify-center overflow-auto p-8" style={{ background: "linear-gradient(180deg, var(--color-brand-surface-alt), white)" }}>
              <div className="relative">
                <SignaturePreview />
              </div>
            </div>

            {/* Divider */}
            <div className="mx-6 border-t border-[var(--color-brand-border)]" />

            {/* Export Actions */}
            <div className="p-5 sm:p-6">
              <Suspense fallback={<ExportPlaceholder />}>
                <ExportPanel />
              </Suspense>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function ExportPlaceholder() {
  const t = useTranslations();
  return (
    <div className="flex flex-wrap gap-3">
      <button className="flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer" style={{ backgroundColor: "var(--color-brand-cta)", color: "var(--color-brand-dark)" }}>
        <Download className="h-4 w-4" />
        {t("export.downloadPng")}
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border)] bg-white px-5 py-2.5 text-sm font-semibold cursor-pointer" style={{ color: "var(--color-brand-text-body)" }}>
        <ClipboardCopy className="h-4 w-4" />
        {t("export.copyHtml")}
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border)] bg-white px-5 py-2.5 text-sm font-semibold cursor-pointer" style={{ color: "var(--color-brand-text-body)" }}>
        <Mail className="h-4 w-4" />
        {t("export.setGmail")}
      </button>
    </div>
  );
}
