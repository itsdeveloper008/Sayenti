export const siteConfig = {
  name: "Sayenti",
  tagline: "Always-on defence for regulated organisations",
  description:
    "UK Managed Security Service Provider delivering 24/7 monitoring, incident response, cloud migration, and high-speed connectivity for finance, healthcare, legal, and public sector.",
  /** Canonical site URL used for metadata / OG. Override with NEXT_PUBLIC_SITE_URL. */
  url: "https://sayenti.vercel.app",
  phone: "+44 (0) 7552631391",
  phoneHref: "tel:+447552631391",
  phoneLabel: "24/7 incident line",
  email: "hello@sayenti.com",
  address: "Sir Isaaks Walk, Colchester, CO1 1JJ",
  addressLocality: "Colchester",
  addressPostalCode: "CO1 1JJ",
  addressCountry: "GB",
  social: {
    linkedin: "https://www.linkedin.com/company/sayenti",
  },
} as const;

/**
 * Single source of truth for the brand mark.
 * Swapping the artwork only requires changing `src` (any aspect ratio, any
 * format) - every placement scales it to fit its box without cropping.
 */
export const brandLogo = {
  src: "/brand-logo.png",
  alt: `${siteConfig.name} logo`,
} as const;

/** Open Graph / Twitter share image (1200×630). */
export const ogImage = {
  src: "/og.png",
  width: 1200,
  height: 630,
  alt: `${siteConfig.name} - ${siteConfig.tagline}`,
} as const;

export const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/partners", label: "Partners" },
  { href: "/clients", label: "Clients" },
] as const;
