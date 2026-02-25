"use client";

import React, { useCallback } from "react";
import { useSignatureStore } from "@/store/signature-store";
import {
  TEMPLATES,
  COLOR_PRESETS,
  FONT_FAMILIES,
} from "@meishi/core/constants";
import type {
  FontFamily,
  BorderStyle,
} from "@meishi/core/types";
import { Button } from "@meishi/ui/components/button";
import { Input } from "@meishi/ui/components/input";
import { Label } from "@meishi/ui/components/label";
import { RotateCcw, Check } from "lucide-react";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
const BORDER_STYLES: { id: BorderStyle; label: string }[] = [
  { id: "solid", label: "実線" },
  { id: "double", label: "二重線" },
  { id: "dashed", label: "破線" },
  { id: "dotted", label: "点線" },
  { id: "none", label: "なし" },
];

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
      <label className="relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-full border border-border shadow-sm">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
          aria-label={label}
        />
        <span
          className="h-full w-full rounded-full"
          style={{ backgroundColor: value }}
        />
      </label>
      <div className="flex-1 space-y-0.5">
        <span className="block text-xs font-medium text-muted-foreground">
          {label}
        </span>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-7 font-mono text-xs uppercase"
          maxLength={7}
        />
      </div>
    </div>
  );
}

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

  const handlePresetClick = useCallback(
    (preset: (typeof COLOR_PRESETS)[number]) => {
      setPrimaryColor(preset.primary);
      setAccentColor(preset.accent);
    },
    [setPrimaryColor, setAccentColor]
  );

  return (
    <div className="flex flex-col gap-8">
      {/* ===== Template selector ===== */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">テンプレート</h3>
        <div className="grid grid-cols-1 gap-2">
          {TEMPLATES.map((tpl) => {
            const isActive = style.templateId === tpl.id;
            return (
              <button
                key={tpl.id}
                type="button"
                onClick={() => setTemplate(tpl.id)}
                className={`cursor-pointer rounded-[var(--radius)] border-2 px-4 py-3 text-left transition-all ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-sm"
                    : "border-border bg-card hover:border-primary/30 hover:bg-card/80"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-foreground">
                    {tpl.name}
                  </span>
                  {isActive && (
                    <Check className="h-4 w-4 text-primary" />
                  )}
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {tpl.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* ===== Color customization ===== */}
      <section className="space-y-4">
        <h3 className="text-sm font-bold text-foreground">カラー</h3>

        {/* Color presets */}
        <div className="space-y-2">
          <span className="block text-xs font-medium text-muted-foreground">
            プリセット
          </span>
          <div className="flex flex-wrap gap-2">
            {COLOR_PRESETS.map((preset) => {
              const isActive =
                style.primaryColor === preset.primary &&
                style.accentColor === preset.accent;
              return (
                <button
                  key={preset.name}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  title={preset.name}
                  className={`group/swatch relative flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 transition-transform hover:scale-110 ${
                    isActive
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border"
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
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <ColorPicker
            label="プライマリ"
            value={style.primaryColor}
            onChange={setPrimaryColor}
          />
          <ColorPicker
            label="アクセント"
            value={style.accentColor}
            onChange={setAccentColor}
          />
          <ColorPicker
            label="テキスト"
            value={style.textColor}
            onChange={setTextColor}
          />
          <ColorPicker
            label="背景"
            value={style.backgroundColor}
            onChange={setBackgroundColor}
          />
        </div>
      </section>

      {/* ===== Font family ===== */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">フォント</h3>
        <div className="space-y-2">
          <Label
            htmlFor="font-family-select"
            className="text-xs text-muted-foreground"
          >
            フォントファミリー
          </Label>
          <select
            id="font-family-select"
            value={style.fontFamily}
            onChange={(e) => setFontFamily(e.target.value as FontFamily)}
            className="flex h-9 w-full cursor-pointer rounded-[var(--radius)] border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          >
            {FONT_FAMILIES.map((f) => (
              <option key={f.id} value={f.id}>
                {f.name}
              </option>
            ))}
          </select>
        </div>

        {/* Font size slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label
              htmlFor="font-size-slider"
              className="text-xs text-muted-foreground"
            >
              フォントサイズ
            </Label>
            <span className="text-xs font-mono tabular-nums text-muted-foreground">
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
            className="h-2 w-full cursor-pointer appearance-none rounded-full bg-secondary accent-primary"
          />
          <div className="flex justify-between text-[10px] text-muted-foreground">
            <span>12px</span>
            <span>20px</span>
          </div>
        </div>
      </section>

      {/* ===== Border ===== */}
      <section className="space-y-3">
        <h3 className="text-sm font-bold text-foreground">ボーダー</h3>

        <div className="space-y-2">
          <Label className="text-xs text-muted-foreground">
            ボーダースタイル
          </Label>
          <div className="flex flex-wrap gap-1.5">
            {BORDER_STYLES.map((bs) => {
              const isActive = style.borderStyle === bs.id;
              return (
                <button
                  key={bs.id}
                  type="button"
                  onClick={() => setBorderStyle(bs.id)}
                  className={`cursor-pointer rounded-[var(--radius)] border px-3 py-1.5 text-xs font-medium transition-colors ${
                    isActive
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground"
                  }`}
                >
                  {bs.label}
                </button>
              );
            })}
          </div>
        </div>

        {style.borderStyle !== "none" && (
          <ColorPicker
            label="ボーダーカラー"
            value={style.borderColor}
            onChange={setBorderColor}
          />
        )}
      </section>

      {/* ===== Reset ===== */}
      <div className="border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={resetStyle}
          className="gap-1.5 text-muted-foreground hover:text-destructive"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          スタイルをリセット
        </Button>
      </div>
    </div>
  );
}
