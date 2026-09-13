"use client";

import { motion } from "framer-motion";

const logos = [
  "Northbridge Capital",
  "Meridian Health",
  "Ashford & Cole",
  "Borough Council",
  "Helix Payments",
  "Oakridge Legal",
];

export function TrustBar() {
  return (
    <section className="border-y border-black/[0.06] py-10 md:py-12">
      <div className="container-page">
        <p className="mb-8 text-center font-mono text-[10px] tracking-[0.24em] text-muted-foreground/70 uppercase">
          Trusted across regulated industries
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-3 md:grid-cols-6">
          {logos.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="flex h-10 items-center justify-center px-1 text-center text-[13px] font-medium tracking-wide text-muted-foreground/35 grayscale transition-all duration-300 hover:text-foreground hover:grayscale-0"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
