"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Step = { title: string; body: string };

export function Timeline({
  steps,
  className,
}: {
  steps: Step[];
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.4"],
  });
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
  });

  return (
    <div ref={ref} className={cn("relative", className)}>
      <div className="absolute top-3 bottom-3 left-[15px] w-px bg-border md:left-1/2 md:-translate-x-px" />
      {!reduce && (
        <motion.div
          className="absolute top-3 bottom-3 left-[15px] w-px origin-top bg-foreground md:left-1/2 md:-translate-x-px"
          style={{ scaleY: pathProgress }}
        />
      )}

      <ol className="space-y-10 md:space-y-16">
        {steps.map((step, i) => {
          const left = i % 2 === 0;
          return (
            <li
              key={step.title}
              className="relative grid gap-4 md:grid-cols-2 md:gap-10"
            >
              <div
                className={cn(
                  "hidden md:block",
                  left ? "md:text-right md:pr-12" : "md:col-start-2 md:pl-12"
                )}
              >
                {left && <StepContent index={i} step={step} />}
              </div>
              <div
                className={cn(
                  "hidden md:block",
                  !left && "md:col-start-1 md:row-start-1 md:text-right md:pr-12"
                )}
              >
                {!left && <StepContent index={i} step={step} />}
              </div>

              <div className="absolute top-1 left-0 flex size-8 items-center justify-center rounded-full border border-black/15 bg-background text-xs font-mono text-foreground md:left-1/2 md:-translate-x-1/2">
                {String(i + 1).padStart(2, "0")}
              </div>

              <div className="pl-12 md:hidden">
                <StepContent index={i} step={step} />
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function StepContent({ index, step }: { index: number; step: Step }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.4,
        delay: index * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <h3 className="text-xl font-semibold tracking-tight text-foreground">
        {step.title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground md:text-base">
        {step.body}
      </p>
    </motion.div>
  );
}
