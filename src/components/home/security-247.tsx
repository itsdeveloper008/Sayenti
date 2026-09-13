"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  Radar,
  Search,
  ScanSearch,
  Shield,
  Zap,
  CheckCircle2,
  type LucideIcon,
} from "lucide-react";
import { securityStages } from "@/lib/data/motion-content";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const stageIcons: LucideIcon[] = [
  Radar,
  Search,
  ScanSearch,
  Shield,
  Zap,
  CheckCircle2,
];

const EASE = [0.22, 1, 0.36, 1] as const;

/** Seamless EKG-style waveform that scrolls continuously. */
function PulseWaveform({ reduce }: { reduce: boolean }) {
  const wave =
    "M0 28 H48 L58 28 L70 10 L82 46 L94 28 H140 L150 28 L162 14 L174 42 L186 28 H232 L242 28 L254 8 L266 48 L278 28 H324 L334 28 L346 16 L358 40 L370 28 H400";

  return (
    <div className="relative h-14 w-full overflow-hidden rounded-xl bg-black/[0.03]">
      <div
        className={cn(
          "absolute inset-y-0 left-0 flex w-[200%]",
          !reduce && "animate-pulse-wave"
        )}
      >
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 400 56"
            preserveAspectRatio="none"
            className="h-full w-1/2 text-foreground/55"
            aria-hidden
          >
            <path
              d={wave}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        ))}
      </div>
      {/* Soft edge fade */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />
    </div>
  );
}

export function Security247Section() {
  const reduce = usePrefersReducedMotion();
  const [activeStage, setActiveStage] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    if (reduce) return;
    let last = performance.now();
    let elapsed = 0;
    const tick = (now: number) => {
      const dt = (now - last) / 1000;
      last = now;
      elapsed += dt;
      const stage = Math.floor(elapsed / 2.2) % securityStages.length;
      setActiveStage(stage);
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf.current);
  }, [reduce]);

  const activeName = securityStages[activeStage]?.name ?? "DETECT";

  return (
    <section className="section-space relative overflow-hidden">
      {/* Faint section-wide dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0A0A0A 0.9px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-2xl text-center md:mb-16">
            <p className="eyebrow mb-5 justify-center">
              <span className="size-1.5 shrink-0 rounded-full bg-foreground/35" />
              Always on
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl md:text-[2.75rem]">
              Your security doesn&apos;t clock out.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed md:text-lg">
              A continuous operating cycle — monitor, detect, investigate,
              contain, respond, resolve — around the clock.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid items-stretch gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Featured — ~58% width, stronger presence */}
          <motion.div
            className="relative overflow-hidden rounded-2xl border border-black/[0.06] bg-white p-8 shadow-lg sm:p-10 lg:col-span-7 lg:row-span-1 lg:min-h-[520px] lg:p-11"
            initial={reduce ? false : { opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            {/* Depth: radial glow + inner dot grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #0A0A0A 0.8px, transparent 1px)",
                backgroundSize: "18px 18px",
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-20 top-1/2 size-[280px] -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.12)_0%,transparent_68%)] blur-2xl"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-16 -top-16 size-56 rounded-full bg-[radial-gradient(circle,rgba(10,10,10,0.05)_0%,transparent_70%)]"
            />

            <div className="relative flex h-full flex-col justify-between gap-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.22em] text-muted-foreground uppercase">
                    Live cycle
                  </p>
                  <p className="mt-3 text-6xl font-semibold tracking-[-0.04em] text-foreground sm:text-7xl md:text-[5.5rem] md:leading-none">
                    24/7
                  </p>
                  <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                    Always-on coverage across the full response chain — not a
                    ticket queue that waits until morning.
                  </p>
                </div>

                <div className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-black/[0.08] bg-white/90 px-3.5 py-2 shadow-sm">
                  <span className="relative flex size-2">
                    {!reduce && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-45" />
                    )}
                    <span className="relative inline-flex size-2 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-[11px] tracking-[0.14em] text-foreground">
                    {activeName}
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                    Signal
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                    {String(activeStage + 1).padStart(2, "0")}/
                    {String(securityStages.length).padStart(2, "0")}
                  </span>
                </div>

                <PulseWaveform reduce={reduce} />

                <div className="flex flex-wrap gap-2.5">
                  {securityStages.map((stage, i) => {
                    const active = i === activeStage;
                    return (
                      <span
                        key={stage.name}
                        className={cn(
                          "rounded-lg px-3 py-1.5 font-mono text-[11px] tracking-[0.14em] transition-all duration-500",
                          active
                            ? "bg-foreground text-background shadow-[0_4px_18px_rgb(10_10_10_/_0.28)]"
                            : "border border-black/[0.12] bg-transparent text-muted-foreground"
                        )}
                      >
                        {stage.name.slice(0, 3)}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stage cards — 5 cols, 2-up */}
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-2 lg:gap-4">
            {securityStages.map((stage, i) => {
              const Icon = stageIcons[i];
              const isActive = i === activeStage;
              const title =
                stage.name.charAt(0) + stage.name.slice(1).toLowerCase();

              return (
                <motion.div
                  key={stage.name}
                  className={cn(
                    "group relative flex flex-col rounded-2xl border bg-white p-5 transition-[box-shadow,transform,border-color] duration-300 sm:p-6",
                    isActive
                      ? "border-black/[0.06] border-l-[3px] border-l-primary shadow-[0_12px_32px_rgb(10_10_10_/_0.1)]"
                      : "border-black/[0.06] shadow-sm hover:-translate-y-0.5 hover:shadow-md"
                  )}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.5,
                    delay: reduce ? 0 : 0.28 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  <div className="mb-4 flex items-start justify-between gap-3">
                    <span
                      className={cn(
                        "flex size-11 items-center justify-center rounded-xl transition-colors duration-500 sm:size-12",
                        isActive
                          ? "bg-foreground text-background"
                          : "bg-black/[0.03] text-foreground/75"
                      )}
                    >
                      <Icon className="size-5 sm:size-6" strokeWidth={1.6} />
                    </span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-black/30">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold tracking-tight text-foreground sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {stage.description}
                  </p>

                  {isActive && (
                    <div className="mt-4 inline-flex w-fit items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1">
                      <span className="size-1.5 rounded-full bg-primary" />
                      <span className="font-mono text-[9px] tracking-[0.14em] text-background uppercase">
                        Active
                      </span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
