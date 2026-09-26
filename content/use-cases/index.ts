import type { BuildingType } from "../field-notes";

/** Catalogue of use cases. Detailed narratives live in `details.ts`. */
export type UseCaseRef = {
  slug: string;
  title: string;
  narrative: string;
  buildingTypes: BuildingType[];
  image: string; // media-plan id
};

export const useCases: UseCaseRef[] = [
  {
    slug: "office-portfolios",
    title: "Office portfolios",
    narrative: "Use thermal and schedule flexibility while keeping occupant comfort visible.",
    buildingTypes: ["Office", "Mixed-use"],
    image: "IMG-06",
  },
  {
    slug: "retail-and-mixed-use",
    title: "Retail and mixed-use",
    narrative: "Coordinate varied occupancy, HVAC zones, refrigeration, and operating hours.",
    buildingTypes: ["Retail", "Mixed-use", "Hotel"],
    image: "IMG-09",
  },
  {
    slug: "logistics-and-cold-storage",
    title: "Logistics and cold storage",
    narrative: "Manage temperature and operating requirements without treating product protection as optional.",
    buildingTypes: ["Logistics", "Cold storage"],
    image: "IMG-08",
  },
  {
    slug: "ev-depots",
    title: "EV depots",
    narrative: "Coordinate charging with departure times, fleet priorities, and local capacity.",
    buildingTypes: ["EV depot", "Logistics"],
    image: "IMG-07",
  },
  {
    slug: "campuses",
    title: "Campuses",
    narrative: "View several buildings and energy assets through one operational model.",
    buildingTypes: ["Campus", "Hospital", "Office"],
    image: "IMG-02",
  },
  {
    slug: "demand-response-aggregators",
    title: "Demand-response aggregators",
    narrative: "Coordinate diverse sites with clearer asset boundaries and more reliable event evidence.",
    buildingTypes: ["Office", "Retail", "Logistics", "Cold storage", "Campus", "EV depot"],
    image: "IMG-03",
  },
];
