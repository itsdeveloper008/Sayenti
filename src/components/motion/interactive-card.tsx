"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type InteractiveCardProps = {
  children: React.ReactNode;
  className?: string;
  contentClassName?: string;
};

/** Flat premium card - lift only, no 3D tilt. */
export function InteractiveCard({
  children,
  className,
  contentClassName,
}: InteractiveCardProps) {
  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "bento-card group relative h-full hover:border-black/[0.12]",
        className
      )}
    >
      <div className={cn("relative z-10 h-full", contentClassName)}>
        {children}
      </div>
    </motion.div>
  );
}
