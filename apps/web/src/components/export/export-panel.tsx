"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Download, ClipboardCopy, Mail, Check, Loader2, FileDown, ArrowRight } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { exportAsPng, generateGmailHtml, copyHtmlToClipboard, downloadOutlookHtm } from "@/lib/export-utils";
import { EmailClientGuide } from "./email-client-guide";
import { usePostHog } from "posthog-js/react";

export function ExportPanel() {
  const { data, style } = useSignatureStore();
  const [pngLoading, setPngLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [htmLoading, setHtmLoading] = useState(false);
  const t = useTranslations();
  const posthog = usePostHog();
  const handlePngExport = useCallback(async () => {
    setPngLoading(true);
    posthog?.capture("export_clicked", {
      format: "png",
      template: style.templateId,
      fields_filled: Object.values(data).filter((v) => typeof v === "string" && v.trim() !== "").length,
      has_logo: !!data.logoUrl,
      has_social: data.socialLinks.length > 0,
    });
    try {
      await exportAsPng("signature-preview");
    } catch (err) {
      console.error("PNG export failed:", err);
      alert(t("export.pngError"));
    } finally {
      setPngLoading(false);
    }
  }, [t, posthog, data, style]);

  const handleCopyHtml = useCallback(async () => {
    const html = await generateGmailHtml(data, style);
    const success = await copyHtmlToClipboard(html);
    if (success) {
      posthog?.capture("export_clicked", {
        format: "html",
        template: style.templateId,
        fields_filled: Object.values(data).filter((v) => typeof v === "string" && v.trim() !== "").length,
        has_logo: !!data.logoUrl,
        has_social: data.socialLinks.length > 0,
      });
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      alert(t("export.copyError"));
    }
  }, [data, style, t, posthog]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        {/* PNG Download — Primary CTA */}
        <button
          onClick={handlePngExport}
          disabled={pngLoading}
          className="col-span-2 flex items-center justify-center gap-2.5 rounded-xl bg-[var(--color-brand-cta)] px-8 py-3 text-sm font-semibold text-white shadow-sm shadow-[var(--color-brand-cta)]/20 transition-all duration-150 hover:bg-[var(--color-brand-cta-hover)] hover:shadow-md hover:shadow-[var(--color-brand-cta)]/25 active:scale-[0.98] disabled:opacity-50 cursor-pointer sm:col-span-1"
        >
          {pngLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {t("export.downloadPng")}
          <ArrowRight className="h-3.5 w-3.5" />
        </button>

        {/* Copy HTML — Secondary */}
        <button
          onClick={handleCopyHtml}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-text-body)] shadow-sm transition-all duration-150 hover:border-[var(--color-brand-primary)]/40 hover:bg-[var(--color-brand-bg)] hover:shadow-md active:scale-[0.98] cursor-pointer"
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
          onClick={() => { const next = !showGuide; setShowGuide(next); if (next) posthog?.capture("email_guide_opened", { template: style.templateId }); }}
          className={`flex items-center justify-center gap-2.5 rounded-xl border px-5 py-2.5 text-sm font-semibold shadow-sm transition-all duration-150 active:scale-[0.98] cursor-pointer ${
            showGuide
              ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5 text-[var(--color-brand-primary)] shadow-[var(--color-brand-primary)]/10"
              : "border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] text-[var(--color-brand-text-body)] hover:border-[var(--color-brand-primary)]/30 hover:bg-[var(--color-brand-bg)] hover:shadow-md"
          }`}
        >
          <Mail className="h-4 w-4" />
          {t("export.setEmail")}
        </button>

        {/* Outlook .htm Download */}
        <button
          onClick={async () => { setHtmLoading(true); try { await downloadOutlookHtm(data, style); posthog?.capture("export_clicked", { format: "htm", template: style.templateId }); } finally { setHtmLoading(false); } }}
          disabled={htmLoading}
          className="flex items-center justify-center gap-2.5 rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-5 py-2.5 text-sm font-semibold text-[var(--color-brand-text-body)] shadow-sm transition-all duration-150 hover:border-[var(--color-brand-primary)]/30 hover:bg-[var(--color-brand-bg)] hover:shadow-md active:scale-[0.98] cursor-pointer"
        >
          {htmLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileDown className="h-4 w-4" />}
          {t("export.downloadHtm")}
        </button>
      </div>
      <p className="text-[11px] text-[var(--color-brand-text-muted)]">PNG は Gmail / Outlook 両対応</p>

      {/* Email Client Guide Panel */}
      {showGuide && (
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface-alt)] p-5">
          <EmailClientGuide />
        </div>
      )}
    </div>
  );
}
