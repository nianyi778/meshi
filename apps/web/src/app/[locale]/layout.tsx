import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getMessagesByLocale } from "@meishi/i18n/messages";
import { locales } from "@meishi/i18n";

const SITE_URL = "https://meishi-app.pages.dev";

const OG_LOCALE_MAP: Record<string, string> = {
  ja: "ja_JP",
  en: "en_US",
  zh: "zh_CN",
  ko: "ko_KR",
  th: "th_TH",
  vi: "vi_VN",
  id: "id_ID",
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const msgs = getMessagesByLocale(locale) as Record<string, Record<string, string>>;
  const meta = msgs.metadata?.web as Record<string, string> | undefined;

  const title = meta?.title ?? "Meishi — Email Signature Generator";
  const description = meta?.description ?? "";

  const languages: Record<string, string> = {};
  for (const loc of locales) {
    languages[loc] = `${SITE_URL}/${loc}/generator`;
  }
  languages["x-default"] = `${SITE_URL}/ja/generator`;

  return {
    title,
    description,
    metadataBase: new URL(SITE_URL),
    keywords: meta?.keywords?.split(",") ?? [],
    alternates: {
      canonical: `${SITE_URL}/${locale}/generator`,
      languages,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: `${SITE_URL}/${locale}/generator`,
      siteName: "Meishi (名刺)",
      locale: OG_LOCALE_MAP[locale] ?? "ja_JP",
      images: [
        {
          url: `${SITE_URL}/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Meishi — Email Signature Generator",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/og-image.png`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = await getMessages();

  const webAppJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Meishi (名刺) Signature Generator",
    description:
      "プロフェッショナルなメール署名を30秒で作成できる無料Webアプリ",
    url: `${SITE_URL}/${locale}/generator`,
    applicationCategory: "BusinessApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "JPY",
    },
    browserRequirements: "Requires JavaScript. Requires HTML5.",
    inLanguage: locale,
  };

  return (
    <html lang={locale} suppressHydrationWarning>
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen antialiased">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
