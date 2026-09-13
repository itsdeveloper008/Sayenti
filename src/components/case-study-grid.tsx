"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { caseStudies, industries, type Industry } from "@/lib/data/clients";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

export function CaseStudyGrid({
  limit,
  showFilter = true,
}: {
  limit?: number;
  showFilter?: boolean;
}) {
  const [filter, setFilter] = useState<Industry | "All">("All");
  const reduce = usePrefersReducedMotion();

  const items = useMemo(() => {
    const filtered =
      filter === "All"
        ? caseStudies
        : caseStudies.filter((c) => c.industry === filter);
    return typeof limit === "number" ? filtered.slice(0, limit) : filtered;
  }, [filter, limit]);

  const counts = useMemo(() => {
    const map = new Map<Industry | "All", number>([["All", caseStudies.length]]);
    for (const industry of industries) {
      map.set(
        industry,
        caseStudies.filter((c) => c.industry === industry).length
      );
    }
    return map;
  }, []);

  return (
    <div>
      {showFilter && (
        <div className="mb-10 flex flex-wrap items-center gap-2 border-b border-black/[0.07] pb-5">
          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filter by industry"
          >
            {(["All", ...industries] as const).map((item) => {
              const isActive = filter === item;
              return (
                <button
                  key={item}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(item)}
                  className={cn(
                    "group relative inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
                    isActive
                      ? "border-foreground bg-foreground text-background shadow-[0_4px_14px_rgb(10_10_10_/_0.16)]"
                      : "border-black/[0.09] bg-white text-muted-foreground hover:-translate-y-px hover:border-black/20 hover:text-foreground"
                  )}
                >
                  {item}
                  <span
                    className={cn(
                      "font-mono text-[10px]",
                      isActive ? "text-background/60" : "text-muted-foreground/60"
                    )}
                  >
                    {counts.get(item) ?? 0}
                  </span>
                </button>
              );
            })}
          </div>
          <p className="ml-auto font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
            {items.length} {items.length === 1 ? "engagement" : "engagements"}
          </p>
        </div>
      )}

      <motion.div
        layout={!reduce}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map((study, i) => (
            <motion.div
              key={study.slug}
              layout={!reduce}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.96 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : {
                      duration: 0.42,
                      delay: i * 0.06,
                      ease: [0.22, 1, 0.36, 1],
                    }
              }
            >
              <Link
                href={`/clients/${study.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-black/[0.07] bg-white shadow-[0_1px_2px_rgb(10_10_10_/_0.04)] transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:border-black/[0.1] hover:shadow-[0_18px_44px_rgb(10_10_10_/_0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-200/70">
                  <Image
                    src={study.image}
                    alt={`${study.industry} engagement`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.04]"
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent"
                  />
                  <span className="absolute top-3 left-3 rounded-full border border-white/25 bg-black/45 px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-white uppercase backdrop-blur-sm">
                    {study.industry}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-6">
                  <h3 className="text-lg font-semibold tracking-tight text-foreground">
                    {study.client}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {study.summary}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {study.results.slice(0, 2).map((r, idx) => (
                      <span
                        key={r.label}
                        className={cn(
                          "rounded-md border px-2 py-1 font-mono text-[11px]",
                          idx === 0
                            ? "border-primary/20 bg-primary/[0.06] text-primary"
                            : "border-black/[0.08] bg-surface-elevated text-foreground"
                        )}
                      >
                        {r.value}{" "}
                        <span className="text-muted-foreground">{r.label}</span>
                      </span>
                    ))}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-1.5 border-t border-black/[0.06] pt-4 text-sm font-medium text-foreground">
                    View case study
                    <ArrowRight
                      className="size-4 transition-transform duration-300 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
