"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  useIsDesktopPointer,
  usePrefersReducedMotion,
} from "@/hooks/use-motion-prefs";
import { lerp } from "@/hooks/use-pointer";

/** Lightweight value noise - no external deps */
function hash(n: number) {
  const x = Math.sin(n * 127.1) * 43758.5453;
  return x - Math.floor(x);
}

function noise2(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash(xi + yi * 57);
  const b = hash(xi + 1 + yi * 57);
  const c = hash(xi + (yi + 1) * 57);
  const d = hash(xi + 1 + (yi + 1) * 57);
  return a * (1 - u) * (1 - v) + b * u * (1 - v) + c * (1 - u) * v + d * u * v;
}

function fbm(x: number, y: number) {
  let v = 0;
  let a = 0.5;
  let f = 1;
  for (let i = 0; i < 4; i++) {
    v += a * noise2(x * f, y * f);
    f *= 2;
    a *= 0.5;
  }
  return v;
}

type Ribbon = {
  baseY: number;
  amp: number;
  thickness: number;
  speed: number;
  phase: number;
  alpha: number;
};

/**
 * Soft silk/ribbon flow field - pure grayscale, 2D canvas only.
 * Lazy-load this component so it never blocks LCP.
 */
export function HeroSilkRibbons({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const desktop = useIsDesktopPointer();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    let t = 0;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const ribbons: Ribbon[] = [
      { baseY: 0.42, amp: 0.08, thickness: 0.14, speed: 0.12, phase: 0.2, alpha: 0.28 },
      { baseY: 0.52, amp: 0.1, thickness: 0.11, speed: 0.09, phase: 1.4, alpha: 0.22 },
      { baseY: 0.62, amp: 0.07, thickness: 0.09, speed: 0.14, phase: 2.6, alpha: 0.16 },
      { baseY: 0.48, amp: 0.12, thickness: 0.06, speed: 0.07, phase: 3.8, alpha: 0.12 },
    ];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, desktop ? 1.5 : 1);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1);
      mouse.ty = (e.clientY - rect.top) / Math.max(rect.height, 1);
    };

    resize();
    window.addEventListener("resize", resize);
    if (desktop && !reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
    }

    const drawRibbon = (r: Ribbon, time: number) => {
      const mx = (mouse.x - 0.5) * (desktop ? 18 : 0);
      const my = (mouse.y - 0.5) * (desktop ? 10 : 0);
      const steps = Math.max(40, Math.floor(w / 18));

      const top: { x: number; y: number }[] = [];
      const bot: { x: number; y: number }[] = [];

      for (let i = 0; i <= steps; i++) {
        const u = i / steps;
        const x = u * w;
        const n1 = fbm(u * 2.2 + time * r.speed + r.phase, time * 0.08 + r.phase);
        const n2 = fbm(u * 3.4 - time * r.speed * 0.6, r.phase + 2);
        const y =
          r.baseY * h +
          (n1 - 0.5) * r.amp * h * 2 +
          Math.sin(u * Math.PI * 2 + time * r.speed + r.phase) * r.amp * h * 0.35 +
          my;
        const thick = r.thickness * h * (0.75 + n2 * 0.5);
        top.push({ x: x + mx * (0.4 + u * 0.6), y: y - thick * 0.5 });
        bot.push({ x: x + mx * (0.4 + u * 0.6), y: y + thick * 0.5 });
      }

      ctx.beginPath();
      ctx.moveTo(top[0].x, top[0].y);
      for (let i = 1; i < top.length; i++) {
        const p0 = top[i - 1];
        const p1 = top[i];
        const cx = (p0.x + p1.x) / 2;
        const cy = (p0.y + p1.y) / 2;
        ctx.quadraticCurveTo(p0.x, p0.y, cx, cy);
      }
      for (let i = bot.length - 1; i >= 0; i--) {
        const p0 = bot[i];
        const p1 = bot[Math.max(0, i - 1)];
        const cx = (p0.x + p1.x) / 2;
        const cy = (p0.y + p1.y) / 2;
        ctx.quadraticCurveTo(p0.x, p0.y, cx, cy);
      }
      ctx.closePath();

      // Pure grayscale - no color tint
      const grad = ctx.createLinearGradient(0, 0, w, h * 0.6);
      grad.addColorStop(0, `rgba(255,255,255,${r.alpha * 0.5})`);
      grad.addColorStop(0.4, `rgba(245,245,245,${r.alpha})`);
      grad.addColorStop(0.7, `rgba(228,228,228,${r.alpha * 0.85})`);
      grad.addColorStop(1, `rgba(210,210,210,${r.alpha * 0.45})`);
      ctx.fillStyle = grad;
      ctx.fill();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      mouse.x = 0.5;
      mouse.y = 0.5;
      ribbons.forEach((r) => drawRibbon(r, 1.2));
    };

    const draw = () => {
      if (reduced) {
        drawStatic();
        return;
      }
      t += 0.006;
      mouse.x = lerp(mouse.x, mouse.tx, 0.04);
      mouse.y = lerp(mouse.y, mouse.ty, 0.04);
      ctx.clearRect(0, 0, w, h);
      ribbons.forEach((r) => drawRibbon(r, t));
      raf = requestAnimationFrame(draw);
    };

    if (reduced) {
      drawStatic();
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [desktop, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={cn(
        "pointer-events-none absolute inset-0 h-full w-full blur-[0.5px]",
        className
      )}
      aria-hidden
    />
  );
}
