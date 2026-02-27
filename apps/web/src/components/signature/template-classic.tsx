"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import { getFontFamilyCss, formatPhoneForLink, getSocialIconSvg } from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";
import { QRCodeDisplay } from "./qr-code-display";

interface TemplateProps {
  data: SignatureData;
  style: SignatureStyle;
  className?: string;
}

export function TemplateClassic({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const isNoBorder = style.borderStyle === "none";
  const borderWidth = style.borderStyle === "double" ? "3px" : "1px";
  const borderCss = isNoBorder
    ? "none"
    : `${borderWidth} ${style.borderStyle} ${style.borderColor}`;
  const borderTopCss = isNoBorder ? "none" : borderCss;
  const borderBottomCss = isNoBorder ? "none" : borderCss;

  const labelStyle: React.CSSProperties = {
    display: "inline-block",
    width: "48px",
    fontWeight: 500,
    color: style.accentColor,
    letterSpacing: "0.05em",
    flexShrink: 0,
  };

  const linkStyle: React.CSSProperties = {
    color: style.textColor,
    textDecoration: "none",
  };

  return (
    <div
      className={className}
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        color: style.textColor,
        backgroundColor: style.backgroundColor,
        lineHeight: 1.7,
        padding: "4px 0",
      }}
    >
      {/* Top border */}
      <div
        style={{
          borderTop: borderCss,
          marginBottom: "12px",
        }}
      />

      {/* Company name */}
      {v.companyName && data.companyName && (
        <div
          style={{
            fontWeight: 700,
            fontSize: `${fontSize + 1}px`,
            color: style.primaryColor,
            marginBottom: "2px",
          }}
        >
          {data.companyName}
        </div>
      )}

      {/* Company + Department + Job title */}
      {v.companyName && data.companyName && (
        <div
          style={{
            fontWeight: 700,
            fontSize: `${fontSize + 1}px`,
            color: style.primaryColor,
            marginBottom: "2px",
          }}
        >
          {data.companyName}
        </div>
      )}
      {(v.department && data.department || v.jobTitle && data.jobTitle) && (
        <div style={{ fontSize: `${fontSize - 1}px`, color: style.accentColor, marginBottom: "2px" }}>
          {[v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).join(" / ")}
        </div>
      )}

      {/* Person name + reading */}
      {v.personName && data.personName && (
        <div
          style={{
            fontWeight: 600,
            fontSize: `${fontSize + 2}px`,
            marginBottom: "2px",
          }}
        >
          {data.personName}
          {v.nameReading && data.nameReading && (
            <span
              style={{
                fontWeight: 400,
                fontSize: `${fontSize - 1}px`,
                marginLeft: "8px",
                opacity: 0.7,
              }}
            >
              （{data.nameReading}）
            </span>
          )}
        </div>
      )}

      {/* Spacer */}
      <div style={{ height: "10px" }} />

      {/* Logo */}
      {v.logo && data.logoUrl && (
        <div style={{ marginBottom: "10px" }}>
          <img
            src={data.logoUrl}
            alt={data.companyName || "ロゴ"}
            style={{
              maxHeight: "36px",
              maxWidth: "160px",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* WEB */}
      {v.webUrl && data.webUrl && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={labelStyle}>WEB</span>
          <span style={{ margin: "0 6px", opacity: 0.4 }}>:</span>
          <a
            href={data.webUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={linkStyle}
          >
            {data.webUrl}
          </a>
        </div>
      )}

      {/* MAIL */}
      {v.email && data.email && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={labelStyle}>MAIL</span>
          <span style={{ margin: "0 6px", opacity: 0.4 }}>:</span>
          <a href={`mailto:${data.email}`} style={linkStyle}>
            {data.email}
          </a>
        </div>
      )}

      {/* TEL */}
      {v.phone && data.phone && (
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <span style={labelStyle}>TEL</span>
          <span style={{ margin: "0 6px", opacity: 0.4 }}>:</span>
          <a href={`tel:${formatPhoneForLink(data.phone)}`} style={linkStyle}>
            {data.phone}
          </a>
        </div>
      )}

      {/* Postal code + Address */}
      {(v.postalCode || v.address1 || v.address2) && (
        <div style={{ marginTop: "4px" }}>
          {v.postalCode && data.postalCode && (
            <span>{`〒${data.postalCode}`}</span>
          )}
          {v.address1 && data.address1 && (
            <div>{data.address1}</div>
          )}
          {v.address2 && data.address2 && (
            <div>{data.address2}</div>
          )}
        </div>
      )}

      {/* Social links */}
      {v.socialLinks && data.socialLinks && data.socialLinks.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "5px", flexWrap: "wrap" }}>
          {data.socialLinks.map((link, i) => {
            const platform = SOCIAL_PLATFORMS.find(p => p.id === link.platform);
            if (!platform || !link.url) return null;
            return (
              <a
                key={i}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "26px",
                  height: "26px",
                  borderRadius: "6px",
                  backgroundColor: platform.color,
                  textDecoration: "none",
                  flexShrink: 0,
                }}
                dangerouslySetInnerHTML={{ __html: getSocialIconSvg(link.platform) }}
              />
            );
          })}
        </div>
      )}

      {/* QR Code */}
      {v.qrCode && data.webUrl && (
        <div style={{ marginTop: "10px" }}>
          <QRCodeDisplay url={data.webUrl} size={60} color={style.primaryColor} />
        </div>
      )}

      {/* Disclaimer */}
      {v.disclaimer && data.disclaimer && (
        <div style={{
          marginTop: "12px",
          paddingTop: "8px",
          borderTop: `1px solid ${style.borderColor}`,
          fontSize: `${Math.max(fontSize - 2, 10)}px`,
          color: style.textColor,
          opacity: 0.6,
          lineHeight: 1.5,
          fontFamily,
          whiteSpace: "pre-wrap",
        }}>
          {data.disclaimer}
        </div>
      )}

      {/* Bottom border */}
      <div
        style={{
          borderBottom: borderCss,
          marginTop: "12px",
        }}
      />
    </div>
  );
}
