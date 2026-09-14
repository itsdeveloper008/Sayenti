"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { techPartners } from "@/lib/data/partners";
import { cn } from "@/lib/utils";

export function PartnersLogoGrid({
  className,
  eyebrow = "Trusted Technology Partners",
}: {
  className?: string;
  eyebrow?: string;
}) {
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

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5 lg:gap-5">
          {techPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 16, scale: 0.96 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.03, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="flex aspect-[5/4] w-full items-center justify-center rounded-2xl border border-black/[0.06] bg-white p-5 shadow-sm transition-shadow duration-200 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.08)] sm:aspect-square sm:p-7 md:p-8"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={80}
                unoptimized
                className="h-auto max-h-[42%] w-[52%] object-contain"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
