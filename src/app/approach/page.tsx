import type { Metadata } from "next";
import { FileText, Gauge, Wrench } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { Timeline } from "@/components/timeline";
import { CTASection } from "@/components/cta-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { approachSteps } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Approach",
  description:
    "Sayenti's methodology: assess, architect, operate, and report — with clear SLAs, tooling, and reporting cadence for regulated organisations.",
};

const details = [
  {
    icon: Wrench,
    title: "Tooling",
    body: "We integrate best-of-breed detection, identity, and network platforms — selected for your stack, not ours. Prefer what you already own when it meets the control bar.",
  },
  {
    icon: FileText,
    title: "Reporting cadence",
    body: "Weekly operational digests for technical leads, monthly executive summaries for leadership, and on-demand incident reports with timeline, impact, and remediation.",
  },
  {
    icon: Gauge,
    title: "SLAs",
    body: "Published response and containment targets with named escalation paths. Availability and detection coverage measured — not assumed.",
  },
];

const commitments = [
  {
    commitment: "Critical alert acknowledgement",
    target: "≤ 15 min",
    owner: "Duty SOC analyst",
    highlight: true,
  },
  {
    commitment: "Median containment",
    target: "11 min",
    owner: "Incident lead",
    highlight: false,
  },
  {
    commitment: "Monitoring availability",
    target: "99.98%",
    owner: "Platform team",
    highlight: false,
  },
  {
    commitment: "Executive reporting",
    target: "Monthly",
    owner: "Client assurance lead",
    highlight: false,
  },
  {
    commitment: "Incident report delivery",
    target: "≤ 5 working days",
    owner: "Named security lead",
    highlight: false,
  },
];

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Approach"
        title="A methodology auditors recognise — and operators can run."
        description="From first assessment to ongoing SOC operations, every step produces evidence, ownership, and measurable risk reduction."
      />

      <section className="container-page pb-20 md:pb-24">
        <SectionHeading
          eyebrow="Method"
          title="The operating rhythm"
          description="Four stages. No black boxes."
          align="center"
        />
        <Timeline steps={approachSteps} className="mx-auto max-w-4xl" />
      </section>

      {/* How we run it */}
      <section className="section-surface border-y border-black/[0.05] py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Operating detail"
            title="How the rhythm is actually run"
          />
          <Stagger className="grid gap-5 lg:grid-cols-3">
            {details.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="h-full rounded-2xl border border-black/[0.07] bg-background p-7 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(10_10_10_/_0.08)]">
                  <span className="flex size-11 items-center justify-center rounded-xl bg-foreground/[0.04]">
                    <item.icon className="size-5 text-foreground" aria-hidden />
                  </span>
                  <h3 className="mt-6 text-lg font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Commitments table */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading
          eyebrow="Service levels"
          title="What we commit to in writing"
          description="Targets published up front, measured monthly, and reported with the evidence behind them."
        />
        <Reveal>
          <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:overflow-hidden sm:rounded-2xl sm:border sm:border-black/[0.07] sm:bg-white sm:px-0 sm:shadow-[0_1px_2px_rgb(10_10_10_/_0.04)]">
            <div className="min-w-[28rem] overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] sm:min-w-0 sm:rounded-none sm:border-0 sm:shadow-none">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-black/[0.07] bg-surface-elevated">
                    <th className="px-3 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-6 sm:py-4">
                      Commitment
                    </th>
                    <th className="px-3 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-6 sm:py-4">
                      Target
                    </th>
                    <th className="hidden px-6 py-4 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:table-cell">
                      Accountable
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {commitments.map((row) => (
                    <tr
                      key={row.commitment}
                      className="border-b border-black/[0.05] last:border-0 transition-colors hover:bg-surface-elevated/60"
                    >
                      <td className="px-3 py-3 text-sm text-foreground sm:px-6 sm:py-4">
                        {row.commitment}
                      </td>
                      <td
                        className={cn(
                          "px-3 py-3 font-mono text-sm font-medium whitespace-nowrap sm:px-6 sm:py-4",
                          row.highlight ? "text-primary" : "text-foreground"
                        )}
                      >
                        {row.target}
                      </td>
                      <td className="hidden px-6 py-4 text-sm text-muted-foreground sm:table-cell">
                        {row.owner}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
        <p className="mt-4 text-xs text-muted-foreground">
          Indicative targets — final SLAs are agreed per engagement and
          documented in the service schedule.
        </p>
      </section>

      <CTASection headline="Ready to put this method against your estate?" />
    </>
  );
}
