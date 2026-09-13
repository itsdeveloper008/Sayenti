"use client";

import { useEffect, useRef } from "react";

export type PointerState = {
  x: number;
  y: number;
  nx: number;
  ny: number;
};

export function usePointer(enabled = true) {
  const pointer = useRef<PointerState>({ x: 0, y: 0, nx: 0, ny: 0 });

  useEffect(() => {
    if (!enabled) return;

    const onMove = (e: PointerEvent) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointer.current = {
        x: e.clientX,
        y: e.clientY,
        nx: (e.clientX / w) * 2 - 1,
        ny: (e.clientY / h) * 2 - 1,
      };
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled]);

  return pointer;
}

export function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
