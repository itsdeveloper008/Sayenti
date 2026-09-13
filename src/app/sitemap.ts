import type { MetadataRoute } from "next";
import { caseStudies } from "@/lib/data/clients";
import { services } from "@/lib/data/services";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticRoutes = [
    "",
    "/about",
    "/services",
    "/approach",
    "/partners",
    "/clients",
    "/risk-review",
    "/privacy",
    "/terms",
  ];

  return [
    ...staticRoutes.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...caseStudies.map((c) => ({
      url: `${base}/clients/${c.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
