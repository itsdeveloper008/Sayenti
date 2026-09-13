"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { caseStudies } from "@/lib/data/clients";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

const IMAGE_BY_SLUG: Record<string, string> = {
  "regional-bank-soc": "/cases/finance.png",
  "healthcare-trust-cloud": "/cases/healthcare.png",
  "law-firm-connectivity": "/cases/legal.png",
};

const INDUSTRY_TAGS = [
  { label: "Finance", count: "12 engagements", rotate: -3.5 },
  { label: "Healthcare", count: "8 engagements", rotate: 2.5 },
  { label: "Legal", count: "9 engagements", rotate: -1.5 },
  { label: "Public Sector", count: "6 engagements", rotate: 3.5 },
  { label: "Finance", count: "Board-ready evidence", rotate: 1.5 },
  { label: "Healthcare", count: "Zero-downtime migrations", rotate: -2.5 },
] as const;

const PROOF_QUOTE = {
  text: "Containment dropped from hours to under twenty minutes - and our auditors finally had continuous evidence, not quarterly theatre.",
  attribution: "CISO, National Law Firm",
};

function StatPill({
  value,
  label,
  accent = false,
}: {
  value: string;
  label: string;
  accent?: boolean;
}) {
  return (
    <span
      className={cn(
        "rounded-md border px-2.5 py-1 font-mono text-xs",
        accent
          ? "border-primary/25 bg-primary/[0.06] text-foreground"
          : "border-black/[0.08] bg-white text-foreground"
      )}
    >
      {value}{" "}
      <span className={accent ? "text-primary/80" : "text-muted-foreground"}>
        {label}
      </span>
    </span>
  );
}

function CaseCard({
  slug,
  client,
  industry,
  summary,
  results,
  featured = false,
  delay = 0,
  reduce,
}: {
  slug: string;
  client: string;
  industry: string;
  summary: string;
  results: { label: string; value: string }[];
  featured?: boolean;
  delay?: number;
  reduce: boolean;
}) {
  const image = IMAGE_BY_SLUG[slug];

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : delay, ease: EASE }}
      className="h-full"
    >
      <Link
        href={`/clients/${slug}`}
        className={cn(
          "group flex h-full flex-col overflow-hidden rounded-2xl border bg-white shadow-[0_8px_28px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgb(10_10_10_/_0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
          featured
            ? "border-black/[0.08] border-l-[3px] border-l-primary"
            : "border-black/[0.08]"
        )}
      >
        {image && (
          <div
            className={cn(
              "relative w-full overflow-hidden bg-black/[0.03]",
              featured ? "aspect-[16/9] sm:aspect-[2/1] lg:aspect-[16/7]" : "aspect-[16/10]"
            )}
          >
            <Image
              src={image}
              alt=""
              fill
              sizes={featured ? "(max-width: 1024px) 100vw, 55vw" : "(max-width: 1024px) 100vw, 28vw"}
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        )}

        <div className="flex flex-1 flex-col p-7 sm:p-8">
          <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            {industry}
          </p>
          <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground sm:text-xl">
            {client}
          </h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            {results.slice(0, 2).map((r, i) => (
              <StatPill
                key={r.label}
                value={r.value}
                label={r.label}
                accent={featured && i === 0}
              />
            ))}
          </div>
          <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-foreground transition-transform group-hover:translate-x-0.5">
            View case study <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}

function TagCloudCard({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <motion.div
      className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_8px_28px_rgb(10_10_10_/_0.04)] sm:p-8"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : delay, ease: EASE }}
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
        Industries
      </p>
      <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-foreground">
        Where we operate
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Regulated environments that need evidence, not theatre.
      </p>

      <div className="relative mt-8 flex flex-1 flex-wrap content-center items-center justify-center gap-3 py-4">
        {INDUSTRY_TAGS.map((tag, i) => (
          <motion.span
            key={`${tag.label}-${i}`}
            className="rounded-full border border-black/[0.1] bg-white px-3.5 py-2 shadow-sm"
            style={{ rotate: tag.rotate }}
            initial={
              reduce
                ? false
                : { opacity: 0, scale: 0.9, rotate: 0 }
            }
            whileInView={
              reduce
                ? undefined
                : {
                    opacity: 1,
                    scale: 1,
                    rotate: tag.rotate,
                    transition: {
                      duration: 0.4,
                      delay: delay + 0.15 + i * 0.06,
                      ease: EASE,
                    },
                  }
            }
            viewport={{ once: true }}
          >
            <span className="block text-sm font-medium text-foreground">
              {tag.label}
            </span>
            <span className="mt-0.5 block font-mono text-[10px] tracking-wide text-muted-foreground">
              {tag.count}
            </span>
          </motion.span>
        ))}
      </div>
    </motion.div>
  );
}

function QuoteCard({ delay, reduce }: { delay: number; reduce: boolean }) {
  return (
    <motion.div
      className="relative flex h-full flex-col justify-between overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-7 shadow-[0_8px_28px_rgb(10_10_10_/_0.04)] sm:p-8"
      initial={reduce ? false : { opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: reduce ? 0 : delay, ease: EASE }}
    >
      <span
        aria-hidden
        className="font-serif text-6xl leading-none text-primary/90"
      >
        “
      </span>
      <blockquote className="mt-2 text-base leading-relaxed text-foreground md:text-lg">
        {PROOF_QUOTE.text}
      </blockquote>
      <p className="mt-8 font-mono text-[11px] tracking-[0.14em] text-muted-foreground uppercase">
        {PROOF_QUOTE.attribution}
      </p>
    </motion.div>
  );
}

export function ProofBento() {
  const reduce = usePrefersReducedMotion();
  const [finance, healthcare, legal] = caseStudies;

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-12 lg:gap-5">
      {/* Featured - Finance */}
      <div className="md:col-span-2 lg:col-span-6">
        <CaseCard
          {...finance}
          featured
          delay={0}
          reduce={reduce}
        />
      </div>

      {/* Healthcare */}
      <div className="lg:col-span-3">
        <CaseCard {...healthcare} delay={0.08} reduce={reduce} />
      </div>

      {/* Legal */}
      <div className="lg:col-span-3">
        <CaseCard {...legal} delay={0.16} reduce={reduce} />
      </div>

      {/* Tag cloud */}
      <div className="md:col-span-1 lg:col-span-5">
        <TagCloudCard delay={0.24} reduce={reduce} />
      </div>

      {/* Quote */}
      <div className="md:col-span-1 lg:col-span-7">
        <QuoteCard delay={0.32} reduce={reduce} />
      </div>
    </div>
  );
}
