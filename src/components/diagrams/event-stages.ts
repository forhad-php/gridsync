/** Lifecycle stages for the illustrative grid event (DGM-06). */
export type Stage = {
  name: string;
  when: string;
  sees: string;
  does: string;
  recorded: string;
};

export const stages: Stage[] = [
  {
    name: "Signal received",
    when: "D−1 · 11:05",
    sees: "An event notice: peak demand reduction, 16:00–18:00 tomorrow, with the programme's notice and duration rules.",
    does: "Parses the notice, matches it to the enrolled site and programme, and starts a draft event record.",
    recorded: "Notice as received, source, time of receipt, programme reference.",
  },
  {
    name: "Site conditions reviewed",
    when: "D−1 · 11:20",
    sees: "Tomorrow's occupancy, weather forecast, maintenance calendar and any equipment already constrained.",
    does: "Pulls schedules, bookings and maintenance flags; marks the meeting zones and the maintenance area as unavailable.",
    recorded: "Inputs used, their timestamps and data-quality flags; exclusions and their reasons.",
  },
  {
    name: "Available flexibility estimated",
    when: "D−1 · 12:00",
    sees: "A range for each participating system over the window, with confidence and the limit that bounds it.",
    does: "Forecasts expected load and the flexible envelope for HVAC, EV charging and lighting inside their boundaries.",
    recorded: "Forecast version, model inputs, per-system estimate and confidence.",
  },
  {
    name: "Operator approval requested",
    when: "D−1 · 14:30",
    sees: "The proposed plan asset by asset: what changes, when, by how much, and when each change expires.",
    does: "Routes the plan to the named approver and holds it until a decision is made. Nothing is sent before approval.",
    recorded: "Plan version sent for review, approver, request time.",
  },
  {
    name: "Response coordinated",
    when: "Day · 13:30",
    sees: "Pre-conditioning starting, charging schedules updated, and a countdown to the window.",
    does: "Sends approved, time-bounded instructions through the BMS and charge-point system; confirms each was accepted.",
    recorded: "Each instruction, its target, acknowledgement and expiry.",
  },
  {
    name: "Delivery monitored",
    when: "Day · 16:00–18:00",
    sees: "Live load against baseline and plan; each zone against its comfort limit; any asset stepping out and why.",
    does: "Tracks delivery and boundaries; releases an asset automatically if it reaches a limit, and alerts the operator.",
    recorded: "Interval readings, boundary events, step-outs, operator interventions.",
  },
  {
    name: "Event verified",
    when: "Day +1",
    sees: "Measured response against the programme's baseline method, with deviations explained.",
    does: "Compares baseline, plan and metered result once final interval data arrives.",
    recorded: "Baseline calculation, measured response, deviation notes, data used.",
  },
  {
    name: "Follow-up recorded",
    when: "Day +2",
    sees: "A short review: what worked, what stepped out, what to change before the next event.",
    does: "Compiles the event record for the site, the programme and, where relevant, the aggregator.",
    recorded: "Operator notes, agreed changes to boundaries, exportable event report.",
  },
];
