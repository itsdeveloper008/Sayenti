export const homepageMetrics = [
  {
    label: "Avg. containment",
    value: 11,
    suffix: " min",
    prefix: "",
    /** Evocative ring fill 0-1 (not literal %) */
    fill: 0.88,
    hero: true,
  },
  {
    label: "Endpoints under watch",
    value: 1400,
    suffix: "+",
    prefix: "",
    fill: 0.76,
    hero: false,
  },
  {
    label: "Monitoring uptime",
    value: 99.98,
    suffix: "%",
    prefix: "",
    fill: 0.9998,
    hero: false,
  },
  {
    label: "Years in regulated",
    value: 10,
    suffix: "+",
    prefix: "",
    fill: 0.72,
    hero: false,
  },
];

export const bentoServices = [
  {
    key: "mssp",
    title: "Managed Security",
    description:
      "24/7 SOC monitoring, detection, and incident response for regulated estates.",
    href: "/services/mssp",
    image: "/services/mssp.png",
    viz: "radar" as const,
  },
  {
    key: "cybersecurity",
    title: "Cybersecurity",
    description:
      "Threat detection, hardening, and assurance that boards can evidence.",
    href: "/services/cybersecurity",
    image: "/services/cybersecurity.png",
    viz: "threat" as const,
  },
  {
    key: "cloud-migration",
    title: "Cloud Migration",
    description:
      "Secure landing zones and staged migrations without compliance drift.",
    href: "/services/cloud-migration",
    image: "/services/cloud-migration.png",
    viz: "cloud" as const,
  },
  {
    key: "network",
    title: "Network Infrastructure",
    description:
      "Segmented, observable topology engineered for resilient operations.",
    href: "/services/connectivity",
    image: "/services/network.png",
    viz: "topology" as const,
  },
  {
    key: "connectivity",
    title: "Superfast Connectivity",
    description:
      "High-availability links with measurable latency and failover paths.",
    href: "/services/connectivity",
    image: "/services/connectivity.png",
    viz: "packets" as const,
  },
  {
    key: "itops",
    title: "IT Operations",
    description:
      "Live telemetry and operational cadence that keep estates coherent.",
    href: "/services",
    image: "/services/itops.png",
    viz: "telemetry" as const,
  },
];

export const securityStages = [
  {
    name: "MONITOR",
    description: "Continuous telemetry across endpoints, identity, and network edge.",
  },
  {
    name: "DETECT",
    description: "Surface anomalies against baseline behaviour before they escalate.",
  },
  {
    name: "INVESTIGATE",
    description:
      "Correlate signals across endpoints to confirm scope and impact.",
  },
  {
    name: "CONTAIN",
    description: "Isolate affected systems fast to stop lateral movement.",
  },
  {
    name: "RESPOND",
    description: "Execute playbooks with clear ownership and evidence trails.",
  },
  {
    name: "RESOLVE",
    description: "Restore operations and harden controls from what was learned.",
  },
] as const;

export const hourMarkers = ["00", "04", "08", "12", "16", "20", "24"] as const;

export const infrastructureLayers = [
  {
    id: "users",
    label: "Users",
    body: "Identity-aware access at the edge.",
    detail:
      "Every session starts with a verified identity. Access is granted per request, not per network, so a stolen password alone gets nowhere.",
    controls: ["SSO with phishing-resistant MFA", "Conditional access policies", "Privileged session recording"],
    image: "/infrastructure/users.png",
  },
  {
    id: "endpoints",
    label: "Endpoints",
    body: "Devices monitored for drift and compromise.",
    detail:
      "Laptops, servers and mobiles report health continuously. Drift from baseline or suspicious behaviour is isolated before it can spread.",
    controls: ["EDR with automated isolation", "Patch and configuration baselines", "Device posture checks at login"],
    image: "/infrastructure/endpoints.png",
  },
  {
    id: "network",
    label: "Network",
    body: "Segmented traffic with continuous visibility.",
    detail:
      "Segmentation limits how far anything can move. Flow telemetry from every site feeds the SOC, so lateral movement shows up as it happens.",
    controls: ["Micro-segmentation by system tier", "Dual-path SD-WAN with failover", "Full flow and DNS telemetry"],
    image: "/infrastructure/network.png",
  },
  {
    id: "cloud",
    label: "Cloud",
    body: "Hardened landing zones and control planes.",
    detail:
      "Landing zones are built with guardrails on day one. Control-plane activity is logged, alerted and reviewed like any other privileged action.",
    controls: ["Policy-as-code landing zones", "Control-plane audit logging", "Key and secret lifecycle management"],
    image: "/infrastructure/cloud.png",
  },
  {
    id: "applications",
    label: "Applications",
    body: "Workload protection aligned to business risk.",
    detail:
      "Workloads are protected in proportion to what they handle. Matter systems, clinical apps and payment flows get the controls their risk demands.",
    controls: ["Runtime workload protection", "Vulnerability cadence tied to risk", "API and web-layer monitoring"],
    image: "/infrastructure/applications.png",
  },
  {
    id: "data",
    label: "Data",
    body: "Classification, residency, and access evidence.",
    detail:
      "Data is classified, kept where regulation says it must live, and every access is evidenced - so audit becomes a report, not a project.",
    controls: ["Classification and labelling", "UK residency and encryption at rest", "Access evidence for auditors"],
    image: "/infrastructure/data.png",
  },
] as const;
