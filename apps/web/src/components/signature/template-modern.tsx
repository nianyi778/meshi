"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import { getFontFamilyCss, formatPhoneForLink } from "@meishi/core/utils";

interface TemplateProps {
  data: SignatureData;
  style: SignatureStyle;
  className?: string;
}

export function TemplateModern({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const linkStyle: React.CSSProperties = {
    color: style.textColor,
    textDecoration: "none",
  };

  const labelStyle: React.CSSProperties = {
    fontSize: `${fontSize - 2}px`,
    color: style.accentColor,
    fontWeight: 500,
    textTransform: "uppercase" as const,
    letterSpacing: "0.08em",
    marginBottom: "2px",
  };

  return (
    <div
      className={className}
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        color: style.textColor,
        backgroundColor: style.backgroundColor,
        borderRadius: "12px",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)",
        padding: "24px",
        lineHeight: 1.6,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Header: Name & Logo */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: "16px",
        }}
      >
        <div>
          {/* Company name */}
          {v.companyName && data.companyName && (
            <div
              style={{
                fontSize: `${fontSize - 1}px`,
                color: style.accentColor,
                fontWeight: 600,
                letterSpacing: "0.04em",
                marginBottom: "4px",
              }}
            >
              {data.companyName}
            </div>
          )}

          {/* Person name */}
          {v.personName && data.personName && (
            <div
              style={{
                fontSize: `${fontSize + 4}px`,
                fontWeight: 700,
                color: style.primaryColor,
                lineHeight: 1.3,
              }}
            >
              {data.personName}
            </div>
          )}

          {/* Name reading */}
          {v.nameReading && data.nameReading && (
            <div
              style={{
                fontSize: `${fontSize - 2}px`,
                opacity: 0.55,
                marginTop: "2px",
              }}
            >
              {data.nameReading}
            </div>
          )}
        </div>

        {/* Logo */}
        {v.logo && data.logoUrl && (
          <img
            src={data.logoUrl}
            alt={data.companyName || "ロゴ"}
            style={{
              maxHeight: "44px",
              maxWidth: "100px",
              objectFit: "contain",
              marginLeft: "16px",
              flexShrink: 0,
            }}
          />
        )}
      </div>

      {/* Divider */}
      <div
        style={{
          height: "1px",
          backgroundColor: style.borderColor,
          margin: "0 0 16px 0",
          opacity: 0.5,
        }}
      />

      {/* Contact grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "12px 24px",
        }}
      >
        {/* Email */}
        {v.email && data.email && (
          <div>
            <div style={labelStyle}>Email</div>
            <a href={`mailto:${data.email}`} style={linkStyle}>
              {data.email}
            </a>
          </div>
        )}

        {/* Phone */}
        {v.phone && data.phone && (
          <div>
            <div style={labelStyle}>Phone</div>
            <a
              href={`tel:${formatPhoneForLink(data.phone)}`}
              style={linkStyle}
            >
              {data.phone}
            </a>
          </div>
        )}

        {/* Web */}
        {v.webUrl && data.webUrl && (
          <div>
            <div style={labelStyle}>Web</div>
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
      </div>

      {/* Address block */}
      {(v.postalCode || v.address1 || v.address2) && (
        <div
          style={{
            marginTop: "14px",
            fontSize: `${fontSize - 1}px`,
            opacity: 0.7,
            lineHeight: 1.5,
          }}
        >
          {v.postalCode && data.postalCode && (
            <span>{data.postalCode} </span>
          )}
          {v.address1 && data.address1 && (
            <span>{data.address1}</span>
          )}
          {v.address2 && data.address2 && (
            <span> {data.address2}</span>
          )}
        </div>
      )}
    </div>
  );
}
