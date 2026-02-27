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

export function TemplateProfessional({
  data,
  style,
  className,
}: TemplateProps) {
  const v = style.fieldVisibility;
  const fontFamily = getFontFamilyCss(style.fontFamily);
  const fontSize = style.fontSize;

  const labelStyle: React.CSSProperties = {
    fontSize: `${fontSize - 2}px`,
    color: style.accentColor,
    fontWeight: 600,
    textTransform: "uppercase",
    letterSpacing: "0.05em",
    marginBottom: "1px",
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
        lineHeight: 1.7,
      }}
    >
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
            {/* Left dark panel: Identity */}
            <td
              style={{
                verticalAlign: "top",
                backgroundColor: style.primaryColor,
                color: "#FFFFFF",
                padding: "20px 16px",
                width: "40%",
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
                      maxWidth: "120px",
                      objectFit: "contain",
                      filter: "brightness(0) invert(1)",
                    }}
                  />
                </div>
              )}

              {/* Person name */}
              {v.personName && data.personName && (
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: `${fontSize + 3}px`,
                    color: "#FFFFFF",
                    lineHeight: 1.3,
                    marginBottom: "4px",
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
                    color: "rgba(255,255,255,0.7)",
                    marginBottom: "6px",
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
                    color: "rgba(255,255,255,0.8)",
                    fontWeight: 400,
                  }}
                >
                  {data.companyName}
                </div>
              )}
            </td>

            {/* Right light panel: Contact details */}
            <td
              style={{
                verticalAlign: "top",
                backgroundColor: style.backgroundColor,
                color: style.textColor,
                padding: "20px 16px",
                borderLeft: `3px solid ${style.accentColor}`,
                width: "60%",
              }}
            >
              {/* Email */}
              {v.email && data.email && (
                <div style={{ marginBottom: "8px" }}>
                  <div style={labelStyle}>Email</div>
                  <a href={`mailto:${data.email}`} style={linkStyle}>
                    {data.email}
                  </a>
                </div>
              )}

              {/* Phone */}
              {v.phone && data.phone && (
                <div style={{ marginBottom: "8px" }}>
                  <div style={labelStyle}>Tel</div>
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
                <div style={{ marginBottom: "8px" }}>
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

              {/* Address */}
              {((v.postalCode && data.postalCode) ||
                (v.address1 && data.address1) ||
                (v.address2 && data.address2)) && (
                <div style={{ marginBottom: "8px" }}>
                  <div style={labelStyle}>Address</div>
                  {v.postalCode && data.postalCode && (
                    <div>{`〒${data.postalCode}`}</div>
                  )}
                  {v.address1 && data.address1 && <div>{data.address1}</div>}
                  {v.address2 && data.address2 && <div>{data.address2}</div>}
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
                  <QRCodeDisplay url={data.webUrl} size={60} color={style.accentColor} />
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
