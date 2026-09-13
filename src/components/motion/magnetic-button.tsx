"use client";

import Link from "next/link";
import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type HTMLMotionProps,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { useIsDesktopPointer, usePrefersReducedMotion } from "@/hooks/use-motion-prefs";

type MagneticButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  variant?: "primary" | "outline";
  showArrow?: boolean;
};

export function MagneticButton({
  href,
  children,
  className,
  variant = "primary",
  showArrow = true,
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null);
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 20, mass: 0.35 });
  const springY = useSpring(y, { stiffness: 200, damping: 20, mass: 0.35 });

  function onMove(e: React.PointerEvent) {
    if (!desktop || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(dx * 0.14);
    y.set(dy * 0.14);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div style={{ x: springX, y: springY }} className="inline-flex w-full sm:w-auto">
      <Link
        ref={ref}
        href={href}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={cn(
          buttonVariants({ size: "lg" }),
          "group relative h-11 w-full gap-2 overflow-hidden rounded-full px-5 text-[14px] font-medium whitespace-normal sm:w-auto sm:px-7 sm:whitespace-nowrap transition-[box-shadow,background-color,border-color,transform] duration-300",
          variant === "primary"
            ? "bg-foreground text-background shadow-[0_1px_2px_rgb(10_10_10_/_0.12)] hover:-translate-y-0.5 hover:bg-foreground/90 hover:shadow-[0_8px_24px_rgb(10_10_10_/_0.14)]"
            : "border border-black/10 bg-transparent text-foreground hover:-translate-y-0.5 hover:border-black/20 hover:bg-white/60",
          className
        )}
      >
        <span className="relative z-10 inline-flex items-center gap-2 transition-transform duration-300 group-hover:translate-x-0.5">
          {children}
          {showArrow && (
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          )}
        </span>
      </Link>
    </motion.div>
  );
}

export function MagneticDiv({
  children,
  className,
  ...props
}: HTMLMotionProps<"div">) {
  const ref = useRef<HTMLDivElement>(null);
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 160, damping: 20 });
  const springY = useSpring(y, { stiffness: 160, damping: 20 });

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ x: springX, y: springY }}
      onPointerMove={(e) => {
        if (!desktop || reduced || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - (rect.left + rect.width / 2)) * 0.06);
        y.set((e.clientY - (rect.top + rect.height / 2)) * 0.06);
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
