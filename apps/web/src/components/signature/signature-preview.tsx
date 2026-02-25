"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import TemplateRenderer from "./template-renderer";

const ZOOM_LEVELS = [75, 100, 125] as const;

export default function SignaturePreview() {
  const { data, style } = useSignatureStore();
  const [zoom, setZoom] = useState<(typeof ZOOM_LEVELS)[number]>(100);
  const t = useTranslations();

  const templateName = t(`templates.${style.templateId}.name`);

  return (
    <div className="flex w-full flex-col gap-5">
      {/* Header: template name + zoom controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm text-[var(--color-brand-text-muted)]">
          {t("generator.preview")} —{" "}
          <span className="font-semibold text-[var(--color-brand-text)]">{templateName}</span>
        </h3>

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

      {/* Preview container */}
      <div className="overflow-auto rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface-alt)] p-8">
        <div
          style={{
            transform: `scale(${zoom / 100})`,
            transformOrigin: "top left",
          }}
        >
          <div
            id="signature-preview"
            style={{
              backgroundColor: "#FFFFFF",
              padding: "16px",
              display: "inline-block",
              minWidth: "400px",
            }}
          >
            <TemplateRenderer data={data} style={style} />
          </div>
        </div>
      </div>
    </div>
  );
}
