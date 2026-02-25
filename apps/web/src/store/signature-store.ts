"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type {
  SignatureData,
  SignatureStyle,
  FieldVisibility,
  TemplateId,
  FontFamily,
  BorderStyle,
} from "@meishi/core/types";
import {
  DEFAULT_SIGNATURE_DATA,
  DEFAULT_SIGNATURE_STYLE,
  TEMPLATE_MAP,
} from "@meishi/core/constants";

interface SignatureStore {
  // State
  data: SignatureData;
  style: SignatureStyle;

  // Data actions
  updateField: <K extends keyof SignatureData>(
    key: K,
    value: SignatureData[K]
  ) => void;
  setData: (data: Partial<SignatureData>) => void;
  resetData: () => void;

  // Style actions
  setTemplate: (id: TemplateId) => void;
  setPrimaryColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setTextColor: (color: string) => void;
  setBackgroundColor: (color: string) => void;
  setFontFamily: (font: FontFamily) => void;
  setFontSize: (size: number) => void;
  setBorderStyle: (style: BorderStyle) => void;
  setBorderColor: (color: string) => void;
  toggleFieldVisibility: (field: keyof FieldVisibility) => void;
  setFieldVisibility: (visibility: Partial<FieldVisibility>) => void;
  resetStyle: () => void;

  // Full reset
  resetAll: () => void;
}

export const useSignatureStore = create<SignatureStore>()(
  persist(
    (set) => ({
      data: { ...DEFAULT_SIGNATURE_DATA },
      style: { ...DEFAULT_SIGNATURE_STYLE },

      // Data actions
      updateField: (key, value) =>
        set((state) => ({
          data: { ...state.data, [key]: value },
        })),

      setData: (data) =>
        set((state) => ({
          data: { ...state.data, ...data },
        })),

      resetData: () =>
        set({ data: { ...DEFAULT_SIGNATURE_DATA } }),

      // Style actions
      setTemplate: (id) =>
        set((state) => {
          const template = TEMPLATE_MAP[id];
          if (!template) return state;
          return {
            style: {
              ...state.style,
              ...template.defaultStyle,
              templateId: id,
            },
          };
        }),

      setPrimaryColor: (color) =>
        set((state) => ({
          style: { ...state.style, primaryColor: color },
        })),

      setAccentColor: (color) =>
        set((state) => ({
          style: { ...state.style, accentColor: color },
        })),

      setTextColor: (color) =>
        set((state) => ({
          style: { ...state.style, textColor: color },
        })),

      setBackgroundColor: (color) =>
        set((state) => ({
          style: { ...state.style, backgroundColor: color },
        })),

      setFontFamily: (font) =>
        set((state) => ({
          style: { ...state.style, fontFamily: font },
        })),

      setFontSize: (size) =>
        set((state) => ({
          style: { ...state.style, fontSize: size },
        })),

      setBorderStyle: (borderStyle) =>
        set((state) => ({
          style: { ...state.style, borderStyle },
        })),

      setBorderColor: (color) =>
        set((state) => ({
          style: { ...state.style, borderColor: color },
        })),

      toggleFieldVisibility: (field) =>
        set((state) => ({
          style: {
            ...state.style,
            fieldVisibility: {
              ...state.style.fieldVisibility,
              [field]: !state.style.fieldVisibility[field],
            },
          },
        })),

      setFieldVisibility: (visibility) =>
        set((state) => ({
          style: {
            ...state.style,
            fieldVisibility: {
              ...state.style.fieldVisibility,
              ...visibility,
            },
          },
        })),

      resetStyle: () =>
        set({ style: { ...DEFAULT_SIGNATURE_STYLE } }),

      resetAll: () =>
        set({
          data: { ...DEFAULT_SIGNATURE_DATA },
          style: { ...DEFAULT_SIGNATURE_STYLE },
        }),
    }),
    {
      name: "meishi-signature-store",
    }
  )
);
