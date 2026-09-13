import type { Metadata } from "next";
import Image from "next/image";
import { Award, ShieldCheck, Target, Users } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { CTASection } from "@/components/cta-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Sayenti — a UK MSSP built for regulated industries, with a mission to make always-on defence operationally real.",
};

const principles = [
  {
    icon: Target,
    title: "Regulated focus",
    body: "Finance, healthcare, legal, and public sector patterns — not generic SMB tooling.",
  },
  {
    icon: Users,
    title: "Consultative sales",
    body: "Risk reviews that clarify exposure. No e-commerce checkout for enterprise security.",
  },
  {
    icon: Award,
    title: "Assurance-ready",
    body: "Evidence packs and reporting cadence designed for auditors and boards.",
  },
];

const facts = [
  { value: "10+", label: "Years in regulated estates" },
  { value: "24/7", label: "UK-based SOC coverage" },
  { value: "1,400+", label: "Endpoints under watch" },
  { value: "11 min", label: "Median containment" },
];

const leaders = [
  {
    name: "Alex Morgan",
    role: "Managing Director",
    bio: "Former enterprise security lead focused on regulated-sector operating models.",
  },
  {
    name: "Jordan Ellis",
    role: "Head of SOC",
    bio: "Built detection programmes across finance and public sector estates.",
  },
  {
    name: "Sam Okonkwo",
    role: "Cloud & Connectivity Lead",
    bio: "Specialises in secure landing zones and resilient multi-site networks.",
  },
  {
    name: "Riley Chen",
    role: "Client Assurance",
    bio: "Translates technical controls into board and auditor-ready evidence.",
  },
];

const certs = [
  {
    name: "ISO 27001",
    logo: "/partners/iso27001.svg",
    note: "Information security management",
  },
  {
    name: "Cyber Essentials Plus",
    logo: null,
    note: "UK government-backed baseline",
  },
  {
    name: "IASME Governance",
    logo: null,
    note: "SME-to-enterprise assurance",
  },
  {
    name: "Microsoft Solutions Partner",
    logo: "/partners/microsoft.svg",
    note: "Azure & Microsoft 365 security",
  },
];

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);
}

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Built for the organisations that cannot afford downtime — or doubt."
        description="Sayenti was founded to give mid-to-large UK organisations in regulated industries a security partner that operates with precision: monitoring that never sleeps, migrations that stay compliant, and reporting leadership can trust."
      />

      {/* Mission */}
      <section className="container-page pb-20 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <SectionHeading
              eyebrow="Mission"
              title="Make always-on defence operationally real"
            />
            <div className="space-y-4 leading-relaxed text-muted-foreground">
              <p>
                Too many security programmes look strong on paper and fragile at
                2am. We exist to close that gap — with people, process, and
                platforms tuned for regulated environments.
              </p>
              <p>
                Our buyers are technical and sceptical. We prefer clear SLAs,
                named escalation, and measurable containment over marketing
                theatre.
              </p>
            </div>
          </Reveal>

          <Stagger className="space-y-4">
            {principles.map((item) => (
              <StaggerItem key={item.title}>
                <div className="flex gap-5 rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.07)]">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-foreground/[0.04]">
                    <item.icon className="size-5 text-foreground" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-semibold tracking-tight text-foreground">
                      {item.title}
                    </h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Facts strip */}
      <section className="section-elevated border-y border-black/[0.05] py-14 md:py-16">
        <div className="container-page">
          <Stagger className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {facts.map((fact, i) => (
              <StaggerItem key={fact.label}>
                <p
                  className={
                    i === 0
                      ? "font-mono text-3xl font-semibold tracking-tight text-primary md:text-4xl"
                      : "font-mono text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
                  }
                >
                  {fact.value}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {fact.label}
                </p>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Leadership */}
      <section className="section-surface py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Leadership"
            title="Operators, not slide-deck specialists"
            description="The people accountable for your estate — reachable by name, not a ticket queue."
          />
          <Stagger className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {leaders.map((person) => (
              <StaggerItem key={person.name} className="h-full">
                <article className="group flex h-full flex-col rounded-2xl border border-black/[0.07] bg-background p-6 transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(10_10_10_/_0.08)]">
                  <div className="relative mb-6 flex aspect-square w-16 items-center justify-center overflow-hidden rounded-2xl bg-[#0A0A0A]">
                    <span
                      aria-hidden
                      className="absolute inset-0 opacity-[0.14]"
                      style={{
                        backgroundImage:
                          "radial-gradient(circle, #FFFFFF 0.7px, transparent 1px)",
                        backgroundSize: "8px 8px",
                      }}
                    />
                    <span className="relative font-mono text-lg font-medium tracking-tight text-white">
                      {initials(person.name)}
                    </span>
                  </div>
                  <h3 className="font-semibold tracking-tight text-foreground">
                    {person.name}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
                    {person.role}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                </article>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Certifications */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Certifications"
          title="Why regulated industries trust the process"
          description="Accreditation and partner status that support assurance conversations from day one."
        />
        <Stagger className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certs.map((cert) => (
            <StaggerItem key={cert.name} className="h-full">
              <div className="flex h-full flex-col justify-between rounded-2xl border border-black/[0.07] bg-white p-6 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.07)]">
                <span className="flex h-10 items-center">
                  {cert.logo ? (
                    <Image
                      src={cert.logo}
                      alt=""
                      width={90}
                      height={32}
                      className="h-8 w-auto opacity-70 grayscale"
                    />
                  ) : (
                    <span className="flex size-10 items-center justify-center rounded-xl bg-foreground/[0.04]">
                      <ShieldCheck
                        className="size-5 text-foreground"
                        aria-hidden
                      />
                    </span>
                  )}
                </span>
                <div className="mt-8">
                  <p className="text-sm font-semibold tracking-tight text-foreground">
                    {cert.name}
                  </p>
                  <p className="mt-1.5 text-xs text-muted-foreground">
                    {cert.note}
                  </p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTASection />
    </>
  );
}
