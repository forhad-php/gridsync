/**
 * GridSync media plan — single source of truth for every photograph, video loop, audio piece
 * and diagram on the site. Placeholder components read their production brief from here, and
 * /brand renders the whole plan for the production team.
 *
 * To publish real media: add `src` (and `poster` for video, `captions` for video/audio) to the
 * brief. The components switch from placeholder to real media automatically.
 */

export type Sketch = "plant" | "roof" | "meter" | "desk" | "pipes" | "office" | "ev" | "dock" | "exterior" | "panel";

export type ImageBrief = {
  id: string;
  page: string;
  subject: string;
  framing: string;
  lighting: string;
  colour: string;
  alt: string;
  aspect: "4/5" | "3/2" | "4/3" | "16/9" | "21/9" | "1/1";
  sketch: Sketch;
  src?: string;
};

export type VideoBrief = {
  id: string;
  page: string;
  scene: string;
  duration: string;
  camera: string;
  sound: string;
  poster: string;
  caption: string;
  aspect: ImageBrief["aspect"];
  sketch: Sketch;
  src?: string;
  posterSrc?: string;
  captionsSrc?: string;
};

export type AudioBrief = {
  id: string;
  page: string;
  title: string;
  narrator: string;
  topic: string;
  duration: string;
  transcriptRequirement: string;
  ambient: string;
  transcript: string[];
  src?: string;
};

export type DiagramBrief = {
  id: string;
  page: string;
  title: string;
  inputs: string[];
  outputs: string[];
  labels: string[];
  interaction: string;
  mobile: string;
};

const common = {
  colour: "Muted, slightly warm; lift shadows gently; keep natural greens and greys; fine film-like grain; no teal-orange grade.",
};

export const images: ImageBrief[] = [
  {
    id: "IMG-01",
    page: "Home — hero",
    subject: "Air-handling unit and supply ductwork in a basement plant room, early morning before occupancy.",
    framing: "Portrait, three-quarter view of the AHU casing with ductwork rising out of frame; leave clear space upper left for an annotation.",
    lighting: "Existing fluorescent/LED plant-room lighting plus a little daylight from a high window. No added coloured light.",
    ...common,
    alt: "An air-handling unit and insulated ductwork in a quiet plant room before the building opens.",
    aspect: "4/5",
    sketch: "plant",
  },
  {
    id: "IMG-02",
    page: "Home — field note; Use cases — campuses",
    subject: "Rooftop HVAC units across a flat commercial roof, with neighbouring buildings and a distant line of pylons.",
    framing: "Wide, low horizon; units in the lower third; a person for scale is optional and must be facing away.",
    lighting: "Dawn, low sun from the side, long shadows across the roof membrane.",
    ...common,
    alt: "Rooftop air-conditioning units on a commercial roof at dawn, with other buildings and power lines in the distance.",
    aspect: "21/9",
    sketch: "roof",
  },
  {
    id: "IMG-03",
    page: "Platform — header; Use cases — aggregators",
    subject: "Electrical room with a bank of meter cabinets and a distribution board, doors open.",
    framing: "Straight-on, symmetrical; cable trays visible above; avoid readable labels or brand names.",
    lighting: "Even overhead light; slight falloff to the edges.",
    ...common,
    alt: "Open meter cabinets and a distribution board in a building electrical room.",
    aspect: "3/2",
    sketch: "meter",
  },
  {
    id: "IMG-04",
    page: "How it works — stage 2",
    subject: "A facilities manager's hands marking up a printed weekly operating schedule on a plant-room desk.",
    framing: "Top-down or 45°; paper, pen, a radio and a coffee cup; faces not required.",
    lighting: "Desk lamp plus ambient overhead; warm but neutral.",
    ...common,
    alt: "A printed weekly building schedule being marked up by hand on a plant-room desk.",
    aspect: "4/3",
    sketch: "desk",
  },
  {
    id: "IMG-05",
    page: "Systems — HVAC and thermal",
    subject: "Insulated chilled-water pipes, valves and an inline pump in a plant room.",
    framing: "Diagonal composition following the pipe run; shallow depth of field on one valve.",
    lighting: "Existing plant-room light; allow natural reflections on metal.",
    ...common,
    alt: "Insulated chilled-water pipes with valves and a pump in a building plant room.",
    aspect: "3/2",
    sketch: "pipes",
  },
  {
    id: "IMG-06",
    page: "Systems — lighting; Use cases — office portfolios",
    subject: "Open-plan office floor before occupancy with lighting on in some zones and off in others.",
    framing: "Long view down the floor plate; the lit/unlit boundary should run across the frame.",
    lighting: "Blue-hour daylight at the windows, office lighting partially on.",
    ...common,
    alt: "An empty open-plan office in the early morning with some lighting zones on and others still off.",
    aspect: "16/9",
    sketch: "office",
  },
  {
    id: "IMG-07",
    page: "Use cases — EV depots",
    subject: "Row of depot chargers with parked electric vans during an evening charging window.",
    framing: "Eye level, along the row; cable management visible; no readable fleet branding.",
    lighting: "Dusk with site floodlights on; avoid neon or blue glow effects.",
    ...common,
    alt: "Electric vans connected to a row of depot chargers at dusk.",
    aspect: "16/9",
    sketch: "ev",
  },
  {
    id: "IMG-08",
    page: "Use cases — logistics and cold storage",
    subject: "Loading dock with strip thermal curtains on a cold-store doorway.",
    framing: "Straight-on to the doorway; a pallet or trolley in the foreground is fine.",
    lighting: "Mixed: cool dock lighting outside, whiter light inside the cold store.",
    ...common,
    alt: "A cold-store doorway with plastic strip curtains at a loading dock.",
    aspect: "4/3",
    sketch: "dock",
  },
  {
    id: "IMG-09",
    page: "Grid events — header; Use cases — retail and mixed-use",
    subject: "Mid-rise commercial building in late afternoon with a street-level substation or transformer enclosure in frame.",
    framing: "From across the street; building and enclosure both readable; people as passers-by only.",
    lighting: "Late afternoon, warm low sun on the façade.",
    ...common,
    alt: "A commercial building in late afternoon light with an electrical substation enclosure at street level.",
    aspect: "16/9",
    sketch: "exterior",
  },
  {
    id: "IMG-10",
    page: "Data & integrations — header",
    subject: "Building controller and I/O modules on a DIN rail inside an open control panel.",
    framing: "Close, slightly angled; neat wiring and ferrules; no readable manufacturer names.",
    lighting: "Soft, even light; small highlight on terminals.",
    ...common,
    alt: "Controller and input/output modules wired on a DIN rail inside an open control panel.",
    aspect: "4/3",
    sketch: "panel",
  },
  {
    id: "IMG-11",
    page: "About — header",
    subject: "A facilities operator walking away from camera through a plant room, carrying a tablet and a torch.",
    framing: "Back or three-quarter-back view; the person occupies one third of the frame.",
    lighting: "Available light; allow the far end of the room to fall darker.",
    ...common,
    alt: "A facilities operator walking through a plant room between pieces of equipment.",
    aspect: "3/2",
    sketch: "plant",
  },
  {
    id: "IMG-12",
    page: "Field notes — article heroes",
    subject: "Ceiling diffuser, occupancy sensor and lighting fitting above an office meeting area.",
    framing: "Looking up at a slight angle; ceiling grid lines as structure.",
    lighting: "Daylight from the side; lights on.",
    ...common,
    alt: "A ceiling air diffuser beside an occupancy sensor and a light fitting in an office ceiling.",
    aspect: "3/2",
    sketch: "office",
  },
];

