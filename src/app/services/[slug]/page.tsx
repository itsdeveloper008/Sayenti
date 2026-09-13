import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowRight, Check } from "lucide-react";
import { PageHero, SectionHeading } from "@/components/layout/page-hero";
import { CTASection } from "@/components/cta-section";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { caseStudies } from "@/lib/data/clients";
import { getService, services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.title,
    description: service.description,
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const related =
    caseStudies.find((c) => c.servicesUsed.includes(service.title)) ??
    caseStudies[0];
  const others = services.filter((s) => s.slug !== service.slug);

  return (
    <>
      <PageHero
        eyebrow="Services"
        title={service.title}
        description={service.longDescription}
      />

      {/* Hero image + outcome strip */}
      <section className="container-page pb-20 md:pb-24">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-black/[0.07] bg-slate-200/70 shadow-[0_22px_60px_rgb(10_10_10_/_0.1)] md:aspect-[21/9]">
            <Image
              src={service.image}
              alt=""
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent"
            />
            <dl className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-10 gap-y-3 p-6 md:p-8">
              {service.outcomes.map((o) => (
                <div key={o.label}>
                  <dd className="font-mono text-xl font-semibold tracking-tight text-white">
                    {o.value}
                  </dd>
                  <dt className="mt-1 font-mono text-[10px] tracking-[0.16em] text-white/55 uppercase">
                    {o.label}
                  </dt>
                </div>
              ))}
            </dl>
          </div>
        </Reveal>
      </section>

      {/* Fit + scope */}
      <section className="container-page pb-20 md:pb-24">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          <Reveal>
            <div className="h-full rounded-3xl border border-black/[0.07] bg-white p-8 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] md:p-10">
              <p className="eyebrow mb-5">
                <span className="eyebrow-dot" />
                Who this is for
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Built for
              </h2>
              <ul className="mt-7 space-y-4">
                {service.whoFor.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-foreground/[0.05]">
                      <Check className="size-3.5 text-foreground" aria-hidden />
                    </span>
                    <span className="text-[15px] leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="h-full rounded-3xl border border-black/[0.07] bg-surface-elevated p-8 md:p-10">
              <p className="eyebrow mb-5">
                <span className="eyebrow-dot" />
                What&apos;s included
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-foreground">
                Scope
              </h2>
              <ul className="mt-7 divide-y divide-black/[0.07]">
                {service.included.map((item, i) => (
                  <li
                    key={item}
                    className="flex items-baseline gap-4 py-3.5 first:pt-0 last:pb-0"
                  >
                    <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[15px] text-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Process */}
      <section className="section-surface border-y border-black/[0.05] py-20 md:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="How it works"
            title="A clear operating path"
            align="center"
          />
          <Stagger className="relative mx-auto grid max-w-5xl gap-5 md:grid-cols-3">
            {/* Connector */}
            <div
              aria-hidden
              className="pointer-events-none absolute top-12 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-black/[0.08] via-black/[0.12] to-black/[0.08] md:block"
            />
            {service.process.map((step, i) => (
              <StaggerItem key={step.title} className="h-full">
                <div className="relative h-full rounded-2xl border border-black/[0.07] bg-background p-7 text-center shadow-[0_1px_2px_rgb(10_10_10_/_0.04)]">
                  <span
                    className={cn(
                      "relative z-10 mx-auto flex size-11 items-center justify-center rounded-full border font-mono text-xs",
                      i === service.process.length - 1
                        ? "border-primary/25 bg-primary/[0.07] text-primary"
                        : "border-black/[0.08] bg-white text-foreground"
                    )}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
                    {step.body}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Related proof */}
      <section className="container-page py-20 md:py-24">
        <SectionHeading eyebrow="Related proof" title="Where it has run" />
        <Reveal>
          <Link
            href={`/clients/${related.slug}`}
            className="group grid overflow-hidden rounded-3xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_18px_44px_rgb(10_10_10_/_0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 md:grid-cols-[0.85fr_1fr]"
          >
            <div className="relative min-h-56 overflow-hidden bg-slate-200/70">
              <Image
                src={related.image}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 40vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
              />
            </div>
            <div className="flex flex-col justify-center p-8 md:p-10">
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {related.industry}
              </p>
              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground">
                {related.client}
              </h3>
              <p className="mt-3 leading-relaxed text-muted-foreground">
                {related.summary}
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {related.results.slice(0, 2).map((r, i) => (
                  <span
                    key={r.label}
                    className={cn(
                      "rounded-md border px-2 py-1 font-mono text-[11px]",
                      i === 0
                        ? "border-primary/20 bg-primary/[0.06] text-primary"
                        : "border-black/[0.08] bg-surface-elevated text-foreground"
                    )}
                  >
                    {r.value}{" "}
                    <span className="text-muted-foreground">{r.label}</span>
                  </span>
                ))}
              </div>
              <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
                Read case study
                <ArrowRight
                  className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                  aria-hidden
                />
              </span>
            </div>
          </Link>
        </Reveal>
      </section>

      {/* Other services */}
      <section className="container-page pb-20 md:pb-24">
        <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          Other capabilities
        </p>
        <Stagger className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((other) => (
            <StaggerItem key={other.slug} className="h-full">
              <Link
                href={`/services/${other.slug}`}
                className="group flex h-full items-center justify-between gap-4 rounded-2xl border border-black/[0.07] bg-white px-6 py-5 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                <span className="text-sm font-medium text-foreground">
                  {other.title}
                </span>
                <ArrowRight
                  className="size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                  aria-hidden
                />
              </Link>
            </StaggerItem>
          ))}
        </Stagger>
      </section>

      <CTASection />
    </>
  );
}
