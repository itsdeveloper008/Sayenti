import type { ReactNode } from "react";
import { Info } from "lucide-react";

export type LegalSection = {
  id: string;
  heading: string;
  body: ReactNode;
};

export function LegalDoc({
  updated,
  notice,
  sections,
}: {
  updated: string;
  notice?: string;
  sections: LegalSection[];
}) {
  return (
    <section className="container-page pb-24">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,220px)_minmax(0,1fr)] lg:gap-16">
        {/* Contents */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
            Contents
          </p>
          <nav className="mt-4 border-l border-black/[0.08]">
            <ol>
              {sections.map((section, i) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-baseline gap-3 py-2 pl-4 text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="font-mono text-[10px] text-muted-foreground/70">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <p className="mt-6 border-t border-black/[0.07] pt-4 font-mono text-[10px] tracking-[0.14em] text-muted-foreground uppercase">
            Updated {updated}
          </p>
        </aside>

        {/* Document */}
        <div className="max-w-2xl">
          {notice && (
            <div className="mb-10 flex gap-3 rounded-xl border border-black/[0.07] bg-surface-elevated p-4">
              <Info
                className="mt-0.5 size-4 shrink-0 text-muted-foreground"
                aria-hidden
              />
              <p className="text-xs leading-relaxed text-muted-foreground">
                {notice}
              </p>
            </div>
          )}

          <div className="space-y-12">
            {sections.map((section, i) => (
              <article key={section.id} id={section.id} className="scroll-mt-28">
                <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
                  {section.heading}
                </h2>
                <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
                  {section.body}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
