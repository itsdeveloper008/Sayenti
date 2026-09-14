"use client";

import { motion } from "framer-motion";
import { Activity, Layers, Search, Zap, type LucideIcon } from "lucide-react";
import { approachSteps } from "@/lib/data/content";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = {
  title: string;
  body: string;
  meta: string;
  icon: LucideIcon;
};

const STEP_META: { meta: string; icon: LucideIcon }[] = [
  { meta: "Week 1-2", icon: Search },
  { meta: "Week 3-5", icon: Layers },
  { meta: "Ongoing", icon: Activity },
  { meta: "Minutes", icon: Zap },
];

const STEPS: Step[] = approachSteps.map((step, i) => ({
  ...step,
  ...STEP_META[i],
}));

function StepCard({
  step,
  index,
  isLast,
}: {
  step: Step;
  index: number;
  isLast: boolean;
}) {
  const Icon = step.icon;

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-2xl border bg-white p-6 transition-[transform,box-shadow,border-color] duration-300",
        "shadow-[0_4px_20px_rgb(10_10_10_/_0.04)] group-hover:-translate-y-1 group-hover:shadow-[0_16px_44px_rgb(10_10_10_/_0.1)]",
        isLast
          ? "border-black/[0.06] border-l-[3px] border-l-primary"
          : "border-black/[0.08] group-hover:border-black/[0.14]"
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute -top-2 right-3 font-mono text-[3.75rem] leading-none font-semibold text-black/[0.05] select-none"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      <div className="relative">
        <span
          className={cn(
            "flex size-10 items-center justify-center rounded-xl transition-colors duration-300",
            isLast
              ? "bg-primary text-white"
              : "bg-black/[0.03] text-foreground/70 group-hover:bg-foreground group-hover:text-background"
          )}
        >
          <Icon className="size-[18px]" strokeWidth={1.7} />
        </span>

        <p className="mt-5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
          {step.meta}
        </p>
        <h3 className="mt-1.5 text-xl font-semibold tracking-tight text-foreground">
          {step.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">
          {step.body}
        </p>
      </div>
    </div>
  );
}

export function ProcessJourney() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden border-t border-black/[0.05] bg-background section-space">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0A0A0A 0.85px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-page relative">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-5 justify-center">
            <span className="eyebrow-dot" />
            Process
          </p>
          <h2 className="text-3xl font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-[2.75rem]">
            From Risk To Resilience.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed md:text-lg">
            Four phases, one continuous engagement - each with named ownership
            and evidence you can hand to an auditor.
          </p>
        </div>

        {/* Desktop - alternating journey rail */}
        <div className="relative mt-20 hidden lg:block">
          {/* Rail */}
          <div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-black/[0.08]"
          />
          <motion.div
            aria-hidden
            className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-gradient-to-r from-foreground/60 via-foreground/40 to-primary"
            initial={reduce ? false : { scaleX: 0 }}
            whileInView={{
              scaleX: 1,
              transition: {
                duration: reduce ? 0 : 1.1,
                ease: EASE,
              },
            }}
            viewport={{ once: true, margin: "-100px" }}
          />

          <div className="grid grid-cols-4 gap-7 xl:gap-8">
            {STEPS.map((step, i) => {
              const above = i % 2 === 0;
              const isLast = i === STEPS.length - 1;

              return (
                <motion.div
                  key={step.title}
                  className="group relative h-[520px]"
                  initial={
                    reduce
                      ? false
                      : { opacity: 0, y: above ? -24 : 24 }
                  }
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.55,
                      delay: reduce ? 0 : 0.25 + i * 0.12,
                      ease: EASE,
                    },
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                >
                  {/* Card slot */}
                  <div
                    className={cn(
                      "absolute inset-x-0 flex h-1/2",
                      above ? "top-0 items-end pb-12" : "bottom-0 items-start pt-12"
                    )}
                  >
                    <StepCard step={step} index={i} isLast={isLast} />
                  </div>

                  {/* Connector */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-1/2 h-12 w-px -translate-x-1/2 bg-black/[0.1]",
                      above ? "bottom-1/2" : "top-1/2"
                    )}
                  />

                  {/* Node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute left-1/2 top-1/2 z-[1] flex size-4 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 bg-background transition-colors duration-300",
                      isLast
                        ? "border-primary"
                        : "border-black/20 group-hover:border-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full transition-colors duration-300",
                        isLast
                          ? "bg-primary"
                          : "bg-black/25 group-hover:bg-foreground"
                      )}
                    />
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Mobile / tablet - vertical timeline */}
        <div className="relative mt-14 lg:hidden">
          <span
            aria-hidden
            className="absolute top-2 bottom-2 left-[7px] w-px bg-black/[0.08]"
          />
          <ul className="space-y-5">
            {STEPS.map((step, i) => {
              const isLast = i === STEPS.length - 1;
              return (
                <motion.li
                  key={step.title}
                  className="group relative pl-10"
                  initial={reduce ? false : { opacity: 0, y: 18 }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                      duration: 0.45,
                      delay: reduce ? 0 : i * 0.08,
                      ease: EASE,
                    },
                  }}
                  viewport={{ once: true, margin: "-40px" }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute top-7 left-0 flex size-4 items-center justify-center rounded-full border-2 bg-background",
                      isLast ? "border-primary" : "border-black/20"
                    )}
                  >
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        isLast ? "bg-primary" : "bg-black/25"
                      )}
                    />
                  </span>
                  <StepCard step={step} index={i} isLast={isLast} />
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
