"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  AppWindow,
  ArrowRight,
  Check,
  Cloud,
  Database,
  Laptop,
  Network,
  Users,
  type LucideIcon,
} from "lucide-react";
import { infrastructureLayers } from "@/lib/data/motion-content";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const ICONS: LucideIcon[] = [Users, Laptop, Network, Cloud, AppWindow, Database];
const COUNT = infrastructureLayers.length;
const STEP_MS = 4200;
const EASE = [0.22, 1, 0.36, 1] as const;

const pad = (n: number) => String(n).padStart(2, "0");

/* ------------------------------------------------------------------ */
/* Pipeline                                                            */
/* ------------------------------------------------------------------ */

function Connector({ lit, reduce }: { lit: boolean; reduce: boolean }) {
  return (
    <div className="relative mt-7 hidden h-px flex-1 md:block" aria-hidden>
      <span className="absolute inset-0 bg-black/[0.1]" />
      <motion.span
        className="absolute inset-y-0 left-0 origin-left bg-foreground"
        animate={{ scaleX: lit ? 1 : 0 }}
        style={{ width: "100%" }}
        transition={{ duration: reduce ? 0 : 0.5, ease: EASE }}
      />
      {lit && !reduce && (
        <span className="absolute top-1/2 left-0 size-1.5 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_0_3px_rgba(225,29,46,0.18)] animate-[packet_1.6s_linear_infinite]" />
      )}
    </div>
  );
}

