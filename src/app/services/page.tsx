import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { CTASection } from "@/components/cta-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { services } from "@/lib/data/services";
import { approachSteps } from "@/lib/data/content";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Explore Sayenti services: managed security (MSSP), cloud migration, superfast connectivity, and cybersecurity advisory.",
};

export default function ServicesPage() {
  const featured = services.find((s) => s.featured) ?? services[0];
  const rest = services.filter((s) => s.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Four capabilities. One operating model."
        description="Whether you need a full MSSP, a secure cloud move, resilient connectivity, or targeted cybersecurity — we design and run it as a coherent system."
      />

      <section className="container-page pb-20 md:pb-28">
        {/* Featured service */}
        <Reveal>
          <Link
            href={`/services/${featured.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_20px_50px_rgb(10_10_10_/_0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 lg:grid-cols-2"
          >
            <div className="relative min-h-64 overflow-hidden bg-slate-200/70 lg:order-2">
              <Image
                src={featured.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
              />
            </div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:order-1">
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-primary/20 bg-primary/[0.06] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-primary uppercase">
                  Most requested
                </span>
                <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                  01 / 0{services.length}
                </span>
              </div>

              <h2 className="mt-6 text-3xl font-semibold tracking-[-0.03em] text-foreground md:text-[2.25rem]">
                {featured.title}
              </h2>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                {featured.longDescription}
              </p>

              <dl className="mt-8 grid grid-cols-1 gap-4 border-t border-black/[0.06] pt-6 sm:grid-cols-3">
                {featured.outcomes.map((o, i) => (
                  <div
                    key={o.label}
                    className="flex items-baseline justify-between gap-3 sm:block"
                  >
                    <dd
                      className={cn(
                        "font-mono text-lg font-semibold tracking-tight",
                        i === 0 ? "text-primary" : "text-foreground"
                      )}
                    >
                      {o.value}
                    </dd>
                    <dt className="text-[11px] leading-snug text-muted-foreground sm:mt-1">
                      {o.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <span className="mt-8 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                View service
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        </Reveal>

        {/* Remaining services */}
        <Stagger className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((service, i) => (
            <StaggerItem key={service.slug} className="h-full">
              <Link
                href={`/services/${service.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_18px_44px_rgb(10_10_10_/_0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200/70">
                  <Image
                    src={service.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white backdrop-blur-sm">
                    0{i + 2}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-7">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    {service.title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {service.description}
                  </p>

                  <ul className="mt-5 flex flex-wrap gap-1.5">
                    {service.included.slice(0, 3).map((item) => (
                      <li
                        key={item}
                        className="rounded-md border border-black/[0.07] bg-surface-elevated px-2 py-1 text-[11px] text-muted-foreground"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>

                  <span className="mt-6 inline-flex items-center gap-1.5 border-t border-black/[0.06] pt-4 text-sm font-medium text-foreground">
                    View service
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      {/* Shared operating model */}
      <section className="section-elevated py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="One operating model"
            title="Every capability runs the same path"
            description="However the engagement starts, the delivery rhythm is identical — so evidence, escalation, and reporting stay consistent across services."
          />
          <Stagger className="grid gap-4 md:grid-cols-4">
            {approachSteps.map((step, i) => (
              <StaggerItem key={step.title} className="h-full">
                <div className="relative h-full rounded-2xl border border-black/[0.07] bg-white p-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "h-px flex-1",
                        i === approachSteps.length - 1
                          ? "bg-primary/40"
                          : "bg-black/[0.08]"
                      )}
                    />
                  </div>
                  <h3 className="mt-5 text-base font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
          <Reveal delay={0.1} className="mt-10">
            <Link
              href="/approach"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              See the full approach
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <CTASection />
    </>
  );
}
