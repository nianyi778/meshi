"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Download, ClipboardCopy, Mail, Check, Loader2 } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { exportAsPng, generateGmailHtml, copyHtmlToClipboard } from "@/lib/export-utils";
import { EmailClientGuide } from "./email-client-guide";

export function ExportPanel() {
  const { data, style } = useSignatureStore();
  const [pngLoading, setPngLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const t = useTranslations();

  const handlePngExport = useCallback(async () => {
    setPngLoading(true);
    try {
      await exportAsPng("signature-preview");
    } catch (err) {
      console.error("PNG export failed:", err);
      alert(t("export.pngError"));
    } finally {
      setPngLoading(false);
    }
  }, [t]);

  const handleCopyHtml = useCallback(async () => {
    const html = generateGmailHtml(data, style);
    const success = await copyHtmlToClipboard(html);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      alert(t("export.copyError"));
    }
  }, [data, style, t]);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-3">
        {/* PNG Download — Primary CTA */}
        <button
          onClick={handlePngExport}
          disabled={pngLoading}
          className="flex items-center gap-2.5 rounded-xl bg-[var(--color-brand-cta)] px-6 py-2.5 text-sm font-semibold text-white shadow-sm shadow-[var(--color-brand-cta)]/20 transition-all duration-200 hover:bg-[var(--color-brand-cta-hover)] hover:shadow-md hover:shadow-[var(--color-brand-cta)]/25 disabled:opacity-50 cursor-pointer"
        >
          {pngLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {t("export.downloadPng")}
        </button>

        {/* Copy HTML — Secondary */}
        <button
          onClick={handleCopyHtml}
          className="flex items-center gap-2.5 rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-text-body)] shadow-sm transition-all duration-200 hover:border-[var(--color-brand-primary)]/30 hover:bg-[var(--color-brand-bg)] hover:shadow-md cursor-pointer"
        >
          {copySuccess ? (
            <>
              <Check className="h-4 w-4 text-emerald-500" />
              <span className="text-emerald-600">{t("export.copied")}</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              {t("export.copyHtml")}
            </>
          )}
        </button>

        {/* Email Client Guide Toggle — Tertiary */}
        <button
          onClick={() => setShowGuide(!showGuide)}
          className={`flex items-center gap-2.5 rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-200 cursor-pointer ${
            showGuide
              ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)] shadow-[var(--color-brand-primary)]/10"
              : "border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] text-[var(--color-brand-text-body)] hover:border-[var(--color-brand-primary)]/30 hover:bg-[var(--color-brand-bg)] hover:shadow-md"
          }`}
        >
          <Mail className="h-4 w-4" />
          {t("export.setEmail")}
        </button>
      </div>

      {/* Email Client Guide Panel */}
      {showGuide && (
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface-alt)] p-5">
          <EmailClientGuide />
        </div>
      )}
    </div>
  );
}
