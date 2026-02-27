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

export function TemplateMinimal({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const linkStyle: React.CSSProperties = {
    color: style.accentColor,
    textDecoration: "none",
  };

  const separatorStyle: React.CSSProperties = {
    display: "inline-block",
    margin: "0 10px",
    opacity: 0.3,
    fontWeight: 300,
  };

  // Collect contact items for pipe-separated row
  const contactItems: React.ReactNode[] = [];

  if (v.email && data.email) {
    contactItems.push(
      <a key="email" href={`mailto:${data.email}`} style={linkStyle}>
        {data.email}
      </a>
    );
  }
  if (v.phone && data.phone) {
    contactItems.push(
      <a
        key="phone"
        href={`tel:${formatPhoneForLink(data.phone)}`}
        style={linkStyle}
      >
        {data.phone}
      </a>
    );
  }
  if (v.webUrl && data.webUrl) {
    contactItems.push(
      <a
        key="web"
        href={data.webUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={linkStyle}
      >
        {data.webUrl}
      </a>
    );
  }

  return (
    <div
      className={className}
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        color: style.textColor,
        backgroundColor: style.backgroundColor,
        lineHeight: 1.6,
        padding: "8px 0",
      }}
    >
      {/* Logo */}
      {v.logo && data.logoUrl && (
        <div style={{ marginBottom: "12px" }}>
          <img
            src={data.logoUrl}
            alt={data.companyName || "ロゴ"}
            style={{
              maxHeight: "32px",
              maxWidth: "140px",
              objectFit: "contain",
            }}
          />
        </div>
      )}

      {/* Person name — large and bold */}
      {v.personName && data.personName && (
        <div
          style={{
            fontSize: `${Math.round(fontSize * 1.5)}px`,
            fontWeight: 700,
            color: style.primaryColor,
            lineHeight: 1.2,
            letterSpacing: "-0.01em",
          }}
        >
          {data.personName}
        </div>
      )}

      {/* Name reading */}
      {v.nameReading && data.nameReading && (
        <div
          style={{
            fontSize: `${fontSize - 1}px`,
            opacity: 0.5,
            marginTop: "2px",
            fontWeight: 400,
          }}
        >
          {data.nameReading}
        </div>
      )}

      {/* Department + Job title */}
      {(v.department && data.department || v.jobTitle && data.jobTitle) && (
        <div style={{ fontSize: `${fontSize - 2}px`, opacity: 0.55, marginTop: "2px" }}>
          {[v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).join(" / ")}
        </div>
      )}

      {/* Company name — smaller, muted */}
      {v.companyName && data.companyName && (
        <div
          style={{
            fontSize: `${fontSize - 1}px`,
            color: style.accentColor,
            marginTop: "4px",
            fontWeight: 500,
          }}
        >
          {data.companyName}
        </div>
      )}

      {/* Contact row with pipe separators */}
      {contactItems.length > 0 && (
        <div style={{ marginTop: "14px" }}>
          {contactItems.map((item, i) => (
            <span key={i}>
              {i > 0 && <span style={separatorStyle}>|</span>}
              {item}
            </span>
          ))}
        </div>
      )}

      {/* Address — smaller text */}
      {(v.postalCode || v.address1 || v.address2) && (
        <div
          style={{
            marginTop: "8px",
            fontSize: `${fontSize - 2}px`,
            opacity: 0.5,
            lineHeight: 1.5,
          }}
        >
          {v.postalCode && data.postalCode && (
            <span>{`〒${data.postalCode}`} </span>
          )}
          {v.address1 && data.address1 && <span>{data.address1}</span>}
          {v.address2 && data.address2 && <span> {data.address2}</span>}
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
    </div>
  );
}
