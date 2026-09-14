"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies, industries } from "@/lib/data/clients";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;
const pad = (n: number) => String(n).padStart(2, "0");

function CaseRow({
  index,
  slug,
  client,
  industry,
  summary,
  results,
  image,
  meta,
  reduce,
}: (typeof caseStudies)[number] & { index: number; reduce: boolean }) {
  const engagement = meta.find((m) => m.label === "Engagement")?.value;

  return (
    <motion.li
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: EASE }}
      className="border-t border-black/[0.08] first:border-t-0"
    >
      <Link
        href={`/clients/${slug}`}
        className="group grid gap-6 py-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 sm:gap-8 md:py-10 lg:grid-cols-12 lg:items-center lg:gap-10 lg:py-12"
      >
        {/* Media */}
        <div className="relative lg:col-span-5">
          <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-black/[0.03] lg:aspect-[4/3]">
            <Image
              src={image}
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 42vw"
              className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="absolute top-4 left-4 rounded-full border border-white/20 bg-black/40 px-2.5 py-1 font-mono text-[10px] tracking-[0.18em] text-white/90 uppercase backdrop-blur-md">
              {industry}
            </span>
            <span className="absolute right-4 bottom-4 flex size-9 items-center justify-center rounded-full bg-white text-foreground opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
              <ArrowUpRight className="size-4" aria-hidden />
            </span>
          </div>
        </div>

        {/* Story */}
        <div className="lg:col-span-4">
          <p className="flex items-center gap-3 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            <span className="text-foreground">{pad(index + 1)}</span>
            <span aria-hidden className="h-px w-6 bg-black/15" />
            {engagement ?? industry}
          </p>
          <h3 className="mt-4 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
            {client}
          </h3>
          <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">
            {summary}
          </p>
          <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground">
            <span className="border-b border-transparent transition-colors group-hover:border-foreground">
              View case study
            </span>
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </span>
        </div>

        {/* Outcomes */}
        <dl className="grid grid-cols-3 gap-4 lg:col-span-3 lg:grid-cols-1 lg:gap-0 lg:divide-y lg:divide-black/[0.06] lg:border-l lg:border-black/[0.08] lg:pl-8">
          {results.map((r, i) => (
            <div key={r.label} className="lg:py-4 lg:first:pt-0 lg:last:pb-0">
              <dd
                className={cn(
                  "font-mono text-2xl font-semibold tracking-tight sm:text-[1.75rem]",
                  i === 0 ? "text-primary" : "text-foreground"
                )}
              >
                {r.value}
              </dd>
              <dt className="mt-1 text-xs leading-snug text-muted-foreground sm:text-[13px]">
                {r.label}
              </dt>
            </div>
          ))}
        </dl>
      </Link>
    </motion.li>
  );
}

export function ProofShowcase() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="section-space border-t border-black/[0.05] bg-surface-elevated">
      <div className="container-page">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="eyebrow mb-5 justify-center">
              <span className="eyebrow-dot" />
              Regulated Environments
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-[2.75rem]">
              Proof From Industries That Cannot Gamble On Uptime
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed md:text-lg">
              Finance, healthcare, legal and public sector outcomes - measured,
              not marketed.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-black/[0.08] pb-5">
            <p className="font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
              {pad(caseStudies.length)} case studies
            </p>
            <ul className="flex flex-wrap gap-2">
              {industries.map((ind) => (
                <li
                  key={ind}
                  className="rounded-full border border-black/[0.08] bg-white px-3 py-1 text-xs font-medium text-foreground/80"
                >
                  {ind}
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>

        <ul>
          {caseStudies.map((cs, i) => (
            <CaseRow key={cs.slug} index={i} reduce={reduce} {...cs} />
          ))}
        </ul>

        <ScrollReveal className="border-t border-black/[0.08] pt-8 text-center">
          <Link
            href="/clients"
            className="group inline-flex items-center gap-2 rounded-full border border-black/[0.1] bg-white px-5 py-2.5 text-sm font-medium text-foreground transition-[transform,box-shadow,border-color] hover:-translate-y-px hover:border-black/20 hover:shadow-[0_10px_28px_rgb(10_10_10_/_0.08)]"
          >
            All case studies
            <ArrowRight
              className="size-4 transition-transform group-hover:translate-x-0.5"
              aria-hidden
            />
          </Link>
        </ScrollReveal>
      </div>
    </section>
  );
}
