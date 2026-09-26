/**
 * Systems shown on the building schematic (DGM-01). Constraints are written as the kinds of
 * limits an operator would recognise; numbers are illustrative examples, not defaults.
 */
export type SystemKey = "bms" | "hvac" | "lighting" | "ev" | "meters" | "occupancy" | "weather" | "tariffs" | "signal";

export type SystemInfo = {
  key: SystemKey;
  name: string;
  role: string;
  constraints: string[];
  reads: string;
  writes: string;
};

export const systems: SystemInfo[] = [
  {
    key: "bms",
    name: "Building management system",
    role: "The existing control layer. GridSync reads from it and, where permitted, sends approved instructions through it.",
    constraints: [
      "The BMS remains authoritative; local safety logic is never bypassed.",
      "Write access is granted per point, not per building.",
      "Every override has an expiry and a defined fallback to the local schedule.",
    ],
    reads: "Point values, alarms, schedules, override states.",
    writes: "Only approved, time-bounded setpoint or schedule changes on permitted points.",
  },
  {
    key: "hvac",
    name: "HVAC and thermal plant",
    role: "Usually the largest flexible load. Thermal mass lets cooling or heating move in time within a comfort band.",
    constraints: [
      "Occupied zone band, for example 21–24 °C, agreed with the tenant or site.",
      "Minimum fresh-air and ventilation rates are fixed.",
      "Chiller and heat-pump minimum run and restart times.",
      "Pre-conditioning must finish before occupancy starts.",
    ],
    reads: "Zone temperatures, supply temperatures, valve and damper positions, run states.",
    writes: "Setpoint offsets and start-time adjustments inside the agreed band.",
  },
  {
    key: "lighting",
    name: "Lighting",
    role: "Small per fitting but fast and predictable. Most useful in zones with daylight or low occupancy.",
    constraints: [
      "Minimum illuminance for occupied task areas.",
      "Emergency and safety lighting are never controlled.",
      "Dimming floor per zone; some fittings are on/off only.",
    ],
    reads: "Zone states, dimming levels, occupancy sensors, daylight sensors.",
    writes: "Dimming levels on permitted zones for the event window.",
  },
  {
    key: "ev",
    name: "EV charging",
    role: "Highly flexible in time, as long as every vehicle leaves with the charge it needs.",
    constraints: [
      "Departure deadline and required state of charge per vehicle.",
      "Site connection limit shared with the building.",
      "Per-charger power limit; priority vehicles first.",
    ],
    reads: "Charger status, session energy, vehicle state of charge where available.",
    writes: "Session power limits and start times through the charge-point management system.",
  },
  {
    key: "meters",
    name: "Meters and submeters",
    role: "The record of what actually happened. Verification is only as good as the interval data behind it.",
    constraints: [
      "Interval length and delivery latency differ by meter.",
      "Gaps and estimated reads are flagged, not silently filled.",
      "Revenue meters and submeters are kept distinct.",
    ],
    reads: "Interval consumption, demand, quality flags.",
    writes: "Nothing.",
  },
  {
    key: "occupancy",
    name: "Occupancy and schedules",
    role: "Tells the model which spaces matter, when, and to whom.",
    constraints: [
      "Booked rooms and events override general floor schedules.",
      "Actual occupancy may differ from the plan; both are shown.",
      "Tenant agreements may exclude zones entirely.",
    ],
    reads: "Operating calendars, room bookings, sensor counts where available.",
    writes: "Nothing.",
  },
  {
    key: "weather",
    name: "Weather",
    role: "Drives thermal load and solar gain, and therefore how long a space can drift.",
    constraints: ["Forecast uncertainty grows with the horizon.", "Solar gain differs by façade and time of day."],
    reads: "Forecast and observed temperature, humidity, irradiance.",
    writes: "Nothing.",
  },
  {
    key: "tariffs",
    name: "Tariffs and prices",
    role: "Defines when energy is expensive and how peak demand is charged.",
    constraints: ["Time-of-use periods by season.", "Demand charges based on the highest interval in a period."],
    reads: "Tariff structure, published prices where applicable.",
    writes: "Nothing.",
  },
  {
    key: "signal",
    name: "Utility or aggregator signal",
    role: "The request: a window, a direction and a size, with programme rules attached.",
    constraints: ["Notice period before the window.", "Minimum duration and ramp expectations.", "Baseline method used for settlement."],
    reads: "Event notices, windows, targets, programme rules.",
    writes: "Acknowledgements and availability, where the programme allows.",
  },
];

export const findSystem = (k: SystemKey) => systems.find((s) => s.key === k)!;
