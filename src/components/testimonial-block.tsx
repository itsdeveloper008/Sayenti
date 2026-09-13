import { Reveal } from "@/components/motion/reveal";

type Metric = { value: string; label: string };

const DEFAULT_METRICS: Metric[] = [
  { value: "11 min", label: "Median containment" },
  { value: "−68%", label: "Containment time" },
  { value: "99.98%", label: "Monitoring uptime" },
];

export function TestimonialBlock({
  quote,
  author,
  role,
  eyebrow = "Client evidence",
  metrics = DEFAULT_METRICS,
}: {
  quote: string;
  author: string;
  role: string;
  eyebrow?: string;
  metrics?: Metric[];
}) {
  return (
    <Reveal>
      <figure className="relative overflow-hidden rounded-3xl border border-black/[0.07] bg-white p-8 shadow-[0_18px_50px_rgb(10_10_10_/_0.06)] sm:p-12 md:p-14">
        {/* Texture + restrained accent glow */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #0A0A0A 0.85px, transparent 1px)",
            backgroundSize: "22px 22px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full bg-[radial-gradient(circle,rgba(225,29,46,0.1)_0%,transparent_70%)] blur-2xl"
        />

        <div className="relative grid gap-10 lg:grid-cols-[1.55fr_1fr] lg:gap-14">
          {/* Quote */}
          <div>
            <p className="eyebrow mb-6">
              <span className="eyebrow-dot" />
              {eyebrow}
            </p>

            <span
              aria-hidden
              className="block font-serif text-6xl leading-[0.5] text-primary select-none"
            >
              “
            </span>

            <blockquote className="mt-6 font-serif text-2xl leading-[1.3] text-balance text-foreground sm:text-[1.75rem] md:text-[2.1rem]">
              {quote}
            </blockquote>

            <figcaption className="mt-9 flex items-center gap-4">
              <span
                aria-hidden
                className="h-px w-10 shrink-0 bg-foreground/25"
              />
              <span>
                <span className="block text-sm font-semibold tracking-tight text-foreground">
                  {author}
                </span>
                <span className="mt-0.5 block font-mono text-[11px] tracking-[0.12em] text-muted-foreground uppercase">
                  {role}
                </span>
              </span>
            </figcaption>
          </div>

          {/* Metric rail */}
          <div className="lg:border-l lg:border-black/[0.07] lg:pl-12">
            <p className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Measured outcome
            </p>
            <dl className="mt-6 divide-y divide-black/[0.06]">
              {metrics.map((metric, i) => (
                <div
                  key={metric.label}
                  className="flex items-baseline justify-between gap-4 py-4 first:pt-0 last:pb-0"
                >
                  <dt className="text-sm text-muted-foreground">
                    {metric.label}
                  </dt>
                  <dd
                    className={
                      i === 0
                        ? "font-mono text-xl font-semibold tracking-tight text-primary"
                        : "font-mono text-xl font-semibold tracking-tight text-foreground"
                    }
                  >
                    {metric.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </figure>
    </Reveal>
  );
}
