"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import { getFontFamilyCss, formatPhoneForLink, getSocialIconSvg } from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";

interface TemplateProps {
  data: SignatureData;
  style: SignatureStyle;
  className?: string;
}

export function TemplateCorporate({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const linkStyle: React.CSSProperties = {
    color: style.textColor,
    textDecoration: "none",
  };

  const contactRowStyle: React.CSSProperties = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    lineHeight: 1.8,
  };

  const iconStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "20px",
    fontSize: `${fontSize - 1}px`,
    flexShrink: 0,
  };

  return (
    <div
      className={className}
      style={{
        fontFamily,
        fontSize: `${fontSize}px`,
        color: style.textColor,
        backgroundColor: style.backgroundColor,
        lineHeight: 1.6,
        display: "flex",
        borderRadius: "4px",
        overflow: "hidden",
      }}
    >
      {/* Left accent bar */}
      <div
        style={{
          width: "4px",
          backgroundColor: style.accentColor,
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <div style={{ padding: "20px 24px", flex: 1 }}>
        {/* Logo */}
        {v.logo && data.logoUrl && (
          <div style={{ marginBottom: "12px" }}>
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

        {/* Department + Job title */}
        {(v.department && data.department || v.jobTitle && data.jobTitle) && (
          <div style={{ fontSize: `${fontSize - 1}px`, color: style.accentColor, marginBottom: "4px" }}>
            {[v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).join(" / ")}
          </div>
        )}

        {/* Person name + reading */}
        {v.personName && data.personName && (
          <div
            style={{
              fontWeight: 600,
              fontSize: `${fontSize + 2}px`,
              lineHeight: 1.4,
            }}
          >
            {data.personName}
            {v.nameReading && data.nameReading && (
              <span
                style={{
                  fontWeight: 400,
                  fontSize: `${fontSize - 1}px`,
                  marginLeft: "8px",
                  opacity: 0.6,
                }}
              >
                {data.nameReading}
              </span>
            )}
          </div>
        )}

        {/* Divider */}
        {style.borderStyle !== "none" && (
        <div
          style={{
            height: style.borderStyle === "double" ? "3px" : "1px",
            backgroundColor: style.borderStyle === "double" ? "transparent" : style.borderColor,
            margin: "12px 0",
            opacity: style.borderStyle === "double" ? 1 : 0.4,
            borderTop: style.borderStyle === "double" ? `1px solid ${style.borderColor}` : undefined,
            borderBottom: style.borderStyle === "double" ? `1px solid ${style.borderColor}` : undefined,
            boxSizing: "border-box" as const,
          }}
        />
        )}

        {/* Contact info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
          {v.email && data.email && (
            <div style={contactRowStyle}>
              <span style={iconStyle}>📧</span>
              <a href={`mailto:${data.email}`} style={linkStyle}>
                {data.email}
              </a>
            </div>
          )}

          {v.phone && data.phone && (
            <div style={contactRowStyle}>
              <span style={iconStyle}>📱</span>
              <a
                href={`tel:${formatPhoneForLink(data.phone)}`}
                style={linkStyle}
              >
                {data.phone}
              </a>
            </div>
          )}

          {v.webUrl && data.webUrl && (
            <div style={contactRowStyle}>
              <span style={iconStyle}>🌐</span>
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

        {/* Address */}
        {(v.postalCode || v.address1 || v.address2) && (
          <div style={{ marginTop: "10px" }}>
            <div style={contactRowStyle}>
              <span style={iconStyle}>📍</span>
              <div
                style={{
                  fontSize: `${fontSize - 1}px`,
                  opacity: 0.75,
                  lineHeight: 1.5,
                }}
              >
                {v.postalCode && data.postalCode && (
                  <div>{`〒${data.postalCode}`}</div>
                )}
                {v.address1 && data.address1 && (
                  <div>{data.address1}</div>
                )}
                {v.address2 && data.address2 && (
                  <div>{data.address2}</div>
                )}
              </div>
            </div>
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
    </div>
  );
}
