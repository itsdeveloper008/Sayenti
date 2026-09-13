export type Industry = "Finance" | "Healthcare" | "Legal" | "Public Sector";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: Industry;
  challenge: string;
  solution: string;
  results: { label: string; value: string }[];
  summary: string;
  image: string;
  /** Engagement shape shown as meta on the case page. */
  meta: { label: string; value: string }[];
  /** Service titles engaged, rendered as tags. */
  servicesUsed: string[];
  quote?: { text: string; role: string };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "regional-bank-soc",
    client: "Regional UK Bank",
    industry: "Finance",
    summary:
      "Stood up 24/7 MSSP coverage and cut mean containment time by 68%.",
    challenge:
      "A mid-sized bank lacked overnight SOC coverage and faced rising phishing-led incidents with slow weekend response.",
    solution:
      "Sayenti deployed managed detection across endpoints and email, tuned detections to banking workflows, and embedded a joint escalation playbook with the client's IT lead.",
    results: [
      { label: "Containment time", value: "−68%" },
      { label: "False positives", value: "−41%" },
      { label: "Audit findings closed", value: "12" },
    ],
    image: "/cases/finance.png",
    meta: [
      { label: "Engagement", value: "Managed detection & response" },
      { label: "Onboarding", value: "6 weeks" },
      { label: "Coverage", value: "24/7 · UK SOC" },
    ],
    servicesUsed: ["Managed Security Services", "Cybersecurity"],
    quote: {
      text: "Containment dropped from hours to under twenty minutes — and our auditors finally had continuous evidence, not quarterly theatre.",
      role: "CISO, Regional UK Bank",
    },
  },
  {
    slug: "healthcare-trust-cloud",
    client: "NHS-adjacent Trust",
    industry: "Healthcare",
    summary:
      "Migrated clinical systems to a secure Azure landing zone without downtime windows impacting care.",
    challenge:
      "Legacy on-prem systems created patch risk and limited visibility required by information governance.",
    solution:
      "Phased cloud migration with identity hardening, segmented networking, and continuous logging into the managed SOC.",
    results: [
      { label: "Systems migrated", value: "47" },
      { label: "Unplanned downtime", value: "0 hrs" },
      { label: "IG controls mapped", value: "100%" },
    ],
    image: "/cases/healthcare.png",
    meta: [
      { label: "Engagement", value: "Secure cloud migration" },
      { label: "Duration", value: "9 months, phased" },
      { label: "Platform", value: "Azure landing zone" },
    ],
    servicesUsed: ["Cloud Migration", "Managed Security Services"],
    quote: {
      text: "Clinical systems moved without a single care-impacting window, and information governance had its controls mapped before go-live.",
      role: "Head of Digital, NHS-adjacent Trust",
    },
  },
  {
    slug: "law-firm-connectivity",
    client: "National Law Firm",
    industry: "Legal",
    summary:
      "Delivered dual-path connectivity across 14 offices with encrypted client-matter traffic.",
    challenge:
      "Branch offices relied on single circuits; partners complained of slow document access and resilience gaps.",
    solution:
      "Designed redundant high-speed connectivity with SD-WAN policies prioritising matter systems and secure guest separation.",
    results: [
      { label: "Sites upgraded", value: "14" },
      { label: "Uptime SLA", value: "99.95%" },
      { label: "Latency reduction", value: "−52%" },
    ],
    image: "/cases/legal.png",
    meta: [
      { label: "Engagement", value: "Connectivity & secure edge" },
      { label: "Rollout", value: "14 sites, 11 weeks" },
      { label: "Topology", value: "Dual-path SD-WAN" },
    ],
    servicesUsed: ["Superfast Connectivity", "Cybersecurity"],
    quote: {
      text: "Matter systems stopped being the thing partners complained about. Two paths into every office, and traffic we can actually see.",
      role: "IT Director, National Law Firm",
    },
  },
  {
    slug: "council-assurance",
    client: "Local Authority",
    industry: "Public Sector",
    summary:
      "Closed Cyber Essentials Plus gaps and established continuous vulnerability management.",
    challenge:
      "An upcoming assurance review exposed fragmented patching and incomplete asset inventory.",
    solution:
      "Full cybersecurity programme: discovery, hardening, vulnerability cadence, and board-ready reporting.",
    results: [
      { label: "Critical vulns", value: "−94%" },
      { label: "Asset coverage", value: "99%" },
      { label: "CE+ readiness", value: "Pass" },
    ],
    image: "/cases/public-sector.png",
    meta: [
      { label: "Engagement", value: "Assurance programme" },
      { label: "Duration", value: "5 months to review" },
      { label: "Cadence", value: "Monthly board reporting" },
    ],
    servicesUsed: ["Cybersecurity", "Managed Security Services"],
    quote: {
      text: "We walked into the assurance review with an asset inventory we trusted and a patch record we could defend.",
      role: "Head of ICT, Local Authority",
    },
  },
];

export const industries: Industry[] = [
  "Finance",
  "Healthcare",
  "Legal",
  "Public Sector",
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((c) => c.slug === slug);
}
