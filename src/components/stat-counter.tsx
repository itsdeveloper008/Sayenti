"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";

const RING_SIZE = 148;
const STROKE = 3.5;
const RADIUS = (RING_SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
const DURATION = 1.35;

export type StatMetric = {
  value: number;
  label: string;
  suffix?: string;
  prefix?: string;
  /** Evocative ring fill 0–1 */
  fill?: number;
  /** Red accent arc for the hero stat */
  hero?: boolean;
};

function formatValue(latest: number, decimals: number) {
  return decimals > 0
    ? latest.toFixed(decimals)
    : Math.round(latest).toLocaleString("en-GB");
}

function AnimatedNumber({
  value,
  decimals = 0,
  active,
  reduce,
}: {
  value: number;
  decimals?: number;
  active: boolean;
  reduce: boolean | null;
}) {
  const [display, setDisplay] = useState(() =>
    reduce ? formatValue(value, decimals) : "0"
  );

  useEffect(() => {
    if (reduce) {
      setDisplay(formatValue(value, decimals));
      return;
    }
    if (!active) return;

    const controls = animate(0, value, {
      duration: DURATION,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setDisplay(formatValue(latest, decimals)),
    });
    return () => controls.stop();
  }, [active, value, reduce, decimals]);

  return <span>{display}</span>;
}

export function StatCounter({
  value,
  label,
  suffix = "",
  prefix = "",
  fill = 0.75,
  hero = false,
}: StatMetric) {
  const decimals = Number.isInteger(value) ? 0 : 2;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const active = Boolean(inView || reduce);

  const targetOffset = CIRCUMFERENCE * (1 - Math.min(1, Math.max(0, fill)));
  const arcColor = hero ? "var(--primary)" : "var(--foreground)";

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      <div
        className="relative"
        style={{ width: RING_SIZE, height: RING_SIZE }}
      >
        <svg
          width={RING_SIZE}
          height={RING_SIZE}
          viewBox={`0 0 ${RING_SIZE} ${RING_SIZE}`}
          className="-rotate-90"
          aria-hidden
        >
          <circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-black/10"
          />
          <motion.circle
            cx={RING_SIZE / 2}
            cy={RING_SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={arcColor}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            initial={
              reduce
                ? { strokeDashoffset: targetOffset }
                : { strokeDashoffset: CIRCUMFERENCE }
            }
            animate={
              active
                ? { strokeDashoffset: targetOffset }
                : { strokeDashoffset: CIRCUMFERENCE }
            }
            transition={{
              duration: reduce ? 0 : DURATION,
              ease: [0.16, 1, 0.3, 1],
            }}
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center px-3">
          <p className="font-mono text-[1.35rem] font-semibold tracking-[-0.03em] text-foreground sm:text-[1.5rem]">
            {prefix}
            <AnimatedNumber
              value={value}
              decimals={decimals}
              active={active}
              reduce={reduce}
            />
            {suffix}
          </p>
        </div>
      </div>
      <p className="mt-4 max-w-[9.5rem] text-sm leading-snug text-muted-foreground">
        {label}
      </p>
    </div>
  );
}

export function StatStrip({ stats }: { stats: StatMetric[] }) {
  return (
    <motion.div
      className="grid grid-cols-2 justify-items-center gap-x-6 gap-y-12 md:grid-cols-4 md:gap-x-8"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {stats.map((stat) => (
        <StatCounter key={stat.label} {...stat} />
      ))}
    </motion.div>
  );
}
