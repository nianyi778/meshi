import type { Metadata } from "next";
import "@meishi/ui/globals.css";
import "./app.css";

export const metadata: Metadata = {
  title: "Meishi (名刺) — プロフェッショナルなメール署名を無料で作成",
  description:
    "30秒でプロフェッショナルなメール署名を作成。5つのテンプレート、フルカスタマイズ、PNG・HTML・Gmail対応。完全無料。",
  keywords: ["メール署名", "名刺", "ビジネスカード", "Gmail署名", "email signature"],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=M+PLUS+Rounded+1c:wght@400;500;700&family=Noto+Sans+JP:wght@300;400;500;700;900&family=Noto+Serif+JP:wght@400;500;700&family=Zen+Kaku+Gothic+New:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
