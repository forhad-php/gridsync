/**
 * Field notes catalogue. Article bodies live in `<slug>.mdx` beside this file.
 * Dates are editorial publication dates for this launch set; update when articles are revised.
 */
export type Category =
  | "Building systems"
  | "Grid flexibility"
  | "Controls and operations"
  | "Measurement"
  | "Data quality"
  | "Facility management"
  | "Electrification"
  | "Practical decarbonisation";

export type BuildingType = "Office" | "Retail" | "Logistics" | "Cold storage" | "Campus" | "Hotel" | "Hospital" | "EV depot" | "Mixed-use";

export type FieldNote = {
  slug: string;
  title: string;
  dek: string;
  category: Category;
  buildingTypes: BuildingType[];
  author: string;
  date: string; // ISO
  readingTime: string;
  heroImage: string; // media-plan id
  audio?: string; // media-plan id
};

export const categories: Category[] = [
  "Building systems",
  "Grid flexibility",
  "Controls and operations",
  "Measurement",
  "Data quality",
  "Facility management",
  "Electrification",
  "Practical decarbonisation",
];

export const fieldNotes: FieldNote[] = [
  {
    slug: "a-building-is-not-a-battery",
    title: "A building is not a battery",
    dek: "Thermal flexibility is real, but it tapers, it leaks and it has people inside it. Treating it like stored electricity leads to plans operators cannot keep.",
    category: "Grid flexibility",
    buildingTypes: ["Office", "Campus", "Hotel", "Mixed-use"],
    author: "GridSync editorial team",
    date: "2026-09-10",
    readingTime: "7 min read",
    heroImage: "IMG-02",
    audio: "AUD-02",
  },
  {
    slug: "before-a-demand-response-event",
    title: "What operators need to know before a demand-response event",
    dek: "The hour before an event is where most of the risk is removed. A practical checklist for facility teams.",
    category: "Controls and operations",
    buildingTypes: ["Office", "Retail", "Campus", "Hospital"],
    author: "GridSync editorial team",
    date: "2026-08-27",
    readingTime: "6 min read",
    heroImage: "IMG-04",
    audio: "AUD-03",
  },
  {
    slug: "data-quality-before-dashboards",
    title: "Why data quality matters more than another dashboard",
    dek: "Missing intervals, stale points and mislabelled meters quietly decide what a flexibility estimate is worth.",
    category: "Data quality",
    buildingTypes: ["Office", "Retail", "Logistics", "Campus", "Mixed-use"],
    author: "GridSync editorial team",
    date: "2026-08-06",
    readingTime: "8 min read",
    heroImage: "IMG-03",
  },
  {
    slug: "thermal-flexibility-comfort-boundaries",
    title: "Thermal flexibility begins with comfort boundaries",
    dek: "Before asking how much cooling can move, agree where each zone is allowed to go—and who agreed it.",
    category: "Building systems",
    buildingTypes: ["Office", "Hotel", "Hospital", "Mixed-use"],
    author: "GridSync editorial team",
    date: "2026-07-16",
    readingTime: "6 min read",
    heroImage: "IMG-12",
  },
  {
    slug: "available-versus-controllable-load",
    title: "The difference between available load and controllable load",
    dek: "A 400 kW chiller is not 400 kW of flexibility. How to get from nameplate to something you can commit.",
    category: "Grid flexibility",
    buildingTypes: ["Logistics", "Cold storage", "EV depot", "Retail"],
    author: "GridSync editorial team",
    date: "2026-06-25",
    readingTime: "7 min read",
    heroImage: "IMG-05",
  },
  {
    slug: "verifying-a-grid-event",
    title: "How to verify what happened after a grid event",
    dek: "Baselines, deviations and the context that makes a result explainable six months later.",
    category: "Measurement",
    buildingTypes: ["Campus", "Office", "EV depot", "Cold storage"],
    author: "GridSync editorial team",
    date: "2026-06-04",
    readingTime: "8 min read",
    heroImage: "IMG-09",
  },
];

export const findNote = (slug: string) => fieldNotes.find((n) => n.slug === slug);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });
