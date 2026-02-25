"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import TemplateRenderer from "./template-renderer";
import { Monitor, Smartphone } from "lucide-react";
const ZOOM_LEVELS = [75, 100, 125] as const;
type PreviewMode = "desktop" | "mobile";

export default function SignaturePreview() {
  const { data, style } = useSignatureStore();
  const [zoom, setZoom] = useState<(typeof ZOOM_LEVELS)[number]>(100);
  const [previewMode, setPreviewMode] = useState<PreviewMode>("desktop");
  const t = useTranslations();

  const templateName = t(`templates.${style.templateId}.name`);
  const isMobile = previewMode === "mobile";

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header: template name + zoom controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-[var(--color-brand-text-muted)]">
          {t("generator.preview")} —{" "}
          <span className="font-semibold text-[var(--color-brand-text)]">
            {templateName}
          </span>
        </h3>

        <div className="flex items-center gap-2">
          {/* Desktop / Mobile toggle */}
          <div className="flex items-center gap-1 rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] p-0.5">
            <button
              type="button"
              onClick={() => setPreviewMode("desktop")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
                !isMobile
                  ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)]"
              }`}
            >
              <Monitor className="h-3.5 w-3.5" />
              {t("generator.previewDesktop")}
            </button>
            <button
              type="button"
              onClick={() => setPreviewMode("mobile")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
                isMobile
                  ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                  : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)]"
              }`}
            >
              <Smartphone className="h-3.5 w-3.5" />
              {t("generator.previewMobile")}
            </button>
          </div>

          {/* Zoom controls */}
          <div className="flex items-center gap-1 rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] p-0.5">
            {ZOOM_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setZoom(level)}
                className={`rounded-md px-2.5 py-1 text-xs font-medium transition-all duration-200 cursor-pointer ${
                  zoom === level
                    ? "bg-[var(--color-brand-primary)] text-white shadow-sm"
                    : "text-[var(--color-brand-text-muted)] hover:text-[var(--color-brand-text)] hover:bg-[var(--color-brand-bg)]"
                }`}
              >
                {level}%
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Email client simulator frame */}
      <div className="overflow-hidden rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface-alt)]">
        {/* macOS-style title bar */}
        <div className="flex items-center gap-2 border-b border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
          <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
          <span className="h-3 w-3 rounded-full bg-[#28C840]" />
          <span className="ml-3 text-[11px] font-medium text-[var(--color-brand-text-muted)]">New Message</span>
        </div>
        {/* Fake email fields */}
        <div className="space-y-0 border-b border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-4 py-2">
          <div className="flex items-center gap-2 py-1">
            <span className="w-14 text-[11px] font-medium text-[var(--color-brand-text-muted)]">From:</span>
            <div className="h-2.5 w-40 rounded bg-[var(--color-brand-border)] opacity-50" />
          </div>
          <div className="flex items-center gap-2 py-1">
            <span className="w-14 text-[11px] font-medium text-[var(--color-brand-text-muted)]">To:</span>
            <div className="h-2.5 w-48 rounded bg-[var(--color-brand-border)] opacity-50" />
          </div>
          <div className="flex items-center gap-2 py-1">
            <span className="w-14 text-[11px] font-medium text-[var(--color-brand-text-muted)]">Subject:</span>
            <div className="h-2.5 w-56 rounded bg-[var(--color-brand-border)] opacity-50" />
          </div>
        </div>
        {/* Email body area with signature */}
        <div className={`overflow-auto ${isMobile ? "p-4" : "p-8"}`}>
          {/* Fake email body lines */}
          <div className="mb-6 space-y-2">
            <div className="h-2.5 w-3/4 rounded bg-[var(--color-brand-border)] opacity-30" />
            <div className="h-2.5 w-full rounded bg-[var(--color-brand-border)] opacity-30" />
            <div className="h-2.5 w-2/3 rounded bg-[var(--color-brand-border)] opacity-30" />
          </div>
          {/* Thin separator */}
          <div className="mb-5 border-t border-dashed border-[var(--color-brand-border)] opacity-50" />
          {/* Signature */}
          <div
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top left",
              ...(isMobile ? { maxWidth: "375px" } : {}),
            }}
          >
            <div
              id="signature-preview"
              style={{
                backgroundColor: "#FFFFFF",
                padding: "16px",
                display: "inline-block",
                minWidth: isMobile ? undefined : "400px",
                maxWidth: isMobile ? "375px" : undefined,
                width: isMobile ? "375px" : undefined,
              }}
            >
              <TemplateRenderer data={data} style={style} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
