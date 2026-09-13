"use client";

import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useIntro } from "@/components/motion/intro-context";

export function CinematicIntroGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { introComplete, setIntroComplete } = useIntro();
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) {
      setIntroComplete(true);
      return;
    }
    const t = window.setTimeout(() => setIntroComplete(true), 1600);
    return () => window.clearTimeout(t);
  }, [reduce, setIntroComplete]);

  return (
    <div className="relative">
      <AnimatePresence>
        {!introComplete && !reduce && (
          <motion.div
            key="intro-veil"
            className="pointer-events-none fixed inset-0 z-[60] bg-background"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1.35, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onAnimationComplete={() => setIntroComplete(true)}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
}

export function useIntroDelay(base: number) {
  const { introComplete } = useIntro();
  const reduce = useReducedMotion();
  if (reduce || introComplete) return Math.min(base, 0.05);
  return base;
}
