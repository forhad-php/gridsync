/**
 * Platform capability diagrams (DGM-08, DGM-09, DGM-10 and the site-model and coordination
 * figures). Static SVG in the site's diagram language: thin ink lines, mono labels, copper for
 * the active path, moss for operating status, signal yellow for constraints.
 */
const INK = "#24332E";
const COPPER = "#B96F45";
const MOSS = "#788F72";
const SIGNAL = "#D9B84C";
const MONO = { fontFamily: "var(--font-mono), monospace", fontSize: 11 } as const;
const MUTED = "#56615C";

/* ------------------------------------------------------------------ */
/* Site model tree: building → meters → equipment → schedules          */
/* ------------------------------------------------------------------ */
export function SiteModelTree() {
  const node = (x: number, y: number, w: number, label: string, sub: string, hot = false) => (
    <g key={`${x}-${y}`}>
      <rect x={x} y={y} width={w} height="38" fill="#FCFBF7" stroke={hot ? COPPER : INK} strokeOpacity={hot ? 1 : 0.6} />
      <text x={x + 10} y={y + 16} fill={INK} {...MONO} fontSize={11.5}>
        {label}
      </text>
      <text x={x + 10} y={y + 30} fill={MUTED} {...MONO} fontSize={10}>
        {sub}
      </text>
    </g>
  );
  const link = (d: string, hot = false) => <path d={d} fill="none" stroke={hot ? COPPER : INK} strokeOpacity={hot ? 1 : 0.4} />;
  return (
    <svg viewBox="0 0 640 330" className="h-auto w-full" role="img" aria-label="Site model: a building is linked to its revenue meter and submeters; each submeter is linked to the equipment it measures; each piece of equipment is linked to the schedule and zones it serves.">
      {/* column headers */}
      {[
        [20, "Site"],
        [170, "Meters"],
        [330, "Equipment"],
        [490, "Schedules / zones"],
      ].map(([x, t]) => (
        <text key={t as string} x={x as number} y="18" fill={MUTED} {...MONO}>
          {t}
        </text>
      ))}
      <path d="M0 28h640" stroke={INK} strokeOpacity="0.15" />

      {node(20, 140, 130, "Building B", "Riverside campus")}
      {node(170, 60, 140, "MTR-01 revenue", "30-min · utility", true)}
      {node(170, 140, 140, "SUB-04 chiller", "5-min · submeter")}
      {node(170, 220, 140, "SUB-07 EV", "1-min · CPMS")}

      {node(330, 100, 140, "CH-1 chiller", "400 kW nameplate", true)}
      {node(330, 160, 140, "AHU-2 air handler", "L3–L4 supply")}
      {node(330, 240, 140, "EVSE-01…06", "6 × 22 kW")}

      {node(490, 60, 140, "Occupied 07–19", "Mon–Fri", true)}
      {node(490, 130, 140, "Zones L3–L4", "21–24 °C band")}
      {node(490, 200, 140, "Fleet out 06:00", "80% SoC needed")}
      {node(490, 262, 140, "Maintenance", "CH-2 out, Tue")}

      {link("M150 159h10V79h10", true)}
      {link("M160 159h10")}
      {link("M160 159v80h10")}
      {link("M310 79h10v40h10", true)}
      {link("M310 159h10v20h10")}
      {link("M310 239h10v20h10")}
      {link("M470 119h10V79h10", true)}
      {link("M470 179h10v-30h10")}
      {link("M470 259h10v-40h10")}
      <path d="M470 119h10v162h10" fill="none" stroke={SIGNAL} strokeDasharray="3 3" />
      <text x="20" y="318" fill={MUTED} {...MONO} fontSize={10}>
        Highlighted path: which meter proves what CH-1 did, and when CH-1 is allowed to move.
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DGM-08 operating boundary band                                      */
/* ------------------------------------------------------------------ */
export function BoundaryBand() {
  // x: 06:00 → 22:00 across 60..600 ; y: 18 °C (260) → 27 °C (40)
  const x = (h: number) => 60 + ((h - 6) / 16) * 540;
  const y = (t: number) => 260 - ((t - 18) / 9) * 220;
  const temp: [number, number][] = [
    [6, 22.6], [7, 22.1], [8, 21.6], [9, 21.8], [10, 22.2], [11, 22.4], [12, 22.6], [13, 22.4], [14, 22.1], [15, 21.8], [16, 22.3], [17, 23.1], [18, 23.6], [19, 23.4], [20, 24.6], [21, 25.4], [22, 25.8],
  ];
  const d = temp.map(([h, t], i) => `${i ? "L" : "M"}${x(h).toFixed(1)} ${y(t).toFixed(1)}`).join(" ");
  return (
    <svg viewBox="0 0 640 300" className="h-auto w-full" role="img" aria-label="Operating boundary: during occupied hours 07:00 to 19:00 the zone must stay between 21 and 24 °C. The zone temperature stays inside the band, rising toward the upper limit during an event from 16:00 to 18:00, and drifts above 24 °C only after occupancy ends.">
      {/* occupied hours band */}
      <rect x={x(7)} y={y(24)} width={x(19) - x(7)} height={y(21) - y(24)} fill={MOSS} fillOpacity="0.18" />
      <path d={`M${x(7)} ${y(24)}H${x(19)}M${x(7)} ${y(21)}H${x(19)}`} stroke={MOSS} strokeWidth="1.2" />
      <path d={`M${x(7)} 30V270M${x(19)} 30V270`} stroke={INK} strokeOpacity="0.3" strokeDasharray="2 3" />
      {/* event window */}
      <rect x={x(16)} y="30" width={x(18) - x(16)} height="240" fill={COPPER} fillOpacity="0.06" />
      <path d={`M${x(16)} 30V270M${x(18)} 30V270`} stroke={COPPER} strokeDasharray="3 3" />
      {/* axis */}
      <path d="M60 270H600" stroke={INK} strokeOpacity="0.4" />
      {[6, 10, 14, 18, 22].map((h) => (
        <text key={h} x={x(h)} y="288" textAnchor="middle" fill={MUTED} {...MONO} fontSize={10}>
          {String(h).padStart(2, "0")}:00
        </text>
      ))}
      {[18, 21, 24, 27].map((t) => (
        <text key={t} x="52" y={y(t) + 4} textAnchor="end" fill={MUTED} {...MONO} fontSize={10}>
          {t} °C
        </text>
      ))}
      {/* trace */}
      <path d={d} fill="none" stroke={INK} strokeWidth="1.8" />
      <circle cx={x(18)} cy={y(23.6)} r="4" fill="#FCFBF7" stroke={INK} strokeWidth="1.5" />
      {/* labels */}
      <text x={x(7) + 6} y={y(24) - 8} fill="#556B50" {...MONO}>
        upper limit 24.0 °C
      </text>
      <text x={x(7) + 6} y={y(21) + 16} fill="#556B50" {...MONO}>
        lower limit 21.0 °C
      </text>
      <text x={x(7) + 6} y="44" fill={MUTED} {...MONO} fontSize={10}>
        occupied 07:00–19:00
      </text>
      <text x={x(16) + 6} y="62" fill="#9A5530" {...MONO} fontSize={10}>
        event
      </text>
      <text x={x(18) + 8} y={y(23.6) + 18} fill={INK} {...MONO} fontSize={10}>
        23.6 °C · 0.4 °C headroom
      </text>
      <text x={x(19) + 6} y={y(26.6)} fill={MUTED} {...MONO} fontSize={10}>
        unoccupied: band released
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Event coordination sequence                                         */
/* ------------------------------------------------------------------ */
export function CoordinationSequence() {
  const lanes = [
    { y: 50, label: "Signal" },
    { y: 110, label: "GridSync" },
    { y: 170, label: "Operator" },
    { y: 230, label: "BMS / CPMS" },
  ];
  const step = (x: number, from: number, to: number, text: string, hot = false, dashed = false, labelY?: number, anchor: "start" | "end" = "start") => (
    <g key={`${x}-${text}`}>
      <path d={`M${x} ${from}V${to}`} stroke={hot ? COPPER : INK} strokeOpacity={hot ? 1 : 0.6} strokeDasharray={dashed ? "3 3" : undefined} />
      <path d={`M${x - 4} ${to + (to > from ? -7 : 7)}L${x} ${to}L${x + 4} ${to + (to > from ? -7 : 7)}`} fill="none" stroke={hot ? COPPER : INK} strokeOpacity={hot ? 1 : 0.6} />
      <text x={anchor === "start" ? x + 6 : x - 6} y={labelY ?? (from + to) / 2 + 4} textAnchor={anchor} fill={hot ? "#9A5530" : INK} {...MONO} fontSize={10}>
        {text}
      </text>
    </g>
  );
  return (
    <svg viewBox="0 0 640 270" className="h-auto w-full" role="img" aria-label="Coordination sequence: a signal reaches GridSync; GridSync prepares a plan and sends it to the operator; the operator approves; GridSync sends time-bounded instructions to the BMS and charge-point system; confirmations return to GridSync.">
      {lanes.map((l) => (
        <g key={l.label}>
          <path d={`M110 ${l.y}H630`} stroke={INK} strokeOpacity="0.15" />
          <text x="0" y={l.y + 4} fill={MUTED} {...MONO}>
            {l.label}
          </text>
        </g>
      ))}
      {step(130, 50, 110, "notice 13:30")}
      <rect x="160" y="100" width="116" height="20" fill="#FCFBF7" stroke={INK} strokeOpacity="0.5" />
      <text x="168" y="114" fill={INK} {...MONO} fontSize={10}>
        prepare plan v1
      </text>
      {step(296, 110, 170, "review")}
      <rect x="320" y="160" width="84" height="20" fill="#C7D2C0" stroke={INK} strokeOpacity="0.6" />
      <text x="328" y="174" fill={INK} {...MONO} fontSize={10}>
        approve v1
      </text>
      {step(420, 170, 110, "approved")}
      {step(530, 110, 230, "setpoints 16:00–18:00", true, false, 210, "end")}
      {step(600, 230, 110, "ack", false, true)}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DGM-09 expected, delivered, observed                                */
/* ------------------------------------------------------------------ */
export function VerificationFigure() {
  const x = (h: number) => 50 + ((h - 14) / 6) * 560; // 14:00 → 20:00
  const y = (kw: number) => 230 - ((kw - 800) / 600) * 200; // 800 → 1,400 kW
  const line = (pts: [number, number][]) => pts.map(([h, v], i) => `${i ? "L" : "M"}${x(h).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const baseline: [number, number][] = [[14, 1180], [15, 1220], [16, 1250], [17, 1262], [18, 1230], [19, 1080], [20, 900]];
  const planned: [number, number][] = [[14, 1180], [15, 1220], [15.9, 1250], [16.1, 1030], [17, 1040], [17.9, 1050], [18.1, 1230], [19, 1080], [20, 900]];
  const observed: [number, number][] = [[14, 1175], [15, 1228], [15.9, 1246], [16.2, 1070], [16.6, 1040], [17, 1052], [17.5, 1098], [17.9, 1120], [18.2, 1290], [18.6, 1250], [19, 1085], [20, 905]];
  const area = `${line(baseline.filter(([h]) => h >= 16 && h <= 18))} ${observed
    .filter(([h]) => h >= 16 && h <= 18)
    .reverse()
    .map(([h, v]) => `L${x(h).toFixed(1)} ${y(v).toFixed(1)}`)
    .join(" ")} Z`;
  return (
    <svg viewBox="0 0 640 270" className="h-auto w-full" role="img" aria-label="Verification: baseline, planned and observed load between 14:00 and 20:00. Observed load follows the plan early in the 16:00 to 18:00 window, drifts above plan in the last half hour, and shows a short rebound after 18:00.">
      <path d="M50 230H610" stroke={INK} strokeOpacity="0.4" />
      {[14, 16, 18, 20].map((h) => (
        <text key={h} x={x(h)} y="250" textAnchor="middle" fill={MUTED} {...MONO} fontSize={10}>
          {h}:00
        </text>
      ))}
      <rect x={x(16)} y="20" width={x(18) - x(16)} height="210" fill={COPPER} fillOpacity="0.05" />
      <path d={area} fill={MOSS} fillOpacity="0.25" />
      <path d={line(baseline)} fill="none" stroke={INK} strokeDasharray="5 4" strokeOpacity="0.7" />
      <path d={line(planned)} fill="none" stroke={COPPER} strokeWidth="1.3" />
      <path d={line(observed)} fill="none" stroke={INK} strokeWidth="1.8" />
      <path d={`M${x(17.5)} ${y(1098)}V${y(1045)}`} stroke={SIGNAL} strokeWidth="2" />
      <path d={`M${x(17.5)} ${y(1045)}L${x(17.5)} 205`} stroke={SIGNAL} strokeOpacity="0.6" strokeDasharray="2 2" />
      <text x={x(17.5)} y="218" textAnchor="middle" fill="#7A5C0C" {...MONO} fontSize={10}>
        ▲ deviation: L4 zone reached limit
      </text>
      <text x={x(18.2) + 8} y={y(1300)} fill={MUTED} {...MONO} fontSize={10}>
        rebound
      </text>
      <text x={x(16) + 6} y="34" fill="#9A5530" {...MONO} fontSize={10}>
        event window
      </text>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* DGM-10 evidence ledger (HTML figure — a record, not a chart)        */
/* ------------------------------------------------------------------ */
export const ledgerRows: [string, string, string, string][] = [
  ["13:30:04", "Event notice received · 16:00–18:00 reduction", "Programme feed", "EVT-0412"],
  ["13:41:52", "Forecast refreshed · weather and bookings", "GridSync", "FC-2291"],
  ["13:44:10", "Constraint check · L2 meeting zone excluded", "GridSync", "CK-118"],
  ["13:52:37", "Plan v1 approved with one change", "Operator (named)", "PL-0412-1"],
  ["16:00:00", "Setpoint offsets applied · expire 18:00", "BMS", "CMD-5530"],
  ["17:31:15", "L4 zone at upper limit · stepped out", "GridSync", "DV-061"],
  ["18:00:00", "Offsets expired · local schedule resumed", "BMS", "CMD-5531"],
  ["Next day", "Meter data complete · result calculated", "GridSync", "VR-0412"],
];

export function EvidenceLedger() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[34rem] text-left text-[14px]">
        <caption className="sr-only">Illustrative evidence record for one event, with time, entry, actor and reference.</caption>
        <thead>
          <tr className="border-b border-forest/30">
            <th scope="col" className="label pb-2 pr-4 font-normal">Time</th>
            <th scope="col" className="label pb-2 pr-4 font-normal">Entry</th>
            <th scope="col" className="label pb-2 pr-4 font-normal">Actor</th>
            <th scope="col" className="label hidden pb-2 font-normal sm:table-cell">Reference</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-forest/10 font-mono text-[12.5px]">
          {ledgerRows.map(([t, e, a, r]) => (
            <tr key={r}>
              <td className="whitespace-nowrap py-2.5 pr-4 text-mineral-ink tabular">{t}</td>
              <td className="py-2.5 pr-4 font-sans text-[14px] text-forest">{e}</td>
              <td className="whitespace-nowrap py-2.5 pr-4 text-mineral-ink">{a}</td>
              <td className="hidden whitespace-nowrap py-2.5 text-copper-ink sm:table-cell">{r}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
