"use client";

import Link from "next/link";
import {
  ArrowRight,
  Cloud,
  Network,
  Shield,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const icons: Record<string, LucideIcon> = {
  mssp: ShieldCheck,
  "cloud-migration": Cloud,
  connectivity: Network,
  cybersecurity: Shield,
};

type BentoServiceCardProps = {
  href: string;
  title: string;
  description: string;
  iconKey: keyof typeof icons | string;
  featured?: boolean;
  className?: string;
};

export function BentoServiceCard({
  href,
  title,
  description,
  iconKey,
  featured,
  className,
}: BentoServiceCardProps) {
  const Icon = icons[iconKey] ?? Shield;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
      className={cn("h-full", className)}
    >
      <Link
        href={href}
        className={cn(
          "bento-card group relative flex h-full flex-col overflow-hidden p-6 hover:border-black/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20",
          featured && "md:p-8"
        )}
      >
        <div className="relative z-10 flex h-full flex-col">
          <div
            className={cn(
              "mb-5 inline-flex size-11 items-center justify-center rounded-xl border border-black/[0.06] bg-black/[0.03] text-foreground",
              featured && "size-12"
            )}
          >
            <Icon className="size-5" aria-hidden />
          </div>
          <h3
            className={cn(
              "font-semibold tracking-tight text-foreground",
              featured ? "text-2xl" : "text-lg"
            )}
          >
            {title}
          </h3>
          <p
            className={cn(
              "mt-2 text-muted-foreground",
              featured ? "max-w-md text-base" : "text-sm"
            )}
          >
            {description}
          </p>
          <span className="mt-auto inline-flex items-center gap-1.5 pt-6 text-sm font-medium text-foreground transition-transform duration-200 group-hover:translate-x-0.5">
            Learn more
            <ArrowRight className="size-4" aria-hidden />
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
