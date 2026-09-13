import type { Metadata } from "next";
import { Lock, Phone, ShieldCheck } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { RiskReviewForm } from "@/components/risk-review-form";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book a Risk Review",
  description:
    "Book a confidential 30-minute risk review with Sayenti. No obligation - a clear picture of your security, cloud, and connectivity exposure.",
};

const assurances = [
  {
    icon: ShieldCheck,
    title: "No obligation",
    body: "A structured conversation about exposure - not a hard sell.",
  },
  {
    icon: Lock,
    title: "Confidential",
    body: "Details stay between you and Sayenti. Never used for cold outreach lists.",
  },
];

const agenda = [
  {
    title: "Before the call",
    body: "We review what you share and prepare questions specific to your estate and regulator.",
  },
  {
    title: "The 30 minutes",
    body: "Monitoring coverage, cloud posture, connectivity resilience, and assurance gaps - in that order.",
  },
  {
    title: "After the call",
    body: "A short written summary of what we saw, ranked by risk. Yours to keep, whether or not we work together.",
  },
];

export default function RiskReviewPage() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      <PageHero
        eyebrow="Risk Review"
        title="Thirty minutes. A clearer picture of your risk."
        description="Tell us about your environment. We'll come prepared with pointed questions - not a generic pitch deck."
      />

      <section className="container-page grid gap-12 pb-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        <div className="space-y-10">
          {/* Agenda */}
          <Reveal>
            <p className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              What happens
            </p>
            <ol className="relative space-y-7 border-l border-black/[0.08] pl-7">
              {agenda.map((item, i) => (
                <li key={item.title} className="relative">
                  <span
                    aria-hidden
                    className={
                      i === 0
                        ? "absolute -left-[35px] top-1 flex size-[18px] items-center justify-center rounded-full border border-primary/30 bg-primary/10"
                        : "absolute -left-[35px] top-1 flex size-[18px] items-center justify-center rounded-full border border-black/[0.09] bg-white"
                    }
                  >
                    <span
                      className={
                        i === 0
                          ? "size-1.5 rounded-full bg-primary"
                          : "size-1.5 rounded-full bg-foreground/25"
                      }
                    />
                  </span>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>

          {/* Assurances */}
          <Stagger className="grid gap-4 sm:grid-cols-2">
            {assurances.map((item) => (
              <StaggerItem key={item.title} className="h-full">
                <div className="h-full rounded-2xl border border-black/[0.07] bg-white p-5 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)]">
                  <span className="flex size-9 items-center justify-center rounded-lg bg-foreground/[0.04]">
                    <item.icon className="size-4 text-foreground" aria-hidden />
                  </span>
                  <h2 className="mt-4 text-sm font-semibold tracking-tight text-foreground">
                    {item.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {item.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          {/* Urgent line */}
          <Reveal>
            <div className="relative overflow-hidden rounded-2xl bg-[#0A0A0A] p-6">
              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #FFFFFF 0.8px, transparent 1px)",
                  backgroundSize: "22px 22px",
                }}
              />
              <div className="relative flex items-start gap-4">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/[0.07]">
                  <Phone className="size-4 text-white" aria-hidden />
                </span>
                <div>
                  <h2 className="text-sm font-semibold tracking-tight text-white">
                    Live incident right now?
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                    Skip the form. Call{" "}
                    <a
                      href={siteConfig.phoneHref}
                      className="font-mono text-white transition-colors hover:text-primary"
                    >
                      {siteConfig.phone}
                    </a>{" "}
                    - {siteConfig.phoneLabel}.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          {calendlyUrl && (
            <Reveal>
              <div className="overflow-hidden rounded-2xl border border-black/[0.07] bg-white">
                <p className="border-b border-black/[0.07] px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  Or book a slot directly
                </p>
                <iframe
                  title="Schedule a risk review"
                  src={calendlyUrl}
                  className="h-[640px] w-full bg-white"
                />
              </div>
            </Reveal>
          )}
        </div>

        {/* Form */}
        <Reveal delay={0.08}>
          <div className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-6 shadow-[0_18px_50px_rgb(10_10_10_/_0.07)] md:p-9">
            <span
              aria-hidden
              className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"
            />
            <h2 className="text-xl font-semibold tracking-tight text-foreground">
              Request a review
            </h2>
            <p className="mt-2 mb-8 text-sm text-muted-foreground">
              We respond within one business day.
            </p>
            <RiskReviewForm />
          </div>
        </Reveal>
      </section>
    </>
  );
}
