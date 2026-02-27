import { toPng } from "html-to-image";
import type {
  SignatureData,
  SignatureStyle,
  TemplateId,
} from "@meishi/core/types";
import { getFontFamilyCss, formatPhoneForLink, getSocialIconSvg } from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";

// ============================================
// PNG Export
// ============================================

export async function exportAsPng(elementId: string): Promise<void> {
  const element = document.getElementById(elementId);
  if (!element) {
    throw new Error(`Element with id "${elementId}" not found`);
  }

  // Wait for all fonts to finish loading
  await document.fonts.ready;

  // Use 3× pixel ratio for crisp retina output; honour device but floor at 3
  const pixelRatio = Math.max(3, window.devicePixelRatio ?? 1);

  // Measure the element's natural (un-scaled) dimensions
  const rect = element.getBoundingClientRect();

  const dataUrl = await toPng(element, {
    pixelRatio,
    quality: 1.0,
    cacheBust: true,
    backgroundColor: "#ffffff",
    // Pass explicit canvas dimensions so html-to-image never guesses
    width: rect.width,
    height: rect.height,
    // Re-apply the element's computed style so nothing bleeds
    style: {
      transform: "none",
      transformOrigin: "top left",
    },
  });

  const link = document.createElement("a");
  link.download = `meishi-signature-${Date.now()}.png`;
  link.href = dataUrl;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// ============================================
// Clipboard
// ============================================

export async function copyHtmlToClipboard(html: string): Promise<boolean> {
  try {
    const blob = new Blob([html], { type: "text/html" });
    const textBlob = new Blob([html], { type: "text/plain" });
    await navigator.clipboard.write([
      new ClipboardItem({
        "text/html": blob,
        "text/plain": textBlob,
      }),
    ]);
    return true;
  } catch {
    try {
      await navigator.clipboard.writeText(html);
      return true;
    } catch {
      return false;
    }
  }
}

// ============================================
// Gmail-compatible HTML Generation
// ============================================

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildRow(label: string, value: string, link?: string, style?: string): string {
  const textStyle = style ?? "";
  if (link) {
    return `<tr><td style="padding:2px 0;${textStyle}"><span style="color:#666666;">${label}</span> <a href="${escapeHtml(link)}" style="color:#0066cc;text-decoration:none;" target="_blank">${escapeHtml(value)}</a></td></tr>`;
  }
  return `<tr><td style="padding:2px 0;${textStyle}">${label ? `<span style="color:#666666;">${label}</span> ` : ""}${escapeHtml(value)}</td></tr>`;
}

function buildSocialLinksRow(data: SignatureData, style: SignatureStyle, align?: string): string {
  const v = style.fieldVisibility;
  if (!v.socialLinks || !data.socialLinks || data.socialLinks.length === 0) return "";
  const icons = data.socialLinks.map((link) => {
    const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
    if (!platform || !link.url) return "";
    return `<a href="${escapeHtml(link.url)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;width:26px;height:26px;border-radius:6px;background-color:${platform.color};text-align:center;line-height:26px;text-decoration:none;">${getSocialIconSvg(link.platform)}</a>`;
  }).filter(Boolean).join("&nbsp;");
  if (!icons) return "";
  const alignStyle = align === "center" ? "text-align:center;" : "";
  return `<tr><td style="padding:10px 0 0;${alignStyle}">${icons}</td></tr>`;
}

function generateClassicHtml(data: SignatureData, style: SignatureStyle): string {
  const v = style.fieldVisibility;
  const fontCss = getFontFamilyCss(style.fontFamily);
  const borderLine = `<tr><td style="border-top:2px ${style.borderStyle} ${style.borderColor};padding:0;line-height:0;font-size:0;">&nbsp;</td></tr>`;

  const rows: string[] = [];

  if (style.borderStyle !== "none") rows.push(borderLine);

  if (v.companyName && data.companyName) {
    rows.push(`<tr><td style="padding:4px 0 0;font-weight:bold;color:${style.primaryColor};font-size:${style.fontSize}px;">${escapeHtml(data.companyName)}</td></tr>`);
  }
  const deptJob = [v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).map(escapeHtml).join(" / ");
  if (deptJob) {
    rows.push(`<tr><td style="padding:1px 0;font-size:${style.fontSize - 1}px;color:${style.accentColor};">${deptJob}</td></tr>`);
  }
  if (v.personName && data.personName) {
    const reading = v.nameReading && data.nameReading ? `（${escapeHtml(data.nameReading)}）` : "";
    rows.push(`<tr><td style="padding:2px 0;font-size:${style.fontSize}px;">${escapeHtml(data.personName)}${reading}</td></tr>`);
  }

  rows.push('<tr><td style="padding:4px 0;"></td></tr>');

  if (v.webUrl && data.webUrl) {
    rows.push(buildRow("WEB : ", data.webUrl, data.webUrl));
  }
  if (v.email && data.email) {
    rows.push(buildRow("MAIL : ", data.email, `mailto:${data.email}`));
  }
  if (v.phone && data.phone) {
    rows.push(buildRow("TEL : ", data.phone, `tel:${formatPhoneForLink(data.phone)}`));
  }
  if (v.postalCode && data.postalCode) {
    rows.push(buildRow("", data.postalCode));
  }
  if (v.address1 && data.address1) {
    rows.push(buildRow("", data.address1));
  }
  if (v.address2 && data.address2) {
    rows.push(buildRow("", data.address2));
  }

  rows.push(buildSocialLinksRow(data, style));

  if (style.borderStyle !== "none") rows.push(borderLine);

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontCss};font-size:${style.fontSize}px;color:${style.textColor};background-color:${style.backgroundColor};max-width:500px;">${rows.join("")}</table>`;
}

