"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { InteractiveCard } from "@/components/motion/interactive-card";
import { ServiceMiniViz } from "@/components/home/service-mini-viz";
import { ScrollReveal } from "@/components/motion/reveal-text";
import { bentoServices } from "@/lib/data/motion-content";
import { cn } from "@/lib/utils";

export function ServicesBento() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <section className="section-space">
      <div className="container-page">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="eyebrow mb-5 justify-center">
              <span className="eyebrow-dot" />
              Services
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.035em] text-foreground sm:text-4xl md:text-[2.75rem]">
              Layers of a living security estate
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed md:text-lg">
              Each capability is an interactive system - not a brochure card.
            </p>
          </div>
        </ScrollReveal>

        <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {bentoServices.map((service, i) => {
            const featured = i === 0;
            return (
              <ScrollReveal
                key={service.key}
                delay={i * 0.05}
                className={cn(
                  featured && "sm:col-span-2 lg:col-span-1 lg:row-span-2"
                )}
              >
                <div
                  onPointerEnter={() => setHovered(service.key)}
                  onPointerLeave={() => setHovered(null)}
                  className="group h-full"
                >
                  <InteractiveCard
                    className={cn("h-full", featured && "min-h-[360px]")}
                    contentClassName="flex h-full flex-col"
                  >
                    <div
                      className={cn(
                        "mb-6 overflow-hidden rounded-xl border border-black/[0.06] bg-background",
                        featured ? "h-44" : "h-28"
                      )}
                    >
                      <ServiceMiniViz
                        type={service.viz}
                        active={hovered === service.key}
                      />
                    </div>
                    <h3
                      className={cn(
                        "font-semibold tracking-tight text-foreground",
                        featured ? "text-2xl" : "text-lg"
                      )}
                    >
                      {service.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {service.description}
                    </p>
                    <Link
                      href={service.href}
                      data-cursor="button"
                      className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-foreground transition-transform group-hover:translate-x-0.5"
                    >
                      Learn more <ArrowRight className="size-4" />
                    </Link>
                  </InteractiveCard>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
