"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SignatureForm } from "@/components/form/signature-form";
import { StylePanel } from "@/components/form/style-panel";
import SignaturePreview from "@/components/signature/signature-preview";
import { LanguageSwitcher } from "@/components/language-switcher";
import { AuthButton } from "@/components/auth/auth-button";
import { SignatureManager } from "@/components/auth/signature-manager";
import { ArrowLeft, PenLine, Palette, Download, ClipboardCopy, Mail } from "lucide-react";

const ExportPanel = lazy(() =>
  import("@/components/export/export-panel").then((m) => ({
    default: m.ExportPanel,
  }))
);

type EditorTab = "data" | "style";

export default function GeneratorPage() {
  const [activeTab, setActiveTab] = useState<EditorTab>("data");
  const t = useTranslations();
  const locale = useLocale();

  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-brand-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--color-brand-border)] bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-2 rounded-lg px-2.5 py-1.5 text-sm text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-border)] hover:text-[var(--color-brand-text)] cursor-pointer"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
              {t("common.back")}
            </Link>
            <div className="h-5 w-px bg-[var(--color-brand-border)]" />
            <div className="flex items-baseline gap-2">
              <h1 className="font-[var(--font-heading)] text-lg font-bold tracking-tight text-[var(--color-brand-text)]">
                Meishi
              </h1>
              <span className="text-xs font-medium text-[var(--color-brand-text-muted)]">
                {t("generator.title")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <AuthButton />
            <LanguageSwitcher />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
        {/* Left Panel — Editor */}
        <aside className="flex w-full flex-col lg:w-[400px] lg:min-w-[400px]">
          {/* Tab Switcher */}
          <div className="mb-5 flex rounded-xl border border-[var(--color-brand-border)] bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("data")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "data"
                  ? "bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)]"
              }`}
            >
              <PenLine className="h-4 w-4" />
              {t("generator.tabs.info")}
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeTab === "style"
                  ? "bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)]"
              }`}
            >
              <Palette className="h-4 w-4" />
              {t("generator.tabs.style")}
            </button>
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
          {/* Preview Label */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-gradient-to-r from-[var(--color-brand-border)] to-transparent" />
            <h2 className="text-xs font-semibold uppercase tracking-widest text-[var(--color-brand-text-muted)]">
              {t("generator.preview")}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-l from-[var(--color-brand-border)] to-transparent" />
          </div>

          {/* Preview Card */}
          <div className="flex flex-1 flex-col rounded-2xl border border-[var(--color-brand-border)] bg-white shadow-sm">
            {/* Preview Area */}
            <div className="relative flex flex-1 items-start justify-center overflow-auto p-8">
              {/* Subtle dot pattern background */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.03]"
                style={{
                  backgroundImage: "radial-gradient(circle, var(--color-brand-text) 0.5px, transparent 0.5px)",
                  backgroundSize: "16px 16px",
                }}
              />
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
      <button className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-cta)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm cursor-pointer">
        <Download className="h-4 w-4" />
        {t("export.downloadPng")}
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-text-body)] cursor-pointer">
        <ClipboardCopy className="h-4 w-4" />
        {t("export.copyHtml")}
      </button>
      <button className="flex items-center gap-2 rounded-xl border border-[var(--color-brand-border)] bg-white px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-text-body)] cursor-pointer">
        <Mail className="h-4 w-4" />
        {t("export.setGmail")}
      </button>
    </div>
  );
}