function generateModernHtml(data: SignatureData, style: SignatureStyle): string {
  const v = style.fieldVisibility;
  const fontCss = getFontFamilyCss(style.fontFamily);

  const rows: string[] = [];

  if (v.companyName && data.companyName) {
    rows.push(`<tr><td style="padding:0 0 4px;font-size:${style.fontSize - 1}px;color:${style.accentColor};">${escapeHtml(data.companyName)}</td></tr>`);
  }
  if (v.personName && data.personName) {
    rows.push(`<tr><td style="padding:0 0 2px;font-size:${style.fontSize + 2}px;font-weight:bold;color:${style.primaryColor};">${escapeHtml(data.personName)}</td></tr>`);
  }
  if (v.nameReading && data.nameReading) {
    rows.push(`<tr><td style="padding:0 0 2px;font-size:${style.fontSize - 2}px;color:#999999;">${escapeHtml(data.nameReading)}</td></tr>`);
  }
  const deptJobModern = [v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).map(escapeHtml).join(" / ");
  if (deptJobModern) {
    rows.push(`<tr><td style="padding:0 0 8px;font-size:${style.fontSize - 2}px;color:#888888;">${deptJobModern}</td></tr>`);
  }

  const contactRows: string[] = [];
  if (v.email && data.email) contactRows.push(buildRow("📧 ", data.email, `mailto:${data.email}`));
  if (v.phone && data.phone) contactRows.push(buildRow("📱 ", data.phone, `tel:${formatPhoneForLink(data.phone)}`));
  if (v.webUrl && data.webUrl) contactRows.push(buildRow("🌐 ", data.webUrl, data.webUrl));

  if (contactRows.length > 0) {
    rows.push(`<tr><td style="padding:8px 0 0;border-top:1px solid ${style.borderColor};">`);
    rows.push(`<table cellpadding="0" cellspacing="0" border="0" style="font-size:${style.fontSize - 1}px;">${contactRows.join("")}</table>`);
    rows.push("</td></tr>");
  }

  const addressParts: string[] = [];
  if (v.postalCode && data.postalCode) addressParts.push(escapeHtml(data.postalCode));
  if (v.address1 && data.address1) addressParts.push(escapeHtml(data.address1));
  if (v.address2 && data.address2) addressParts.push(escapeHtml(data.address2));
  if (addressParts.length > 0) {
    rows.push(`<tr><td style="padding:6px 0 0;font-size:${style.fontSize - 2}px;color:#888888;">📍 ${addressParts.join(" ")}</td></tr>`);
  }

  rows.push(buildSocialLinksRow(data, style));

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontCss};color:${style.textColor};background-color:${style.backgroundColor};padding:20px;border-radius:12px;border:1px solid #e5e7eb;max-width:500px;">${rows.join("")}</table>`;
}
function generateMinimalHtml(data: SignatureData, style: SignatureStyle): string {
  const v = style.fieldVisibility;
  const fontCss = getFontFamilyCss(style.fontFamily);
  const rows: string[] = [];

  if (v.personName && data.personName) {
    rows.push(`<tr><td style="font-size:${Math.round(style.fontSize * 1.5)}px;font-weight:bold;color:${style.primaryColor};padding:0 0 2px;">${escapeHtml(data.personName)}</td></tr>`);
  }
  const deptJobMin = [v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).map(escapeHtml).join(" / ");
  if (deptJobMin) {
    rows.push(`<tr><td style="font-size:${style.fontSize - 1}px;color:#888;padding:0 0 2px;">${deptJobMin}</td></tr>`);
  }
  if (v.companyName && data.companyName) {
    rows.push(`<tr><td style="font-size:${style.fontSize - 1}px;color:#999;padding:0 0 8px;">${escapeHtml(data.companyName)}</td></tr>`);
  }

  const contacts: string[] = [];
  if (v.email && data.email) contacts.push(`<a href="mailto:${escapeHtml(data.email)}" style="color:#0066cc;text-decoration:none;">${escapeHtml(data.email)}</a>`);
  if (v.phone && data.phone) contacts.push(`<a href="tel:${formatPhoneForLink(data.phone)}" style="color:#0066cc;text-decoration:none;">${escapeHtml(data.phone)}</a>`);
  if (v.webUrl && data.webUrl) contacts.push(`<a href="${escapeHtml(data.webUrl)}" style="color:#0066cc;text-decoration:none;" target="_blank">${escapeHtml(data.webUrl)}</a>`);
  if (contacts.length > 0) {
    rows.push(`<tr><td style="font-size:${style.fontSize - 1}px;padding:0 0 4px;">${contacts.join(' <span style="color:#ccc;">|</span> ')}</td></tr>`);
  }

  const addressParts: string[] = [];
  if (v.postalCode && data.postalCode) addressParts.push(escapeHtml(data.postalCode));
  if (v.address1 && data.address1) addressParts.push(escapeHtml(data.address1));
  if (v.address2 && data.address2) addressParts.push(escapeHtml(data.address2));
  if (addressParts.length > 0) {
    rows.push(`<tr><td style="font-size:${style.fontSize - 2}px;color:#aaa;">${addressParts.join(" ")}</td></tr>`);
  }

  rows.push(buildSocialLinksRow(data, style));

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontCss};font-size:${style.fontSize}px;color:${style.textColor};background-color:${style.backgroundColor};max-width:500px;">${rows.join("")}</table>`;
}
function generateCorporateHtml(data: SignatureData, style: SignatureStyle): string {
  const v = style.fieldVisibility;
  const fontCss = getFontFamilyCss(style.fontFamily);
  const rows: string[] = [];

  if (v.companyName && data.companyName) {
    rows.push(`<tr><td style="font-weight:bold;font-size:${style.fontSize}px;color:${style.primaryColor};padding:0 0 2px;">${escapeHtml(data.companyName)}</td></tr>`);
  }
  const deptJobCorp = [v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).map(escapeHtml).join(" / ");
  if (deptJobCorp) {
    rows.push(`<tr><td style="font-size:${style.fontSize - 1}px;color:${style.accentColor};padding:0 0 2px;">${deptJobCorp}</td></tr>`);
  }
  if (v.personName && data.personName) {
    const reading = v.nameReading && data.nameReading ? ` <span style="color:#999;font-size:${style.fontSize - 2}px;">${escapeHtml(data.nameReading)}</span>` : "";
    rows.push(`<tr><td style="font-size:${style.fontSize}px;padding:0 0 8px;">${escapeHtml(data.personName)}${reading}</td></tr>`);
  }

  rows.push(`<tr><td style="border-top:1px solid ${style.borderColor};padding:8px 0 0;"></td></tr>`);

  if (v.email && data.email) rows.push(buildRow("📧 ", data.email, `mailto:${data.email}`));
  if (v.phone && data.phone) rows.push(buildRow("📱 ", data.phone, `tel:${formatPhoneForLink(data.phone)}`));
  if (v.webUrl && data.webUrl) rows.push(buildRow("🌐 ", data.webUrl, data.webUrl));

  const addressParts: string[] = [];
  if (v.postalCode && data.postalCode) addressParts.push(escapeHtml(data.postalCode));
  if (v.address1 && data.address1) addressParts.push(escapeHtml(data.address1));
  if (v.address2 && data.address2) addressParts.push(escapeHtml(data.address2));
  if (addressParts.length > 0) {
    rows.push(`<tr><td style="padding:6px 0 0;font-size:${style.fontSize - 2}px;color:#888;">📍 ${addressParts.join(" ")}</td></tr>`);
  }

  rows.push(buildSocialLinksRow(data, style));

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontCss};font-size:${style.fontSize}px;color:${style.textColor};background-color:${style.backgroundColor};border-left:4px solid ${style.accentColor};padding:12px 0 12px 16px;max-width:500px;">${rows.join("")}</table>`;
}
function generateElegantHtml(data: SignatureData, style: SignatureStyle): string {
  const v = style.fieldVisibility;
  const fontCss = getFontFamilyCss(style.fontFamily);
  const rows: string[] = [];
  const centerStyle = "text-align:center;";

  if (style.borderStyle !== "none") {
    rows.push(`<tr><td style="border-top:1px solid ${style.borderColor};padding:0;"></td></tr>`);
  }

  if (v.personName && data.personName) {
    rows.push(`<tr><td style="${centerStyle}font-size:${style.fontSize + 4}px;font-weight:bold;color:${style.primaryColor};padding:12px 0 2px;letter-spacing:2px;">${escapeHtml(data.personName)}</td></tr>`);
  }
  if (v.companyName && data.companyName) {
    rows.push(`<tr><td style="${centerStyle}font-size:${style.fontSize - 2}px;color:#999;padding:0 0 4px;">${escapeHtml(data.companyName)}</td></tr>`);
  }
  const deptJobEleg = [v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).map(escapeHtml).join(" ・ ");
  if (deptJobEleg) {
    rows.push(`<tr><td style="${centerStyle}font-size:${style.fontSize - 2}px;color:#aaa;padding:0 0 8px;">${deptJobEleg}</td></tr>`);
  }

  rows.push(`<tr><td style="${centerStyle}color:#ccc;padding:4px 0;">· · ·</td></tr>`);

  if (v.email && data.email) {
    rows.push(`<tr><td style="${centerStyle}padding:2px 0;"><a href="mailto:${escapeHtml(data.email)}" style="color:#0066cc;text-decoration:none;font-size:${style.fontSize - 1}px;">${escapeHtml(data.email)}</a></td></tr>`);
  }
  if (v.phone && data.phone) {
    rows.push(`<tr><td style="${centerStyle}padding:2px 0;"><a href="tel:${formatPhoneForLink(data.phone)}" style="color:#0066cc;text-decoration:none;font-size:${style.fontSize - 1}px;">${escapeHtml(data.phone)}</a></td></tr>`);
  }
  if (v.webUrl && data.webUrl) {
    rows.push(`<tr><td style="${centerStyle}padding:2px 0;"><a href="${escapeHtml(data.webUrl)}" style="color:#0066cc;text-decoration:none;font-size:${style.fontSize - 1}px;" target="_blank">${escapeHtml(data.webUrl)}</a></td></tr>`);
  }

  const addressParts: string[] = [];
  if (v.postalCode && data.postalCode) addressParts.push(escapeHtml(data.postalCode));
  if (v.address1 && data.address1) addressParts.push(escapeHtml(data.address1));
  if (v.address2 && data.address2) addressParts.push(escapeHtml(data.address2));
  if (addressParts.length > 0) {
    rows.push(`<tr><td style="${centerStyle}padding:8px 0 0;font-size:${style.fontSize - 2}px;color:#aaa;">${addressParts.join("<br>")}</td></tr>`);
  }

  rows.push(buildSocialLinksRow(data, style, "center"));

  if (style.borderStyle !== "none") {
    rows.push(`<tr><td style="border-bottom:1px solid ${style.borderColor};padding:12px 0 0;"></td></tr>`);
  }

  return `<table cellpadding="0" cellspacing="0" border="0" style="font-family:${fontCss};font-size:${style.fontSize}px;color:${style.textColor};background-color:${style.backgroundColor};max-width:500px;width:100%;">${rows.join("")}</table>`;
}
const TEMPLATE_GENERATORS: Record<TemplateId, (data: SignatureData, style: SignatureStyle) => string> = {
  classic: generateClassicHtml,
  modern: generateModernHtml,
  minimal: generateMinimalHtml,
  corporate: generateCorporateHtml,
  elegant: generateElegantHtml,
};

export function generateGmailHtml(data: SignatureData, style: SignatureStyle): string {
  const generator = TEMPLATE_GENERATORS[style.templateId];
  return generator(data, style);
}
