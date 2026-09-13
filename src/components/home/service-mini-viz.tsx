"use client";

import { useEffect, useId, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/use-motion-prefs";

type VizType = "radar" | "threat" | "cloud" | "topology" | "packets" | "telemetry";

const INK = "#0A0A0A";
const INK_SOFT = "#525252";
const GRAY = "#CBD5E1";
const GRAY_DARK = "#94A3B8";

export function ServiceMiniViz({
  type,
  active,
}: {
  type: VizType;
  active: boolean;
}) {
  const reduce = usePrefersReducedMotion();
  const id = useId();
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (reduce || !svgRef.current) return;
    const svg = svgRef.current;
    let raf = 0;
    let t = 0;

    const draw = () => {
      t += active ? 0.028 : 0.01;
      const sweep = svg.querySelector<SVGElement>("[data-sweep]");
      if (sweep) {
        const speed = active ? 45 : 18;
        sweep.style.transform = `rotate(${(t * speed) % 360}deg)`;
      }
      const packets = svg.querySelectorAll<SVGCircleElement>("[data-packet]");
      packets.forEach((p, i) => {
        const speed = active ? 0.55 + i * 0.12 : 0.28 + i * 0.08;
        const prog = (t * speed + i * 0.25) % 1;
        const pathLen = Number(p.dataset.pathLen ?? 120);
        const start = Number(p.dataset.start ?? 20);
        p.setAttribute("cx", String(start + prog * pathLen));
        p.setAttribute("opacity", String(0.35 + Math.sin(prog * Math.PI) * 0.65));
      });
      const pulse = svg.querySelectorAll<SVGElement>("[data-pulse]");
      pulse.forEach((el, i) => {
        const s = 1 + Math.sin(t * 2 + i) * (active ? 0.12 : 0.05);
        el.style.transform = `scale(${s})`;
      });
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, [active, reduce]);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 160 90"
      className="h-full w-full overflow-visible"
      aria-hidden
    >
      {type === "radar" && (
        <>
          <circle cx="80" cy="48" r="28" fill="none" stroke={GRAY} strokeWidth="0.6" />
          <circle cx="80" cy="48" r="18" fill="none" stroke={GRAY} strokeWidth="0.5" />
          <circle cx="80" cy="48" r="8" fill="none" stroke={GRAY} strokeWidth="0.4" />
          <g data-sweep style={{ transformOrigin: "80px 48px" }}>
            <path
              d="M80 48 L80 20 A28 28 0 0 1 100 34 Z"
              fill={active ? "rgba(10,10,10,0.14)" : "rgba(10,10,10,0.06)"}
            />
          </g>
          <circle data-pulse cx="80" cy="48" r="2.5" fill={INK} style={{ transformOrigin: "80px 48px" }} />
          {[
            [64, 32],
            [96, 38],
            [88, 62],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="1.5" fill={GRAY_DARK} />
          ))}
        </>
      )}

      {type === "threat" && (
        <>
          <line x1="28" y1="48" x2="68" y2="32" stroke={active ? INK : GRAY} strokeOpacity={active ? 0.6 : 1} />
          <line x1="68" y1="32" x2="112" y2="48" stroke={GRAY} />
          <line x1="68" y1="32" x2="88" y2="68" stroke={active ? INK : GRAY} strokeOpacity={active ? 0.5 : 1} />
          <circle cx="28" cy="48" r="2" fill={GRAY_DARK} />
          <circle cx="112" cy="48" r="2" fill={GRAY_DARK} />
          <circle data-pulse cx="68" cy="32" r="3" fill={INK} style={{ transformOrigin: "68px 32px" }} />
          <circle
            data-pulse
            cx="88"
            cy="68"
            r={active ? 3.5 : 2}
            fill={active ? INK_SOFT : GRAY_DARK}
            style={{ transformOrigin: "88px 68px" }}
          />
          {active && (
            <circle cx="88" cy="68" r="10" fill="none" stroke="rgba(10,10,10,0.3)" strokeDasharray="2 2" />
          )}
        </>
      )}

      {type === "cloud" && (
        <>
          <rect x="18" y="52" width="32" height="18" rx="2" fill="#F1F5F9" stroke={GRAY} strokeWidth="0.6" />
          <rect x="18" y="58" width="32" height="4" fill={GRAY} opacity="0.3" />
          <rect x="22" y="56" width="8" height="2" rx="0.5" fill={GRAY_DARK} opacity="0.5" />
          <rect x="110" y="38" width="32" height="22" rx="2" fill="#F1F5F9" stroke={GRAY} strokeWidth="0.6" />
          <rect x="110" y="46" width="32" height="4" fill={GRAY} opacity="0.3" />
          <rect x="114" y="42" width="10" height="2" rx="0.5" fill={GRAY_DARK} opacity="0.5" />
          <path
            d="M50 58 L110 50"
            fill="none"
            stroke={active ? INK : GRAY}
            strokeWidth="0.8"
            strokeDasharray={active ? "none" : "3 3"}
          />
          <circle data-packet data-start="50" data-path-len="60" cx="50" cy="58" r="2" fill={INK} />
          {active && (
            <circle data-packet data-start="50" data-path-len="60" cx="70" cy="55" r="2" fill={INK} opacity="0.5" />
          )}
        </>
      )}

      {type === "topology" && (
        <>
          {[
            [36, 32, 80, 28],
            [80, 28, 124, 38],
            [36, 32, 48, 62],
            [80, 28, 92, 66],
            [124, 38, 112, 68],
          ].map(([x1, y1, x2, y2], i) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={active && i < 3 ? INK : GRAY}
              strokeOpacity={active && i < 3 ? 0.55 : 1}
              strokeWidth="0.7"
            />
          ))}
          {[
            [36, 32],
            [80, 28],
            [124, 38],
            [48, 62],
            [92, 66],
            [112, 68],
          ].map(([x, y], i) => (
            <rect
              key={i}
              x={x - 2}
              y={y - 2}
              width="4"
              height="4"
              rx="0.5"
              fill={i === 1 && active ? INK : GRAY_DARK}
            />
          ))}
        </>
      )}

      {type === "packets" && (
        <>
          <path d="M16 58 C48 22, 112 22, 144 52" fill="none" stroke={GRAY} strokeWidth="0.7" />
          <circle data-packet data-start="16" data-path-len="128" cx="16" cy="58" r="2" fill={INK} />
          <circle data-packet data-start="16" data-path-len="128" cx="48" cy="38" r="2" fill={INK} opacity="0.6" />
          {active && (
            <circle data-packet data-start="16" data-path-len="128" cx="80" cy="28" r="2" fill={INK} />
          )}
        </>
      )}

      {type === "telemetry" && (
        <>
          {[22, 38, 54, 70].map((y, i) => (
            <g key={y}>
              <line x1="20" y1={y} x2="140" y2={y} stroke="rgba(203,213,225,0.7)" strokeWidth="0.5" />
              <rect
                x="20"
                y={y - 3}
                width={active ? 32 + i * 14 : 20 + i * 10}
                height="6"
                rx="1"
                fill={i === 1 && active ? "rgba(10,10,10,0.3)" : "rgba(203,213,225,0.4)"}
              />
              <circle
                data-pulse
                cx="148"
                cy={y}
                r="1.5"
                fill={i === 1 ? INK : GRAY_DARK}
                style={{ transformOrigin: `148px ${y}px` }}
              />
            </g>
          ))}
        </>
      )}
    </svg>
  );
}
