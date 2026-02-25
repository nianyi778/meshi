"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Download, ClipboardCopy, Mail, Check, Loader2 } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { exportAsPng, generateGmailHtml, copyHtmlToClipboard } from "@/lib/export-utils";
import { GmailIntegration } from "./gmail-integration";

export function ExportPanel() {
  const { data, style } = useSignatureStore();
  const [pngLoading, setPngLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGmail, setShowGmail] = useState(false);
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
    <div className="space-y-4">
      <div className="flex flex-wrap gap-3">
        {/* PNG Download */}
        <button
          onClick={handlePngExport}
          disabled={pngLoading}
          className="flex items-center gap-2 rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-orange-600 disabled:opacity-50"
        >
          {pngLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Download className="h-4 w-4" />
          )}
          {t("export.downloadPng")}
        </button>

        {/* Copy HTML */}
        <button
          onClick={handleCopyHtml}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
        >
          {copySuccess ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-600">{t("export.copied")}</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              {t("export.copyHtml")}
            </>
          )}
        </button>

        {/* Gmail Integration Toggle */}
        <button
          onClick={() => setShowGmail(!showGmail)}
          className={`flex items-center gap-2 rounded-lg border px-5 py-2.5 text-sm font-semibold transition ${
            showGmail
              ? "border-sky-500 bg-sky-50 text-sky-600"
              : "border-slate-200 bg-white text-slate-700 hover:bg-gray-50"
          }`}
        >
          <Mail className="h-4 w-4" />
          {t("export.setGmail")}
        </button>
      </div>

      {/* Gmail Integration Panel */}
      {showGmail && (
        <div className="rounded-lg border border-slate-200 bg-gray-50 p-4">
          <GmailIntegration />
        </div>
      )}
    </div>
  );
}
