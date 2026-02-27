"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import { getFontFamilyCss, formatPhoneForLink, getSocialIconSvg } from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";

interface TemplateProps {
  data: SignatureData;
  style: SignatureStyle;
  className?: string;
}

export function TemplateElegant({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const isNoBorder = style.borderStyle === "none";
  const borderWidth = style.borderStyle === "double" ? "3px" : "1px";
  const elegantBorderCss = isNoBorder ? "none" : `${borderWidth} ${style.borderStyle} ${style.borderColor}`;

  const linkStyle: React.CSSProperties = {
    color: style.textColor,
    textDecoration: "none",
  };

  const centerStyle: React.CSSProperties = {
    textAlign: "center" as const,
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
        padding: "16px 24px",
      }}
    >
      {/* Top border — thin */}
      <div
        style={{
          borderTop: elegantBorderCss,
          marginBottom: "20px",
        }}
      />

      {/* Logo centered */}
      {v.logo && data.logoUrl && (
        <div style={{ ...centerStyle, marginBottom: "14px" }}>
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

      {/* Person name — centered, large */}
      {v.personName && data.personName && (
        <div
          style={{
            ...centerStyle,
            fontSize: `${fontSize + 6}px`,
            fontWeight: 600,
            color: style.primaryColor,
            letterSpacing: "0.06em",
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
            ...centerStyle,
            fontSize: `${fontSize - 2}px`,
            opacity: 0.5,
            marginTop: "4px",
            letterSpacing: "0.1em",
          }}
        >
          {data.nameReading}
        </div>
      )}

      {/* Department + Job title — centered */}
      {(v.department && data.department || v.jobTitle && data.jobTitle) && (
        <div style={{ ...centerStyle, fontSize: `${fontSize - 2}px`, opacity: 0.6, marginTop: "4px", letterSpacing: "0.08em" }}>
          {[v.department && data.department, v.jobTitle && data.jobTitle].filter(Boolean).join(" ・ ")}
        </div>
      )}

      {/* Company name — centered, small */}
      {v.companyName && data.companyName && (
        <div
          style={{
            ...centerStyle,
            fontSize: `${fontSize - 1}px`,
            color: style.accentColor,
            fontWeight: 500,
            marginTop: "6px",
          }}
        >
          {data.companyName}
        </div>
      )}

      {/* Centered dot divider */}
      <div
        style={{
          ...centerStyle,
          margin: "16px 0",
          fontSize: `${fontSize - 2}px`,
          opacity: 0.35,
          letterSpacing: "6px",
          color: style.accentColor,
        }}
      >
        · · ·
      </div>

      {/* Contact info — centered, each on own line */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "4px",
        }}
      >
        {v.email && data.email && (
          <div style={centerStyle}>
            <a href={`mailto:${data.email}`} style={linkStyle}>
              {data.email}
            </a>
          </div>
        )}

        {v.phone && data.phone && (
          <div style={centerStyle}>
            <a
              href={`tel:${formatPhoneForLink(data.phone)}`}
              style={linkStyle}
            >
              {data.phone}
            </a>
          </div>
        )}

        {v.webUrl && data.webUrl && (
          <div style={centerStyle}>
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

      {/* Address — centered at bottom */}
      {(v.postalCode || v.address1 || v.address2) && (
        <div
          style={{
            ...centerStyle,
            marginTop: "12px",
            fontSize: `${fontSize - 2}px`,
            opacity: 0.55,
            lineHeight: 1.6,
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
      )}

      {/* Social links */}
      {v.socialLinks && data.socialLinks && data.socialLinks.length > 0 && (
        <div style={{ marginTop: "10px", display: "flex", gap: "5px", flexWrap: "wrap", justifyContent: "center" }}>
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
          textAlign: "center",
        }}>
          {data.disclaimer}
        </div>
      )}

      {/* Bottom border — thin */}
      <div
        style={{
          borderBottom: elegantBorderCss,
          marginTop: "20px",
        }}
      />
    </div>
  );
}
