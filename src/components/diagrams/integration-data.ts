import type { Availability } from "../ui/Status";

/**
 * Integration map content (DGM-07). Statuses are deliberately conservative for an early-stage
 * product: named protocols and standards are never marked "Available now".
 * REPLACE: confirm every status against the product before launch.
 */
export type Step = "normalise" | "context" | "constraints" | "forecast" | "coordinate" | "verify";

export const processing: { id: Step; name: string; body: string }[] = [
  { id: "normalise", name: "Normalisation", body: "Units, time zones, intervals and naming made consistent; gaps and estimates flagged." },
  { id: "context", name: "Context mapping", body: "Points and meters tied to equipment, spaces and schedules in the site model." },
  { id: "constraints", name: "Constraint modelling", body: "Comfort bands, equipment limits, deadlines and exclusions attached to each asset." },
  { id: "forecast", name: "Forecasting", body: "Expected load and flexible envelope per interval, with confidence." },
  { id: "coordinate", name: "Event coordination", body: "Plans prepared, approved and sent as time-bounded instructions." },
  { id: "verify", name: "Verification", body: "Baseline, plan and metered result compared, with context kept." },
];

export type Source = {
  id: string;
  name: string;
  used: string;
  frequency: string;
  status: Availability;
  steps: Step[];
  standards?: { name: string; status: Availability }[];
};

export const inputs: Source[] = [
  {
    id: "bms",
    name: "Building-management systems",
    used: "Point values, alarms, schedules and override states; permitted setpoints for approved instructions.",
    frequency: "Typically 1–5 minute polling, site dependent",
    status: "pilot",
    steps: ["normalise", "context", "constraints", "forecast", "coordinate"],
    standards: [
      { name: "BACnet/IP", status: "evaluating" },
      { name: "Modbus TCP", status: "evaluating" },
      { name: "Vendor BMS APIs", status: "planned" },
    ],
  },
  {
    id: "meters",
    name: "Energy meters",
    used: "Interval consumption and demand at the site connection; the reference for verification.",
    frequency: "15- or 30-minute intervals; daily file or near-real-time where available",
    status: "pilot",
    steps: ["normalise", "forecast", "verify"],
    standards: [
      { name: "Interval data file import (CSV)", status: "pilot" },
      { name: "Utility data portals", status: "planned" },
    ],
  },
  {
    id: "submeters",
    name: "Submeters",
    used: "Consumption by board, plant or tenant, to attribute response to the equipment that delivered it.",
    frequency: "1–15 minute intervals",
    status: "pilot",
    steps: ["normalise", "context", "verify"],
    standards: [{ name: "Modbus RTU/TCP", status: "evaluating" }],
  },
  {
    id: "scada",
    name: "SCADA",
    used: "Plant states and process values on sites with industrial control systems.",
    frequency: "Site dependent",
    status: "evaluating",
    steps: ["normalise", "context", "constraints"],
    standards: [{ name: "OPC UA", status: "evaluating" }],
  },
  {
    id: "hvac",
    name: "HVAC controllers",
    used: "Zone temperatures, supply temperatures, valve and damper positions, run states.",
    frequency: "1–5 minutes",
    status: "pilot",
    steps: ["context", "constraints", "forecast", "coordinate"],
    standards: [{ name: "Direct controller integration (outside the BMS)", status: "planned" }],
  },
  {
    id: "lighting",
    name: "Lighting controls",
    used: "Zone states, dimming levels, occupancy and daylight sensors.",
    frequency: "1–15 minutes",
    status: "evaluating",
    steps: ["context", "constraints", "coordinate"],
    standards: [{ name: "Lighting-control gateways", status: "evaluating" }],
  },
  {
    id: "ev",
    name: "EV charging systems",
    used: "Charger status, session energy, power limits; vehicle state of charge where the system provides it.",
    frequency: "Per session, 1–5 minute updates",
    status: "evaluating",
    steps: ["context", "constraints", "forecast", "coordinate", "verify"],
    standards: [
      { name: "OCPP", status: "evaluating" },
      { name: "Charge-point management system APIs", status: "planned" },
    ],
  },
  {
    id: "weather",
    name: "Weather services",
    used: "Forecast and observed temperature, humidity and irradiance for the site's location.",
    frequency: "Hourly forecasts; observations as published",
    status: "pilot",
    steps: ["forecast", "verify"],
  },
  {
    id: "occupancy",
    name: "Occupancy schedules",
    used: "Operating calendars, room bookings and sensor counts where available.",
    frequency: "Daily, plus updates as bookings change",
    status: "pilot",
    steps: ["context", "constraints", "forecast"],
    standards: [{ name: "Calendar or CSV schedule import", status: "pilot" }],
  },
  {
    id: "signals",
    name: "Tariff and grid signals",
    used: "Tariff structures, published prices and event notices with programme rules.",
    frequency: "Tariffs on change; event notices as issued",
    status: "pilot",
    steps: ["forecast", "coordinate", "verify"],
    standards: [
      { name: "Tariff tables (manual or file)", status: "pilot" },
      { name: "OpenADR", status: "planned" },
    ],
  },
];

export const outputs: Source[] = [
  {
    id: "views",
    name: "Operator views",
    used: "Site model, forecasts, plans, boundaries and live delivery, in the terms operators already use.",
    frequency: "Continuously updated",
    status: "pilot",
    steps: ["context", "constraints", "forecast", "coordinate", "verify"],
  },
  {
    id: "instructions",
    name: "Approved control instructions",
    used: "Time-bounded setpoint or schedule changes, sent only after approval and only to permitted points.",
    frequency: "Per event or per approved schedule",
    status: "pilot",
    steps: ["coordinate"],
  },
  {
    id: "aggregator",
    name: "Aggregator workflows",
    used: "Site availability, confirmations and results passed to an aggregator's own systems.",
    frequency: "Per event",
    status: "planned",
    steps: ["forecast", "coordinate", "verify"],
  },
  {
    id: "reports",
    name: "Event reports",
    used: "Baseline, plan, delivered response, deviations and approvals for one event.",
    frequency: "After final interval data arrives",
    status: "pilot",
    steps: ["verify"],
  },
  {
    id: "audit",
    name: "Audit history",
    used: "Every input version, approval, instruction, change and step-out, with timestamps.",
    frequency: "Continuous, append-only",
    status: "pilot",
    steps: ["normalise", "coordinate", "verify"],
  },
  {
    id: "api",
    name: "API and export formats",
    used: "Structured exports of site data, plans and event records.",
    frequency: "On demand",
    status: "pilot",
    steps: ["verify"],
    standards: [
      { name: "CSV export", status: "pilot" },
      { name: "REST API", status: "planned" },
    ],
  },
];
