"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { siteConfig } from "@/lib/site";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";

const ASSURANCES = [
  "ISO 27001 aligned",
  "UK-based SOC",
  "Named escalation",
] as const;

export function FinalCtaSection() {
  const reduce = usePrefersReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] py-24 md:py-32 lg:py-36">
      {/* Dot grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #FFFFFF 0.9px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />

      {/* Accent glow rising from the base */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 size-[680px] -translate-x-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, rgba(225,29,46,0.32) 0%, rgba(225,29,46,0.08) 45%, transparent 72%)",
          filter: "blur(70px)",
        }}
        animate={
          reduce ? undefined : { opacity: [0.7, 1, 0.7], scale: [0.97, 1.03, 0.97] }
        }
        transition={
          reduce
            ? undefined
            : { duration: 7, repeat: Infinity, ease: "easeInOut" }
        }
      />

      {/* Top hairline */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/15 to-transparent"
      />

      <div className="container-page relative text-center">
        <ScrollReveal>
          <p className="mb-7 inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.2em] text-white/75 uppercase">
            <span className="size-1.5 shrink-0 rounded-full bg-primary" />
            Next step
          </p>

          <h2 className="mx-auto max-w-3xl text-[2rem] leading-[1.08] font-bold tracking-[-0.04em] text-balance text-white sm:text-5xl md:text-[3.5rem]">
            Let&apos;s make your network harder to question.
          </h2>

          <p className="mx-auto mt-6 max-w-md leading-relaxed text-white/55">
            No obligation. No sales pitch. Just a clear picture of your risk.
          </p>

          <div className="mt-11 flex w-full flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <MagneticButton
              href="/risk-review"
              className="bg-white text-[#0A0A0A] shadow-[0_1px_2px_rgb(0_0_0_/_0.3)] hover:bg-white/92 hover:shadow-[0_12px_36px_rgb(255_255_255_/_0.18)]"
            >
              Book a 30-Minute Risk Review
            </MagneticButton>
            <MagneticButton
              href="/services"
              variant="outline"
              showArrow={false}
              className="border-white/20 text-white hover:border-white/35 hover:bg-white/[0.06]"
            >
              Explore Our Services
            </MagneticButton>
          </div>

          <a
            href={siteConfig.phoneHref}
            className="mt-10 inline-flex items-center gap-2 font-mono text-sm text-white/45 transition-colors hover:text-white"
          >
            <span className="relative flex size-1.5">
              {!reduce && (
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-50" />
              )}
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            24/7 {siteConfig.phone}
          </a>

          {/* Assurance row */}
          <ul className="mx-auto mt-12 flex max-w-lg flex-wrap items-center justify-center gap-x-7 gap-y-2 border-t border-white/10 pt-8">
            {ASSURANCES.map((item) => (
              <li
                key={item}
                className="font-mono text-[10px] tracking-[0.16em] text-white/35 uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </ScrollReveal>
      </div>
    </section>
  );
}
