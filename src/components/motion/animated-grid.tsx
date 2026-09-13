"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import {
  useIsDesktopPointer,
  usePrefersReducedMotion,
} from "@/hooks/use-motion-prefs";
import { lerp } from "@/hooks/use-pointer";

export function AnimatedGrid({ className }: { className?: string }) {
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
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

    const draw = () => {
      mouse.x = lerp(mouse.x, mouse.tx, 0.03);
      mouse.y = lerp(mouse.y, mouse.ty, 0.03);
      ctx.clearRect(0, 0, w, h);

      const gap = 56;
      const bend = desktop && !reduced ? 5 : 0;
      ctx.lineWidth = 0.5;

      for (let x = 0; x <= w; x += gap) {
        ctx.beginPath();
        for (let y = 0; y <= h; y += 16) {
          const dx = x - mouse.x * w;
          const dy = y - mouse.y * h;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const influence = Math.max(0, 1 - dist / 360) * bend;
          const px = x + (dx / (dist || 1)) * -influence;
          const edge = Math.min(x / w, 1 - x / w, y / h, 1 - y / h, 0.4) / 0.4;
          ctx.strokeStyle = `rgba(229,231,235,${0.35 * edge})`;
          if (y === 0) ctx.moveTo(px, y);
          else ctx.lineTo(px, y);
        }
        ctx.stroke();
      }

      for (let y = 0; y <= h; y += gap) {
        const edge = Math.min(y / h, 1 - y / h, 0.4) / 0.4;
        ctx.strokeStyle = `rgba(229,231,235,${0.28 * edge})`;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [desktop, reduced]);

  return (
    <canvas
      ref={canvasRef}
      className={cn("pointer-events-none absolute inset-0 h-full w-full", className)}
      aria-hidden
    />
  );
}
