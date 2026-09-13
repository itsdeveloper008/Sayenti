import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { CaseStudyGrid } from "@/components/case-study-grid";
import { CTASection } from "@/components/cta-section";

export const metadata: Metadata = {
  title: "Clients & Case Studies",
  description:
    "Case studies from Sayenti engagements across finance, healthcare, legal, and public sector organisations.",
};

export default function ClientsPage() {
  return (
    <>
      <PageHero
        eyebrow="Clients"
        title="Proof from regulated environments"
        description="Filter by industry. Each engagement focuses on measurable risk reduction - containment, uptime, migration certainty, or assurance readiness."
      />
      <section className="container-page pb-20 md:pb-28">
        <CaseStudyGrid />
      </section>
      <CTASection />
    </>
  );
}
