import Link from "next/link";
import { ArrowRight, Shield } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const suggestions = [
  { href: "/services", label: "Services", note: "Four capabilities" },
  { href: "/clients", label: "Case studies", note: "Proof from regulated work" },
  { href: "/approach", label: "Approach", note: "How engagements run" },
  { href: "/partners", label: "Partners", note: "Platforms and frameworks" },
];

export default function NotFound() {
  return (
    <div className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0A0A0A 0.9px, transparent 1px)",
          backgroundSize: "26px 26px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/4 left-1/2 size-96 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.08)_0%,transparent_70%)] blur-3xl"
      />

      <div className="container-page relative flex min-h-[78vh] flex-col items-center justify-center py-28 text-center">
        <span className="flex size-12 items-center justify-center rounded-xl border border-black/[0.1] bg-white text-foreground shadow-[0_1px_2px_rgb(10_10_10_/_0.06)]">
          <Shield className="size-5" aria-hidden />
        </span>

        <p className="eyebrow mt-7 justify-center">
          <span className="eyebrow-dot" />
          Error 404
        </p>

        <h1 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-balance text-foreground sm:text-4xl md:text-5xl">
          This Path Is Not On The Map.
        </h1>
        <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
          The page you requested does not exist or has moved. Pick up the trail
          below, or book a risk review if you need a human.
        </p>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants(),
              "h-10 rounded-full bg-foreground px-5 text-background transition-[transform,box-shadow] hover:-translate-y-px hover:bg-foreground/90 hover:shadow-[0_10px_28px_rgb(10_10_10_/_0.14)]"
            )}
          >
            Back to home
          </Link>
          <Link
            href="/risk-review"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-10 rounded-full border-black/10 px-5 text-foreground hover:border-black/20 hover:bg-white/60"
            )}
          >
            Risk review
          </Link>
        </div>

        <div className="mt-16 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
          {suggestions.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-center justify-between gap-4 rounded-2xl border border-black/[0.07] bg-white px-5 py-4 text-left transition-[transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgb(10_10_10_/_0.08)]"
            >
              <span>
                <span className="block text-sm font-medium text-foreground">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs text-muted-foreground">
                  {item.note}
                </span>
              </span>
              <ArrowRight
                className="size-4 shrink-0 text-muted-foreground transition-[transform,color] duration-300 group-hover:translate-x-1 group-hover:text-foreground"
                aria-hidden
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
