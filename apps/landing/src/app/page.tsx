import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { Features } from "@/components/features";
import { HowItWorks } from "@/components/how-it-works";
import { TemplatesShowcase } from "@/components/templates-showcase";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TemplatesShowcase />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
