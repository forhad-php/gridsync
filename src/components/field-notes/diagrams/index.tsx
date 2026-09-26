/**
 * Article diagrams for Field Notes. Drawn on paper in the site's diagram language:
 * ink lines, moss for allowed ranges, copper for the thing being discussed, signal for limits.
 * All are qualitative or illustrative and say so in their labels.
 */

const INK = "#24332E";
const COPPER = "#B96F45";
const MOSS = "#788F72";
const SIGNAL = "#D9B84C";
const T = { fontFamily: "var(--font-mono), monospace", fontSize: 11, fill: "#56615C" } as const;
const TD = { ...T, fill: INK } as const;

function Svg({ label, children, vb = "0 0 640 300" }: { label: string; children: React.ReactNode; vb?: string }) {
  return (
    <svg viewBox={vb} className="h-auto w-full" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function Axes({ x = 60, y = 250, w = 540, h = 210, xLabel, yLabel }: { x?: number; y?: number; w?: number; h?: number; xLabel: string; yLabel: string }) {
  return (
    <g>
      <path d={`M${x} ${y - h}V${y}H${x + w}`} fill="none" stroke={INK} strokeOpacity="0.45" />
      <text x={x} y={y - h - 10} {...T}>
        {yLabel}
      </text>
      <text x={x + w} y={y + 22} textAnchor="end" {...T}>
        {xLabel}
      </text>
    </g>
  );
}

/** A building is not a battery — response and zone temperature over an event, with rebound. */
export function ThermalTaper() {
  return (
    <Svg label="Over a two-hour event, a battery's output stays flat while a building's reduction starts high and tapers as zone temperature rises toward the comfort limit. After the event, the building's load rebounds above baseline while spaces recover.">
      <Axes xLabel="time →" yLabel="kW reduced (above) · rebound (below the axis)" y={190} h={150} />
      <path d="M60 190h540" stroke={INK} strokeOpacity="0.2" />
      {/* event window */}
      <rect x="120" y="40" width="300" height="220" fill={COPPER} fillOpacity="0.06" />
      <path d="M120 40v220M420 40v220" stroke={COPPER} strokeDasharray="3 3" />
      <text x="126" y="54" {...T} fill="#9A5530">
        event window
      </text>
      {/* battery */}
      <path d="M120 190V80h300v110" fill="none" stroke={INK} strokeDasharray="6 4" />
      <text x="330" y="74" {...TD}>
        battery: flat
      </text>
      {/* building */}
      <path d="M120 190V70 C180 74 240 100 300 130 S390 168 420 172 L420 190" fill="none" stroke={COPPER} strokeWidth="2" />
      <text x="232" y="122" {...TD} fill="#9A5530">
        building: tapers
      </text>
      {/* rebound */}
      <path d="M420 190 C440 250 470 252 500 236 S560 196 600 192" fill="none" stroke={COPPER} strokeWidth="2" />
      <text x="470" y="270" {...T}>
        rebound as spaces recover
      </text>
    </Svg>
  );
}

/** Before a DR event — a timeline of checks from notice to window start. */
export function PreEventTimeline() {
  const steps = [
    { x: 70, t: "T−24 h", l: "Notice received", s: "programme rules, window, target" },
    { x: 200, t: "T−4 h", l: "Site review", s: "occupancy, maintenance, exclusions" },
    { x: 330, t: "T−2 h", l: "Plan prepared", s: "asset by asset, with stop points" },
    { x: 460, t: "T−1 h", l: "Operator approval", s: "named person, plan version" },
    { x: 580, t: "T−0", l: "Window opens", s: "monitoring, step-out ready" },
  ];
  return (
    <Svg label="Timeline from event notice at 24 hours before, through site review, plan preparation and operator approval one hour before, to the window opening." vb="0 0 640 220">
      <path d="M40 90h570" stroke={INK} strokeOpacity="0.45" />
      <path d="M600 84l10 6-10 6" fill="none" stroke={INK} strokeOpacity="0.45" />
      {steps.map((s, i) => (
        <g key={s.t}>
          <circle cx={s.x} cy="90" r={i === 3 ? 7 : 5} fill={i === 3 ? "#FCFBF7" : INK} stroke={i === 3 ? COPPER : INK} strokeWidth={i === 3 ? 2 : 1} />
          <text x={s.x} y="70" textAnchor="middle" {...TD}>
            {s.t}
          </text>
          <text x={s.x} y="122" textAnchor="middle" {...TD} fill={i === 3 ? "#9A5530" : INK}>
            {s.l}
          </text>
          <foreignObject x={s.x - 58} y="130" width="116" height="60">
            <p style={{ font: "11px var(--font-mono), monospace", color: "#56615C", textAlign: "center", lineHeight: 1.35 }}>{s.s}</p>
          </foreignObject>
        </g>
      ))}
    </Svg>
  );
}

/** Data quality — an interval series with a gap, a flat-lined point and an estimated block. */
export function IntervalGaps() {
  const vals = [120, 118, 125, 131, 140, 152, 160, 158, 0, 0, 0, 166, 170, 170, 170, 170, 170, 170, 168, 162, 150, 140, 138, 132];
  const x = (i: number) => 70 + i * 22;
  const y = (v: number) => 230 - v;
  return (
    <Svg label="Twenty-four interval readings. Three intervals are missing, six repeat the same value because a point has stopped updating, and the rest vary normally.">
      <Axes xLabel="15-minute intervals →" yLabel="kW" y={230} h={190} />
      {/* gap */}
      <rect x={x(8) - 9} y="40" width={22 * 3} height="190" fill={SIGNAL} fillOpacity="0.14" />
      <text x={x(8) - 6} y="54" {...TD} fill="#7A5C0C">
        ▲ missing
      </text>
      {/* flat-line */}
      <rect x={x(12) - 9} y="40" width={22 * 6} height="190" fill={SIGNAL} fillOpacity="0.08" stroke={SIGNAL} strokeDasharray="3 3" />
      <text x={x(12) - 6} y="54" {...TD} fill="#7A5C0C">
        ▲ stale: value not changing
      </text>
      {vals.map((v, i) =>
        v === 0 ? (
          <path key={i} d={`M${x(i) - 6} 226h12`} stroke={INK} strokeOpacity="0.35" strokeDasharray="2 2" />
        ) : (
          <rect key={i} x={x(i) - 6} y={y(v)} width="12" height={v} fill={i >= 12 && i <= 17 ? "#FCFBF7" : MOSS} fillOpacity={i >= 12 && i <= 17 ? 1 : 0.5} stroke={INK} strokeOpacity="0.6" />
        ),
      )}
    </Svg>
  );
}

/** Comfort boundaries — two zones drifting inside an agreed band during an event. */
export function ComfortBandDrift() {
  return (
    <Svg label="An occupied comfort band from 21 to 24 degrees. During the event, a north-facing zone drifts slowly and stays inside the band; a south-facing zone drifts faster and reaches the upper limit before the event ends, so it steps out early.">
      <Axes xLabel="time →" yLabel="zone temperature (°C)" />
      <rect x="60" y="80" width="540" height="100" fill={MOSS} fillOpacity="0.14" />
      <path d="M60 80h540M60 180h540" stroke={MOSS} strokeDasharray="4 3" />
      <text x="596" y="74" textAnchor="end" {...TD}>
        upper limit 24 °C
      </text>
      <text x="596" y="196" textAnchor="end" {...TD}>
        lower limit 21 °C
      </text>
      <path d="M180 40v210M480 40v210" stroke={COPPER} strokeDasharray="3 3" />
      <text x="186" y="52" {...T} fill="#9A5530">
        event
      </text>
      <path d="M60 150 C120 150 170 152 180 150 S360 118 480 104 S560 130 600 146" fill="none" stroke={INK} strokeWidth="1.6" />
      <text x="380" y="132" {...TD}>
        north zone
      </text>
      <path d="M60 140 C120 140 170 142 180 140 S300 96 390 80" fill="none" stroke={COPPER} strokeWidth="2" />
      <path d="M390 80 C420 90 460 118 600 136" fill="none" stroke={COPPER} strokeWidth="1.4" strokeDasharray="5 3" />
      <circle cx="390" cy="80" r="5" fill="#FCFBF7" stroke={COPPER} strokeWidth="2" />
      <text x="396" y="68" {...TD} fill="#9A5530">
        south zone steps out
      </text>
    </Svg>
  );
}

/** Available vs controllable load — nameplate narrowing to a commitment. */
export function LoadFunnel() {
  const rows = [
    { l: "Nameplate", s: "what the equipment could draw", w: 520 },
    { l: "Typical load in the window", s: "what it actually draws at that hour", w: 380 },
    { l: "Movable within limits", s: "comfort, product, process, safety", w: 230 },
    { l: "Controllable today", s: "points writable, equipment healthy", w: 160 },
    { l: "Committed", s: "after confidence and a margin", w: 110 },
  ];
  return (
    <Svg label="Five bars narrowing from nameplate capacity, to typical load in the window, to load movable within limits, to load controllable today, to the amount committed after a confidence margin." vb="0 0 640 330">
      {rows.map((r, i) => {
        const y = 12 + i * 64;
        return (
          <g key={r.l}>
            <rect x="40" y={y} width={r.w} height="28" fill={i === 4 ? COPPER : MOSS} fillOpacity={i === 4 ? 0.28 : 0.12 + i * 0.07} stroke={i === 4 ? COPPER : INK} strokeOpacity="0.6" />
            <text x="52" y={y + 18} {...TD}>
              {r.l}
            </text>
            <text x="40" y={y + 46} {...T}>
              {r.s}
            </text>
          </g>
        );
      })}
    </Svg>
  );
}

/** Verification — baseline, plan and observed load, with the deviation shaded. */
export function BaselineDeviation() {
  return (
    <Svg label="Baseline load, planned reduction and observed load across an event. The observed load meets the plan for the first hour, then drifts back up, leaving a shaded deviation in the second hour.">
      <Axes xLabel="time →" yLabel="kW" />
      <path d="M180 40v210M480 40v210" stroke={COPPER} strokeDasharray="3 3" />
      <text x="186" y="52" {...T} fill="#9A5530">
        event window
      </text>
      {/* deviation area */}
      <path d="M330 140 C370 140 420 132 480 118 L480 150 C420 150 370 150 330 150Z" fill={SIGNAL} fillOpacity="0.3" />
      {/* baseline */}
      <path d="M60 110 C160 100 260 96 360 96 S540 104 600 112" fill="none" stroke={INK} strokeDasharray="6 4" />
      <text x="540" y="96" {...TD}>
        baseline
      </text>
      {/* plan */}
      <path d="M180 104 L190 150 H480 L490 104" fill="none" stroke={MOSS} strokeWidth="1.6" />
      <text x="232" y="168" {...TD} fill="#556B50">
        planned
      </text>
      {/* observed */}
      <path d="M60 112 C120 108 170 104 182 106 C192 146 200 150 230 150 S320 150 330 140 S420 132 480 118 S540 110 600 114" fill="none" stroke={COPPER} strokeWidth="2" />
      <text x="360" y="124" {...TD} fill="#9A5530">
        observed
      </text>
      <text x="392" y="176" {...TD} fill="#7A5C0C">
        ▲ deviation
      </text>
    </Svg>
  );
}
