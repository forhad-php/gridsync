export const site = {
  name: "GridSync",
  domain: "GridSync.build",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://gridsync.build").replace(/\/$/, ""),
  line: "Buildings that respond without disruption.",
  description:
    "GridSync helps commercial building teams coordinate flexible energy use with changing grid conditions—while keeping comfort, schedules, equipment limits, and operator decisions in view.",
  email: "hello@gridsync.build",
  // REPLACE: confirm the company page exists before launch.
  linkedin: "https://www.linkedin.com/company/gridsync-build",
};

export const primaryNav = [
  { label: "Platform", href: "/platform" },
  { label: "How it works", href: "/how-it-works" },
  { label: "Systems", href: "/systems" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Field notes", href: "/field-notes" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const footerNav = [
  {
    heading: "Platform",
    links: [
      { label: "Platform", href: "/platform" },
      { label: "How it works", href: "/how-it-works" },
      { label: "Building systems", href: "/systems" },
      { label: "Grid events", href: "/grid-events" },
      { label: "Data & integrations", href: "/integrations" },
      { label: "Outcomes", href: "/outcomes" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "Use cases", href: "/use-cases" },
      { label: "Field notes", href: "/field-notes" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    heading: "Policies",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Accessibility", href: "/accessibility" },
      { label: "Brand & media plan", href: "/brand" },
    ],
  },
];
