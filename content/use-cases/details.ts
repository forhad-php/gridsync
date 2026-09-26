/**
 * Use-case narratives, keyed by slug from `index.ts`. Workflows and figures are illustrative
 * operating scenarios, not customer case studies.
 */
export type DiagramSystem = {
  name: string;
  constraint: string;
  state: "participates" | "limited" | "excluded";
};

export type UseCaseDetail = {
  statement: string;
  context: string[];
  diagram: { site: string; inputs: string[]; systems: DiagramSystem[] };
  constraints: string[];
  workflow: string[];
  questions: string[];
  data: { item: string; need: "Required" | "Helpful" }[];
  notAssume: string[];
};

export const useCaseDetails: Record<string, UseCaseDetail> = {
  "office-portfolios": {
    statement: "An office is a thermal store with a timetable. The timetable decides how much of the store you may use.",
    context: [
      "Most offices carry more flexibility in their HVAC plant than in anything else, because the building fabric holds heat and coolth for longer than a single interval. Starting cooling earlier, relaxing setpoints within an agreed band, and staging air-handling units can move a meaningful share of afternoon load.",
      "The difficulty is rarely the physics. It is knowing which floors are occupied, which tenants have agreed to what, and which zones are already running warm before anyone asks them to move.",
    ],
    diagram: {
      site: "Office building",
      inputs: ["Floor schedules", "Weather", "Tariff"],
      systems: [
        { name: "AHUs and chillers", constraint: "Zone band 21–24 °C", state: "participates" },
        { name: "Lighting zones", constraint: "Min. lux in occupied areas", state: "limited" },
        { name: "Meeting floors", constraint: "Booked rooms excluded", state: "excluded" },
      ],
    },
    constraints: [
      "Occupied zones stay inside the comfort band agreed with the tenant.",
      "Minimum fresh-air rates are never reduced.",
      "Pre-cooling must finish before occupancy starts.",
      "Booked meeting rooms and executive floors may be excluded entirely.",
    ],
    workflow: [
      "Morning: GridSync reads floor schedules and room bookings and flags two floors below 40% expected occupancy.",
      "Midday: a 16:00–18:00 window is forecast; pre-cooling of those floors is proposed for 13:30–15:45.",
      "15:00: the facilities manager reviews the plan, removes Level 5 because of a tenant event, and approves.",
      "During the window: zone temperatures are tracked against the band; one zone reaches 23.8 °C and steps out.",
      "After: the record shows planned versus delivered response and the reason for the early step-out.",
    ],
    questions: [
      "Which floors will actually be occupied during the window?",
      "What did we agree with each tenant about temperature?",
      "Can pre-cooling finish before people arrive, or will it disturb them?",
      "Who decides to step out if a zone gets close to its limit?",
    ],
    data: [
      { item: "Interval meter data for the building", need: "Required" },
      { item: "BMS zone temperatures and setpoints", need: "Required" },
      { item: "Floor and tenant operating schedules", need: "Required" },
      { item: "Room bookings or occupancy sensor counts", need: "Helpful" },
      { item: "Tenant comfort agreements", need: "Helpful" },
    ],
    notAssume: [
      "That every floor has the same comfort tolerance.",
      "That a schedule in the BMS reflects who is actually in the building.",
      "That thermal response lasts as long as the event window.",
    ],
  },
  "retail-and-mixed-use": {
    statement: "Different tenants, different hours, one electrical connection.",
    context: [
      "Retail and mixed-use buildings combine shop floors, food service, offices, residential common areas and sometimes a hotel. Each has its own opening hours and its own idea of what the building should be doing at five in the afternoon.",
      "Flexibility exists in HVAC zones, display lighting and refrigeration, but it is spread across operators and contracts. Coordinating it means knowing whose load is whose, and which spaces cannot change during trading hours.",
    ],
    diagram: {
      site: "Mixed-use building",
      inputs: ["Opening hours", "Tariff", "Grid signal"],
      systems: [
        { name: "Common-area HVAC", constraint: "Mall band 20–25 °C", state: "participates" },
        { name: "Display refrigeration", constraint: "Case temp. limits", state: "limited" },
        { name: "Back-of-house lighting", constraint: "Safety levels fixed", state: "participates" },
        { name: "Food service kitchens", constraint: "Never controlled", state: "excluded" },
      ],
    },
    constraints: [
      "Trading-hour comfort in customer areas is non-negotiable for most landlords.",
      "Refrigerated display cases stay inside food-safety limits.",
      "Tenant-controlled spaces are excluded unless the tenant opts in.",
      "Kitchens and safety systems are never part of a plan.",
    ],
    workflow: [
      "GridSync maps which loads the landlord controls and which belong to tenants.",
      "A tariff peak from 17:00–19:00 is identified against the centre's trading hours.",
      "Common-area HVAC is pre-conditioned; back-of-house lighting is dimmed within safety levels.",
      "Two opted-in tenants receive the proposed plan and confirm participation.",
      "Afterwards, landlord and tenant contributions are reported separately.",
    ],
    questions: [
      "Which loads do we control, and which belong to tenants?",
      "What happens to customer comfort during peak trading?",
      "How is each tenant's contribution attributed?",
      "Can a tenant withdraw on the day?",
    ],
    data: [
      { item: "Main and tenant submeter data", need: "Required" },
      { item: "Landlord BMS points for common areas", need: "Required" },
      { item: "Opening hours and event calendar", need: "Required" },
      { item: "Refrigeration controller data", need: "Helpful" },
    ],
    notAssume: [
      "That the landlord can control tenant equipment.",
      "That trading hours are the same across the building.",
      "That refrigeration can be switched off because it is on a separate board.",
    ],
  },
  "logistics-and-cold-storage": {
    statement: "Product protection is the constraint. Everything else is scheduling.",
    context: [
      "Cold stores hold a large thermal mass in the product itself. With enough margin, refrigeration can run harder before a peak and coast through it. Without margin, even a short reduction puts stock at risk.",
      "The operating reality includes door openings, loading schedules, defrost cycles and compressor limits. A plan that ignores any of them will be overridden on the floor, and rightly so.",
    ],
    diagram: {
      site: "Cold store",
      inputs: ["Loading schedule", "Weather", "Grid signal"],
      systems: [
        { name: "Compressor racks", constraint: "Min. run / restart times", state: "participates" },
        { name: "Frozen chambers", constraint: "Product ≤ −18 °C", state: "limited" },
        { name: "Dock doors", constraint: "Open periods excluded", state: "excluded" },
        { name: "Defrost cycles", constraint: "Never shifted into window", state: "limited" },
      ],
    },
    constraints: [
      "Product temperature limits are hard limits, with margin agreed by quality staff.",
      "Compressor minimum run and restart times protect the equipment.",
      "Defrost cycles are rescheduled only within the manufacturer's guidance.",
      "Chambers with active loading are excluded for the window.",
    ],
    workflow: [
      "GridSync reads chamber temperatures, compressor states and the day's loading plan.",
      "A peak window is forecast; two frozen chambers have enough margin for deeper pre-cooling.",
      "The quality lead reviews the proposed drift limit of 1.5 °C and approves it.",
      "During the window, chamber temperatures are shown against the product limit, not just the setpoint.",
      "One chamber's door is opened unexpectedly; it leaves the plan automatically and the record notes why.",
    ],
    questions: [
      "How much margin do we really have before product is at risk?",
      "Which chambers are being loaded during the window?",
      "Will this interfere with defrost?",
      "Who on site can stop the plan, and how quickly?",
    ],
    data: [
      { item: "Chamber and product temperature probes", need: "Required" },
      { item: "Compressor and rack controller states", need: "Required" },
      { item: "Interval meter data", need: "Required" },
      { item: "Loading and dispatch schedule", need: "Helpful" },
      { item: "Door sensors", need: "Helpful" },
    ],
    notAssume: [
      "That air temperature equals product temperature.",
      "That all chambers can drift by the same amount.",
      "That a quality limit can be relaxed to meet a programme target.",
    ],
  },
  "ev-depots": {
    statement: "Every vehicle leaves on time with the charge its route needs. Everything else is flexible.",
    context: [
      "Depot charging is among the most flexible loads a site can have, because vehicles often sit connected for hours longer than they need. The same fleet can also create the site's highest peak if every van plugs in at the end of a shift.",
      "Coordination depends on departure times, required state of charge, charger limits and the connection shared with the building. Priority vehicles and late returns change the plan daily.",
    ],
    diagram: {
      site: "Fleet depot",
      inputs: ["Route plan", "Tariff", "Site capacity"],
      systems: [
        { name: "Depot chargers", constraint: "Per-charger power limit", state: "participates" },
        { name: "Priority vehicles", constraint: "Charge first, always", state: "limited" },
        { name: "Depot building HVAC", constraint: "Shares connection", state: "participates" },
      ],
    },
    constraints: [
      "Every vehicle reaches its required charge by its departure time.",
      "Total site load stays within the connection agreement.",
      "Priority vehicles are charged first and never deferred.",
      "Charger power limits and vehicle acceptance rates are respected.",
    ],
    workflow: [
      "Vehicles return between 17:00 and 19:30; route plans give tomorrow's departures and distances.",
      "GridSync forecasts the evening peak and proposes charging most vehicles after 21:00.",
      "The fleet manager marks three vans as priority for an early route; they charge immediately.",
      "Charging is coordinated overnight within site capacity; late returns are slotted automatically.",
      "At 05:30 the record shows each vehicle's delivered charge against its requirement.",
    ],
    questions: [
      "Will every vehicle be ready for its route?",
      "What happens if a van comes back late or with less charge than expected?",
      "How close are we to the site connection limit?",
      "Can drivers or dispatch override the plan?",
    ],
    data: [
      { item: "Charge-point management system data", need: "Required" },
      { item: "Departure times and required energy per vehicle", need: "Required" },
      { item: "Site connection limit and main meter data", need: "Required" },
      { item: "Vehicle telematics state of charge", need: "Helpful" },
    ],
    notAssume: [
      "That every vehicle is plugged in when it is parked.",
      "That a vehicle's reported state of charge is always available or accurate.",
      "That fleet operations will change routes to suit a tariff.",
    ],
  },
  campuses: {
    statement: "Several buildings, one connection, one set of people responsible for all of it.",
    context: [
      "University, healthcare and corporate campuses operate many buildings with different uses behind one or a few grid connections. Some buildings are flexible and some—laboratories, clinical areas, data rooms—are not.",
      "A campus view helps teams see where flexibility sits across the estate, and avoid asking the one building that cannot move to carry the whole response.",
    ],
    diagram: {
      site: "Campus network",
      inputs: ["Estate calendar", "Weather", "Grid signal"],
      systems: [
        { name: "Teaching buildings", constraint: "Term-time schedules", state: "participates" },
        { name: "Central plant", constraint: "Plant minimum turndown", state: "limited" },
        { name: "Laboratories", constraint: "Ventilation fixed", state: "excluded" },
        { name: "Clinical areas", constraint: "Never controlled", state: "excluded" },
      ],
    },
    constraints: [
      "Laboratories, clinical areas and critical rooms are excluded by default.",
      "Central plant turndown limits apply across all connected buildings.",
      "Term, holiday and event calendars change what is occupied.",
      "Each building keeps its own comfort and operating boundaries.",
    ],
    workflow: [
      "GridSync maps buildings, meters and central plant against the estate calendar.",
      "A winter peak window is forecast; three teaching buildings are lightly used that afternoon.",
      "The energy manager approves participation for those buildings and the library's ventilation boost is left untouched.",
      "The response is coordinated through the central BMS; laboratories stay outside the plan.",
      "The estate report shows contribution per building and per connection.",
    ],
    questions: [
      "Which buildings can move and which must not?",
      "How does central plant behave when several buildings reduce at once?",
      "What does the estate calendar say about occupancy today?",
      "How do we report results to each building's owner?",
    ],
    data: [
      { item: "Building-level meters or submeters", need: "Required" },
      { item: "Central BMS or per-building BMS access", need: "Required" },
      { item: "Estate and room-booking calendars", need: "Required" },
      { item: "Central plant controller data", need: "Helpful" },
    ],
    notAssume: [
      "That campus buildings share the same constraints.",
      "That a building with a meter has controllable load.",
      "That critical areas can be included with a smaller margin.",
    ],
  },
  "demand-response-aggregators": {
    statement: "A portfolio is only as reliable as the boundaries of each site in it.",
    context: [
      "Aggregators offer capacity from many customer sites into utility programmes and markets. The commercial promise is made at portfolio level; the physical response happens one building at a time.",
      "Clearer asset boundaries at each site make offers more realistic, and event evidence that keeps site context makes settlement and customer reporting easier to explain.",
    ],
    diagram: {
      site: "Aggregator portfolio",
      inputs: ["Programme rules", "Event notice", "Baselines"],
      systems: [
        { name: "Office sites", constraint: "Comfort bands per tenant", state: "participates" },
        { name: "Cold stores", constraint: "Product limits", state: "limited" },
        { name: "EV depots", constraint: "Departure deadlines", state: "participates" },
        { name: "Sites in maintenance", constraint: "Withdrawn for the day", state: "excluded" },
      ],
    },
    constraints: [
      "Each site's customer-agreed limits travel with it into the portfolio.",
      "Programme rules—notice, duration, baseline method—apply per event.",
      "Customer approval rules may differ site by site.",
      "Sites with data-quality issues are flagged before they are offered.",
    ],
    workflow: [
      "An event notice arrives for tomorrow, 17:00–19:00.",
      "GridSync estimates available response for each enrolled site, inside its boundaries, with confidence.",
      "Two sites are withdrawn: one in maintenance, one with stale meter data.",
      "Site operators approve their part of the plan; the aggregator confirms the portfolio offer.",
      "After the event, each site's measured response and context are compiled for settlement and customer reports.",
    ],
    questions: [
      "How much can each site really deliver tomorrow?",
      "Which sites have data we can rely on for settlement?",
      "Who approves at each customer site?",
      "How do we explain a shortfall to the programme and to the customer?",
    ],
    data: [
      { item: "Revenue-grade interval meter data per site", need: "Required" },
      { item: "Programme rules and baseline methods", need: "Required" },
      { item: "Site constraints agreed with each customer", need: "Required" },
      { item: "Site BMS or device-level telemetry", need: "Helpful" },
    ],
    notAssume: [
      "That enrolled capacity equals available capacity on the day.",
      "That every site responds the same way to the same signal.",
      "That a portfolio shortfall can be settled without site-level evidence.",
    ],
  },
};
