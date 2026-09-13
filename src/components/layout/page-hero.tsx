import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-background pt-28 pb-16 md:pt-36 md:pb-20",
        className
      )}
    >
      <div className="container-page relative">
        {eyebrow && (
          <p className="eyebrow mb-5">
            <span className="eyebrow-dot" />
            {eyebrow}
          </p>
        )}
        <h1 className="max-w-3xl text-3xl font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-14",
        align === "center" && "mx-auto max-w-2xl text-center"
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-4", align === "center" && "justify-center")}>
          <span className="eyebrow-dot" />
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-muted-foreground leading-relaxed md:text-lg",
            align === "center" && "mx-auto max-w-xl"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function ProseBlock({ children }: { children: ReactNode }) {
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {children}
    </div>
  );
}
