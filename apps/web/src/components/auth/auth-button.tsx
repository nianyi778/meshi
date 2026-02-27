"use client";
import { useEffect } from "react";
import { useAuthStore } from "@/store/auth-store";
import { useSignatureStore } from "@/store/signature-store";
import { Github, LogOut, User, Cloud, CloudOff } from "lucide-react";
import { useTranslations } from "next-intl";

const FREE_LIMIT = 3;

export function AuthButton() {
  const { user, isLoading, cloudSignatures, fetchUser, logout, saveSignature } =
    useAuthStore();
  const { data, style } = useSignatureStore();
  const t = useTranslations();

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleSave = async () => {
    const result = await saveSignature("My Signature", data, style);
    if ("error" in result && result.error === "free_limit_reached") {
      alert(
        `Free plan allows ${FREE_LIMIT} signatures. Upgrade to Pro for unlimited.`,
      );
    }
  };

  if (isLoading) {
    return (
      <div className="h-9 w-24 animate-pulse rounded-lg bg-[var(--color-brand-border)]" />
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-2">
        <button
          onClick={handleSave}
          className="flex items-center gap-1.5 rounded-lg border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-text)] hover:border-[var(--color-brand-primary)]/40 transition-all cursor-pointer"
        >
          <Cloud className="h-3.5 w-3.5 text-[var(--color-brand-primary)]" />
          {t("auth.save")} ({cloudSignatures.length}/
          {user.plan === "pro" ? "∞" : FREE_LIMIT})
        </button>
        <div className="flex items-center gap-1.5 text-xs text-[var(--color-brand-text-muted)]">
          <User className="h-3.5 w-3.5" />
          <span className="max-w-[120px] truncate">{user.name}</span>
        </div>
        <button
          onClick={logout}
          className="rounded-lg border border-[var(--color-brand-border)] p-1.5 text-[var(--color-brand-text-muted)] hover:text-destructive hover:border-destructive/30 transition-all cursor-pointer"
          title={t("auth.logout")}
        >
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs text-[var(--color-brand-text-muted)] flex items-center gap-1">
        <CloudOff className="h-3.5 w-3.5" />
        {t("auth.notLoggedIn")}
      </span>
      <a
        href="/api/auth/google"
        className="flex items-center gap-1.5 rounded-lg bg-[var(--color-brand-primary)] px-3 py-1.5 text-xs font-semibold text-white hover:opacity-90 transition-all cursor-pointer"
      >
        <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        Google
      </a>
      <a
        href="/api/auth/github"
        className="flex items-center gap-1.5 rounded-lg border border-[var(--color-brand-border)] bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-brand-text)] hover:border-[var(--color-brand-primary)]/40 transition-all cursor-pointer"
      >
        <Github className="h-3.5 w-3.5" />
        GitHub
      </a>
    </div>
  );
}
