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
    <div className="space-y-4">
      <div className="text-xs text-slate-500">
        {t("gmail.instructions")}
        <a
          href="https://console.cloud.google.com/apis/credentials"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 inline-flex items-center gap-0.5 text-sky-500 hover:underline"
        >
          {t("gmail.consoleLink")}
          <ExternalLink className="h-3 w-3" />
        </a>
      </div>

      {/* Client ID Input */}
      <div>
        <label className="mb-1 block text-xs font-medium text-slate-700">
          {t("gmail.clientIdLabel")}
        </label>
        <input
          type="text"
          value={clientId}
          onChange={(e) => handleClientIdChange(e.target.value)}
          placeholder={t("gmail.clientIdPlaceholder")}
          className="w-full rounded-md border border-slate-200 px-3 py-2 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-3">
        {status !== "connected" ? (
          <button
            onClick={handleConnect}
            disabled={status === "loading" || !clientId.trim()}
            className="flex items-center gap-2 rounded-md bg-sky-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-sky-600 disabled:opacity-50"
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
            className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-green-700 disabled:opacity-50"
          >
            {updating && <Loader2 className="h-4 w-4 animate-spin" />}
            {t("gmail.updateSignature")}
          </button>
        )}
      </div>

      {/* Status */}
      {statusMessage && (
        <div
          className={`flex items-center gap-2 rounded-md px-3 py-2 text-xs ${
            status === "connected"
              ? "bg-green-50 text-green-700"
              : status === "error"
                ? "bg-red-50 text-red-700"
                : "bg-sky-50 text-sky-700"
          }`}
        >
          {status === "connected" && <CheckCircle className="h-3.5 w-3.5" />}
          {status === "error" && <AlertCircle className="h-3.5 w-3.5" />}
          {status === "loading" && (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          )}
          {statusMessage}
        </div>
      )}
    </div>
  );
}
