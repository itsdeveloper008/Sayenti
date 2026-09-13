"use client";

/**
 * Intentional dark "spotlight" section — deliberate break from the light theme.
 * Do not restyle to match surrounding light sections without product design review.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { bentoServices } from "@/lib/data/motion-content";
import { cn } from "@/lib/utils";

const spring = { type: "spring" as const, stiffness: 120, damping: 22, mass: 0.9 };

export function ServicesSpotlightCarousel() {
  const reduce = useReducedMotion();
  const autoplay = useRef(
    Autoplay({
      delay: 3000,
      stopOnInteraction: false,
      stopOnMouseEnter: true,
      stopOnFocusIn: true,
    })
  );

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: "center",
      skipSnaps: false,
      containScroll: false,
      duration: reduce ? 20 : 28,
    },
    reduce ? [] : [autoplay.current]
  );

  const trackRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!emblaApi) return;
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        emblaApi.scrollPrev();
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        emblaApi.scrollNext();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [emblaApi]);

  const activeTitle = bentoServices[selected]?.title ?? "";

  return (
    <section
      className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32 lg:py-36"
      data-section="services-spotlight"
      aria-roledescription="carousel"
      aria-label="Our services"
    >
      {/* Grain — depth on non-flat black */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto mb-12 max-w-6xl px-5 text-center sm:px-6 lg:px-8 md:mb-16">
        <p className="mb-4 inline-flex items-center justify-center gap-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase">
          <span className="size-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
          Our services
        </p>
        <h2 className="text-3xl font-bold tracking-[-0.035em] text-white sm:text-4xl md:text-[2.75rem]">
          Capabilities under continuous defence
        </h2>
      </div>

      <div ref={trackRef} className="relative mx-auto max-w-[1400px]">
        {/* Fixed red spotlight — stays centered under the active (center) card */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-1/2 z-0 h-[70%] w-[min(280px,40vw)] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse 55% 90% at 50% 100%, rgba(225,29,46,0.85) 0%, rgba(225,29,46,0.35) 35%, transparent 70%)",
            filter: "blur(48px)",
            mixBlendMode: "screen",
            opacity: reduce ? 0.55 : 1,
          }}
        >
          {!reduce && (
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              style={{
                background:
                  "radial-gradient(ellipse 50% 80% at 50% 100%, rgba(225,29,46,0.9) 0%, transparent 65%)",
              }}
            />
          )}
        </motion.div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex touch-pan-y items-stretch">
            {bentoServices.map((service, i) => {
              const active = i === selected;
              return (
                <div
                  key={service.key}
                  className="min-w-0 shrink-0 grow-0 basis-[82%] px-2 sm:basis-[58%] md:basis-[42%] lg:basis-[34%] md:px-3"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${i + 1} of ${bentoServices.length}: ${service.title}`}
                  aria-hidden={!active}
                >
                  <motion.article
                    className={cn(
                      "relative flex h-full min-h-[380px] flex-col overflow-hidden rounded-3xl border md:min-h-[440px]",
                      active
                        ? "border-white/15 shadow-[0_24px_80px_rgb(0_0_0_/_0.55)]"
                        : "border-white/5"
                    )}
                    animate={
                      reduce
                        ? { opacity: active ? 1 : 0.45, scale: 1 }
                        : {
                            scale: active ? 1 : 0.9,
                            opacity: active ? 1 : 0.45,
                            filter: active ? "blur(0px)" : "blur(2px)",
                          }
                    }
                    transition={reduce ? { duration: 0.25 } : spring}
                  >
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      sizes="(max-width: 768px) 82vw, 34vw"
                      className="object-cover"
                      priority={i === 0}
                    />
                    {/* Scrim for text legibility over photography + beam */}
                    <div
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20"
                      aria-hidden
                    />

                    <div className="relative z-10 flex h-full flex-col items-center justify-end p-7 text-center md:p-9">
                      <h3
                        className={cn(
                          "text-2xl font-semibold tracking-[-0.03em] text-white md:text-[1.85rem]",
                          !active && "opacity-80"
                        )}
                      >
                        {service.title}
                      </h3>

                      <AnimatePresence mode="wait">
                        {active && (
                          <motion.div
                            key={`${service.key}-body`}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 4 }}
                            transition={{ duration: reduce ? 0.15 : 0.35 }}
                            className="mt-4 flex w-full flex-col items-center"
                          >
                            <p className="max-w-md text-lg font-medium leading-snug text-white/90 md:text-xl md:leading-snug">
                              {service.description}
                            </p>
                            <Link
                              href={service.href}
                              tabIndex={active ? 0 : -1}
                              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-white transition-transform duration-200 hover:translate-x-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                            >
                              Learn more
                              <ArrowRight className="size-4" aria-hidden />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </div>
        </div>

        {/* Controls */}
        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 z-20 hidden items-center justify-between px-2 md:flex lg:px-4">
          <button
            type="button"
            onClick={() => emblaApi?.scrollPrev()}
            className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:scale-[1.02] hover:border-white/30 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Previous service"
          >
            <ArrowLeft className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => emblaApi?.scrollNext()}
            className="pointer-events-auto inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-black/40 text-white backdrop-blur-md transition-[transform,background-color,border-color] duration-200 hover:scale-[1.02] hover:border-white/30 hover:bg-black/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label="Next service"
          >
            <ArrowRight className="size-5" />
          </button>
        </div>
      </div>

      {/* Mobile arrows + dots */}
      <div className="relative z-10 mt-8 flex items-center justify-center gap-4 md:hidden">
        <button
          type="button"
          onClick={() => emblaApi?.scrollPrev()}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
          aria-label="Previous service"
        >
          <ArrowLeft className="size-4" />
        </button>
        <div className="flex gap-1.5" role="tablist" aria-label="Service slides">
          {bentoServices.map((s, i) => (
            <button
              key={s.key}
              type="button"
              role="tab"
              aria-selected={i === selected}
              aria-label={`Go to ${s.title}`}
              onClick={() => emblaApi?.scrollTo(i)}
              className={cn(
                "h-1.5 rounded-full transition-all duration-300",
                i === selected ? "w-6 bg-white" : "w-1.5 bg-white/30"
              )}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => emblaApi?.scrollNext()}
          className="inline-flex size-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
          aria-label="Next service"
        >
          <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        Showing {activeTitle}
      </div>
    </section>
  );
}
