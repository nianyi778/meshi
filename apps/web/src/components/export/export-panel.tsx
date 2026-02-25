"use client";

import { useState, useCallback } from "react";
import { Download, ClipboardCopy, Mail, Check, Loader2 } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { exportAsPng, generateGmailHtml, copyHtmlToClipboard } from "@/lib/export-utils";
import { GmailIntegration } from "./gmail-integration";

export function ExportPanel() {
  const { data, style } = useSignatureStore();
  const [pngLoading, setPngLoading] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [showGmail, setShowGmail] = useState(false);

  const handlePngExport = useCallback(async () => {
    setPngLoading(true);
    try {
      await exportAsPng("signature-preview");
    } catch (err) {
      console.error("PNG export failed:", err);
      alert("PNG出力に失敗しました。もう一度お試しください。");
    } finally {
      setPngLoading(false);
    }
  }, []);

  const handleCopyHtml = useCallback(async () => {
    const html = generateGmailHtml(data, style);
    const success = await copyHtmlToClipboard(html);
    if (success) {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } else {
      alert("コピーに失敗しました。ブラウザの設定を確認してください。");
    }
  }, [data, style]);

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
          PNGでダウンロード
        </button>

        {/* Copy HTML */}
        <button
          onClick={handleCopyHtml}
          className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-gray-50"
        >
          {copySuccess ? (
            <>
              <Check className="h-4 w-4 text-green-500" />
              <span className="text-green-600">コピーしました！</span>
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              HTMLをコピー
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
          Gmailに設定
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
