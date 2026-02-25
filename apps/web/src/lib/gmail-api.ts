/* eslint-disable @typescript-eslint/no-explicit-any */

// Type declarations for Google Identity Services
declare global {
  interface Window {
    google?: {
      accounts: {
        oauth2: {
          initTokenClient(config: {
            client_id: string;
            scope: string;
            callback: (response: TokenResponse) => void;
          }): TokenClient;
          hasGrantedAllScopes(
            response: TokenResponse,
            ...scopes: string[]
          ): boolean;
        };
      };
    };
  }
}

interface TokenResponse {
  access_token: string;
  error?: string;
  error_description?: string;
}

interface TokenClient {
  requestAccessToken(): void;
}

const GMAIL_SCOPE = "https://www.googleapis.com/auth/gmail.settings.basic";
const GIS_SCRIPT_URL = "https://accounts.google.com/gsi/client";

/**
 * Load Google Identity Services script
 */
export function loadGisScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.oauth2) {
      resolve();
      return;
    }

    const existing = document.querySelector(
      `script[src="${GIS_SCRIPT_URL}"]`
    );
    if (existing) {
      existing.addEventListener("load", () => resolve());
      return;
    }

    const script = document.createElement("script");
    script.src = GIS_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google Identity Services"));
    document.head.appendChild(script);
  });
}

/**
 * Initialize Gmail OAuth and request access token
 */
export function initGmailAuth(
  clientId: string,
  onSuccess: (token: string) => void,
  onError: (error: string) => void
): void {
  if (!window.google?.accounts?.oauth2) {
    onError("Google Identity Services が読み込まれていません");
    return;
  }

  const tokenClient = window.google.accounts.oauth2.initTokenClient({
    client_id: clientId,
    scope: GMAIL_SCOPE,
    callback: (response: TokenResponse) => {
      if (response.error) {
        onError(
          response.error_description ?? `認証エラー: ${response.error}`
        );
        return;
      }

      if (
        !window.google?.accounts.oauth2.hasGrantedAllScopes(
          response,
          GMAIL_SCOPE
        )
      ) {
        onError("Gmail設定のアクセス権限が付与されませんでした");
        return;
      }

      onSuccess(response.access_token);
    },
  });

  tokenClient.requestAccessToken();
}

/**
 * Set Gmail signature via API
 */
export async function setGmailSignature(
  accessToken: string,
  signatureHtml: string
): Promise<{ success: boolean; email?: string; error?: string }> {
  try {
    // Step 1: Get primary sendAs address
    const listResp = await fetch(
      "https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    if (!listResp.ok) {
      const err = await listResp.json();
      return {
        success: false,
        error: `sendAs一覧の取得に失敗: ${err.error?.message ?? listResp.status}`,
      };
    }

    const { sendAs } = (await listResp.json()) as {
      sendAs: Array<{ sendAsEmail: string; isPrimary: boolean }>;
    };
    const primary = sendAs.find((a) => a.isPrimary);

    if (!primary) {
      return { success: false, error: "プライマリメールアドレスが見つかりません" };
    }

    // Step 2: PATCH signature
    const patchResp = await fetch(
      `https://gmail.googleapis.com/gmail/v1/users/me/settings/sendAs/${encodeURIComponent(primary.sendAsEmail)}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ signature: signatureHtml }),
      }
    );

    if (!patchResp.ok) {
      const err = await patchResp.json();
      return {
        success: false,
        error: `署名の更新に失敗: ${err.error?.message ?? patchResp.status}`,
      };
    }

    const result = (await patchResp.json()) as { sendAsEmail: string };
    return { success: true, email: result.sendAsEmail };
  } catch (err: any) {
    return {
      success: false,
      error: `通信エラー: ${err.message ?? "不明なエラー"}`,
    };
  }
}
