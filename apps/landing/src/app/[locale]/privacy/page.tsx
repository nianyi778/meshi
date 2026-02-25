import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LAST_UPDATED = "2026-02-25";

const SECTION_KEYS = ["collect", "use", "cookies", "thirdParty", "contact"];

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main>
        <LegalPage
          titleKey="landing.privacy.title"
          lastUpdatedKey="landing.privacy.lastUpdated"
          introKey="landing.privacy.intro"
          sectionKeys={SECTION_KEYS}
          sectionsNsKey="landing.privacy.sections"
          date={LAST_UPDATED}
        />
      </main>
      <Footer />
    </>
  );
}
