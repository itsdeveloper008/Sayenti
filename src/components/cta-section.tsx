import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { Reveal } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CTASection({
  headline = "Know your risk before the next incident finds it.",
  subline = "No obligation. No sales pitch. Just a clear picture of your risk.",
}: {
  headline?: string;
  subline?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-surface">
      <div className="container-page relative py-20 md:py-28">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl md:text-5xl">
            {headline}
          </h2>
          <p className="mt-4 text-muted-foreground">{subline}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/risk-review"
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 gap-2 rounded-full bg-foreground px-6 text-background shadow-[0_1px_2px_rgb(10_10_10_/_0.12)] transition-[transform,box-shadow] hover:-translate-y-px hover:bg-foreground/90 hover:shadow-[0_8px_24px_rgb(10_10_10_/_0.12)]"
              )}
            >
              Book a 30-Minute Risk Review
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <a
              href={siteConfig.phoneHref}
              className="inline-flex items-center gap-2 rounded-md text-sm text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20"
            >
              <Phone className="size-4" aria-hidden />
              {siteConfig.phone}
              <span className="text-muted-foreground/70">
                · {siteConfig.phoneLabel}
              </span>
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
