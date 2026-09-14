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

        <div className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 sm:gap-x-8 sm:gap-y-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-x-10 lg:gap-y-12">
          {techPartners.map((partner, index) => (
            <motion.div
              key={partner.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.4,
                delay: Math.min(index * 0.03, 0.35),
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -2, opacity: 1 }}
              className="flex items-center justify-center opacity-80 transition-opacity duration-200 hover:opacity-100"
            >
              <Image
                src={partner.src}
                alt={partner.name}
                width={160}
                height={80}
                unoptimized
                className="h-8 w-auto max-w-[7.5rem] object-contain sm:h-9 sm:max-w-[8.5rem] md:h-10 md:max-w-[9.5rem]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
