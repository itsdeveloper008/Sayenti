"use client";

import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { cn } from "@/lib/utils";

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  mode?: "lines" | "words";
};

export function RevealText({
  text,
  as: Tag = "h2",
  className,
  delay = 0,
  mode = "lines",
}: RevealTextProps) {
  const reduce = useReducedMotion();
  const parts =
    mode === "lines" ? text.split("\n") : text.split(" ").map((w) => `${w} `);

  if (reduce) {
    return (
      <Tag className={cn("whitespace-pre-line", className)}>
        {mode === "lines" ? text : text}
      </Tag>
    );
  }

  return (
    <Tag className={cn(className)}>
      {parts.map((part, i) => (
        <span key={`${part}-${i}`} className="block overflow-hidden">
          <motion.span
            className="block will-change-transform"
            initial={{ y: "110%", opacity: 0, filter: "blur(8px)" }}
            animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {part}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

export function FadeUp({
  children,
  className,
  delay = 0,
  ...props
}: Omit<HTMLMotionProps<"div">, "children"> & {
  delay?: number;
  children: ReactNode;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function ScrollReveal({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: 0.55,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
