export type ServiceSlug =
  | "mssp"
  | "cloud-migration"
  | "connectivity"
  | "cybersecurity";

export type Service = {
  slug: ServiceSlug;
  title: string;
  shortTitle: string;
  description: string;
  longDescription: string;
  whoFor: string[];
  included: string[];
  process: { title: string; body: string }[];
  featured?: boolean;
  image: string;
  /** Short outcome chips shown on the service detail page. */
  outcomes: { label: string; value: string }[];
};

export const services: Service[] = [
  {
    slug: "mssp",
    title: "Managed Security Services",
    shortTitle: "MSSP",
    featured: true,
    image: "/services/mssp.png",
    outcomes: [
      { label: "Median containment", value: "11 min" },
      { label: "Coverage", value: "24/7" },
      { label: "Endpoints monitored", value: "1,400+" },
    ],
    description:
      "24/7 SOC monitoring, detection, and incident response tailored to regulated environments.",
    longDescription:
      "Sayenti operates as an extension of your security team - continuous monitoring, rapid containment, and clear reporting that satisfies both technical stakeholders and auditors.",
    whoFor: [
      "Organisations without a 24/7 SOC",
      "Regulated firms needing demonstrable monitoring controls",
      "IT leaders consolidating multiple security tools",
    ],
    included: [
      "24/7 network & endpoint monitoring",
      "Threat detection & triage",
      "Incident response playbooks",
      "Monthly executive & technical reporting",
      "Named security lead & escalation paths",
    ],
    process: [
      {
        title: "Onboard & baseline",
        body: "Map assets, log sources, and risk appetite; establish detection baselines.",
      },
      {
        title: "Monitor & detect",
        body: "Continuous SOC coverage with tuned alerts - signal over noise.",
      },
      {
        title: "Respond & report",
        body: "Contain incidents fast, then document for leadership and compliance.",
      },
    ],
  },
  {
    slug: "cloud-migration",
    title: "Cloud Migration",
    shortTitle: "Cloud Migration",
    image: "/services/cloud-migration.png",
    outcomes: [
      { label: "Care-impacting downtime", value: "0 hrs" },
      { label: "Systems migrated", value: "47" },
      { label: "Controls mapped", value: "100%" },
    ],
    description:
      "Secure, staged migrations to Azure and AWS with compliance kept intact.",
    longDescription:
      "We migrate workloads with security architecture first - identity, network boundaries, logging, and data residency - so you land in the cloud stronger than you left on-prem.",
    whoFor: [
      "Teams modernising legacy infrastructure",
      "Firms under board pressure to reduce data-centre risk",
      "Organisations needing regulated-cloud patterns",
    ],
    included: [
      "Discovery & dependency mapping",
      "Landing-zone design",
      "Secure migration waves",
      "Identity & access hardening",
      "Post-migration optimisation",
    ],
    process: [
      {
        title: "Assess",
        body: "Inventory applications, data classification, and compliance constraints.",
      },
      {
        title: "Architect",
        body: "Design secure landing zones and migration sequencing.",
      },
      {
        title: "Migrate & validate",
        body: "Execute waves with rollback plans and security verification.",
      },
    ],
  },
  {
    slug: "connectivity",
    title: "Superfast Connectivity",
    shortTitle: "Connectivity",
    image: "/services/connectivity.png",
    outcomes: [
      { label: "Uptime SLA", value: "99.95%" },
      { label: "Latency reduction", value: "−52%" },
      { label: "Paths per site", value: "Dual" },
    ],
    description:
      "High-availability, high-speed links engineered for secure operations.",
    longDescription:
      "Resilient connectivity underpins every security control. We design and deliver circuits and SD-WAN patterns that keep regulated traffic fast, segmented, and observable.",
    whoFor: [
      "Multi-site organisations needing reliable WAN",
      "Firms consolidating MPLS / broadband estates",
      "Security teams requiring network visibility",
    ],
    included: [
      "Circuit design & provisioning",
      "Redundant path planning",
      "SD-WAN / secure edge options",
      "Performance SLAs",
      "Ongoing monitoring",
    ],
    process: [
      {
        title: "Survey",
        body: "Assess sites, capacity needs, and failover requirements.",
      },
      {
        title: "Design",
        body: "Select carriers and topologies for resilience and speed.",
      },
      {
        title: "Deliver",
        body: "Install, test, and hand over with clear operational runbooks.",
      },
    ],
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    shortTitle: "Cybersecurity",
    image: "/services/cybersecurity.png",
    outcomes: [
      { label: "Critical vulns", value: "−94%" },
      { label: "Asset coverage", value: "99%" },
      { label: "CE+ readiness", value: "Pass" },
    ],
    description:
      "Advisory, hardening, and assurance for boards that need certainty.",
    longDescription:
      "From gap assessments to control implementation, we help you close risk that matters - prioritised by likelihood, impact, and regulatory expectation.",
    whoFor: [
      "CISOs preparing for audits or board reviews",
      "Firms maturing from reactive to proactive security",
      "Legal & healthcare organisations with sensitive data",
    ],
    included: [
      "Risk & gap assessments",
      "Control design & hardening",
      "Vulnerability management programmes",
      "Policy & awareness support",
      "Assurance reporting",
    ],
    process: [
      {
        title: "Discover",
        body: "Identify critical assets, threats, and control gaps.",
      },
      {
        title: "Prioritise",
        body: "Rank remediation by business and regulatory impact.",
      },
      {
        title: "Remediate",
        body: "Implement controls and verify with measurable outcomes.",
      },
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
