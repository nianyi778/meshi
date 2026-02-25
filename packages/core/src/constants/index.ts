import type {
  FieldVisibility,
  FontFamily,
  SignatureData,
  SignatureStyle,
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
};

export const DEFAULT_SIGNATURE_DATA: SignatureData = {
  companyName: "株式会社サンプル",
  personName: "山田 太郎",
  nameReading: "ヤマダ タロウ",
  webUrl: "https://www.example.co.jp",
  email: "taro.yamada@example.co.jp",
  phone: "03-1234-5678",
  postalCode: "〒100-0001",
  address1: "東京都千代田区千代田1-1",
  address2: "サンプルビルディング 10階",
  logoUrl: "",
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
    name: "Zen角ゴシック",
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
// ============================================

export const COLOR_PRESETS = [
  { name: "ネイビー", primary: "#0C4A6E", accent: "#0EA5E9" },
  { name: "グリーン", primary: "#14532D", accent: "#22C55E" },
  { name: "パープル", primary: "#3B0764", accent: "#A855F7" },
  { name: "レッド", primary: "#7F1D1D", accent: "#EF4444" },
  { name: "オレンジ", primary: "#7C2D12", accent: "#F97316" },
  { name: "ブラック", primary: "#171717", accent: "#525252" },
  { name: "ブルー", primary: "#1E3A5F", accent: "#3B82F6" },
  { name: "ティール", primary: "#134E4A", accent: "#14B8A6" },
] as const;

// ============================================
// Templates
// ============================================

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: "classic",
    name: "クラシック",
    description: "シンプルな横線区切り。ビジネスメールに最適。",
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
    name: "モダン",
    description: "カード風デザイン。影とラウンドコーナー。",
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
    name: "ミニマル",
    description: "大きめの文字、枠線なし。洗練された印象。",
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
    name: "コーポレート",
    description: "左サイドにアクセントバー。企業向け。",
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
    name: "エレガント",
    description: "セリフフォント、細い枠線。上品な印象。",
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
// Field Labels (Japanese)
// ============================================

export const FIELD_LABELS: Record<keyof SignatureData, string> = {
  companyName: "会社名",
  personName: "氏名",
  nameReading: "フリガナ",
  webUrl: "ウェブサイト",
  email: "メールアドレス",
  phone: "電話番号",
  postalCode: "郵便番号",
  address1: "住所1",
  address2: "住所2",
  logoUrl: "ロゴ画像",
};

export const FIELD_PLACEHOLDERS: Record<keyof SignatureData, string> = {
  companyName: "株式会社○○",
  personName: "山田 太郎",
  nameReading: "ヤマダ タロウ / Yamada Taro",
  webUrl: "https://www.example.co.jp",
  email: "taro@example.co.jp",
  phone: "03-1234-5678",
  postalCode: "〒100-0001",
  address1: "東京都千代田区千代田1-1",
  address2: "サンプルビルディング 10階",
  logoUrl: "",
};
