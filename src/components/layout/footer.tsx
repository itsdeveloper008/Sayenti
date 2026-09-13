import Image from "next/image";
import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/data/services";

export function Footer() {
  return (
    <footer className="border-t border-black/[0.06] bg-surface-elevated">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div className="sm:col-span-2 lg:col-span-1">
          <Link
            href="/"
            className="inline-block"
            aria-label={siteConfig.name}
          >
            <Logo size="lg" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            {siteConfig.tagline}. Outsourced cybersecurity, monitoring, cloud,
            and connectivity for mid-to-large organisations.
          </p>
        </div>

        <div>
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" />
            Services
          </p>
          <ul className="space-y-2.5">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {s.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" />
            Company
          </p>
          <ul className="space-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="eyebrow mb-4">
            <span className="eyebrow-dot" />
            Contact
          </p>
          <ul className="space-y-2.5 text-sm text-muted-foreground">
            <li>
              <a href={siteConfig.phoneHref} className="hover:text-foreground">
                {siteConfig.phone}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="hover:text-foreground"
              >
                {siteConfig.email}
              </a>
            </li>
            <li>{siteConfig.address}</li>
            <li className="pt-2">
              <Link
                href="/risk-review"
                className="font-medium text-foreground hover:opacity-70"
              >
                Book a Risk Review →
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-black/[0.06]">
        <div className="container-page flex flex-col gap-4 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-4">
            <p>
              © {new Date().getFullYear()} {siteConfig.name}. All rights
              reserved.
            </p>
            <span className="hidden h-3 w-px bg-black/10 sm:block" aria-hidden />
            <span className="inline-flex items-center gap-2">
              <Image
                src="/partners/iso27001.svg"
                alt="ISO/IEC 27001"
                width={28}
                height={28}
                className="opacity-70"
              />
              <span>ISO/IEC 27001 aligned</span>
            </span>
          </div>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-foreground">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
