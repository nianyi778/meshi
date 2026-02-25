"use client";

import { useState, lazy, Suspense } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";
import { SignatureForm } from "@/components/form/signature-form";
import { StylePanel } from "@/components/form/style-panel";
import SignaturePreview from "@/components/signature/signature-preview";
import { LanguageSwitcher } from "@/components/language-switcher";
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
    <div className="flex min-h-screen flex-col bg-sky-50">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-sky-100 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <div className="flex items-center gap-3">
            <Link
              href={`/${locale}`}
              className="flex items-center gap-2 text-sm text-slate-500 transition hover:text-slate-800"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("common.back")}
            </Link>
            <div className="h-5 w-px bg-slate-200" />
            <h1 className="text-lg font-bold text-slate-800">
              Meishi
              <span className="ml-1.5 text-xs font-normal text-slate-400">
                {t("generator.title")}
              </span>
            </h1>
          </div>
          <LanguageSwitcher />
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 p-4 lg:flex-row lg:p-6">
        {/* Left Panel — Editor */}
        <aside className="flex w-full flex-col lg:w-[380px] lg:min-w-[380px]">
          {/* Tab Switcher */}
          <div className="mb-4 flex rounded-lg bg-white p-1 shadow-sm">
            <button
              onClick={() => setActiveTab("data")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === "data"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <PenLine className="h-4 w-4" />
              {t("generator.tabs.info")}
            </button>
            <button
              onClick={() => setActiveTab("style")}
              className={`flex flex-1 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition ${
                activeTab === "style"
                  ? "bg-sky-500 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Palette className="h-4 w-4" />
              {t("generator.tabs.style")}
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 overflow-y-auto rounded-xl bg-white p-4 shadow-sm lg:max-h-[calc(100vh-140px)]">
            {activeTab === "data" ? <SignatureForm /> : <StylePanel />}
          </div>
        </aside>

        {/* Center — Preview + Export */}
        <section className="flex flex-1 flex-col">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-slate-700">
              {t("generator.preview")}
            </h2>
          </div>

          <div className="flex flex-1 flex-col rounded-xl bg-white p-6 shadow-sm">
            {/* Preview Area */}
            <div className="flex flex-1 items-start justify-center overflow-auto">
              <SignaturePreview />
            </div>

            {/* Export Actions */}
            <div className="mt-6 border-t border-slate-200 pt-4">
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
      <button className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white">
        <Download className="h-4 w-4" />
        {t("export.downloadPng")}
      </button>
      <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">
        <ClipboardCopy className="h-4 w-4" />
        {t("export.copyHtml")}
      </button>
      <button className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700">
        <Mail className="h-4 w-4" />
        {t("export.setGmail")}
      </button>
    </div>
  );
}
