import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { LegalPage } from "@/components/legal-page";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const LAST_UPDATED = "2026-02-25";

const SECTION_KEYS = ["acceptance", "service", "prohibited", "disclaimer", "changes"];

export default async function TermsPage({
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
          titleKey="landing.terms.title"
          lastUpdatedKey="landing.terms.lastUpdated"
          introKey="landing.terms.intro"
          sectionKeys={SECTION_KEYS}
          sectionsNsKey="landing.terms.sections"
          date={LAST_UPDATED}
        />
      </main>
      <Footer />
    </>
  );
}
