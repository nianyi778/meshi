// ============================================
// Meishi (名刺) — Core Types
// ============================================

/** Signature card form data fields */
export interface SignatureData {
  /** 会社名 */
  companyName: string;
  /** 氏名 */
  personName: string;
  /** フリガナ / ローマ字読み */
  nameReading: string;
  /** ウェブサイト URL */
  webUrl: string;
  /** メールアドレス */
  email: string;
  /** 電話番号 */
  phone: string;
  /** 郵便番号 */
  postalCode: string;
  /** 住所1行目 */
  address1: string;
  /** 住所2行目 */
  address2: string;
  /** ロゴ画像 (data URL or external URL) */
  logoUrl: string;
}

/** Template ID */
export type TemplateId = "classic" | "modern" | "minimal" | "corporate" | "elegant";

/** Font family options */
export type FontFamily =
  | "noto-sans-jp"
  | "noto-serif-jp"
  | "inter"
  | "zen-kaku-gothic"
  | "m-plus-rounded";

/** Border style options */
export type BorderStyle = "solid" | "double" | "dashed" | "dotted" | "none";

/** Field visibility toggles */
export interface FieldVisibility {
  companyName: boolean;
  personName: boolean;
  nameReading: boolean;
  webUrl: boolean;
  email: boolean;
  phone: boolean;
  postalCode: boolean;
  address1: boolean;
  address2: boolean;
  logo: boolean;
}

/** Style customization options */
export interface SignatureStyle {
  /** Selected template */
  templateId: TemplateId;
  /** Primary color (hex) */
  primaryColor: string;
  /** Accent color (hex) */
  accentColor: string;
  /** Text color (hex) */
  textColor: string;
  /** Background color (hex) */
  backgroundColor: string;
  /** Font family */
  fontFamily: FontFamily;
  /** Font size in px */
  fontSize: number;
  /** Border style */
  borderStyle: BorderStyle;
  /** Border color (hex) */
  borderColor: string;
  /** Field visibility toggles */
  fieldVisibility: FieldVisibility;
}

/** Template definition */
export interface TemplateDefinition {
  id: TemplateId;
  /** Preview thumbnail (component key) */
  previewKey: string;
  /** Default style overrides for this template */
  defaultStyle: Partial<SignatureStyle>;
}

/** Export format */
export type ExportFormat = "png" | "html" | "gmail";

/** Complete signature state */
export interface SignatureState {
  data: SignatureData;
  style: SignatureStyle;
}
