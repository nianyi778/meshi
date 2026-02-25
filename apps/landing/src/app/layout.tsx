import type { Metadata } from "next";
import "@meishi/ui/globals.css";
import "./app.css";

export const metadata: Metadata = {
  title: "Meishi (名刺) — プロフェッショナルなメール署名ジェネレーター",
  description:
    "30秒でプロフェッショナルなメール署名を作成。5つのテンプレート、フルカスタマイズ、PNG・HTML・Gmail対応。完全無料。",
  keywords: ["メール署名", "名刺", "ビジネスカード", "Gmail署名", "email signature generator"],
  openGraph: {
    title: "Meishi (名刺) — プロフェッショナルなメール署名ジェネレーター",
    description: "30秒でプロフェッショナルなメール署名を作成。完全無料。",
    type: "website",
  },
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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Noto+Sans+JP:wght@300;400;500;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
