"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import {
  getFontFamilyCss,
  formatPhoneForLink,
  getSocialIconSvg,
} from "@meishi/core/utils";
import { SOCIAL_PLATFORMS } from "@meishi/core/constants";
import { QRCodeDisplay } from "./qr-code-display";

interface TemplateProps {
  data: SignatureData;
  style: SignatureStyle;
  className?: string;
}

export function TemplateCreative({ data, style, className }: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

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
      }}
    >
      {/* Top gradient bar */}
      <div
        style={{
          height: "6px",
          borderRadius: "3px 3px 0 0",
          background: `linear-gradient(135deg, ${style.primaryColor}, ${style.accentColor})`,
          marginBottom: "14px",
        }}
      />

      {/* Two-column layout */}
      <table
        cellPadding={0}
        cellSpacing={0}
        style={{
          border: "none",
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <tbody>
          <tr>
            {/* Left column: Identity */}
            <td
              style={{
                verticalAlign: "top",
                paddingRight: "16px",
                width: "50%",
              }}
            >
              {/* Logo */}
              {v.logo && data.logoUrl && (
                <div style={{ marginBottom: "10px" }}>
                  <img
                    src={data.logoUrl}
                    alt={data.companyName || "ロゴ"}
                    style={{
                      maxHeight: "36px",
                      maxWidth: "140px",
                      objectFit: "contain",
                    }}
                  />
                </div>
              )}

              {/* Person name */}
              {v.personName && data.personName && (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: `${fontSize + 4}px`,
                    color: style.primaryColor,
                    lineHeight: 1.3,
                    marginBottom: "2px",
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
                    opacity: 0.6,
                    marginBottom: "4px",
                  }}
                >
                  {data.nameReading}
                </div>
              )}

              {/* Department / Job title */}
              {((v.department && data.department) ||
                (v.jobTitle && data.jobTitle)) && (
                <div
                  style={{
                    fontSize: `${fontSize - 1}px`,
                    color: style.accentColor,
                    fontWeight: 600,
                    marginBottom: "4px",
                  }}
                >
                  {[
                    v.department && data.department,
                    v.jobTitle && data.jobTitle,
                  ]
                    .filter(Boolean)
                    .join(" / ")}
                </div>
              )}

              {/* Company name */}
              {v.companyName && data.companyName && (
                <div
                  style={{
                    fontSize: `${fontSize - 1}px`,
                    fontWeight: 500,
                    opacity: 0.8,
                  }}
                >
                  {data.companyName}
                </div>
              )}
            </td>

            {/* Right column: Contact details */}
            <td
              style={{
                verticalAlign: "top",
                paddingLeft: "16px",
                borderLeft: `2px solid ${style.accentColor}`,
                width: "50%",
              }}
            >
              {/* Email */}
              {v.email && data.email && (
                <div
                  style={{ marginBottom: "4px", fontSize: `${fontSize - 1}px` }}
                >
                  <span style={{ opacity: 0.5 }}>✉ </span>
                  <a href={`mailto:${data.email}`} style={linkStyle}>
                    {data.email}
                  </a>
                </div>
              )}

              {/* Phone */}
              {v.phone && data.phone && (
                <div
                  style={{ marginBottom: "4px", fontSize: `${fontSize - 1}px` }}
                >
                  <span style={{ opacity: 0.5 }}>📱 </span>
                  <a
                    href={`tel:${formatPhoneForLink(data.phone)}`}
                    style={linkStyle}
                  >
                    {data.phone}
                  </a>
                </div>
              )}

              {/* Web URL */}
              {v.webUrl && data.webUrl && (
                <div
                  style={{ marginBottom: "4px", fontSize: `${fontSize - 1}px` }}
                >
                  <span style={{ opacity: 0.5 }}>🌐 </span>
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

              {/* Address */}
              {(v.postalCode || v.address1 || v.address2) && (
                <div
                  style={{ marginBottom: "4px", fontSize: `${fontSize - 1}px` }}
                >
                  <span style={{ opacity: 0.5 }}>📍 </span>
                  {v.postalCode && data.postalCode && (
                    <span>{`〒${data.postalCode} `}</span>
                  )}
                  {v.address1 && data.address1 && <span>{data.address1}</span>}
                  {v.address2 && data.address2 && (
                    <div style={{ paddingLeft: "20px" }}>{data.address2}</div>
                  )}
                </div>
              )}

              {/* Social links */}
              {v.socialLinks &&
                data.socialLinks &&
                data.socialLinks.length > 0 && (
                  <div
                    style={{
                      marginTop: "8px",
                      display: "flex",
                      gap: "5px",
                      flexWrap: "wrap",
                    }}
                  >
                    {data.socialLinks.map((link, i) => {
                      const platform = SOCIAL_PLATFORMS.find(
                        (p) => p.id === link.platform,
                      );
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
                          dangerouslySetInnerHTML={{
                            __html: getSocialIconSvg(link.platform),
                          }}
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
            </td>
          </tr>
        </tbody>
      </table>

      {/* Disclaimer */}
      {v.disclaimer && data.disclaimer && (
        <div
          style={{
            marginTop: "12px",
            paddingTop: "8px",
            borderTop: `1px solid ${style.borderColor}`,
            fontSize: `${Math.max(fontSize - 2, 10)}px`,
            color: style.textColor,
            opacity: 0.6,
            lineHeight: 1.5,
            fontFamily,
            whiteSpace: "pre-wrap",
          }}
        >
          {data.disclaimer}
        </div>
      )}
    </div>
  );
}
