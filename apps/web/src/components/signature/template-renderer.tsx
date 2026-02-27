"use client";

import type { SignatureData, SignatureStyle } from "@meishi/core/types";
import { TemplateClassic } from "./template-classic";
import { TemplateModern } from "./template-modern";
import { TemplateMinimal } from "./template-minimal";
import { TemplateCorporate } from "./template-corporate";
import { TemplateElegant } from "./template-elegant";
import { TemplateCreative } from "./template-creative";
import { TemplateProfessional } from "./template-professional";

interface TemplateRendererProps {
  data: SignatureData;
  style: SignatureStyle;
}

export default function TemplateRenderer({
  data,
  style,
}: TemplateRendererProps) {
  switch (style.templateId) {
    case "classic":
      return <TemplateClassic data={data} style={style} />;
    case "modern":
      return <TemplateModern data={data} style={style} />;
    case "minimal":
      return <TemplateMinimal data={data} style={style} />;
    case "corporate":
      return <TemplateCorporate data={data} style={style} />;
    case "elegant":
      return <TemplateElegant data={data} style={style} />;
    case "creative":
      return <TemplateCreative data={data} style={style} />;
    case "professional":
      return <TemplateProfessional data={data} style={style} />;
    default: {
      const _exhaustive: never = style.templateId;
      return <TemplateClassic data={data} style={style} />;
    }
  }
}
