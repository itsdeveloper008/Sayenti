import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PageHero } from "@/components/layout/page-hero";
import { CTASection } from "@/components/cta-section";
import { TestimonialBlock } from "@/components/testimonial-block";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { caseStudies, getCaseStudy } from "@/lib/data/clients";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) return { title: "Case Study" };
  return {
    title: `${study.client} Case Study`,
    description: study.summary,
  };
}

export default async function CaseStudyPage({ params }: Props) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  if (!study) notFound();

  const index = caseStudies.findIndex((c) => c.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <>
      <PageHero
        eyebrow={study.industry}
        title={study.client}
        description={study.summary}
      />

      {/* Cover image + engagement meta */}
      <section className="container-page pb-20 md:pb-24">
        <Reveal>
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl border border-black/[0.07] bg-slate-200/70 shadow-[0_22px_60px_rgb(10_10_10_/_0.1)]">
            <Image
              src={study.image}
              alt={`${study.client} - ${study.industry}`}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1152px"
              className="object-cover"
            />
            <div
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent"
            />
            <div className="absolute inset-x-0 bottom-0 flex flex-wrap gap-x-10 gap-y-3 p-6 md:p-8">
              {study.meta.map((item) => (
                <div key={item.label}>
                  <p className="font-mono text-[10px] tracking-[0.18em] text-white/55 uppercase">
                    {item.label}
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {item.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>

      {/* Results */}
      <section className="section-elevated py-20 md:py-24">
        <div className="container-page">
          <Reveal>
            <p className="eyebrow mb-10">
              <span className="eyebrow-dot" />
              Measured outcome
            </p>
          </Reveal>
          <Stagger className="grid gap-5 md:grid-cols-3">
            {study.results.map((r, i) => (
              <StaggerItem key={r.label}>
                <div className="h-full rounded-2xl border border-black/[0.07] bg-white p-7 shadow-[0_1px_2px_rgb(10_10_10_/_0.04)]">
                  <div className="flex items-start justify-between">
                    <span
                      aria-hidden
                      className={
                        i === 0
                          ? "h-8 w-[3px] rounded-full bg-primary"
                          : "h-8 w-[3px] rounded-full bg-foreground/15"
                      }
                    />
                    <span className="font-mono text-[10px] text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p
                    className={
                      i === 0
                        ? "mt-6 font-mono text-4xl font-semibold tracking-tight text-primary"
                        : "mt-6 font-mono text-4xl font-semibold tracking-tight text-foreground"
                    }
                  >
                    {r.value}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{r.label}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>
        </div>
      </section>

      {/* Narrative */}
      <section className="container-page py-20 md:py-24">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase">
              01 - The challenge
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
              What was breaking
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {study.challenge}
            </p>
          </Reveal>

          <Reveal
            delay={0.08}
            className="lg:border-l lg:border-black/[0.07] lg:pl-16"
          >
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              02 - The response
            </p>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
              What we built
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              {study.solution}
            </p>

            <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              Services engaged
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {study.servicesUsed.map((name) => (
                <span
                  key={name}
                  className="rounded-full border border-black/[0.09] bg-white px-3 py-1.5 text-xs text-foreground"
                >
                  {name}
                </span>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Quote */}
      {study.quote && (
        <section className="container-page pb-20 md:pb-24">
          <TestimonialBlock
            eyebrow="In their words"
            quote={study.quote.text}
            author={study.quote.role.split(",")[0]}
            role={study.quote.role.split(",").slice(1).join(",").trim()}
            metrics={study.results.map((r) => ({
              value: r.value,
              label: r.label,
            }))}
          />
        </section>
      )}

      {/* Navigation */}
      <section className="container-page pb-20 md:pb-24">
        <div className="flex flex-col gap-4 border-t border-black/[0.07] pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/clients"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-4" aria-hidden />
            All case studies
          </Link>
          <Link
            href={`/clients/${next.slug}`}
            className="group inline-flex w-full items-center gap-3 rounded-2xl border border-black/[0.07] bg-white px-5 py-4 transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.08)] sm:w-auto sm:max-w-sm"
          >
            <span className="flex-1 text-right">
              <span className="block font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                Next · {next.industry}
              </span>
              <span className="mt-1 block text-sm font-semibold text-foreground">
                {next.client}
              </span>
            </span>
            <ArrowRight
              className="size-4 text-foreground transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden
            />
          </Link>
        </div>
      </section>

      <CTASection />
    </>
  );
}
