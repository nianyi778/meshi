import type { FontFamily } from "../types";
import { FONT_FAMILIES } from "../constants";

/**
 * Get CSS font-family string from FontFamily ID
 */
export function getFontFamilyCss(id: FontFamily): string {
  const font = FONT_FAMILIES.find((f) => f.id === id);
  return font?.css ?? "'Noto Sans JP', sans-serif";
}

/**
 * Get Google Fonts URL for a FontFamily
 */
export function getGoogleFontsUrl(id: FontFamily): string {
  const fontMap: Record<FontFamily, string> = {
    "noto-sans-jp": "Noto+Sans+JP:wght@300;400;500;700",
    "noto-serif-jp": "Noto+Serif+JP:wght@400;500;700",
    inter: "Inter:wght@400;500;600;700;800",
    "zen-kaku-gothic": "Zen+Kaku+Gothic+New:wght@400;500;700",
    "m-plus-rounded": "M+PLUS+Rounded+1c:wght@400;500;700",
  };
  return `https://fonts.googleapis.com/css2?family=${fontMap[id]}&display=swap`;
}

/**
 * Validate hex color string
 */
export function isValidHexColor(color: string): boolean {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color);
}

/**
 * Format phone number for tel: link
 */
export function formatPhoneForLink(phone: string): string {
  return phone.replace(/[^\d+]/g, "");
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}