const silent = "Silent. No audio track is included in the file; the player is always muted.";

export const videos: VideoBrief[] = [
  {
    id: "VID-01",
    page: "How it works — header",
    scene: "Rooftop air-handling unit starting before occupancy: dampers open, fan begins to turn, a little steam on a cold morning.",
    duration: "10 s loop",
    camera: "Locked-off tripod; no movement.",
    sound: silent,
    poster: "Frame with the fan just beginning to move, sky still pre-dawn.",
    caption: "A rooftop air-handling unit starting ahead of the working day.",
    aspect: "16/9",
    sketch: "roof",
  },
  {
    id: "VID-02",
    page: "Platform — site model",
    scene: "Close-up of a digital electricity meter display as load steps down over a few seconds.",
    duration: "6 s loop",
    camera: "Macro, locked-off; slight focus breathing acceptable.",
    sound: silent,
    poster: "Meter display with the reading in focus, before the change.",
    caption: "An electricity meter showing a change in building load.",
    aspect: "4/3",
    sketch: "meter",
  },
  {
    id: "VID-03",
    page: "About — how we work",
    scene: "Facilities operator walking through a mechanical room, pausing to check a gauge.",
    duration: "12 s loop",
    camera: "Slow handheld follow from behind, stabilised; no gimbal swoops.",
    sound: silent,
    poster: "Operator mid-stride between two units.",
    caption: "A facilities operator checking equipment in a mechanical room.",
    aspect: "16/9",
    sketch: "plant",
  },
  {
    id: "VID-04",
    page: "Systems — lighting",
    scene: "Office lighting switching zone by zone as a schedule steps through the early morning.",
    duration: "8 s loop",
    camera: "Locked-off wide down the floor plate.",
    sound: silent,
    poster: "Half the zones lit, half dark.",
    caption: "Office lighting zones switching on in sequence.",
    aspect: "16/9",
    sketch: "office",
  },
  {
    id: "VID-05",
    page: "Use cases — EV depots",
    scene: "EV chargers operating during a controlled charging window; status lights change as vans are prioritised.",
    duration: "10 s loop",
    camera: "Slow lateral slider move along the row (under 30 cm).",
    sound: silent,
    poster: "Row of chargers with two vans connected.",
    caption: "Depot chargers during a scheduled charging window.",
    aspect: "16/9",
    sketch: "ev",
  },
  {
    id: "VID-06",
    page: "Outcomes — header",
    scene: "Commercial building exterior transitioning from morning to evening (time-lapse compressed to the loop).",
    duration: "15 s loop",
    camera: "Locked-off time-lapse; exposure ramped smoothly.",
    sound: silent,
    poster: "Mid-afternoon frame.",
    caption: "A commercial building from morning to evening.",
    aspect: "21/9",
    sketch: "exterior",
  },
  {
    id: "VID-07",
    page: "Grid events — lifecycle",
    scene: "Analogue-style animation: a grid signal travels along a single-line diagram to a building, then a response line returns.",
    duration: "8 s loop",
    camera: "Flat 2D animation, drawn in the site's diagram style (ink lines on paper).",
    sound: silent,
    poster: "Diagram with the signal halfway along the feeder.",
    caption: "A grid signal travelling to a building and a response returning.",
    aspect: "16/9",
    sketch: "panel",
  },
  {
    id: "VID-08",
    page: "Systems — HVAC and thermal",
    scene: "Chiller pipes and pumps in operation; gauge needles steady, slight vibration.",
    duration: "8 s loop",
    camera: "Locked-off medium shot; optional 2 s rack focus from gauge to pump.",
    sound: silent,
    poster: "Pump and gauges in focus.",
    caption: "Chilled-water pumps and pipework in operation.",
    aspect: "16/9",
    sketch: "pipes",
  },
];

