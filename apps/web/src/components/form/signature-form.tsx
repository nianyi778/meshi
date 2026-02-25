"use client";

import React, { useState, useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import type { SignatureData, FieldVisibility, SocialLink } from "@meishi/core/types";
import { formatPhoneJP, formatPostalCodeJP } from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";
import { Button } from "@meishi/ui/components/button";
import { Input } from "@meishi/ui/components/input";
import { Label } from "@meishi/ui/components/label";
import { RotateCcw, Eye, EyeOff, Upload, X, Plus } from "lucide-react";

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
  const [showUtm, setShowUtm] = useState(false);
  const [utmSource, setUtmSource] = useState("email");
  const [utmMedium, setUtmMedium] = useState("signature");
  const [utmCampaign, setUtmCampaign] = useState("");

  const handleUtmApply = useCallback(() => {
    let base = value;
    // Strip existing UTM params
    try {
      const url = new URL(base.startsWith("http") ? base : `https://${base}`);
      url.searchParams.delete("utm_source");
      url.searchParams.delete("utm_medium");
      url.searchParams.delete("utm_campaign");
      base = url.toString();
    } catch {
      // not a valid URL yet, just append
    }
    const sep = base.includes("?") ? "&" : "?";
    const params = [`utm_source=${encodeURIComponent(utmSource)}`, `utm_medium=${encodeURIComponent(utmMedium)}`];
    if (utmCampaign) params.push(`utm_campaign=${encodeURIComponent(utmCampaign)}`);
    onValueChange(`${base}${sep}${params.join("&")}`);
    setShowUtm(false);
  }, [value, utmSource, utmMedium, utmCampaign, onValueChange]);

  return (
    <div className="space-y-2">
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
        <div className="mt-6 flex items-center gap-1">
          {field === "webUrl" && (
            <button
              type="button"
              onClick={() => setShowUtm(!showUtm)}
              className={`shrink-0 rounded-md px-2 py-1 text-[10px] font-bold tracking-wide border transition-colors cursor-pointer ${
                showUtm
                  ? "border-[var(--color-brand-primary)] text-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5"
                  : "border-[var(--color-brand-border)] text-[var(--color-brand-text-muted)] hover:border-[var(--color-brand-primary)] hover:text-[var(--color-brand-primary)]"
              }`}
            >
              UTM
            </button>
          )}
          <button
            type="button"
            onClick={onToggleVisibility}
            title={visible ? t("common.hide") : t("common.show")}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
          >
            {visible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 opacity-50" />}
          </button>
        </div>
      </div>

      {/* UTM Builder */}
      {field === "webUrl" && showUtm && (
        <div className="rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface-alt)] p-4 space-y-3">
          <p className="text-xs font-semibold text-[var(--color-brand-text)]">{t("form.utm.title")}</p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label className="text-[10px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">utm_source</Label>
              <Input value={utmSource} onChange={(e) => setUtmSource(e.target.value)} className="h-8 text-xs border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]" />
            </div>
            <div className="space-y-1">
              <Label className="text-[10px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">utm_medium</Label>
              <Input value={utmMedium} onChange={(e) => setUtmMedium(e.target.value)} className="h-8 text-xs border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]" />
            </div>
          </div>
          <div className="space-y-1">
            <Label className="text-[10px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">{t("form.utm.campaign")}</Label>
            <Input value={utmCampaign} onChange={(e) => setUtmCampaign(e.target.value)} placeholder="spring_2025" className="h-8 text-xs border-[var(--color-brand-border)] bg-[var(--color-brand-surface)]" />
          </div>
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={handleUtmApply}
              className="rounded-lg bg-[var(--color-brand-cta)] px-4 py-1.5 text-xs font-semibold text-white transition-colors hover:bg-[var(--color-brand-cta-hover)] cursor-pointer"
            >
              {t("form.utm.apply")}
            </button>
            <button
              type="button"
              onClick={() => setShowUtm(false)}
              className="rounded-lg border border-[var(--color-brand-border)] px-4 py-1.5 text-xs font-semibold text-[var(--color-brand-text-muted)] transition-colors hover:text-[var(--color-brand-text)] cursor-pointer"
            >
              {t("form.utm.cancel")}
            </button>
          </div>
        </div>
      )}
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
                value={data[field] as string}
                visible={getVisibility(field)}
                onValueChange={(v) => {
                  if (field === "phone") updateField(field, formatPhoneJP(v));
                  else if (field === "postalCode") updateField(field, formatPostalCodeJP(v));
                  else updateField(field, v);
                }}
                onToggleVisibility={() => handleToggle(field)}
              />
            ))}
          </div>
        </fieldset>
      ))}

      {/* ---------- Social Links ---------- */}
      <fieldset className="space-y-4">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-bold text-[var(--color-brand-text)]">
            {t("form.sections.social")}
          </legend>
          <button
            type="button"
            onClick={() => toggleFieldVisibility("socialLinks")}
            title={style.fieldVisibility.socialLinks ? t("common.hide") : t("common.show")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
          >
            {style.fieldVisibility.socialLinks ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4 opacity-50" />
            )}
          </button>
        </div>

        <div className="space-y-3">
          {data.socialLinks.map((link, idx) => {
            const platform = SOCIAL_PLATFORMS.find((p) => p.id === link.platform);
            const platformColor = platform?.color ?? "#6366F1";
            return (
              <div
                key={idx}
                className="grid grid-cols-[auto_120px_1fr_auto] items-center gap-2 rounded-lg border-l-2 pl-2 transition-colors"
                style={{ borderLeftColor: platformColor }}
              >
                {/* Platform color dot */}
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{ backgroundColor: platformColor }}
                />
                <select
                  value={link.platform}
                  onChange={(e) => {
                    const next: SocialLink[] = data.socialLinks.map((item, i) =>
                      i === idx ? { platform: e.target.value as SocialLink["platform"], url: item.url } : item
                    );
                    updateField("socialLinks", next);
                  }}
                  className="h-9 rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-2 text-xs text-[var(--color-brand-text)] transition-all duration-200 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/10"
                >
                  {SOCIAL_PLATFORMS.map((p) => (
                    <option key={p.id} value={p.id}>{p.label}</option>
                  ))}
                </select>
                <Input
                  value={link.url}
                  placeholder={platform?.urlPrefix ?? "https://"}
                  onChange={(e) => {
                    const next: SocialLink[] = data.socialLinks.map((item, i) =>
                      i === idx ? { platform: item.platform, url: e.target.value } : item
                    );
                    updateField("socialLinks", next);
                  }}
                  className="border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] transition-all duration-200 placeholder:text-[var(--color-brand-text-muted)]/50 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/10"
                />
                <button
                  type="button"
                  onClick={() => {
                    const next: SocialLink[] = data.socialLinks.filter((_: SocialLink, i: number) => i !== idx);
                    updateField("socialLinks", next);
                  }}
                  title={t("form.removeSocial")}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-destructive/10 hover:text-destructive cursor-pointer"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            );
          })}

          {data.socialLinks.length < 6 && (
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                const next: SocialLink[] = [...data.socialLinks, { platform: "linkedin" as const, url: "" }];
                updateField("socialLinks", next);
              }}
              className="gap-1.5 rounded-lg border-[var(--color-brand-border)] text-[var(--color-brand-text-muted)] transition-all duration-200 hover:border-[var(--color-brand-primary)]/30 hover:text-[var(--color-brand-primary)] cursor-pointer"
            >
              <Plus className="h-3.5 w-3.5" />
              {t("form.addSocial")}
            </Button>
          )}
        </div>
      </fieldset>

      {/* ---------- Disclaimer ---------- */}
      <fieldset className="space-y-4">
        <div className="flex items-center justify-between">
          <legend className="text-sm font-bold text-[var(--color-brand-text)]">
            {t("form.sections.disclaimer")}
          </legend>
          <button
            type="button"
            onClick={() => toggleFieldVisibility("disclaimer")}
            title={style.fieldVisibility.disclaimer ? t("common.hide") : t("common.show")}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--color-brand-text-muted)] transition-all duration-200 hover:bg-[var(--color-brand-bg)] hover:text-[var(--color-brand-text)] cursor-pointer"
          >
            {style.fieldVisibility.disclaimer ? (
              <Eye className="h-4 w-4" />
            ) : (
              <EyeOff className="h-4 w-4 opacity-50" />
            )}
          </button>
        </div>
        <textarea
          value={data.disclaimer}
          onChange={(e) => updateField("disclaimer", e.target.value)}
          placeholder={t("form.placeholders.disclaimer")}
          rows={3}
          className="w-full rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-3.5 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 transition-all duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none"
        />
      </fieldset>

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
