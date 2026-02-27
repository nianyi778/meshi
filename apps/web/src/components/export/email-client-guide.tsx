"use client";

import { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import { generateGmailHtml, copyHtmlToClipboard } from "@/lib/export-utils";
import { Check, Copy, ExternalLink } from "lucide-react";

type EmailClient = "gmail" | "outlook" | "apple";

const CLIENTS: { id: EmailClient; label: string }[] = [
  { id: "gmail", label: "Gmail" },
  { id: "outlook", label: "Outlook" },
  { id: "apple", label: "Apple Mail" },
];

export function EmailClientGuide() {
  const [activeClient, setActiveClient] = useState<EmailClient>("gmail");
  const [copied, setCopied] = useState(false);
  const { data, style } = useSignatureStore();
  const t = useTranslations();

  const handleCopy = useCallback(async () => {
    const html = await generateGmailHtml(data, style);
    const ok = await copyHtmlToClipboard(html);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  }, [data, style]);

  return (
    <div className="space-y-4">
      {/* Client tabs */}
      <div className="flex rounded-lg border border-[var(--color-brand-border)] overflow-hidden">
        {CLIENTS.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActiveClient(c.id)}
            className={`flex-1 py-2 text-xs font-semibold transition-colors duration-150 cursor-pointer ${
              activeClient === c.id
                ? "bg-[var(--color-brand-primary)] text-white"
                : "bg-white text-[var(--color-brand-text-muted)] hover:bg-[var(--color-brand-bg)]"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Steps */}
      <ol className="space-y-2.5 text-sm text-[var(--color-brand-text-body)]">
        {[1, 2, 3, 4].map((n) => (
          <li key={n} className="flex gap-3">
            <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[var(--color-brand-primary)]/10 text-[10px] font-bold text-[var(--color-brand-primary)]">
              {n}
            </span>
            <span>
              {t(
                `export.guide.${activeClient}.step${n}` as Parameters<
                  typeof t
                >[0],
              )}
            </span>
          </li>
        ))}
      </ol>

      {/* Action buttons */}
      <div className="flex gap-2 pt-1">
        <button
          type="button"
          onClick={handleCopy}
          className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-brand-text-body)] transition-all duration-200 hover:border-[var(--color-brand-primary)]/40 cursor-pointer"
        >
          {copied ? (
            <Check className="h-3.5 w-3.5 text-emerald-500" />
          ) : (
            <Copy className="h-3.5 w-3.5" />
          )}
          {copied ? t("export.copied") : t("export.copyHtml")}
        </button>

        {activeClient === "gmail" && (
          <a
            href="https://mail.google.com/mail/u/0/#settings/general"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-brand-text-body)] transition-all duration-200 hover:border-[var(--color-brand-primary)]/40 cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("gmail.guide.openGmail")}
          </a>
        )}

        {activeClient === "outlook" && (
          <a
            href="https://outlook.live.com/mail/options/mail/messageContent/emailSignature"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-white px-4 py-2 text-xs font-semibold text-[var(--color-brand-text-body)] transition-all duration-200 hover:border-[var(--color-brand-primary)]/40 cursor-pointer"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            {t("export.guide.openOutlook")}
          </a>
        )}
      </div>
    </div>
  );
}
