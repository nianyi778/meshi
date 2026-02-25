"use client";

import { useState, useCallback, useEffect } from "react";
import { useTranslations } from "next-intl";
import { Loader2, CheckCircle, AlertCircle, ExternalLink } from "lucide-react";
import { useSignatureStore } from "@/store/signature-store";
import { generateGmailHtml } from "@/lib/export-utils";
import {
  loadGisScript,
  initGmailAuth,
  setGmailSignature,
} from "@/lib/gmail-api";

type ConnectionStatus = "disconnected" | "loading" | "connected" | "error";

const CLIENT_ID_KEY = "meishi-google-client-id";

export function GmailIntegration() {
  const { data, style } = useSignatureStore();
  const [clientId, setClientId] = useState("");
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("disconnected");
  const [statusMessage, setStatusMessage] = useState("");
  const [updating, setUpdating] = useState(false);
  const t = useTranslations();

  // Load saved client ID
  useEffect(() => {
    const saved = localStorage.getItem(CLIENT_ID_KEY);
    if (saved) setClientId(saved);
  }, []);

  // Save client ID to localStorage
  const handleClientIdChange = useCallback((value: string) => {
    setClientId(value);
    localStorage.setItem(CLIENT_ID_KEY, value);
  }, []);

  // Connect to Google
  const handleConnect = useCallback(async () => {
    if (!clientId.trim()) {
      setStatus("error");
      setStatusMessage(t("gmail.enterClientId"));
      return;
    }

    setStatus("loading");
    setStatusMessage(t("gmail.connecting"));

    try {
      await loadGisScript();

      initGmailAuth(
        clientId.trim(),
        (token) => {
          setAccessToken(token);
          setStatus("connected");
          setStatusMessage(t("gmail.connected"));
        },
        (error) => {
          setStatus("error");
          setStatusMessage(error);
        }
      );
    } catch (err) {
      setStatus("error");
      setStatusMessage(
        err instanceof Error ? err.message : t("gmail.connectionFailed")
      );
    }
  }, [clientId, t]);

  // Update Gmail signature
  const handleUpdateSignature = useCallback(async () => {
    if (!accessToken) return;

    setUpdating(true);
    setStatusMessage(t("gmail.updating"));

    const html = generateGmailHtml(data, style);
    const result = await setGmailSignature(accessToken, html);

    setUpdating(false);

    if (result.success) {
      setStatusMessage(`✅ ${t("gmail.updated", { email: result.email ?? "" })}`);
    } else {
      setStatus("error");
      setStatusMessage(result.error ?? t("gmail.updateFailed"));
    }
  }, [accessToken, data, style, t]);

  return (
    <div className="space-y-5">
      <p className="text-xs leading-relaxed text-[var(--color-brand-text-muted)]">
        {t("gmail.instructions")}
        <a
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-center gap-0.5 font-medium text-[var(--color-brand-primary)] transition-colors duration-200 hover:text-[var(--color-brand-dark)] hover:underline cursor-pointer"
        >
          {t("gmail.consoleLink")}
          <ExternalLink className="h-3 w-3" />
        </a>
      </p>

      {/* Client ID Input */}
      <div className="space-y-1.5">
        <label className="block text-[11px] font-semibold tracking-wider text-[var(--color-brand-text-muted)] uppercase">
          {t("gmail.clientIdLabel")}
        </label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => handleClientIdChange(e.target.value)}
          placeholder={t("gmail.clientIdPlaceholder")}
          className="w-full rounded-xl border border-[var(--color-brand-border)] bg-[var(--color-brand-surface)] px-3.5 py-2.5 text-sm text-[var(--color-brand-text)] transition-all duration-200 placeholder:text-[var(--color-brand-text-muted)]/50 focus:border-[var(--color-brand-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-brand-primary)]/10"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {status !== "connected" ? (
          <button
            onClick={handleConnect}
            disabled={status === "loading" || !clientId.trim()}
            className="flex items-center gap-2 rounded-xl bg-[var(--color-brand-primary)] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[var(--color-brand-dark)] hover:shadow-md disabled:opacity-50 cursor-pointer"
          >
            {status === "loading" && (
              <Loader2 className="h-4 w-4 animate-spin" />
            )}
            {t("gmail.connect")}
          </button>
        ) : (
          <button
            onClick={handleUpdateSignature}
            disabled={updating}
            className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-emerald-700 hover:shadow-md disabled:opacity-50 cursor-pointer"
          >
            {updating && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("gmail.updateSignature")}
          </button>
        )}
      </div>

      {/* Status */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-medium ${
            status === "connected"
              ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
              : status === "error"
                ? "bg-red-50 text-red-700 border border-red-200"
                : "bg-[var(--color-brand-bg)] text-[var(--color-brand-primary)] border border-[var(--color-brand-border)]"
          }`}
        >
          {status === "connected" && <CheckCircle className="h-3.5 w-3.5 shrink-0" />}
          {status === "error" && <AlertCircle className="h-3.5 w-3.5 shrink-0" />}
          {status === "loading" && (
            <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" />
          )}
          {statusMessage}
        </div>
      )}
    </div>
  );
}
