import type { Metadata } from "next";
import Image from "next/image";
import { BadgeCheck, Cloud, Fingerprint, Network, Radar } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { CTASection } from "@/components/cta-section";
import { PartnersLogoGrid } from "@/components/partners-logo-grid";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { partners } from "@/lib/data/content";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "Technology partners and certification bodies that underpin Sayenti's managed security and cloud delivery.",
};

const capabilities = [
  {
    icon: Radar,
    title: "Detection & response",
    body: "Telemetry, correlation, and containment tooling feeding the managed SOC.",
    vendors: ["Splunk", "Check Point", "Fortinet"],
  },
  {
    icon: Cloud,
    title: "Cloud platforms",
    body: "Landing zones, workload protection, and control planes in regulated cloud.",
    vendors: ["Microsoft", "AWS", "Nutanix"],
  },
  {
    icon: Network,
    title: "Networking & edge",
    body: "Segmented, observable connectivity across campus, WAN, and secure edge.",
    vendors: ["Cisco", "Juniper", "Cloudflare"],
  },
  {
    icon: Fingerprint,
    title: "Identity & access",
    body: "Zero-trust access patterns and identity hardening at the perimeter of every session.",
    vendors: ["Okta", "Zscaler", "F5"],
  },
];

const certLogos: Record<string, string> = {
  "ISO 27001": "/partners/iso27001.svg",
};

export default function PartnersPage() {
  const certs = partners.filter((p) => p.category === "Certification");

  return (
    <>
      <PageHero
        eyebrow="Partners"
        title="Alliances that strengthen delivery - not decorate a slide."
        description="We partner with platforms and frameworks that matter for regulated UK organisations: detection, cloud, networking, and assurance."
      />

      <PartnersLogoGrid className="!pt-8 md:!pt-12" />

      {/* Capability coverage */}
      <section className="section-surface border-y border-black/[0.05] py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Capability coverage"
            title="What each alliance actually does for you"
            description="Partnerships are selected to close specific control gaps - and they are only used where they beat what you already own."
          />
          <Stagger className="grid gap-5 md:grid-cols-2">
            {capabilities.map((cap) => (
              <StaggerItem key={cap.title} className="h-full">
                <div className="h-full rounded-2xl border border-black/[0.07] bg-background p-7 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(10_10_10_/_0.08)]">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-foreground/[0.04]">
                    <cap.icon className="size-5 text-foreground" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {cap.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {cap.body}
                  </p>
                  <ul className="mt-5 flex flex-wrap gap-1.5 border-t border-black/[0.06] pt-5">
                    {cap.vendors.map((vendor) => (
                      <li
                        key={vendor}
                        className="rounded-md border border-black/[0.07] bg-surface-elevated px-2 py-1 font-mono text-[10px] tracking-[0.08em] text-muted-foreground uppercase"
                      >
                        {vendor}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Certification bodies */}
      <section className="section-elevated py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Certification bodies"
            title="Assurance frameworks we align to"
          />
          <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {certs.map((partner) => (
              <StaggerItem key={partner.name} className="h-full">
                <div className="flex h-full flex-col rounded-2xl border border-black/[0.07] bg-white p-7 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.07)]">
                  <span className="flex h-10 items-center">
                    {certLogos[partner.name] ? (
                      <Image
                        src={certLogos[partner.name]}
                        alt=""
                        width={40}
                        height={40}
                        className="size-10 opacity-70 grayscale"
                      />
                    ) : (
                      <span className="flex size-10 items-center justify-center rounded-xl bg-foreground/[0.04]">
                        <BadgeCheck
                          className="size-5 text-foreground"
                          aria-hidden
                        />
                      </span>
                    )}
                  </span>
                  <p className="mt-6 font-semibold tracking-tight text-foreground">
                    {partner.name}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {partner.blurb}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal delay={0.1}>
            <p className="mt-10 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Certificates and scope statements are shared during procurement - 
              ask for the evidence pack in your risk review and we will bring it
              to the call.
            </p>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
