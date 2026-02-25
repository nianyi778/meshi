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
    <div className="flex flex-col gap-4">
      {/* Header: template name + zoom controls */}
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-muted-foreground">
          {t("generator.preview")} —{" "}
          <span className="text-foreground font-semibold">{templateName}</span>
        </h3>

        <div className="flex items-center gap-1">
          {ZOOM_LEVELS.map((level) => (
            <button
              key={level}
              type="button"
              onClick={() => setZoom(level)}
              className={`px-2 py-1 text-xs rounded-md transition-colors cursor-pointer ${
                zoom === level
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {level}%
            </button>
          ))}
        </div>
      </div>

      {/* Preview container */}
      <div className="overflow-auto rounded-lg border border-border bg-muted/30 p-6">
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