function Pipeline({
  active,
  onSelect,
  reduce,
}: {
  active: number;
  onSelect: (i: number) => void;
  reduce: boolean;
}) {
  return (
    <div
      role="tablist"
      aria-label="Infrastructure layers"
      className="-mx-5 flex snap-x gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:-mx-6 sm:px-6 md:mx-0 md:items-start md:gap-0 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden"
    >
      {infrastructureLayers.map((layer, i) => {
        const Icon = ICONS[i];
        const isActive = i === active;
        const done = i < active;
        return (
          <div key={layer.id} className="contents">
            <button
              type="button"
              role="tab"
              id={`infra-tab-${layer.id}`}
              aria-selected={isActive}
              aria-controls="infra-panel"
              onClick={() => onSelect(i)}
              className="group flex shrink-0 snap-start flex-col items-center gap-3 focus-visible:outline-none md:w-[6.25rem] lg:w-[7.5rem]"
            >
              <span
                className={cn(
                  "flex items-center gap-2.5 rounded-full border px-3.5 py-2 transition-all duration-300 md:flex-col md:gap-0 md:rounded-2xl md:border-0 md:bg-transparent md:p-0",
                  isActive
                    ? "border-foreground bg-foreground text-background md:bg-transparent md:text-foreground"
                    : "border-black/[0.1] bg-white text-foreground/70 md:bg-transparent"
                )}
              >
                <span
                  className={cn(
                    "flex size-8 items-center justify-center rounded-full transition-all duration-500 md:size-14 md:rounded-2xl md:border md:shadow-sm group-focus-visible:ring-2 group-focus-visible:ring-foreground/20",
                    isActive
                      ? "md:border-foreground md:bg-foreground md:text-background md:shadow-[0_14px_34px_rgb(10_10_10_/_0.22)] md:-translate-y-1"
                      : done
                        ? "md:border-foreground/60 md:bg-white md:text-foreground"
                        : "md:border-black/[0.08] md:bg-white md:text-foreground/50 md:group-hover:border-black/25 md:group-hover:text-foreground"
                  )}
                >
                  <Icon className="size-4 md:size-6" strokeWidth={1.6} />
                </span>
                <span className="text-sm font-medium md:hidden">{layer.label}</span>
              </span>

              <span className="hidden text-center md:block">
                <span
                  className={cn(
                    "block font-mono text-[10px] tracking-[0.18em] transition-colors",
                    isActive ? "text-primary" : "text-muted-foreground/60"
                  )}
                >
                  {pad(i + 1)}
                </span>
                <span
                  className={cn(
                    "mt-0.5 block text-[15px] font-semibold tracking-tight transition-colors",
                    isActive || done ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  {layer.label}
                </span>
              </span>
            </button>
            {i < COUNT - 1 && <Connector lit={i < active} reduce={reduce} />}
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function InfrastructureJourney() {
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
      STEP_MS
    );
    return () => window.clearInterval(id);
  }, [playing, tick]);

  const select = (i: number) => {
    setActive(((i % COUNT) + COUNT) % COUNT);
    setTick((t) => t + 1);
  };

  const layer = infrastructureLayers[active];
  const next = infrastructureLayers[(active + 1) % COUNT];

  return (
    <section
      ref={ref}
      className="section-space relative overflow-hidden border-t border-black/[0.05] bg-background"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0A0A0A 0.85px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="container-page relative">
        <ScrollReveal>
          <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
            <p className="eyebrow mb-5 justify-center">
              <span className="eyebrow-dot" />
              Infrastructure
            </p>
            <h2 className="text-3xl font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-[2.75rem]">
              How The Estate Connects.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-muted-foreground leading-relaxed md:text-lg">
              Six layers between a user and your data. Each one is hardened,
              observed and evidenced - so a weakness in one never becomes a
              breach in the next.
            </p>
          </div>
        </ScrollReveal>

        <div
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <ScrollReveal delay={0.1}>
            <Pipeline active={active} onSelect={select} reduce={reduce} />
          </ScrollReveal>

          <motion.div
            id="infra-panel"
            role="tabpanel"
            aria-labelledby={`infra-tab-${layer.id}`}
            className="mt-8 overflow-hidden rounded-[1.75rem] border border-black/[0.07] bg-white shadow-[0_24px_70px_rgb(10_10_10_/_0.07)] md:mt-12"
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: EASE }}
          >
            <div className="grid lg:grid-cols-12">
              {/* Media */}
              <div className="relative aspect-[16/10] lg:col-span-7 lg:aspect-auto lg:min-h-[460px]">
                <AnimatePresence mode="sync" initial={false}>
                  <motion.div
                    key={layer.id}
                    className="absolute inset-0"
                    initial={reduce ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={reduce ? undefined : { opacity: 0 }}
                    transition={
                      reduce ? { duration: 0 } : { duration: 0.6, ease: EASE }
                    }
                  >
                    <Image
                      src={layer.image}
                      alt={layer.label}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover"
                      priority={active === 0}
                    />
                  </motion.div>
                </AnimatePresence>

                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                <div className="absolute top-5 left-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
                  <span className="relative flex size-1.5">
                    {!reduce && (
                      <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
                    )}
                    <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
                  </span>
                  <span className="font-mono text-[10px] tracking-[0.18em] text-white/85 uppercase">
                    Estate view
                  </span>
                </div>

                <div className="absolute inset-x-5 bottom-5">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-white/60 uppercase">
                    Layer {pad(active + 1)} / {pad(COUNT)}
                  </p>
                  <p className="mt-1 text-2xl font-semibold tracking-tight text-white sm:text-3xl">
                    {layer.label}
                  </p>
                </div>

                {/* Autoplay progress */}
                <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15">
                  <motion.span
                    key={`${active}-${playing}`}
                    className="block h-full bg-primary"
                    initial={{ width: playing ? "0%" : "100%" }}
                    animate={{ width: "100%" }}
                    transition={{
                      duration: playing ? STEP_MS / 1000 : 0.2,
                      ease: "linear",
                    }}
                  />
                </div>
              </div>

              {/* Detail */}
              <div className="flex flex-col p-7 sm:p-10 lg:col-span-5 lg:p-12">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={layer.id}
                    initial={reduce ? false : { opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={reduce ? undefined : { opacity: 0, y: -8 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="flex-1"
                  >
                    <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
                      {pad(active + 1)} · {layer.label}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-foreground sm:text-[1.75rem]">
                      {layer.body}
                    </h3>
                    <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
                      {layer.detail}
                    </p>

                    <p className="mt-8 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                      Controls in place
                    </p>
                    <ul className="mt-3 space-y-2.5">
                      {layer.controls.map((c, i) => (
                        <motion.li
                          key={c}
                          className="flex items-start gap-3 text-sm text-foreground"
                          initial={reduce ? false : { opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: reduce ? 0 : 0.15 + i * 0.07,
                            ease: EASE,
                          }}
                        >
                          <span className="mt-0.5 flex size-4.5 shrink-0 items-center justify-center rounded-full bg-foreground text-background">
                            <Check className="size-2.5" strokeWidth={3} />
                          </span>
                          {c}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </AnimatePresence>

                <div className="mt-9 flex items-center justify-between gap-4 border-t border-black/[0.06] pt-6">
                  <button
                    type="button"
                    onClick={() => select(active - 1)}
                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => select(active + 1)}
                    className="group inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-sm font-medium text-background transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[0_10px_28px_rgb(10_10_10_/_0.2)]"
                  >
                    Next: {next.label}
                    <ArrowRight
                      className="size-4 transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
