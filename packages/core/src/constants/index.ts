import type {
  FieldVisibility,
  FontFamily,
  SignatureData,
  SignatureStyle,
  SocialPlatform,
  TemplateDefinition,
  TemplateId,
} from "../types";

// ============================================
// Default Values
// ============================================

export const DEFAULT_FIELD_VISIBILITY: FieldVisibility = {
  companyName: true,
  personName: true,
  nameReading: true,
  webUrl: true,
  email: true,
  phone: true,
  postalCode: true,
  address1: true,
  address2: true,
  logo: false,
  socialLinks: true,
  disclaimer: false,
};

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  companyName: "株式会社テクノソリューション",
  department: "営業部",
  jobTitle: "マネージャー",
  personName: "田中 美咏",
  nameReading: "タナカ ミサキ / Misaki Tanaka",
  webUrl: "https://www.techno-solution.co.jp",
  email: "m.tanaka@techno-solution.co.jp",
  phone: "03-1234-5678",
  postalCode: "100-0001",
  address1: "東京都千代田区千代田１－１",
  address2: "テクノビル　３Ｆ",
  logoUrl: "",
  socialLinks: [],
  disclaimer: "",
};

export const DEFAULT_SIGNATURE_STYLE: SignatureStyle = {
  templateId: "classic",
  primaryColor: "#0C4A6E",
  accentColor: "#0EA5E9",
  textColor: "#334155",
  backgroundColor: "#FFFFFF",
  fontFamily: "noto-sans-jp",
  fontSize: 14,
  borderStyle: "solid",
  borderColor: "#CBD5E1",
  fieldVisibility: { ...DEFAULT_FIELD_VISIBILITY },
};

// ============================================
// Font Families
// ============================================

export const FONT_FAMILIES: {
  id: FontFamily;
  name: string;
  css: string;
}[] = [
  {
    id: "noto-sans-jp",
    name: "Noto Sans JP",
    css: "'Noto Sans JP', sans-serif",
  },
  {
    id: "noto-serif-jp",
    name: "Noto Serif JP",
    css: "'Noto Serif JP', serif",
  },
  {
    id: "inter",
    name: "Inter",
    css: "'Inter', sans-serif",
  },
  {
    id: "zen-kaku-gothic",
    name: "Zen Kaku Gothic New",
    css: "'Zen Kaku Gothic New', sans-serif",
  },
  {
    id: "m-plus-rounded",
    name: "M PLUS Rounded",
    css: "'M PLUS Rounded 1c', sans-serif",
  },
];

// ============================================
// Color Presets
// i18n key: colorPresets.{key}
// ============================================

export const COLOR_PRESETS = [
  { key: "navy", primary: "#0C4A6E", accent: "#0EA5E9" },
  { key: "green", primary: "#14532D", accent: "#22C55E" },
  { key: "purple", primary: "#3B0764", accent: "#A855F7" },
  { key: "red", primary: "#7F1D1D", accent: "#EF4444" },
  { key: "orange", primary: "#7C2D12", accent: "#F97316" },
  { key: "black", primary: "#171717", accent: "#525252" },
  { key: "blue", primary: "#1E3A5F", accent: "#3B82F6" },
  { key: "teal", primary: "#134E4A", accent: "#14B8A6" },
] as const;

// ============================================
// Templates
// i18n keys: templates.{id}.name, templates.{id}.description
// ============================================

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "classic",
    previewKey: "classic",
    defaultStyle: {
      primaryColor: "#0C4A6E",
      accentColor: "#0EA5E9",
      borderStyle: "solid",
      fontFamily: "noto-sans-jp",
    },
  },
  {
    id: "modern",
    previewKey: "modern",
    defaultStyle: {
      primaryColor: "#1E293B",
      accentColor: "#3B82F6",
      borderStyle: "none",
      fontFamily: "inter",
    },
  },
  {
    id: "minimal",
    previewKey: "minimal",
    defaultStyle: {
      primaryColor: "#171717",
      accentColor: "#525252",
      borderStyle: "none",
      fontFamily: "inter",
      fontSize: 15,
    },
  },
  {
    id: "corporate",
    previewKey: "corporate",
    defaultStyle: {
      primaryColor: "#0C4A6E",
      accentColor: "#0EA5E9",
      borderStyle: "none",
      fontFamily: "noto-sans-jp",
    },
  },
  {
    id: "elegant",
    previewKey: "elegant",
    defaultStyle: {
      primaryColor: "#44403C",
      accentColor: "#A8A29E",
      borderStyle: "solid",
      fontFamily: "noto-serif-jp",
    },
  },
];

export const TEMPLATE_MAP = Object.fromEntries(
  TEMPLATES.map((t) => [t.id, t])
) as Record<TemplateId, TemplateDefinition>;

// ============================================
// Field keys (for iteration)
// i18n keys: form.fields.{key}, form.placeholders.{key}
// ============================================

export const SIGNATURE_FIELD_KEYS: (keyof SignatureData)[] = [
  "companyName",
  "department",
  "jobTitle",
  "personName",
  "nameReading",
  "webUrl",
  "email",
  "phone",
  "postalCode",
  "address1",
  "address2",
  "logoUrl",
];

// ============================================
// Border style keys
// i18n key: style.borderOptions.{key}
// ============================================

export const BORDER_STYLES = [
  "solid",
  "double",
  "dashed",
  "dotted",
  "none",
] as const;

// ============================================
// Social Platforms
// ============================================

export const SOCIAL_PLATFORMS: { id: SocialPlatform; label: string; color: string; urlPrefix: string }[] = [
  { id: "linkedin",   label: "LinkedIn",    color: "#0A66C2", urlPrefix: "https://linkedin.com/in/" },
  { id: "x",          label: "X (Twitter)",  color: "#000000", urlPrefix: "https://x.com/" },
  { id: "github",     label: "GitHub",       color: "#181717", urlPrefix: "https://github.com/" },
  { id: "instagram",  label: "Instagram",    color: "#E4405F", urlPrefix: "https://instagram.com/" },
  { id: "facebook",   label: "Facebook",     color: "#1877F2", urlPrefix: "https://facebook.com/" },
  { id: "youtube",    label: "YouTube",      color: "#FF0000", urlPrefix: "https://youtube.com/@" },
  { id: "tiktok",     label: "TikTok",       color: "#000000", urlPrefix: "https://tiktok.com/@" },
  { id: "whatsapp",   label: "WhatsApp",     color: "#25D366", urlPrefix: "https://wa.me/" },
  { id: "line",       label: "LINE",         color: "#00C300", urlPrefix: "https://line.me/ti/p/" },
  { id: "website2",   label: "Website 2",    color: "#6366F1", urlPrefix: "https://" },
];