export const audio: AudioBrief[] = [
  {
    id: "AUD-01",
    page: "How it works",
    title: "The hour before an event",
    narrator: "Calm, unhurried human voice; an experienced facilities or energy engineer, not a presenter. Natural pauses.",
    topic: "What an operator checks in the hour before a demand-response window.",
    duration: "About 35 seconds",
    transcriptRequirement: "Full verbatim transcript displayed beside the player; update it if the recording departs from the script.",
    ambient: "Optional: very low plant-room ambience (fan hum) under the first and last 3 seconds only; must stay 20 dB below the voice.",
    transcript: [
      "An hour before the window opens, the first thing I look at is not the price. It's the building.",
      "Which floors are occupied, whether the morning pre-cool actually held, and whether anything is in maintenance.",
      "Then I look at what the plan is asking for, asset by asset, and where each one would stop.",
      "If I can't explain why a unit is included, it comes out of the plan. That's the rule.",
    ],
  },
  {
    id: "AUD-02",
    page: "Field notes — A building is not a battery",
    title: "A building is not a battery",
    narrator: "Measured, conversational; the article's author or an editor reading a short excerpt.",
    topic: "Why thermal flexibility behaves differently from stored electrical energy.",
    duration: "About 40 seconds",
    transcriptRequirement: "Verbatim transcript beside the player, matching the article excerpt.",
    ambient: "None.",
    transcript: [
      "A battery has a state of charge, a power limit and a warranty. A building has all of those things and a few hundred people inside it.",
      "When we reduce cooling, the energy isn't stored anywhere tidy. It's in the concrete, the air, the furniture—and it leaks back as the afternoon goes on.",
      "So the question is never only how many kilowatts. It's how long, in which zones, and who notices first.",
    ],
  },
  {
    id: "AUD-03",
    page: "Field notes — What operators need to know before a demand-response event",
    title: "Five things to check",
    narrator: "A facilities operator, recorded on site; relaxed, practical. Light room tone is acceptable.",
    topic: "A short checklist before accepting an event.",
    duration: "About 30 seconds",
    transcriptRequirement: "Verbatim transcript beside the player.",
    ambient: "Natural room tone only; no added music or effects.",
    transcript: [
      "Five things, every time. Occupancy for the window. Anything in maintenance. The comfort limits we agreed with the tenant.",
      "Which equipment is actually controllable today, not in theory. And who is on site if we need to step out early.",
    ],
  },
];

