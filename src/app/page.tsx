import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { MetricsSection } from "@/components/home/metrics-section";
import { ServicesSpotlightCarousel } from "@/components/home/services-spotlight-carousel";
import { Security247Section } from "@/components/home/security-247";
import { ProcessJourney } from "@/components/home/process-journey";
import { InfrastructureJourney } from "@/components/home/infrastructure-journey";
import { FinalCtaSection } from "@/components/home/final-cta";
import { PartnersLogoGrid } from "@/components/partners-logo-grid";
import { ProofShowcase } from "@/components/home/proof-bento";
import { TestimonialBlock } from "@/components/testimonial-block";

export const metadata: Metadata = {
  title: "Always-on defence for regulated organisations",
  description:
    "Sayenti delivers 24/7 managed security, cloud migration, cybersecurity, and high-speed connectivity for UK finance, healthcare, legal, and public sector organisations.",
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <PartnersLogoGrid />
      <MetricsSection />
      <ServicesSpotlightCarousel />
      <Security247Section />
      <ProcessJourney />
      <InfrastructureJourney />
      <ProofShowcase />

      <section className="section-space">
        <div className="container-page">
          <TestimonialBlock
            quote="Containment dropped from hours to under twenty minutes - and our auditors finally had continuous evidence, not quarterly theatre."
            author="CISO"
            role="Regional UK Bank · Finance"
          />
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
