"use client";
import { useState } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useSignatureStore } from "@/store/signature-store";
import { Cloud, Plus, Trash2, Lock } from "lucide-react";
import { useTranslations } from "next-intl";

const FREE_LIMIT = 3;

export function SignatureManager() {
  const { user, cloudSignatures, saveSignature, deleteSignature } =
    useAuthStore();
  const { data, style, setData } = useSignatureStore();
  const [saveName, setSaveName] = useState("");
  const [saving, setSaving] = useState(false);
  const t = useTranslations();

  if (!user) return null;

  const canCreate = user.plan === "pro" || cloudSignatures.length < FREE_LIMIT;

  const handleLoad = (sig: (typeof cloudSignatures)[0]) => {
    // Load cloud signature data into local store
    setData(sig.data as Parameters<typeof setData>[0]);
  };

  const handleSave = async () => {
    if (!saveName.trim()) return;
    setSaving(true);
    await saveSignature(saveName.trim(), data, style);
    setSaveName("");
    setSaving(false);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold uppercase tracking-wider text-[var(--color-brand-text-muted)]">
          {t("auth.mySignatures")}
        </h3>
        <span className="text-[10px] text-[var(--color-brand-text-muted)]">
          {cloudSignatures.length}/{user.plan === "pro" ? "∞" : FREE_LIMIT}
        </span>
      </div>

      {/* Saved signatures list */}
      <div className="space-y-1.5">
        {cloudSignatures.map((sig) => (
          <div
            key={sig.id}
            className="flex items-center gap-2 rounded-lg border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-3 py-2"
          >
            <Cloud className="h-3.5 w-3.5 shrink-0 text-[var(--color-brand-primary)]" />
            <span className="flex-1 truncate text-xs font-medium text-[var(--color-brand-text)]">
              {sig.name}
            </span>
            <button
              onClick={() => handleLoad(sig)}
              className="rounded px-2 py-0.5 text-[10px] font-semibold text-[var(--color-brand-primary)] hover:bg-[var(--color-brand-primary)]/10 transition-colors cursor-pointer"
            >
              {t("auth.load")}
            </button>
            <button
              onClick={() => deleteSignature(sig.id)}
              className="rounded p-0.5 text-[var(--color-brand-text-muted)] hover:text-destructive transition-colors cursor-pointer"
            >
              <Trash2 className="h-3 w-3" />
            </button>
          </div>
        ))}
        {cloudSignatures.length === 0 && (
          <p className="text-center text-[11px] text-[var(--color-brand-text-muted)] py-2">
            {t("auth.noSignatures")}
          </p>
        )}
      </div>

      {/* Save current as new */}
      {canCreate ? (
        <div className="flex gap-1.5">
          <input
            type="text"
            value={saveName}
            onChange={(e) => setSaveName(e.target.value)}
            placeholder={t("auth.signatureName")}
            className="flex-1 rounded-lg border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-xs focus:outline-none focus:border-[var(--color-brand-primary)]"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <button
            onClick={handleSave}
            disabled={!saveName.trim() || saving}
            className="flex items-center gap-1 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white disabled:opacity-50 hover:opacity-90 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            {saving ? "..." : t("auth.saveNew")}
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
          <Lock className="h-3.5 w-3.5 text-amber-500" />
          <span className="text-[11px] text-amber-700">
            {t("auth.freeLimitReached", { limit: FREE_LIMIT })}
          </span>
        </div>
      )}
    </div>
  );
}
