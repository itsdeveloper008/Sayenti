"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
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

const STAGE_ICONS: LucideIcon[] = [
  Radar,
  Search,
  ScanSearch,
  Shield,
  Zap,
  CheckCircle2,
];

/** Elapsed time into a representative incident at each stage. */
const STAGE_CLOCK = ["00:00", "00:02", "00:04", "00:06", "00:09", "00:11"] as const;

const STAGE_MS = 2600;
const EASE = [0.22, 1, 0.36, 1] as const;
const COUNT = securityStages.length;

const OUTCOMES = [
  { value: "11 min", label: "Median containment" },
  { value: "< 15 min", label: "Acknowledge SLA" },
  { value: "365", label: "Nights covered" },
] as const;

function titleCase(name: string) {
  return name.charAt(0) + name.slice(1).toLowerCase();
}

/* ------------------------------------------------------------------ */
/* Orbital dial                                                        */
/* ------------------------------------------------------------------ */

function OrbitDial({
  active,
  onSelect,
  reduce,
}: {
  active: number;
  onSelect: (i: number) => void;
  reduce: boolean;
}) {
  const R = 37.5; // node orbit radius as % of the box
  const CIRC = 2 * Math.PI * 150;
  const progress = (active + 1) / COUNT;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[460px]">
      {/* Radar sweep */}
      {!reduce && (
        <div
          aria-hidden
          className="absolute inset-[8%] rounded-full animate-[spin_7s_linear_infinite]"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(225,29,46,0.16) 0deg, rgba(225,29,46,0.05) 40deg, transparent 90deg)",
            maskImage:
              "radial-gradient(circle, transparent 46%, black 47%, black 100%)",
            WebkitMaskImage:
              "radial-gradient(circle, transparent 46%, black 47%, black 100%)",
          }}
        />
      )}

      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden>
        {/* Hour ticks */}
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          const major = i % 4 === 0;
          const r1 = major ? 186 : 190;
          const r2 = 196;
          return (
            <line
              key={i}
              x1={200 + r1 * Math.cos(a)}
              y1={200 + r1 * Math.sin(a)}
              x2={200 + r2 * Math.cos(a)}
              y2={200 + r2 * Math.sin(a)}
              stroke="#0A0A0A"
              strokeOpacity={major ? 0.28 : 0.12}
              strokeWidth={major ? 1.5 : 1}
            />
          );
        })}

        {/* Orbit track */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#0A0A0A"
          strokeOpacity="0.08"
          strokeWidth="1.5"
        />
        {/* Progress arc - starts at 12 o'clock */}
        <motion.circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#0A0A0A"
          strokeWidth="2"
          strokeLinecap="round"
          transform="rotate(-90 200 200)"
          strokeDasharray={CIRC}
          animate={{ strokeDashoffset: CIRC * (1 - progress) }}
          transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
        />
        {/* Inner ring */}
        <circle
          cx="200"
          cy="200"
          r="104"
          fill="none"
          stroke="#0A0A0A"
          strokeOpacity="0.06"
          strokeWidth="1"
          strokeDasharray="2 6"
        />
      </svg>

      {/* Stage nodes */}
      {securityStages.map((stage, i) => {
        const Icon = STAGE_ICONS[i];
        const angle = (i / COUNT) * Math.PI * 2 - Math.PI / 2;
        const left = 50 + R * Math.cos(angle);
        const top = 50 + R * Math.sin(angle);
        const isActive = i === active;
        const done = i < active;

        return (
          <button
            key={stage.name}
            type="button"
            onClick={() => onSelect(i)}
            aria-label={`${titleCase(stage.name)} stage`}
            aria-pressed={isActive}
            className="group absolute z-10 -translate-x-1/2 -translate-y-1/2 focus-visible:outline-none"
            style={{ left: `${left}%`, top: `${top}%` }}
          >
            <span className="relative flex items-center justify-center">
              {isActive && !reduce && (
                <span className="absolute size-14 animate-ping rounded-full bg-primary/30 [animation-duration:1.8s]" />
              )}
              <span
                className={cn(
                  "relative flex size-11 items-center justify-center rounded-full border transition-all duration-500 sm:size-12",
                  isActive
                    ? "border-foreground bg-foreground text-background shadow-[0_10px_28px_rgb(10_10_10_/_0.28)] scale-110"
                    : done
                      ? "border-foreground/70 bg-white text-foreground"
                      : "border-black/[0.1] bg-white text-foreground/45 group-hover:border-black/30 group-hover:text-foreground"
                )}
              >
                <Icon className="size-[18px]" strokeWidth={1.7} />
                {isActive && (
                  <span className="absolute -right-0.5 -top-0.5 size-2.5 rounded-full border-2 border-white bg-primary" />
                )}
              </span>
            </span>
            {/* Label pushed radially outward so it never crosses the orbit */}
            <span
              className={cn(
                "pointer-events-none absolute top-1/2 left-1/2 whitespace-nowrap font-mono text-[9px] tracking-[0.18em] uppercase transition-colors duration-300",
                isActive ? "text-foreground" : "text-muted-foreground/70"
              )}
              style={{
                transform: `translate(calc(-50% + ${Math.cos(angle) * 46}px), calc(-50% + ${Math.sin(angle) * 46}px))`,
              }}
            >
              {stage.name}
            </span>
          </button>
        );
      })}

      {/* Core */}
      <div className="absolute inset-[27%] flex flex-col items-center justify-center rounded-full border border-black/[0.06] bg-white shadow-[0_18px_50px_rgb(10_10_10_/_0.08)]">
        <span className="font-mono text-[9px] tracking-[0.22em] text-muted-foreground uppercase">
          Live cycle
        </span>
        <span className="mt-1 text-[2.6rem] font-bold leading-none tracking-[-0.05em] text-foreground sm:text-[3.1rem]">
          24/7
        </span>
        <span className="mt-2.5 inline-flex items-center gap-1.5 rounded-full bg-foreground px-2.5 py-1">
          <span className="size-1.5 rounded-full bg-primary" />
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={active}
              initial={reduce ? false : { opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? undefined : { opacity: 0, y: -4 }}
              transition={{ duration: 0.25 }}
              className="font-mono text-[10px] tracking-[0.16em] text-background"
            >
              {securityStages[active].name}
            </motion.span>
          </AnimatePresence>
        </span>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Incident timeline                                                   */
/* ------------------------------------------------------------------ */

function IncidentTimeline({
  active,
  onSelect,
  reduce,
}: {
  active: number;
  onSelect: (i: number) => void;
  reduce: boolean;
}) {
  return (
    <div className="relative">
      <span
        aria-hidden
        className="absolute top-3 bottom-3 left-[6.125rem] w-px bg-black/[0.08] sm:left-[6.375rem]"
      />
      <motion.span
        aria-hidden
        className="absolute top-3 left-[6.125rem] w-px bg-foreground sm:left-[6.375rem]"
        animate={{ height: `${(active / (COUNT - 1)) * 100}%` }}
        style={{ maxHeight: "calc(100% - 1.5rem)" }}
        transition={{ duration: reduce ? 0 : 0.6, ease: EASE }}
      />

      <ol className="space-y-1">
        {securityStages.map((stage, i) => {
          const isActive = i === active;
          const done = i < active;
          return (
            <li key={stage.name}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-current={isActive ? "step" : undefined}
                className={cn(
                  "group grid w-full grid-cols-[4.25rem_1.25rem_1fr] items-start gap-x-3 rounded-xl px-2 py-3 text-left transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 sm:grid-cols-[4.5rem_1.25rem_1fr]",
                  isActive ? "bg-black/[0.03]" : "hover:bg-black/[0.02]"
                )}
              >
                <span
                  className={cn(
                    "pt-0.5 font-mono text-[11px] tracking-[0.08em] tabular-nums transition-colors",
                    isActive ? "text-foreground" : "text-muted-foreground/70"
                  )}
                >
                  T+{STAGE_CLOCK[i]}
                </span>

                <span className="relative flex h-5 items-center justify-center">
                  <span
                    className={cn(
                      "size-2.5 rounded-full border-2 bg-white transition-all duration-300",
                      isActive
                        ? "border-primary bg-primary scale-125"
                        : done
                          ? "border-foreground bg-foreground"
                          : "border-black/20"
                    )}
                  />
                </span>

                <span className="min-w-0">
                  <span className="flex items-center gap-2.5">
                    <span
                      className={cn(
                        "text-[15px] font-semibold tracking-tight transition-colors sm:text-base",
                        isActive || done
                          ? "text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {titleCase(stage.name)}
                    </span>
                    {isActive && (
                      <span className="inline-flex items-center gap-1 rounded-full border border-primary/25 bg-primary/[0.06] px-2 py-0.5 font-mono text-[9px] tracking-[0.16em] text-primary uppercase">
                        Active
                      </span>
                    )}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        key="body"
                        initial={reduce ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduce ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: EASE }}
                        className="block overflow-hidden"
                      >
                        <span className="block pt-1.5 text-sm leading-relaxed text-muted-foreground">
                          {stage.description}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function Security247Section() {
  const reduce = usePrefersReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [tick, setTick] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => setInView(e.isIntersecting),
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const playing = inView && !paused && !reduce;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(
      () => setActive((a) => (a + 1) % COUNT),
      STAGE_MS
    );
    return () => window.clearInterval(id);
  }, [playing, tick]);

  const select = (i: number) => {
    setActive(i);
    setTick((t) => t + 1);
  };

  return (
    <section
      ref={ref}
      className="section-space relative overflow-hidden border-t border-black/[0.05] bg-surface-elevated"
    >
      <div className="container-page relative">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="eyebrow mb-5 justify-center">
              <span className="eyebrow-dot" />
              Always On
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-[2.75rem]">
              Your Security Doesn&apos;t Clock Out.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed md:text-lg">
              One continuous operating cycle - monitor, detect, investigate,
              contain, respond, resolve - running every hour of every night.
            </p>
          </div>
        </ScrollReveal>

        <motion.div
          className="overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_24px_70px_rgb(10_10_10_/_0.07)]"
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: EASE }}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="grid lg:grid-cols-12">
            {/* Dial */}
            <div className="relative flex flex-col border-b border-black/[0.06] p-7 sm:p-10 lg:col-span-6 lg:border-r lg:border-b-0 lg:p-12">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #0A0A0A 0.8px, transparent 1px)",
                  backgroundSize: "18px 18px",
                }}
              />
              <div className="relative flex items-center justify-between">
                <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                  <span className="relative flex size-1.5">
                    {!reduce && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
                    )}
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  SOC · Colchester
                </span>
                <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
                  {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                </span>
              </div>

              <div className="relative flex flex-1 items-center px-4 py-10 sm:px-8">
                <OrbitDial active={active} onSelect={select} reduce={reduce} />
              </div>
            </div>

            {/* Timeline */}
            <div className="flex flex-col p-7 sm:p-10 lg:col-span-6 lg:p-12">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                    Response chain
                  </p>
                  <h3 className="mt-2 text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
                    A representative overnight incident
                  </h3>
                </div>
                <span className="hidden shrink-0 rounded-full border border-black/[0.08] px-2.5 py-1 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase sm:inline-flex">
                  Elapsed
                </span>
              </div>

              <div className="mt-7 flex-1">
                <IncidentTimeline active={active} onSelect={select} reduce={reduce} />
              </div>

              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-black/[0.06] pt-7">
                {OUTCOMES.map((o, i) => (
                  <div key={o.label}>
                    <dd
                      className={cn(
                        "font-mono text-lg font-semibold tracking-tight sm:text-xl",
                        i === 0 ? "text-primary" : "text-foreground"
                      )}
                    >
                      {o.value}
                    </dd>
                    <dt className="mt-1 text-[11px] leading-snug text-muted-foreground sm:text-xs">
                      {o.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
