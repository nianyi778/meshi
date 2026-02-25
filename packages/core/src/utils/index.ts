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
 * Auto-format Japanese phone number as user types.
 * Supports: 03-XXXX-XXXX, 06-XXXX-XXXX, 0X0-XXXX-XXXX (mobile),
 *           0120-XXX-XXX (toll-free), 050-XXXX-XXXX (IP phone)
 */
export function formatPhoneJP(input: string): string {
  // Strip everything except digits
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";

  // Mobile: 070/080/090 -> 0X0-XXXX-XXXX
  if (/^(070|080|090)/.test(digits)) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  // IP phone: 050 -> 050-XXXX-XXXX
  if (/^050/.test(digits)) {
    if (digits.length <= 3) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7, 11)}`;
  }

  // Toll-free: 0120 -> 0120-XXX-XXX
  if (/^0120/.test(digits)) {
    if (digits.length <= 4) return digits;
    if (digits.length <= 7) return `${digits.slice(0, 4)}-${digits.slice(4)}`;
    return `${digits.slice(0, 4)}-${digits.slice(4, 7)}-${digits.slice(7, 10)}`;
  }

  // Tokyo/Osaka 2-digit area code: 03/06 -> 0X-XXXX-XXXX
  if (/^(03|06)/.test(digits)) {
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `${digits.slice(0, 2)}-${digits.slice(2)}`;
    return `${digits.slice(0, 2)}-${digits.slice(2, 6)}-${digits.slice(6, 10)}`;
  }

  // General 3-digit area code -> 0XX-XXX-XXXX
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
}

/**
 * Auto-format Japanese postal code as user types -> XXX-XXXX
 */
export function formatPostalCodeJP(input: string): string {
  const digits = input.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.length <= 3) return digits;
  return `${digits.slice(0, 3)}-${digits.slice(3, 7)}`;
}

/**
 * Generate unique ID
 */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export { getSocialIconSvg } from "./social-icons";