"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { techPartners } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

function LogoRow({
  partners,
  ariaHidden,
}: {
  partners: typeof techPartners;
  ariaHidden?: boolean;
}) {
  return (
    <ul
      className="flex shrink-0 items-center gap-10 pr-10 sm:gap-14 sm:pr-14 md:gap-16 md:pr-16"
      aria-hidden={ariaHidden || undefined}
    >
      {partners.map((partner) => (
        <li
          key={`${ariaHidden ? "dup" : "a"}-${partner.name}`}
          className="flex shrink-0 items-center justify-center opacity-75 transition-opacity duration-200 hover:opacity-100"
        >
          <Image
            src={partner.src}
            alt={ariaHidden ? "" : partner.name}
            width={160}
            height={80}
            unoptimized
            className="h-8 w-auto max-w-[7.5rem] object-contain sm:h-9 sm:max-w-[8.5rem] md:h-10 md:max-w-[9.5rem]"
          />
        </li>
      ))}
    </ul>
  );
}

export function PartnersLogoGrid({
  className,
  eyebrow = "Trusted Technology Partners",
}: {
  className?: string;
  eyebrow?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <section className={cn("section-space bg-background", className)}>
      <div className="container-page">
        <motion.p
          className="eyebrow mb-10 justify-center sm:mb-12 md:mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-dot" />
          {eyebrow}
        </motion.p>
      </div>

      {reduce ? (
        <div className="container-page overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <LogoRow partners={techPartners} />
        </div>
      ) : (
        <div className="group relative overflow-hidden">
          {/* Soft edge fades */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-12 bg-gradient-to-r from-background to-transparent sm:w-20 md:w-28"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-12 bg-gradient-to-l from-background to-transparent sm:w-20 md:w-28"
          />

          <div className="flex w-max animate-logo-marquee py-1 group-hover:[animation-play-state:paused]">
            <LogoRow partners={techPartners} />
            <LogoRow partners={techPartners} ariaHidden />
          </div>
        </div>
      )}
    </section>
  );
}
