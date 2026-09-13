"use client";

import { useEffect, useState } from "react";

export type DeviceTier = "high" | "mid" | "mobile";

export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return reduced;
}

export function useDeviceTier(): DeviceTier {
  const [tier, setTier] = useState<DeviceTier>("mid");

  useEffect(() => {
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const narrow = window.innerWidth < 768;
    if (coarse || narrow) {
      setTier("mobile");
      return;
    }
    const cores = navigator.hardwareConcurrency || 4;
    const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
    if (cores <= 4 || (mem !== undefined && mem <= 4)) {
      setTier("mid");
      return;
    }
    setTier("high");
  }, []);

  return tier;
}

export function useIsDesktopPointer() {
  const [desktop, setDesktop] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: fine) and (min-width: 1024px)");
    const update = () => setDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return desktop;
}
