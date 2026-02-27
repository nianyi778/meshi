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
    <div className="flex min-h-screen flex-col bg-[var(--color-brand-bg)]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-lg">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              className="group flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-sm font-medium text-[var(--color-brand-text-muted)] transition-all duration-150 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
            >
              <ArrowLeft className="h-3.5 w-3.5 transition-transform duration-150 group-hover:-translate-x-0.5" />
              {t("common.back")}
            </Link>
            <div className="h-5 w-px bg-[var(--color-brand-border)]" />
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-[var(--color-brand-primary)] text-[10px] font-bold text-white leading-none">
                M
              </span>
              <h1 className="font-[var(--font-heading)] text-lg font-bold tracking-tight text-[var(--color-brand-text)]">
                Meishi
              </h1>
              <span className="text-xs font-medium text-[var(--color-brand-text-muted)]">
                {t("generator.title")}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <AuthButton />
            <LanguageSwitcher />
          </div>
        </div>
        {/* Subtle gradient border bottom */}
        <div className="h-px bg-gradient-to-r from-[var(--color-brand-border)]/60 via-[var(--color-brand-primary)]/20 to-[var(--color-brand-border)]/60" />
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
        {/* Left Panel — Editor */}
        <aside className="flex w-full flex-col lg:w-[400px] lg:min-w-[400px]">
          {/* Tab Switcher — Pill style */}
          <div className="mb-5 flex rounded-xl bg-[var(--color-brand-surface-alt)] p-1">
            <button
              onClick={() => setActiveTab("data")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "data"
                  ? "bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]"
              }`}
            >
              <PenLine className="h-4 w-4" />
              {t("generator.tabs.info")}
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold transition-all duration-150 cursor-pointer ${
                activeTab === "style"
                  ? "bg-[var(--color-brand-primary)] text-white shadow-md shadow-[var(--color-brand-primary)]/20"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)]"
              }`}
            >
              <Palette className="h-4 w-4" />
              {t("generator.tabs.style")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto rounded-2xl border border-[var(--color-brand-border)] ring-1 ring-[var(--color-brand-border)]/50 bg-white p-5 shadow-sm lg:max-h-[calc(100vh-160px)] lg:p-6">
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
          <div className="flex flex-1 flex-col rounded-2xl border border-[var(--color-brand-border)] bg-white shadow-lg shadow-slate-200/80">
            {/* Preview Toolbar */}
            <div className="flex items-center justify-between border-b border-[var(--color-brand-border)] px-6 py-2.5">
              <span className="text-xs font-semibold tracking-wide text-[var(--color-brand-text-muted)]">
                プレビュー / Preview
              </span>
              <span className="rounded bg-[var(--color-brand-surface-alt)] px-2 py-0.5 font-mono text-[10px] text-[var(--color-brand-text-muted)]">
                100%
              </span>
            </div>

            {/* Preview Area — clean gradient surface */}
            <div className="relative flex min-h-[240px] flex-1 items-start justify-center overflow-auto bg-gradient-to-b from-slate-50 to-white p-8">
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
      <button className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-cta)] px-8 py-3 text-sm font-semibold text-white shadow-sm cursor-pointer">
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
