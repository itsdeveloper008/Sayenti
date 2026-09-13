"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { techPartners } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

const COLS = 5;

export function PartnersLogoGrid({
  className,
  eyebrow = "Trusted technology partners",
}: {
  className?: string;
  eyebrow?: string;
}) {
  const columns = Array.from({ length: COLS }, (_, col) =>
    techPartners.filter((_, i) => i % COLS === col)
  );

  return (
    <section className={cn("section-space bg-background", className)}>
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.p
          className="eyebrow mb-12 justify-center sm:mb-14"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="eyebrow-dot" />
          {eyebrow}
        </motion.p>

        <div
          className="mx-auto w-full"
          style={{
            maskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 4%, black 96%, transparent 100%)",
          }}
        >
          <div className="flex justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6">
            {columns.map((colLogos, col) => (
              <div
                key={col}
                className={cn(
                  "flex flex-1 flex-col items-center gap-3 sm:gap-4 md:gap-5",
                  col % 2 === 1 && "mt-8 sm:mt-12 md:mt-16"
                )}
              >
                {colLogos.map((partner, row) => {
                  const index = row * COLS + col;
                  return (
                    <motion.div
                      key={partner.name}
                      initial={{ opacity: 0, y: 16, scale: 0.96 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, margin: "-20px" }}
                      transition={{
                        duration: 0.45,
                        delay: index * 0.04,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      whileHover={{ y: -4 }}
                      className="flex aspect-square w-full max-w-[180px] items-center justify-center rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.08)] sm:p-6 md:max-w-[200px] md:p-7 lg:max-w-[220px]"
                    >
                      <Image
                        src={partner.src}
                        alt={partner.name}
                        width={160}
                        height={80}
                        unoptimized
                        className="h-auto max-h-[72%] w-[78%] object-contain"
                      />
                    </motion.div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
