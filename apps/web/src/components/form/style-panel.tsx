"use client";

import React, { useCallback } from "react";
import { useTranslations } from "next-intl";
import { useSignatureStore } from "@/store/signature-store";
import {
  TEMPLATES,
  COLOR_PRESETS,
  FONT_FAMILIES,
  BORDER_STYLES,
} from "@meishi/core/constants";
import type {
  FontFamily,
  BorderStyle,
  TemplateId,
} from "@meishi/core/types";
import { Button } from "@meishi/ui/components/button";
import { Input } from "@meishi/ui/components/input";
import { Label } from "@meishi/ui/components/label";
import { RotateCcw, Check } from "lucide-react";

// ---------------------------------------------------------------------------
// Color picker row: native color input + hex text input
// ---------------------------------------------------------------------------
interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (color: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-3">
      <label className="relative flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-[var(--color-brand-border)] shadow-sm transition-shadow duration-200 hover:shadow-md">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
        <span
          className="h-full w-full rounded-[7px]"
          style={{ backgroundColor: value }}
        />
      </label>
      <div className="flex-1 space-y-1">
        <span className="block text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">
          {label}
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 border-[var(--color-brand-border)] font-mono text-xs uppercase transition-all duration-200 focus:border-[var(--color-brand-primary)] focus:ring-2 focus:ring-[var(--color-brand-primary)]/10"
          maxLength={7}
        />
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SVG thumbnail previews for each template (abstract layout representation)
// ---------------------------------------------------------------------------
const TEMPLATE_THUMBNAILS: Record<TemplateId, React.ReactNode> = {
  classic: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="8" width="4" height="64" rx="2" fill="var(--color-brand-primary)" opacity="0.85" />
      <rect x="20" y="12" width="52" height="8" rx="2" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="20" y="24" width="36" height="5" rx="1.5" fill="#94A3B8" opacity="0.5" />
      <rect x="20" y="36" width="80" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="20" y="43" width="72" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="20" y="50" width="64" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="20" y="57" width="56" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="20" y="66" width="24" height="3" rx="1" fill="var(--color-brand-primary)" opacity="0.3" />
    </svg>
  ),
  modern: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <circle cx="24" cy="24" r="12" fill="var(--color-brand-primary)" opacity="0.2" stroke="var(--color-brand-primary)" strokeWidth="1.5" />
      <rect x="44" y="14" width="56" height="8" rx="2" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="44" y="26" width="36" height="5" rx="1.5" fill="#94A3B8" opacity="0.5" />
      <rect x="8" y="40" width="144" height="2" rx="1" fill="var(--color-brand-primary)" opacity="0.35" />
      <rect x="8" y="50" width="80" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="8" y="57" width="72" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="8" y="64" width="64" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
    </svg>
  ),
  minimal: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="12" y="14" width="60" height="7" rx="2" fill="#475569" opacity="0.6" />
      <rect x="12" y="25" width="40" height="5" rx="1.5" fill="#94A3B8" opacity="0.4" />
      <rect x="12" y="38" width="88" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <rect x="12" y="45" width="76" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <rect x="12" y="52" width="68" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <rect x="12" y="59" width="56" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <rect x="12" y="66" width="44" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
    </svg>
  ),
  corporate: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="8" y="8" width="6" height="64" rx="2" fill="var(--color-brand-primary)" opacity="0.85" />
      <rect x="22" y="12" width="56" height="8" rx="2" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="22" y="24" width="40" height="5" rx="1.5" fill="#94A3B8" opacity="0.5" />
      <rect x="22" y="33" width="32" height="5" rx="1.5" fill="var(--color-brand-primary)" opacity="0.25" />
      <rect x="22" y="46" width="80" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="22" y="53" width="72" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="22" y="60" width="64" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
    </svg>
  ),
  elegant: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="48" y="8" width="64" height="2" rx="1" fill="var(--color-brand-primary)" opacity="0.5" />
      <rect x="36" y="16" width="88" height="8" rx="2" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="52" y="28" width="56" height="5" rx="1.5" fill="#94A3B8" opacity="0.5" />
      <rect x="56" y="38" width="48" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="44" y="48" width="72" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="48" y="55" width="64" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="52" y="62" width="56" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="60" y="70" width="40" height="2" rx="1" fill="var(--color-brand-primary)" opacity="0.3" />
    </svg>
  ),
  creative: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="creative-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-brand-primary)" />
          <stop offset="100%" stopColor="#EC4899" />
        </linearGradient>
      </defs>
      <rect x="8" y="6" width="144" height="6" rx="3" fill="url(#creative-grad)" opacity="0.85" />
      <rect x="8" y="20" width="50" height="7" rx="2" fill="var(--color-brand-primary)" opacity="0.7" />
      <rect x="8" y="30" width="36" height="4" rx="1.5" fill="#94A3B8" opacity="0.4" />
      <rect x="8" y="38" width="44" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <rect x="8" y="45" width="40" height="3" rx="1" fill="#CBD5E1" opacity="0.35" />
      <line x1="80" y1="18" x2="80" y2="68" stroke="var(--color-brand-primary)" strokeWidth="1.5" opacity="0.3" />
      <rect x="88" y="20" width="60" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="88" y="28" width="52" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="88" y="36" width="56" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="88" y="44" width="48" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
    </svg>
  ),
  professional: (
    <svg viewBox="0 0 160 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <rect x="0" y="0" width="60" height="80" fill="var(--color-brand-primary)" opacity="0.9" />
      <rect x="10" y="16" width="40" height="7" rx="2" fill="#FFFFFF" opacity="0.9" />
      <rect x="10" y="27" width="30" height="4" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      <rect x="10" y="36" width="36" height="3" rx="1" fill="#D4AF37" opacity="0.7" />
      <rect x="10" y="44" width="34" height="3" rx="1" fill="#FFFFFF" opacity="0.4" />
      <rect x="64" y="0" width="3" height="80" fill="#D4AF37" opacity="0.6" />
      <rect x="74" y="16" width="72" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="74" y="24" width="64" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="74" y="32" width="68" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="74" y="40" width="56" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
      <rect x="74" y="48" width="60" height="3" rx="1" fill="#CBD5E1" opacity="0.4" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Main panel
// ---------------------------------------------------------------------------
export function StylePanel() {
  const style = useSignatureStore((s) => s.style);
  const setTemplate = useSignatureStore((s) => s.setTemplate);
  const setPrimaryColor = useSignatureStore((s) => s.setPrimaryColor);
  const setAccentColor = useSignatureStore((s) => s.setAccentColor);
  const setTextColor = useSignatureStore((s) => s.setTextColor);
  const setBackgroundColor = useSignatureStore((s) => s.setBackgroundColor);
  const setFontFamily = useSignatureStore((s) => s.setFontFamily);
  const setFontSize = useSignatureStore((s) => s.setFontSize);
  const setBorderStyle = useSignatureStore((s) => s.setBorderStyle);
  const setBorderColor = useSignatureStore((s) => s.setBorderColor);
  const resetStyle = useSignatureStore((s) => s.resetStyle);
  const t = useTranslations();

  const handlePresetClick = useCallback(
    (preset: (typeof COLOR_PRESETS)[number]) => {
      setPrimaryColor(preset.primary);
      setAccentColor(preset.accent);
    },
    [setPrimaryColor, setAccentColor]
  );

  return (
    <div className="flex flex-col gap-10">
      {/* ===== Template selector ===== */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--color-brand-text)]">{t("style.template")}</h3>
        <div className="grid grid-cols-2 gap-3">
          {TEMPLATES.map((tpl) => {
            const isActive = style.templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplate(tpl.id)}
                className={`group relative cursor-pointer rounded-xl border-2 p-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/5 shadow-sm shadow-[var(--color-brand-primary)]/10"
                    : "border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] hover:border-[var(--color-brand-primary)]/30 hover:shadow-sm"
                }`}
              >
                {/* Checkmark badge */}
                {isActive && (
                  <div className="absolute top-1.5 right-1.5 z-10 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--color-brand-primary)] shadow-sm">
                    <Check className="h-3 w-3 text-white" />
                  </div>
                )}
                {/* SVG thumbnail */}
                <div className="mb-2 h-[72px] w-full overflow-hidden rounded-lg border border-[var(--color-brand-border)]/50 bg-white">
                  {TEMPLATE_THUMBNAILS[tpl.id as TemplateId]}
                </div>
                {/* Template name */}
                <span className={`block text-center text-xs font-semibold ${
                  isActive ? "text-[var(--color-brand-primary)]" : "text-[var(--color-brand-text)]"
                }`}>
                  {t(`templates.${tpl.id}.name`)}
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== Color customization ===== */}
      <section className="space-y-5">
        <h3 className="text-sm font-bold text-[var(--color-brand-text)]">{t("style.color")}</h3>

        {/* Color presets */}
        <div className="space-y-2.5">
          <span className="block text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">
            {t("style.preset")}
          </span>
          <div className="flex flex-wrap gap-2.5">
            {COLOR_PRESETS.map((preset) => {
              const isActive =
                style.primaryColor === preset.primary &&
                style.accentColor === preset.accent;
              return (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  title={t(`colorPresets.${preset.key}`)}
                  className={`group/swatch relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-md ${
                    isActive
                      ? "border-[var(--color-brand-primary)] ring-2 ring-[var(--color-brand-primary)]/20 shadow-sm"
                      : "border-[var(--color-brand-border)] hover:border-[var(--color-brand-primary)]/40"
                  }`}
                >
                  <span
                    className="h-full w-full rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${preset.primary} 50%, ${preset.accent} 50%)`,
                    }}
                  />
                  {isActive && (
                    <Check className="absolute h-3.5 w-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Individual pickers */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ColorPicker
            label={t("style.primary")}
            value={style.primaryColor}
            onChange={setPrimaryColor}
          />
          <ColorPicker
            label={t("style.accent")}
            value={style.accentColor}
            onChange={setAccentColor}
          />
          <ColorPicker
            label={t("style.text")}
            value={style.textColor}
            onChange={setTextColor}
          />
          <ColorPicker
            label={t("style.background")}
            value={style.backgroundColor}
            onChange={setBackgroundColor}
          />
        </div>
      </section>

      {/* ===== Font family ===== */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--color-brand-text)]">{t("style.font")}</h3>
        <div className="space-y-2.5">
          <Label
            htmlFor="font-family-select"
            className="text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase"
          >
            {t("style.fontFamily")}
          </Label>
          <select
            id="font-family-select"
            value={style.fontFamily}
            onChange={(e) => setFontFamily(e.target.value as FontFamily)}
            className="flex h-10 w-full cursor-pointer rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-3 py-2 text-sm shadow-sm transition-all duration-200 focus-visible:border-[var(--color-brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-brand-primary)]/10"
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font size slider */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="font-size-slider"
              className="text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase"
            >
              {t("style.fontSize")}
            </Label>
            <span className="rounded-md bg-[var(--color-brand-bg)] px-2 py-0.5 text-xs font-mono tabular-nums text-[var(--color-brand-text)]">
              {style.fontSize}px
            </span>
          </div>
          <input
            id="font-size-slider"
            type="range"
            min={12}
            max={20}
            step={1}
            value={style.fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-[var(--color-brand-border)] accent-[var(--color-brand-primary)]"
          />
          <div className="flex justify-between text-[10px] text-[var(--color-brand-text-muted)]">
            <span>12px</span>
            <span>20px</span>
          </div>
        </div>
      </section>

      {/* ===== Border ===== */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-[var(--color-brand-text)]">{t("style.border")}</h3>

        <div className="space-y-2.5">
          <Label className="text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">
            {t("style.borderStyle")}
          </Label>
          <div className="flex flex-wrap gap-2">
            {BORDER_STYLES.map((bs) => {
              const isActive = style.borderStyle === bs;
              return (
                <button
                  key={bs}
                  type="button"
                  onClick={() => setBorderStyle(bs as BorderStyle)}
                  className={`cursor-pointer rounded-lg border px-3.5 py-2 text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? "border-[var(--color-brand-primary)] bg-[var(--color-brand-primary)]/10 text-[var(--color-brand-primary)] shadow-sm"
                      : "border-[var(--color-brand-border)] text-[var(--color-brand-text-muted)] hover:border-[var(--color-brand-primary)]/30 hover:text-[var(--color-brand-text)]"
                  }`}
                >
                  {t(`style.borderOptions.${bs}`)}
                </button>
              );
            })}
          </div>
        </div>

        {style.borderStyle !== "none" && (
          <ColorPicker
            label={t("style.borderColor")}
            value={style.borderColor}
            onChange={setBorderColor}
          />
        )}
      </section>

      {/* ===== Reset ===== */}
      <div className="border-t border-[var(--color-brand-border)] pt-5">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetStyle}
          className="gap-1.5 rounded-lg border-[var(--color-brand-border)] text-[var(--color-brand-text-muted)] transition-all duration-200 hover:border-destructive/30 hover:text-destructive cursor-pointer"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          {t("style.resetStyle")}
        </Button>
      </div>
    </div>
  );
}
