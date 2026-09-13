"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FadeUp } from "@/components/motion/reveal-text";
import { MagneticButton } from "@/components/motion/magnetic-button";
import { useIntro } from "@/components/motion/intro-context";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";

function HeroHeadline() {
  const reduce = useReducedMotion();
  const lines = ["Your network defended", "while the office sleeps"];

  if (reduce) {
    return (
      <>
        Your network defended
        <br />
        while the office sleeps
        <span className="text-primary">.</span>
      </>
    );
  }

  return (
    <>
      {lines.map((line, i) => (
        <span key={line} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: 0.2 + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {line}
            {i === lines.length - 1 && (
              <span className="text-primary" aria-hidden>
                .
              </span>
            )}
          </motion.span>
        </span>
      ))}
    </>
  );
}

export function HeroSection() {
  const { introComplete } = useIntro();
  const reduce = usePrefersReducedMotion();
  const ready = introComplete || reduce;

  return (
    <section className="relative min-h-[min(92vh,920px)] overflow-hidden pt-28 pb-20 md:pt-36 md:pb-28">
      {/* Full-bleed silk hero — priority for LCP */}
      <div className="pointer-events-none absolute inset-0 z-0" data-cursor="scene">
        <Image
          src="/hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right md:object-[78%_center]"
        />
      </div>
      {/* Soft veil so type stays crisp over the ribbons on small screens */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-background via-background/75 to-transparent md:via-background/55 md:to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-24 bg-gradient-to-t from-background to-transparent" />

      <div className="container-page relative z-10 flex min-h-[calc(min(92vh,920px)-11rem)] flex-col justify-center">
        <div className="max-w-xl md:max-w-[34rem]">
          <FadeUp delay={reduce ? 0 : 0.1}>
            <p className="mb-6 max-w-full font-mono text-[10px] font-medium tracking-[0.14em] text-muted-foreground uppercase sm:mb-8 sm:tracking-[0.18em]">
              <span className="mb-1.5 inline-flex items-center gap-2 sm:mb-0">
                <span className="size-1.5 shrink-0 rounded-full bg-foreground/40" />
                <span className="sm:hidden">MSSP · Cloud · Connectivity · Cyber</span>
                <span className="hidden sm:inline">
                  MSSP · Cloud Migration · Superfast Connectivity · Cybersecurity
                </span>
              </span>
            </p>
          </FadeUp>

          {ready ? (
            <h1 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground">
              <HeroHeadline />
            </h1>
          ) : (
            <h1 className="text-[clamp(2.5rem,5.5vw,4.75rem)] font-semibold leading-[1.04] tracking-[-0.04em] text-foreground opacity-0">
              Your network defended while the office sleeps.
            </h1>
          )}

          <FadeUp delay={reduce ? 0.05 : 0.65} className="mt-7 max-w-[32rem]">
            <p className="text-base leading-[1.7] text-muted-foreground sm:text-lg">
              We architect, secure and operate the networks, cloud platforms and
              digital systems your organisation cannot afford to question.
            </p>
          </FadeUp>

          <FadeUp
            delay={reduce ? 0.1 : 0.85}
            className="mt-10 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center"
          >
            <span data-cursor="button">
              <MagneticButton href="/risk-review">
                Book a 30-Minute Risk Review
              </MagneticButton>
            </span>
            <span data-cursor="button">
              <MagneticButton
                href="/services"
                variant="outline"
                showArrow={false}
              >
                Explore Our Services
              </MagneticButton>
            </span>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
