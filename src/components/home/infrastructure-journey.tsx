"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "framer-motion";
import { infrastructureLayers } from "@/lib/data/motion-content";
import { useIsLgUp, usePrefersReducedMotion } from "@/hooks/use-motion-prefs";
import { cn } from "@/lib/utils";

const LAYER_COUNT = infrastructureLayers.length;

function MediaCanvas({
  active,
  reduce,
}: {
  active: number;
  reduce: boolean;
}) {
  const layer = infrastructureLayers[active];

  return (
    <div className="relative">
      {/* Corner tick marks */}
      {[
        "-top-2 -left-2 border-t border-l",
        "-top-2 -right-2 border-t border-r",
        "-bottom-2 -left-2 border-b border-l",
        "-bottom-2 -right-2 border-b border-r",
      ].map((pos) => (
        <span
          key={pos}
          aria-hidden
          className={cn("absolute size-4 border-black/15", pos)}
        />
      ))}

      <div className="overflow-hidden rounded-3xl border border-black/[0.07] bg-white/70 p-2 shadow-[0_20px_56px_rgb(15_23_42_/_0.1)] backdrop-blur-sm sm:p-2.5">
        {/* Panel chrome */}
        <div className="flex items-center justify-between gap-3 px-2.5 pt-1 pb-2.5">
          <div className="flex items-center gap-2">
            <span className="relative flex size-1.5">
              {!reduce && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-40" />
              )}
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              Estate view
            </span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-foreground">
            {String(active + 1).padStart(2, "0")} /{" "}
            {String(LAYER_COUNT).padStart(2, "0")}
          </span>
        </div>

        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[1.15rem] bg-slate-200/70">
          <AnimatePresence mode="sync" initial={false}>
            <motion.div
              key={layer.id}
              className="absolute inset-0"
              initial={reduce ? false : { opacity: 0, scale: 1.03 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={reduce ? undefined : { opacity: 0, scale: 0.99 }}
              transition={
                reduce
                  ? { duration: 0 }
                  : { duration: 0.45, ease: [0.22, 1, 0.36, 1] }
              }
            >
              <Image
                src={layer.image}
                alt={layer.label}
                fill
                sizes="(max-width: 1024px) 100vw, 58vw"
                className="object-cover"
                priority={active === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Caption scrim */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 bg-gradient-to-t from-black/65 via-black/20 to-transparent px-5 pt-20 pb-5">
            <div>
              <p className="font-mono text-[10px] tracking-[0.2em] text-white/65 uppercase">
                Layer {String(active + 1).padStart(2, "0")}
              </p>
              <p className="mt-1 text-lg font-semibold tracking-tight text-white">
                {layer.label}
              </p>
            </div>
            <p className="hidden max-w-[13rem] text-right text-[11px] leading-snug text-white/70 sm:block">
              {layer.body}
            </p>
          </div>

          {/* Segmented progress along the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 flex gap-px">
            {infrastructureLayers.map((l, i) => (
              <span
                key={l.id}
                className={cn(
                  "h-[3px] flex-1 transition-colors duration-500",
                  i === active
                    ? "bg-primary"
                    : i < active
                      ? "bg-white/55"
                      : "bg-white/15"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function InfrastructureJourney() {
  const reduce = usePrefersReducedMotion();
  const isLg = useIsLgUp();
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [clickLock, setClickLock] = useState(false);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lockTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 32,
    restDelta: 0.001,
  });

  useMotionValueEvent(smooth, "change", (v) => {
    if (!isLg || clickLock) return;
    const idx = Math.min(
      LAYER_COUNT - 1,
      Math.max(0, Math.floor(v * LAYER_COUNT))
    );
    setActive((prev) => (prev === idx ? prev : idx));
  });

  const selectStep = useCallback(
    (index: number) => {
      setActive(index);
      if (!isLg) return;

      setClickLock(true);
      if (lockTimer.current) clearTimeout(lockTimer.current);

      const el = sectionRef.current;
      if (el) {
        const rect = el.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const scrollable = el.offsetHeight - window.innerHeight;
        const target =
          absoluteTop + (scrollable * (index + 0.5)) / LAYER_COUNT;
        window.scrollTo({
          top: target,
          behavior: reduce ? "auto" : "smooth",
        });
      }

      lockTimer.current = setTimeout(
        () => setClickLock(false),
        reduce ? 50 : 800
      );
    },
    [isLg, reduce]
  );

  useEffect(() => {
    return () => {
      if (lockTimer.current) clearTimeout(lockTimer.current);
    };
  }, []);

  const onListKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (
      e.key !== "ArrowDown" &&
      e.key !== "ArrowUp" &&
      e.key !== "Home" &&
      e.key !== "End"
    ) {
      return;
    }
    e.preventDefault();
    let next = active;
    if (e.key === "ArrowDown") next = Math.min(LAYER_COUNT - 1, active + 1);
    if (e.key === "ArrowUp") next = Math.max(0, active - 1);
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = LAYER_COUNT - 1;
    selectStep(next);
    itemRefs.current[next]?.focus();
  };

  const railProgress = ((active + 1) / LAYER_COUNT) * 100;

  return (
    <section
      ref={sectionRef}
      className="relative border-t border-black/[0.05] bg-[#F9FAFB]"
      style={isLg ? { height: `${LAYER_COUNT * 100}vh` } : undefined}
    >
      <div
        className={cn(
          "flex items-center py-16 md:py-20",
          isLg
            ? "sticky top-0 min-h-dvh overflow-hidden"
            : "min-h-0 overflow-visible"
        )}
      >
        <div className="container-page w-full">
          <div className="mb-10 text-center lg:mb-14">
            <p className="eyebrow mb-5 w-full justify-center">
              <span className="eyebrow-dot" />
              Infrastructure
            </p>
            <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl md:text-[2.75rem] md:tracking-[-0.035em]">
              How the estate connects.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 md:text-base">
              {isLg
                ? "Scroll to assemble the path from users to data — with security layers activating as the architecture builds."
                : "Tap a layer to see how security activates from users to data."}
            </p>
          </div>

          <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:items-center lg:gap-14 xl:gap-16">
            {/* Left — layer index */}
            <div className="lg:col-span-5">
              <div className="relative mt-1">
                <div className="mb-5 flex justify-center lg:justify-start">
                  <span className="rounded-full border border-black/[0.08] bg-white px-2.5 py-1 font-mono text-[10px] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                    {LAYER_COUNT} layers
                  </span>
                </div>
                {/* Progress rail */}
                <span
                  aria-hidden
                  className="absolute top-1 bottom-1 left-0 w-px bg-black/[0.08]"
                />
                <motion.span
                  aria-hidden
                  className="absolute top-1 left-0 w-[2px] bg-foreground"
                  animate={{ height: `${railProgress}%` }}
                  transition={{
                    duration: reduce ? 0 : 0.45,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />

                <div
                  role="tablist"
                  aria-label="Infrastructure layers"
                  aria-orientation="vertical"
                  onKeyDown={onListKeyDown}
                >
                  {infrastructureLayers.map((layer, i) => {
                    const isActive = i === active;
                    return (
                      <button
                        key={layer.id}
                        ref={(el) => {
                          itemRefs.current[i] = el;
                        }}
                        type="button"
                        role="tab"
                        id={`infra-tab-${layer.id}`}
                        aria-selected={isActive}
                        aria-controls="infra-media-panel"
                        tabIndex={isActive ? 0 : -1}
                        onClick={() => selectStep(i)}
                        className={cn(
                          "group flex w-full items-baseline gap-4 rounded-r-lg py-2.5 pl-5 text-left transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 sm:py-3",
                          isActive
                            ? "opacity-100"
                            : "opacity-40 hover:opacity-75"
                        )}
                      >
                        <span
                          className={cn(
                            "shrink-0 font-mono text-[10px] tracking-[0.14em] transition-colors duration-300",
                            isActive ? "text-primary" : "text-slate-400"
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span className="min-w-0">
                          <span
                            className={cn(
                              "block text-[15px] tracking-tight transition-colors duration-300",
                              isActive
                                ? "font-semibold text-slate-900"
                                : "font-medium text-slate-400"
                            )}
                          >
                            {layer.label}
                          </span>
                          <span
                            className={cn(
                              "mt-0.5 block text-sm leading-snug transition-colors duration-300",
                              isActive ? "text-slate-500" : "text-slate-400"
                            )}
                          >
                            {layer.body}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Right — media canvas */}
            <div className="lg:col-span-7">
              <div
                id="infra-media-panel"
                role="tabpanel"
                aria-labelledby={`infra-tab-${infrastructureLayers[active].id}`}
                aria-live="polite"
              >
                <MediaCanvas active={active} reduce={reduce} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
