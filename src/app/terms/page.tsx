import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDoc, type LegalSection } from "@/components/layout/legal-doc";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `Terms of use for ${siteConfig.name}.`,
};

const sections: LegalSection[] = [
  {
    id: "using-this-site",
    heading: "Using this site",
    body: (
      <p>
        Content on this website is provided for general information about{" "}
        {siteConfig.name} and its services. It does not constitute a binding
        offer, professional advice for your specific environment, or a
        commitment to any particular outcome.
      </p>
    ),
  },
  {
    id: "engagements",
    heading: "Engagements and contracts",
    body: (
      <p>
        All work is governed by separate written agreements between{" "}
        {siteConfig.name} and the client, including the service schedule,
        service levels, and commercial terms. Where this site and a signed
        agreement differ, the agreement prevails.
      </p>
    ),
  },
  {
    id: "case-studies",
    heading: "Case studies and metrics",
    body: (
      <>
        <p>
          Case studies use anonymised or composite details where required by
          client confidentiality. Named clients appear only with written
          permission.
        </p>
        <p>
          Metrics shown across the site are illustrative of past engagements and
          are not guarantees of future results. Engagement-specific figures are
          available on request under NDA.
        </p>
      </>
    ),
  },
  {
    id: "third-party-brands",
    heading: "Third-party brands",
    body: (
      <p>
        Technology partner and certification marks shown on this site remain the
        property of their respective owners and are used to indicate the
        platforms and frameworks we work with.
      </p>
    ),
  },
  {
    id: "availability",
    heading: "Site availability",
    body: (
      <p>
        We aim to keep this site available and accurate, but we do not warrant
        uninterrupted availability or freedom from error. Links to third-party
        sites are provided for convenience and are outside our control.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Questions about these terms can be sent to{" "}
        <a
          className="text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black/50"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>
        .
      </p>
    ),
  },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Terms of Use"
        description="The basis on which this site and our published material are provided."
      />
      <LegalDoc
        updated="September 2026"
        notice="These terms are pending final review by counsel. They reflect our intended position, but wording may change before launch."
        sections={sections}
      />
    </>
  );
}
