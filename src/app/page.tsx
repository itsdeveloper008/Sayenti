import type { Metadata } from "next";
import { HeroSection } from "@/components/home/hero-section";
import { MetricsSection } from "@/components/home/metrics-section";
import { ServicesSpotlightCarousel } from "@/components/home/services-spotlight-carousel";
import { Security247Section } from "@/components/home/security-247";
import { ProcessJourney } from "@/components/home/process-journey";
import { InfrastructureJourney } from "@/components/home/infrastructure-journey";
import { FinalCtaSection } from "@/components/home/final-cta";
import { PartnersLogoGrid } from "@/components/partners-logo-grid";
import { ProofBento } from "@/components/home/proof-bento";
import { TestimonialBlock } from "@/components/testimonial-block";
import { ScrollReveal } from "@/components/motion/reveal-text";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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

      <section className="section-space border-t border-black/[0.05] bg-surface-elevated">
        <div className="container-page">
          <ScrollReveal>
            <div className="mx-auto mb-14 max-w-2xl text-center">
              <p className="eyebrow mb-5 justify-center">
                <span className="eyebrow-dot" />
                Regulated environments
              </p>
              <h2 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl">
                Proof from industries that cannot gamble on uptime
              </h2>
              <p className="mt-4 text-muted-foreground leading-relaxed md:text-lg">
                Finance, healthcare, legal, and public sector outcomes — measured,
                not marketed.
              </p>
            </div>
          </ScrollReveal>
          <ProofBento />
          <ScrollReveal className="mt-12 text-center">
            <Link
              href="/clients"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:opacity-70"
            >
              All case studies <ArrowRight className="size-4" />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <section className="section-space">
        <div className="container-page">
          <TestimonialBlock
            quote="Containment dropped from hours to under twenty minutes — and our auditors finally had continuous evidence, not quarterly theatre."
            author="CISO"
            role="Regional UK Bank · Finance"
          />
        </div>
      </section>

      <FinalCtaSection />
    </>
  );
}
