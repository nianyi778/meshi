"use client";

import React, { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import type { SignatureData, FieldVisibility } from "@meishi/core/types";
import { Button } from "@meishi/ui/components/button";
import { Input } from "@meishi/ui/components/input";
import { Label } from "@meishi/ui/components/label";
import { RotateCcw, Eye, EyeOff, Upload, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Field keys grouped by section
// ---------------------------------------------------------------------------
const SECTIONS: {
  titleKey: string;
  fields: (keyof SignatureData)[];
}[] = [
  {
    titleKey: "form.sections.basic",
    fields: ["companyName", "personName", "nameReading"],
  },
  {
    titleKey: "form.sections.contact",
    fields: ["webUrl", "email", "phone"],
  },
  {
    titleKey: "form.sections.address",
    fields: ["postalCode", "address1", "address2"],
  },
];

// Map SignatureData keys → FieldVisibility keys (logoUrl → logo)
function toVisibilityKey(
  field: keyof SignatureData
): keyof FieldVisibility | null {
  if (field === "logoUrl") return "logo";
  if (field in ({} as FieldVisibility)) return null; // guard
  return field as keyof FieldVisibility;
}

// ---------------------------------------------------------------------------
// Individual field row
// ---------------------------------------------------------------------------
interface FieldRowProps {
  field: keyof SignatureData;
  value: string;
  visible: boolean;
  onValueChange: (value: string) => void;
  onToggleVisibility: () => void;
}

function FieldRow({
  field,
  value,
  visible,
  onValueChange,
  onToggleVisibility,
}: FieldRowProps) {
  const t = useTranslations();
  return (
    <div className="group grid grid-cols-[1fr_auto] items-start gap-3">
      <div className="space-y-1.5">
        <Label
          htmlFor={`field-${field}`}
          className="text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase"
        >
          {t(`form.fields.${field}`)}
        </Label>
        <Input
          id={`field-${field}`}
          value={value}
          placeholder={t(`form.placeholders.${field}`)}
          onChange={(e) => onValueChange(e.target.value)}
          className="border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] transition-all duration-200 placeholder:text-[var(--color-brand-text-muted)]/50 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/10"
        />
      </div>
      <button
        type="button"
        onClick={onToggleVisibility}
        title={visible ? t("common.hide") : t("common.show")}
        className="mt-6 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
      >
        {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 opacity-50" />}
      </button>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Logo upload section
// ---------------------------------------------------------------------------
interface LogoUploadProps {
  logoUrl: string;
  visible: boolean;
  onLogoChange: (dataUrl: string) => void;
  onToggleVisibility: () => void;
}

function LogoUpload({
  logoUrl,
  visible,
  onLogoChange,
  onToggleVisibility,
}: LogoUploadProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const t = useTranslations();

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          onLogoChange(reader.result);
        }
      };
      reader.readAsDataURL(file);

      // Reset so the same file can be re-selected
      e.target.value = "";
    },
    [onLogoChange]
  );

  const handleClear = useCallback(() => {
    onLogoChange("");
  }, [onLogoChange]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">
          {t("form.fields.logoUrl")}
        </Label>
        <button
          type="button"
          onClick={onToggleVisibility}
          title={visible ? t("common.hide") : t("common.show")}
          className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
        >
          {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 opacity-50" />}
        </button>
      </div>

      {logoUrl ? (
        <div className="relative inline-block">
          <img
            src={logoUrl}
            alt={t("form.logoPreview")}
            className="h-16 w-auto max-w-full rounded-xl border border-[var(--color-brand-border)] object-contain p-1"
          />
          <button
            type="button"
            onClick={handleClear}
            className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground shadow-sm transition-colors duration-200 hover:bg-destructive/90 cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="flex w-full items-center justify-center gap-2.5 rounded-xl border-2 border-dashed border-[var(--color-brand-border)] px-4 py-7 text-sm text-[var(--color-brand-text-muted)] transition-all duration-200 hover:border-[var(--color-brand-primary)]/40 hover:bg-[var(--color-brand-primary)]/5 hover:text-[var(--color-brand-text)] cursor-pointer"
        >
          <Upload className="h-4 w-4" />
          {t("form.logoSelect")}
        </button>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        aria-label={t("form.logoSelectAria")}
      />
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main form component
// ---------------------------------------------------------------------------
export function SignatureForm() {
  const data = useSignatureStore((s) => s.data);
  const style = useSignatureStore((s) => s.style);
  const updateField = useSignatureStore((s) => s.updateField);
  const toggleFieldVisibility = useSignatureStore(
    (s) => s.toggleFieldVisibility
  );
  const resetData = useSignatureStore((s) => s.resetData);
  const t = useTranslations();

  const getVisibility = useCallback(
    (field: keyof SignatureData): boolean => {
      const vKey = toVisibilityKey(field);
      if (!vKey) return true;
      return style.fieldVisibility[vKey] ?? true;
    },
    [style.fieldVisibility]
  );

  const handleToggle = useCallback(
    (field: keyof SignatureData) => {
      const vKey = toVisibilityKey(field);
      if (vKey) toggleFieldVisibility(vKey);
    },
    [toggleFieldVisibility]
  );

  return (
    <div className="flex flex-col gap-10">
      {/* ---------- Text field sections ---------- */}
      {SECTIONS.map((section, idx) => (
        <fieldset key={section.titleKey} className="space-y-4">
          <div className="flex items-center gap-3">
            <legend className="text-sm font-bold text-[var(--color-brand-text)]">
              {t(section.titleKey)}
            </legend>
            {idx === 0 && (
              <div className="h-px flex-1 bg-[var(--color-brand-border)]" />
            )}
          </div>
          <div className="space-y-4">
            {section.fields.map((field) => (
              <FieldRow
                key={field}
                field={field}
                value={data[field]}
                visible={getVisibility(field)}
                onValueChange={(v) => updateField(field, v)}
                onToggleVisibility={() => handleToggle(field)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {/* ---------- Logo ---------- */}
      <fieldset className="space-y-4">
        <legend className="text-sm font-bold text-[var(--color-brand-text)]">
          {t("form.sections.logo")}
        </legend>
        <LogoUpload
          logoUrl={data.logoUrl}
          visible={style.fieldVisibility.logo}
          onLogoChange={(url) => updateField("logoUrl", url)}
          onToggleVisibility={() => toggleFieldVisibility("logo")}
        />
      </fieldset>

      {/* ---------- Reset ---------- */}
      <div className="border-t border-[var(--color-brand-border)] pt-5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetData}
          className="gap-1.5 rounded-lg border-[var(--color-brand-border)] text-[var(--color-brand-text-muted)] transition-all duration-200 hover:border-destructive/30 hover:text-destructive cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t("common.reset")}
        </Button>
      </div>
    </div>
  );
}
