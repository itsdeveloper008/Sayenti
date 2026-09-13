"use client";

import { StatStrip } from "@/components/stat-counter";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { homepageMetrics } from "@/lib/data/motion-content";

export function MetricsSection() {
  return (
    <section className="border-y border-black/[0.05] bg-surface-elevated py-20 md:py-24">
      <div className="container-page">
        <ScrollReveal>
          <p className="eyebrow mb-12">
            <span className="eyebrow-dot" />
            Operating evidence
          </p>
        </ScrollReveal>
        <StatStrip stats={homepageMetrics} />
      </div>
    </section>
  );
}
