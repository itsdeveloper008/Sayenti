export type Partner = {
  name: string;
  category: "Technology" | "Certification";
  blurb: string;
};

export const partners: Partner[] = [
  {
    name: "Zscaler",
    category: "Technology",
    blurb: "Cloud security and zero-trust access integrated into managed estates.",
  },
  {
    name: "F5",
    category: "Technology",
    blurb: "Application delivery and security for high-availability services.",
  },
  {
    name: "Nutanix",
    category: "Technology",
    blurb: "Hybrid cloud infrastructure for resilient, controllable workloads.",
  },
  {
    name: "Check Point",
    category: "Technology",
    blurb: "Network and threat prevention across perimeter and cloud edges.",
  },
  {
    name: "Palo Alto Networks",
    category: "Technology",
    blurb: "Next-gen firewall and zero-trust architectures where required.",
  },
  {
    name: "Cisco",
    category: "Technology",
    blurb: "Secure networking and visibility across WAN and campus environments.",
  },
  {
    name: "Microsoft",
    category: "Technology",
    blurb: "Azure and Microsoft 365 security patterns for regulated cloud estates.",
  },
  {
    name: "Fortinet",
    category: "Technology",
    blurb: "Unified threat management and secure connectivity fabric.",
  },
  {
    name: "Extreme Networks",
    category: "Technology",
    blurb: "Campus and wireless networking with enterprise-grade control.",
  },
  {
    name: "ISO 27001",
    category: "Certification",
    blurb: "Information security management aligned to international standards.",
  },
  {
    name: "Cyber Essentials Plus",
    category: "Certification",
    blurb: "UK government-backed baseline for cyber hygiene and assurance.",
  },
  {
    name: "IASME",
    category: "Certification",
    blurb: "Governance frameworks supporting SME-to-enterprise assurance.",
  },
];

export const approachSteps = [
  {
    title: "Assess",
    body: "Map assets, threats, compliance obligations, and operational reality - not a template checklist.",
  },
  {
    title: "Architect",
    body: "Design controls, connectivity, and cloud patterns that fit how your organisation actually works.",
  },
  {
    title: "Operate",
    body: "24/7 monitoring, response, and optimisation with named escalation and clear ownership.",
  },
  {
    title: "Respond",
    body: "Contain incidents fast, then report with evidence leadership and auditors can trust.",
  },
];

export const homepageStats = [
  { label: "Avg. containment", value: 11, suffix: " min", prefix: "" },
  { label: "Endpoints under watch", value: 1400, suffix: "+", prefix: "" },
  { label: "Monitoring uptime", value: 99.98, suffix: "%", prefix: "" },
  { label: "Years in regulated", value: 10, suffix: "+", prefix: "" },
];
