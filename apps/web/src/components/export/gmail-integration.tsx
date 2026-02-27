"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { Check, ClipboardCopy, ExternalLink, ChevronRight } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { generateGmailHtml, copyHtmlToClipboard } from "@/lib/export-utils";

const GMAIL_SETTINGS_URL =
  "https://mail.google.com/mail/u/0/#settings/general";

const STEPS_KEYS = ["step1", "step2", "step3", "step4"] as const;

export function GmailIntegration() {
  const { data, style } = useSignatureStore();
  const [copied, setCopied] = useState(false);
  const t = useTranslations();

  const handleCopy = useCallback(async () => {
    const html = await generateGmailHtml(data, style);
    const success = await copyHtmlToClipboard(html);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [data, style]);

  return (
    <div className="space-y-5">
      {/* Step list */}
      <ol className="space-y-3">
        {STEPS_KEYS.map((key, i) => (
          <li key={key} className="flex items-start gap-3">
            <span
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] font-bold text-white"
              style={{ backgroundColor: "var(--color-brand-primary)" }}
            >
              {i + 1}
            </span>
            <span
              className="text-sm leading-relaxed"
              style={{
                color: "var(--color-brand-text-muted)",
                fontFamily: "var(--font-sans)",
              }}
            >
              {t(`gmail.guide.${key}`)}
            </span>
          </li>
        ))}
      </ol>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 pt-1">
        <button
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:shadow-md cursor-pointer"
          style={{ backgroundColor: copied ? "#059669" : "var(--color-brand-primary)" }}
        >
          {copied ? (
            <>
              <Check className="h-4 w-4" />
              {t("export.copied")}
            </>
          ) : (
            <>
              <ClipboardCopy className="h-4 w-4" />
              {t("gmail.guide.copyButton")}
            </>
          )}
        </button>

        <a
          href={GMAIL_SETTINGS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 rounded-xl border px-4 py-2.5 text-sm font-semibold transition-all duration-200 hover:shadow-md cursor-pointer"
          style={{
            borderColor: "var(--color-brand-border)",
            color: "var(--color-brand-text-body)",
            backgroundColor: "var(--color-brand-surface)",
          }}
        >
          <ExternalLink className="h-4 w-4" />
          {t("gmail.guide.openGmail")}
          <ChevronRight className="h-3.5 w-3.5 opacity-50" />
        </a>
      </div>
    </div>
  );
}
