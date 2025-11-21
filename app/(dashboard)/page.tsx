import { HeroSection } from "@/components/sections/hero-section";
import { PricingSection } from "@/components/sections/pricing-section";
import { Footer } from "@/components/footer";
import { Features } from "@/components/sections/features-section";
import { HowItWorks } from "@/components/sections/how-it-works-section";

export default function Home() {
  return (
    <main className="min-h-screen space-y-20">
      <HeroSection />
      <Features />
      <HowItWorks />
      <PricingSection />
      <Footer />
    </main>
  );
}
