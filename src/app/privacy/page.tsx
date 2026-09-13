import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { LegalDoc, type LegalSection } from "@/components/layout/legal-doc";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy policy for ${siteConfig.name}.`,
};

const sections: LegalSection[] = [
  {
    id: "what-we-collect",
    heading: "What we collect",
    body: (
      <p>
        {siteConfig.name} collects the contact and company details you submit
        through the risk review form — name, work email, organisation, role, and
        any context you choose to share about your environment. We do not
        request or require sensitive personal data.
      </p>
    ),
  },
  {
    id: "why-we-collect-it",
    heading: "Why we collect it",
    body: (
      <>
        <p>
          Submitted details are used solely to respond to your enquiry, prepare
          for the review conversation, and deliver related services where an
          engagement follows.
        </p>
        <p>
          We do not sell personal data, and we do not add enquiry contacts to
          cold outreach lists.
        </p>
      </>
    ),
  },
  {
    id: "where-it-is-stored",
    heading: "Where it is stored",
    body: (
      <p>
        Form submissions may be stored in Google Firebase Firestore. Access is
        restricted to authorised {siteConfig.name} personnel who need it to
        respond to your enquiry.
      </p>
    ),
  },
  {
    id: "how-long-we-keep-it",
    heading: "How long we keep it",
    body: (
      <p>
        Enquiry records are retained only as long as needed to respond and to
        meet our own record-keeping obligations. Where no engagement follows, we
        remove the record on request or during routine review.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of the personal
        data we hold about you. Email{" "}
        <a
          className="text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black/50"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>{" "}
        and we will respond within one month.
      </p>
    ),
  },
  {
    id: "contact",
    heading: "Contact",
    body: (
      <p>
        Privacy questions can be sent to{" "}
        <a
          className="text-foreground underline decoration-black/20 underline-offset-4 transition-colors hover:decoration-black/50"
          href={`mailto:${siteConfig.email}`}
        >
          {siteConfig.email}
        </a>
        , or by phone on{" "}
        <a
          className="font-mono text-foreground transition-colors hover:text-primary"
          href={siteConfig.phoneHref}
        >
          {siteConfig.phone}
        </a>
        . {siteConfig.name} is based in {siteConfig.address}.
      </p>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        description="How Sayenti handles the information you share with us."
      />
      <LegalDoc
        updated="September 2026"
        notice="This policy is pending final review by counsel. It describes our current practice accurately, but wording may change before launch."
        sections={sections}
      />
    </>
  );
}
