import { setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { SocialProof } from "@/components/social-proof";
import { Features } from "@/components/features";
import { TemplatesShowcase } from "@/components/templates-showcase";
import { HowItWorks } from "@/components/how-it-works";
import { CompareSection } from "@/components/compare-section";
import { CTASection } from "@/components/cta-section";
import { FAQ } from "@/components/faq";
import { Footer } from "@/components/footer";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LandingPage({
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
        <Hero />
        <SocialProof />
        <Features />
        <TemplatesShowcase />
        <HowItWorks />
        <CompareSection />
        <CTASection />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