export const diagrams: DiagramBrief[] = [
  {
    id: "DGM-01",
    page: "Home — systems view; Systems — explorer",
    title: "Building system schematic",
    inputs: ["Weather", "Tariff", "Utility or aggregator signal", "Occupancy schedule"],
    outputs: ["BMS setpoints", "Lighting levels", "Charging schedule"],
    labels: ["BMS", "HVAC", "Lighting", "EV charging", "Meters", "Occupancy", "Weather", "Tariffs", "Grid signal"],
    interaction: "Select a system to highlight its connections and list its operating constraints.",
    mobile: "Diagram scales to width; system list becomes a horizontal set of buttons above the constraints panel.",
  },
  {
    id: "DGM-02",
    page: "Home — what GridSync coordinates",
    title: "Observe, forecast, coordinate, verify",
    inputs: ["Telemetry", "Schedules", "Constraints", "Signals"],
    outputs: ["Operator view", "Forecast window", "Approved plan", "Verification record"],
    labels: ["Observe", "Forecast", "Coordinate", "Verify"],
    interaction: "Static; each module has its own small figure. Lines draw once on first view.",
    mobile: "Modules stack vertically; each figure keeps its aspect ratio.",
  },
  {
    id: "DGM-03",
    page: "Home — a building is not a battery",
    title: "Battery versus building",
    inputs: ["State of charge / thermal state", "Power limit", "Occupancy", "Comfort band"],
    outputs: ["Available response over time"],
    labels: ["Battery: flat until empty", "Building: tapers as the space drifts toward its limit"],
    interaction: "Static comparison with annotated curves.",
    mobile: "Two panels stack; annotations move below each chart.",
  },
  {
    id: "DGM-04",
    page: "How it works",
    title: "Five-stage cross-section",
    inputs: ["Existing BMS and meters", "Schedules", "Constraints", "Signal"],
    outputs: ["Model", "Flexible windows", "Reviewed response", "Verification"],
    labels: ["Connect", "Understand", "Identify", "Coordinate", "Verify"],
    interaction: "Sticky diagram; the highlighted systems and data sources change as each stage scrolls into view.",
    mobile: "No sticky behaviour; each stage shows its own static copy of the diagram state.",
  },
  {
    id: "DGM-05",
    page: "Platform — flexibility forecast; Outcomes",
    title: "Flexibility boundary chart",
    inputs: ["Baseline load", "Upper and lower flexible bounds", "Confidence"],
    outputs: ["Candidate window"],
    labels: ["Expected load", "Flexible envelope", "Candidate window", "Illustrative scenario"],
    interaction: "Hover or focus a point for values; table view available.",
    mobile: "Chart keeps full width with fewer axis ticks; table below.",
  },
  {
    id: "DGM-06",
    page: "Grid events",
    title: "Event lifecycle timeline",
    inputs: ["Signal", "Site conditions", "Estimate", "Approval"],
    outputs: ["Coordinated response", "Monitoring", "Verification", "Follow-up"],
    labels: ["Eight lifecycle stages with timestamps"],
    interaction: "Select a stage to see what the operator sees and what is recorded.",
    mobile: "Vertical list; the detail panel appears under the selected stage.",
  },
  {
    id: "DGM-07",
    page: "Data & integrations",
    title: "Integration map",
    inputs: ["BMS", "Meters", "Submeters", "SCADA", "HVAC controllers", "Lighting controls", "EV charging", "Weather", "Occupancy", "Tariff and grid signals"],
    outputs: ["Operator views", "Approved instructions", "Aggregator workflows", "Event reports", "Audit history", "API and export"],
    labels: ["Inputs", "GridSync processing", "Outputs", "Availability status"],
    interaction: "Select a source to read what is used, how often, and its availability status.",
    mobile: "Three stacked columns; selection opens an inline detail.",
  },
  {
    id: "DGM-08",
    page: "Platform — operating boundaries",
    title: "Operating boundary band",
    inputs: ["Zone temperature", "Comfort band", "Occupancy window"],
    outputs: ["Allowed drift"],
    labels: ["Lower limit", "Upper limit", "Occupied hours", "Current value"],
    interaction: "Static; labels appear in sequence on first view.",
    mobile: "Same drawing, labels move below.",
  },
  {
    id: "DGM-09",
    page: "Platform — verification",
    title: "Expected, delivered, observed",
    inputs: ["Baseline", "Planned response", "Metered load"],
    outputs: ["Measured response", "Deviation"],
    labels: ["Baseline", "Planned", "Observed", "Deviation"],
    interaction: "Static with a small legend.",
    mobile: "Same drawing scaled; legend below.",
  },
  {
    id: "DGM-10",
    page: "Platform — evidence trail",
    title: "Evidence ledger",
    inputs: ["Timestamps", "Inputs", "Approvals", "Changes", "Outcomes"],
    outputs: ["Exportable event record"],
    labels: ["Time", "Event", "Actor", "Reference"],
    interaction: "Static table-like figure.",
    mobile: "Rows wrap; reference column hidden.",
  },
];

export const findImage = (id: string) => images.find((i) => i.id === id);
export const findVideo = (id: string) => videos.find((v) => v.id === id);
export const findAudio = (id: string) => audio.find((a) => a.id === id);
