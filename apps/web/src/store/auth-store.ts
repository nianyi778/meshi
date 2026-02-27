"use client";

import { create } from "zustand";

export interface AuthUser {
  userId: number;
  email: string;
  name: string;
  plan: "free" | "pro";
}

interface CloudSignature {
  id: number;
  name: string;
  data: Record<string, unknown>;
  style: Record<string, unknown>;
  isDefault: boolean;
  updatedAt: number;
}

interface AuthStore {
  user: AuthUser | null;
  isLoading: boolean;
  cloudSignatures: CloudSignature[];

  fetchUser: () => Promise<void>;
  logout: () => Promise<void>;
  fetchSignatures: () => Promise<void>;
  saveSignature: (
    name: string,
    data: unknown,
    style: unknown,
  ) => Promise<{ id: number } | { error: string }>;
  updateSignature: (
    id: number,
    updates: { name?: string; data?: unknown; style?: unknown },
  ) => Promise<void>;
  deleteSignature: (id: number) => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  isLoading: true,
  cloudSignatures: [],

  fetchUser: async () => {
    try {
      const res = await fetch("/api/auth/me");
      const { user } = (await res.json()) as { user: AuthUser | null };
      set({ user, isLoading: false });
      if (user) get().fetchSignatures();
    } catch {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    set({ user: null, cloudSignatures: [] });
  },

  fetchSignatures: async () => {
    try {
      const res = await fetch("/api/signatures");
      if (!res.ok) return;
      const { signatures } = (await res.json()) as {
        signatures: CloudSignature[];
      };
      set({ cloudSignatures: signatures });
    } catch {
      /* ignore */
    }
  },

  saveSignature: async (name, data, style) => {
    const res = await fetch("/api/signatures", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, data, style }),
    });
    const json = (await res.json()) as {
      signature?: { id: number };
      error?: string;
    };
    if (!res.ok) return { error: json.error ?? "Failed to save" };
    await get().fetchSignatures();
    return { id: json.signature!.id };
  },

  updateSignature: async (id, updates) => {
    await fetch(`/api/signatures/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    await get().fetchSignatures();
  },

  deleteSignature: async (id) => {
    await fetch(`/api/signatures/${id}`, { method: "DELETE" });
    set((s) => ({
      cloudSignatures: s.cloudSignatures.filter((sig) => sig.id !== id),
    }));
  },
}));
