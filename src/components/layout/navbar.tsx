"use client";

import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import {
  ArrowRight,
  ChevronDown,
  Cloud,
  Menu,
  Network,
  Phone,
  Radar,
  ShieldCheck,
  X,
  type LucideIcon,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { createPortal } from "react-dom";
import { Logo } from "@/components/layout/logo";
import { navLinks, siteConfig } from "@/lib/site";
import { services } from "@/lib/data/services";
import { cn } from "@/lib/utils";

const darkPill =
  "rounded-full border border-white/25 bg-black/90 text-white shadow-[0_0_0_1px_rgb(255_255_255_/_0.06)] backdrop-blur-md";

const SERVICE_ICONS: Record<string, LucideIcon> = {
  mssp: Radar,
  "cloud-migration": Cloud,
  connectivity: Network,
  cybersecurity: ShieldCheck,
};

type Geometry = { left: number; width: number };

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [dropdown, setDropdown] = useState(false);
  const [geo, setGeo] = useState<Geometry[]>([]);
  const pathname = usePathname();
  const navRef = useRef<HTMLElement>(null);
  const itemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activeIndex = navLinks.findIndex(
    (link) =>
      pathname === link.href || pathname.startsWith(`${link.href}/`)
  );

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setDropdown(false);
      setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  // Measure every nav item once per route so the active + hover pills can slide.
  useLayoutEffect(() => {
    const measure = () => {
      const next = itemRefs.current.map((el) =>
        el ? { left: el.offsetLeft, width: el.offsetWidth } : { left: 0, width: 0 }
      );
      setGeo(next);
    };

    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pathname]);

  function openDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setDropdown(true);
  }

  function scheduleCloseDropdown() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setDropdown(false), 160);
  }

  function closeAll() {
    setOpen(false);
    setDropdown(false);
    setHovered(null);
  }

  const barHeight = scrolled ? "h-12" : "h-[52px]";
  const lift = scrolled
    ? "shadow-[0_14px_44px_rgb(0_0_0_/_0.2)]"
    : "shadow-[0_4px_20px_rgb(0_0_0_/_0.08)]";
  const logoLift = scrolled
    ? "shadow-[0_12px_34px_rgb(10_10_10_/_0.12)]"
    : "shadow-[0_2px_12px_rgb(10_10_10_/_0.05)]";

  const activeGeo = activeIndex >= 0 ? geo[activeIndex] : undefined;
  const hoveredGeo = hovered !== null ? geo[hovered] : undefined;

  const mobileMenu =
    open &&
    createPortal(
      <AnimatePresence>
        <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/45 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={closeAll}
          />
          <motion.div
            className="absolute inset-x-3 top-[4.75rem] max-h-[min(70dvh,calc(100dvh-5.5rem))] overflow-y-auto rounded-3xl border border-white/10 bg-black/90 p-3 shadow-[0_24px_80px_rgb(0_0_0_/_0.4)] backdrop-blur-xl sm:inset-x-4 sm:top-[84px]"
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 380, damping: 32 }}
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {navLinks.map((link, i) => {
                const active =
                  pathname === link.href ||
                  pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={closeAll}
                    className={cn(
                      "relative flex items-baseline gap-3 rounded-2xl px-4 py-3.5 text-[15px] font-semibold transition-colors",
                      active ? "text-white" : "text-white/80 hover:text-white"
                    )}
                  >
                    {active && (
                      <span
                        aria-hidden
                        className="absolute inset-0 rounded-2xl border border-white/15 bg-white/[0.06]"
                      />
                    )}
                    <span className="relative z-10 font-mono text-[10px] tracking-[0.14em] text-white/35">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="mt-3 border-t border-white/10 pt-3">
              <p className="px-4 pb-2 font-mono text-[10px] tracking-[0.18em] text-white/30 uppercase">
                Services
              </p>
              <div className="grid grid-cols-2 gap-1.5">
                {services.map((service) => {
                  const Icon = SERVICE_ICONS[service.slug] ?? ShieldCheck;
                  return (
                    <Link
                      key={service.slug}
                      href={`/services/${service.slug}`}
                      onClick={closeAll}
                      className="flex items-center gap-2.5 rounded-xl border border-white/10 px-3 py-2.5 text-[13px] text-white/70 transition-colors hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                    >
                      <Icon className="size-3.5 shrink-0" aria-hidden />
                      {service.shortTitle}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="mt-3 flex flex-col gap-2 border-t border-white/10 pt-3">
              <Link
                href="/risk-review"
                onClick={closeAll}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white text-[14px] font-semibold text-[#0A0A0A]"
              >
                Get a Risk Review
                <ArrowRight className="size-4" aria-hidden />
              </Link>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex h-11 items-center justify-center rounded-full border border-white/20 text-[14px] font-medium text-white"
              >
                Contact
              </a>
              <a
                href={siteConfig.phoneHref}
                className="mt-1 inline-flex items-center justify-center gap-2 font-mono text-xs text-white/45"
              >
                <span className="size-1.5 rounded-full bg-primary" aria-hidden />
                24/7 {siteConfig.phone}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </AnimatePresence>,
      document.body
    );

  return (
    <>
      <header
        className={cn(
          "pointer-events-none fixed inset-x-0 top-0 z-50 px-4 transition-[padding] duration-300 ease-out sm:px-5 md:px-6 lg:px-8",
          scrolled ? "pt-3" : "pt-5"
        )}
      >
        <div className="pointer-events-auto relative mx-auto flex max-w-6xl items-start justify-between gap-4 md:gap-6">
          {/* 1. Brand */}
          <Link
            href="/"
            onClick={closeAll}
            className={cn(
              "inline-flex items-center gap-3 rounded-full border border-black/[0.12] bg-white px-4 transition-[box-shadow,transform,height] duration-300 ease-out hover:-translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/20 sm:px-5",
              barHeight,
              logoLift
            )}
            aria-label={siteConfig.name}
          >
            <Logo size={scrolled ? "sm" : "md"} priority />
          </Link>

          {/* 2. Primary nav - desktop */}
          <div
            className="absolute top-0 left-1/2 hidden -translate-x-1/2 lg:block"
            onPointerLeave={() => setHovered(null)}
          >
            <nav
              ref={navRef}
              className={cn(
                "relative flex items-center px-2 transition-[height] duration-300 ease-out",
                barHeight,
                darkPill,
                lift,
                scrolled && "backdrop-blur-xl"
              )}
              aria-label="Primary"
            >
              {/* Hover pill */}
              <AnimatePresence>
                {hoveredGeo && hovered !== activeIndex && (
                  <motion.span
                    aria-hidden
                    className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full bg-white/[0.07]"
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      left: hoveredGeo.left,
                      width: hoveredGeo.width,
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  />
                )}
              </AnimatePresence>

              {/* Active pill */}
              <motion.span
                aria-hidden
                className="pointer-events-none absolute top-1/2 h-9 -translate-y-1/2 rounded-full border border-white/15 bg-white/[0.08]"
                initial={false}
                animate={{
                  left: activeGeo?.left ?? 0,
                  width: activeGeo?.width ?? 0,
                  opacity: activeGeo ? 1 : 0,
                }}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />

              {navLinks.map((link, i) => {
                const active = i === activeIndex;
                const hasDropdown = link.href === "/services";
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    ref={(el) => {
                      itemRefs.current[i] = el;
                    }}
                    onPointerEnter={() => {
                      setHovered(i);
                      if (hasDropdown) openDropdown();
                      else scheduleCloseDropdown();
                    }}
                    onFocus={() => {
                      setHovered(i);
                      if (hasDropdown) openDropdown();
                      else setDropdown(false);
                    }}
                    onClick={closeAll}
                    aria-haspopup={hasDropdown ? "true" : undefined}
                    aria-expanded={hasDropdown ? dropdown : undefined}
                    className={cn(
                      "relative z-10 inline-flex h-9 items-center gap-1 rounded-full px-3.5 text-[13px] font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 lg:px-4",
                      active ? "text-white" : "text-white/80 hover:text-white"
                    )}
                  >
                    {link.label}
                    {hasDropdown && (
                      <ChevronDown
                        className={cn(
                          "size-3 transition-transform duration-200",
                          dropdown && "rotate-180"
                        )}
                        aria-hidden
                      />
                    )}
                    {active && (
                      <span
                        aria-hidden
                        className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary"
                      />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Services dropdown */}
            <AnimatePresence>
              {dropdown && (
                <motion.div
                  className="absolute top-full left-1/2 w-[min(40rem,calc(100vw-4rem))] -translate-x-1/2 pt-3"
                  initial={{ opacity: 0, y: -8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                  onPointerEnter={openDropdown}
                  onPointerLeave={scheduleCloseDropdown}
                >
                  <div className="overflow-hidden rounded-3xl border border-white/10 bg-black/90 p-2.5 shadow-[0_28px_80px_rgb(0_0_0_/_0.38)] backdrop-blur-xl">
                    <div className="grid grid-cols-2 gap-1.5">
                      {services.map((service) => {
                        const Icon = SERVICE_ICONS[service.slug] ?? ShieldCheck;
                        return (
                          <Link
                            key={service.slug}
                            href={`/services/${service.slug}`}
                            onClick={closeAll}
                            className="group flex gap-3 rounded-2xl p-3.5 transition-colors hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                          >
                            <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] transition-colors group-hover:border-white/20">
                              <Icon
                                className="size-4 text-white/80"
                                aria-hidden
                              />
                            </span>
                            <span className="min-w-0">
                              <span className="flex items-center gap-1.5 text-[13px] font-semibold text-white">
                                {service.shortTitle}
                                {service.featured && (
                                  <span className="size-1 rounded-full bg-primary" />
                                )}
                              </span>
                              <span className="mt-1 block text-[11px] leading-snug text-white/45">
                                {service.description}
                              </span>
                            </span>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="mt-1.5 flex items-center justify-between gap-4 border-t border-white/10 px-3.5 py-3">
                      <a
                        href={siteConfig.phoneHref}
                        className="inline-flex items-center gap-2 font-mono text-[11px] text-white/40 transition-colors hover:text-white"
                      >
                        <Phone className="size-3" aria-hidden />
                        24/7 {siteConfig.phone}
                      </a>
                      <Link
                        href="/services"
                        onClick={closeAll}
                        className="group inline-flex items-center gap-1.5 text-[12px] font-medium text-white"
                      >
                        All services
                        <ArrowRight
                          className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                          aria-hidden
                        />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* 3. Actions - desktop */}
          <div
            className={cn(
              "hidden items-center gap-1.5 px-1.5 transition-[height] duration-300 ease-out lg:flex",
              barHeight,
              darkPill,
              lift,
              scrolled && "backdrop-blur-xl"
            )}
          >
            <a
              href={`mailto:${siteConfig.email}`}
              className="inline-flex h-9 items-center rounded-full border border-white/35 px-4 text-[13px] font-semibold text-white transition-[background-color,border-color] duration-200 hover:border-white/50 hover:bg-white/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              Contact
            </a>
            <Link
              href="/risk-review"
              onClick={closeAll}
              className="group inline-flex h-9 items-center gap-1.5 rounded-full bg-white px-4 text-[13px] font-semibold text-[#0A0A0A] transition-[background-color] duration-200 hover:bg-white/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            >
              Get a Risk Review
              <ArrowRight
                className="size-3.5 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>

          {/* Mobile trigger */}
          <button
            type="button"
            className={cn(
              "inline-flex aspect-square items-center justify-center transition-[height] duration-300 ease-out lg:hidden",
              barHeight,
              darkPill,
              lift
            )}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>
      {mobileMenu}
    </>
  );
}
