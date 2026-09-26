/**
 * Content for the Building Systems page (A–F). Items describe what GridSync reads or models for
 * each system; numbers in illustrations are examples, not defaults.
 */
export type SystemSection = {
  id: string;
  letter: string;
  title: string;
  lede: string;
  body: string;
  items: { term: string; note: string }[];
  boundary: string;
  illustration: "hvac" | "lighting" | "ev" | "cold" | "battery" | "meter";
  caption: string;
};

export const systemSections: SystemSection[] = [
  {
    id: "hvac",
    letter: "A",
    title: "HVAC and thermal systems",
    lede: "Usually the largest flexible load, and the one most closely tied to how a building feels.",
    body: "Cooling and heating can move in time because buildings store heat in their structure and fit-out. The question is how far each zone can drift before someone notices, and which plant has to keep running regardless.",
    items: [
      { term: "Air-handling units", note: "Supply-air setpoints and fan speed; fresh-air minimums are held." },
      { term: "Chillers", note: "Chilled-water setpoint and staging, within minimum run and restart times." },
      { term: "Heat pumps", note: "Flow temperature and start times; defrost and compressor protection respected." },
      { term: "Boilers", note: "Usually modelled for context rather than electrical flexibility." },
      { term: "Fans", note: "Speed limits per unit; pressurisation and smoke-control duties excluded." },
      { term: "Pumps", note: "Minimum flow fixed; speed only where the design allows." },
      { term: "Setpoints", note: "Offsets inside an agreed band, always with an expiry." },
      { term: "Thermal mass", note: "Estimated from each zone's recorded response, not from a textbook value." },
    ],
    boundary: "Zone comfort band, ventilation minimum, equipment run and restart limits.",
    illustration: "hvac",
    caption: "Chilled-water loop with the points that may change (copper) and the ones that may not.",
  },
  {
    id: "lighting",
    letter: "B",
    title: "Lighting",
    lede: "Small per fitting, but fast, predictable and easy to explain.",
    body: "Lighting responds instantly and returns instantly, which makes it useful at the start and end of an event. Its value depends on daylight, occupancy and how finely the zones are controlled.",
    items: [
      { term: "Zones", note: "Mapped to floors and uses; perimeter and core treated separately." },
      { term: "Schedules", note: "Normal on/off times are the baseline for every change." },
      { term: "Occupancy", note: "Sensor state and bookings; occupied task areas keep minimum light levels." },
      { term: "Dimming boundaries", note: "A floor per zone; some fittings are switch-only." },
      { term: "Daylight conditions", note: "Perimeter zones can dim further when daylight sensors allow." },
    ],
    boundary: "Minimum illuminance for tasks; emergency and safety lighting never controlled.",
    illustration: "lighting",
    caption: "Floor plan: daylight, occupied and unoccupied zones, with emergency fittings excluded.",
  },
  {
    id: "ev-charging",
    letter: "C",
    title: "EV charging",
    lede: "Highly flexible in time, as long as every vehicle leaves ready.",
    body: "Charging rarely needs to happen the moment a vehicle plugs in. With departure times and required charge known, sessions can move out of peak periods while the fleet still leaves on time.",
    items: [
      { term: "Charger availability", note: "Which chargers are free, faulted or reserved." },
      { term: "Departure deadlines", note: "Per vehicle or per route, from the fleet plan." },
      { term: "State of charge", note: "Where vehicles report it; otherwise estimated from session energy." },
      { term: "Power limits", note: "Per charger and for the site connection shared with the building." },
      { term: "Priority vehicles", note: "Charged first and never deferred past their deadline." },
    ],
    boundary: "Departure time and required charge per vehicle; site connection limit.",
    illustration: "ev",
    caption: "Three vans overnight: the priority van charges on arrival; the others wait until after the site peak.",
  },
  {
    id: "refrigeration",
    letter: "D",
    title: "Refrigeration and cold storage",
    lede: "Thermal inertia without treating product protection as optional.",
    body: "Frozen and chilled stock holds temperature well, so compressors can often pause for a period. The limit is the product, not the tariff, and defrost cycles must stay where they belong.",
    items: [
      { term: "Temperature boundaries", note: "Product and air temperature limits per room, with alarm thresholds." },
      { term: "Compressor cycles", note: "Minimum on/off times and rack staging." },
      { term: "Product protection", note: "A hard boundary; any breach ends participation immediately." },
      { term: "Defrost schedules", note: "Never moved into an event window; moved around it only if the site agrees." },
    ],
    boundary: "Product temperature limit (hard); door-open periods and defrost excluded.",
    illustration: "cold",
    caption: "Pre-cool, pause, recover: product temperature stays below −18 °C throughout.",
  },
  {
    id: "batteries",
    letter: "E",
    title: "Batteries and behind-the-meter assets",
    lede: "The most battery-like asset in the building—still with limits of its own.",
    body: "On-site storage is predictable, but it is often already committed to backup, peak shaving or a tariff strategy. GridSync models those commitments rather than treating the whole capacity as free.",
    items: [
      { term: "State of charge", note: "Current and planned, by interval." },
      { term: "Charge and discharge limits", note: "Power limits, ramp rates and cycle expectations." },
      { term: "Reserve requirements", note: "Backup reserve that is never offered." },
      { term: "Market or tariff context", note: "Existing strategies, so flexibility is not double-counted." },
    ],
    boundary: "Backup reserve, power limits and warranty conditions.",
    illustration: "battery",
    caption: "A day of battery state of charge, never crossing the backup reserve.",
  },
  {
    id: "metering",
    letter: "F",
    title: "Metering and telemetry",
    lede: "The record of what actually happened. Everything else is an estimate.",
    body: "Verification is only as good as the interval data behind it. GridSync shows data quality alongside the data—gaps, estimates and delays—so no one mistakes a filled-in number for a measured one.",
    items: [
      { term: "Interval data", note: "Revenue meters and submeters, kept distinct, at their native resolution." },
      { term: "Real-time data", note: "BMS and inverter telemetry for monitoring during an event." },
      { term: "Quality flags", note: "Estimated, corrected and suspect reads carried through to results." },
      { term: "Missing data", note: "Shown as missing; never silently interpolated." },
      { term: "Data latency", note: "How long after each interval the data arrives, per source." },
    ],
    boundary: "Results are only calculated when data completeness meets the agreed threshold.",
    illustration: "meter",
    caption: "Sixteen 15-minute intervals: one missing, one estimated, three not yet delivered.",
  },
];
