import { CtaSection } from "@/components/landing/cta-section";
import { ExplanationSection } from "@/components/landing/explanation-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { LandingFooter } from "@/components/landing/landing-footer";
import { LandingHeader } from "@/components/landing/landing-header";

export default function Home() {
  return (
    <main className="bg-background text-foreground min-h-screen">
      <LandingHeader />
      <HeroSection />
      <ExplanationSection />
      <HowItWorksSection />
      <CtaSection />
      <LandingFooter />
    </main>
  );
}
