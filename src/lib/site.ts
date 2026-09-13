export const siteConfig = {
  name: "Sayenti",
  tagline: "Always-on defence for regulated organisations",
  description:
    "UK Managed Security Service Provider delivering 24/7 monitoring, incident response, cloud migration, and high-speed connectivity for finance, healthcare, legal, and public sector.",
  url: "https://sayenti.co.uk",
  phone: "+44 20 3890 7200",
  phoneHref: "tel:+442038907200",
  email: "hello@sayenti.co.uk",
  address: "London, United Kingdom",
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

export const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/approach", label: "Approach" },
  { href: "/partners", label: "Partners" },
  { href: "/clients", label: "Clients" },
] as const;
