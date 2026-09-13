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
        When you use the risk review form, the details you enter (name, work
        email, organisation, phone, and any context you choose to share) are
        used only to prepare an email that you send to {siteConfig.name} from
        your own mail app. We do not request or require sensitive personal
        data.
      </p>
    ),
  },
  {
    id: "why-we-collect-it",
    heading: "Why we ask for it",
    body: (
      <>
        <p>
          Those details let us respond to your enquiry, prepare for the review
          conversation, and deliver related services where an engagement
          follows.
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
        This website does not store form submissions in a database. The risk
        review form opens your email client with a prefilled message to{" "}
        {siteConfig.email}. Once you send it, the message is handled like any
        other email in our inbox - accessible only to authorised{" "}
        {siteConfig.name} personnel who need it to respond.
      </p>
    ),
  },
  {
    id: "how-long-we-keep-it",
    heading: "How long we keep it",
    body: (
      <p>
        Emails we receive are retained only as long as needed to respond and to
        meet our own record-keeping obligations. Where no engagement follows, we
        remove the correspondence on request or during routine review.
      </p>
    ),
  },
  {
    id: "your-rights",
    heading: "Your rights",
    body: (
      <p>
        You may request access to, correction of, or deletion of personal data
        we hold about you from correspondence. Email{" "}
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
