"use client";

import { motion } from "framer-motion";
import type { SystemKey } from "@/content/systems";
import { cn } from "@/lib/cn";

type Props = {
  /** Systems to emphasise. Everything else recedes. Omit to show all at equal weight. */
  active?: SystemKey[];
  /** Optional mouse convenience; keyboard selection must be provided by the parent (buttons). */
  onSelect?: (k: SystemKey) => void;
  className?: string;
  /** Accessible description of the current state. */
  label?: string;
};

const INK = "#24332E";
const COPPER = "#B96F45";
const MONO = "var(--font-mono), monospace";

function SchematicLink({ d, hot, on }: { d: string; hot: boolean; on: boolean }) {
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={hot ? COPPER : INK}
      strokeOpacity={hot ? 1 : 0.45}
      strokeWidth={hot ? 1.6 : 1}
      strokeDasharray="4 4"
      style={{ opacity: on ? 1 : 0.22, transition: "opacity 400ms" }}
      initial={{ pathLength: 0 }}
      whileInView={{ pathLength: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: [0.2, 0, 0, 1] }}
    />
  );
}

/**
 * DGM-01 — building cross-section showing how inputs reach GridSync, how GridSync reaches the
 * BMS, and how the BMS reaches each flexible system. Drawn in the site's diagram language:
 * thin ink lines, copper for the active path, mono labels.
 */
export function BuildingSchematic({ active, onSelect, className, label }: Props) {
  const on = (k: SystemKey) => !active || active.length === 0 || active.includes(k);
  const hot = (k: SystemKey) => !!active && active.includes(k);

  const group = (k: SystemKey) => ({
    style: { opacity: on(k) ? 1 : 0.22, transition: "opacity 400ms cubic-bezier(0.2,0,0,1)" },
    stroke: hot(k) ? COPPER : INK,
    className: cn(onSelect && "cursor-pointer"),
    onClick: onSelect ? () => onSelect(k) : undefined,
  });

  const text = (k: SystemKey) => ({
    fill: hot(k) ? "#9A5530" : INK,
    fontFamily: MONO,
    fontSize: 11,
    stroke: "none",
  });

  return (
    <svg viewBox="0 0 800 520" className={cn("h-auto w-full", className)} role="img" aria-label={label ?? "Building cross-section connecting grid inputs, GridSync, the building management system and flexible building loads."}>
      {/* Ground and building shell */}
      <path d="M0 430h800" stroke={INK} strokeOpacity="0.55" />
      <path d="M0 434h800" stroke={INK} strokeOpacity="0.15" />
      <rect x="200" y="110" width="340" height="320" fill="#FCFBF7" fillOpacity="0.6" stroke={INK} strokeOpacity="0.7" />
      <rect x="200" y="430" width="340" height="62" fill="none" stroke={INK} strokeOpacity="0.35" strokeDasharray="2 3" />
      {[190, 270, 350].map((y) => (
        <path key={y} d={`M200 ${y}h340`} stroke={INK} strokeOpacity="0.35" />
      ))}
      {["Level 4", "Level 3", "Level 2", "Level 1", "Plant"].map((l, i) => (
        <text key={l} x="532" y={i < 4 ? 126 + i * 80 : 446} textAnchor="end" fill={INK} fillOpacity="0.5" fontFamily={MONO} fontSize="10">
          {l}
        </text>
      ))}

      {/* GridSync */}
      <g>
        <rect x="24" y="252" width="128" height="52" fill="#17221F" />
        <g stroke="#F3F0E8" strokeWidth="2" strokeLinecap="square" fill="none" transform="translate(36 266) scale(1)">
          <path d="M8 0v24M0 7h14M8 17h14" />
        </g>
        <text x="68" y="283" fill="#F3F0E8" fontSize="13" fontWeight="500">GridSync</text>
      </g>

      {/* Weather */}
      <g {...group("weather")} fill="none">
        <circle cx="62" cy="62" r="11" />
        <path d="M62 44v-6M62 86v-6M44 62h-6M86 62h-6" />
        <path d="M70 76h34a10 10 0 0 0-4-19 14 14 0 0 0-26 2 9 9 0 0 0-4 17z" fill="#F3F0E8" />
        <text x="38" y="112" {...text("weather")}>Weather</text>
      </g>
      <SchematicLink d="M72 118V252" hot={hot("weather")} on={on("weather")} />

      {/* Tariffs */}
      <g {...group("tariffs")} fill="none">
        <path d="M112 196h14v-14h14v-10h14v24h14" />
        <path d="M112 200h56" strokeOpacity="0.4" />
        <text x="112" y="218" {...text("tariffs")}>Tariff</text>
      </g>
      <SchematicLink d="M130 224v28" hot={hot("tariffs")} on={on("tariffs")} />

      {/* Grid signal: pylon to the right, signal path over the roof into GridSync */}
      <g {...group("signal")} fill="none">
        <path d="M735 430l12-220 12 220M741 320h12M738 380h18M739 260h16M747 210v-8M722 232h50" />
        <path d="M722 232l-6 8M772 232l6 8" />
        <text x="796" y="166" textAnchor="end" {...text("signal")}>
          <tspan x="796">Utility /</tspan>
          <tspan x="796" dy="14">aggregator signal</tspan>
        </text>
      </g>
      <SchematicLink d="M720 200H680V40H112V252" hot={hot("signal")} on={on("signal")} />

      {/* Grid supply into meters */}
      <path d="M735 236C670 250 640 330 610 430" fill="none" stroke={INK} strokeOpacity="0.3" />
      <path d="M610 430v32h-40" fill="none" stroke={INK} strokeOpacity="0.3" strokeDasharray="2 3" />

      {/* Meters */}
      <g {...group("meters")} fill="none">
        <rect x="506" y="446" width="60" height="32" fill="#FCFBF7" />
        <circle cx="522" cy="462" r="7" />
        <path d="M534 456h24M534 462h24M534 468h16" strokeOpacity="0.5" />
        <text x="506" y="508" {...text("meters")}>Meters</text>
      </g>

      {/* BMS */}
      <g {...group("bms")} fill="none">
        <rect x="370" y="446" width="64" height="32" fill="#FCFBF7" />
        <path d="M378 454h8M378 462h8M378 470h8M392 454h34M392 462h34M392 470h20" strokeOpacity="0.55" />
        <text x="382" y="508" {...text("bms")}>BMS</text>
      </g>
      {/* GridSync ↔ BMS and meters */}
      <SchematicLink d="M152 292h26v170h192" hot={hot("bms")} on={on("bms")} />
      <SchematicLink d="M434 462h72" hot={hot("meters")} on={on("meters")} />

      {/* HVAC: chiller in plant, riser, rooftop AHU */}
      <g {...group("hvac")} fill="none">
        <rect x="222" y="446" width="96" height="32" fill="#FCFBF7" />
        <circle cx="244" cy="462" r="9" />
        <circle cx="272" cy="462" r="9" />
        <path d="M290 454h20M290 462h20M290 470h20" strokeOpacity="0.5" />
        <path d="M296 446V96M304 446V96" />
        {[150, 230, 310, 390].map((y) => (
          <path key={y} d={`M304 ${y}h40M344 ${y - 4}v8`} strokeOpacity="0.6" />
        ))}
        <rect x="232" y="76" width="92" height="34" fill="#FCFBF7" />
        <circle cx="258" cy="93" r="10" />
        <path d="M278 84h36M278 92h36M278 100h36" strokeOpacity="0.5" />
        <text x="232" y="66" {...text("hvac")}>HVAC · AHU</text>
        <text x="222" y="508" {...text("hvac")}>Chiller</text>
      </g>
      <SchematicLink d="M370 470H318" hot={hot("hvac")} on={on("hvac")} />

      {/* Lighting: fittings on each ceiling */}
      <g {...group("lighting")} fill="none">
        {[114, 194, 274, 354].map((y) =>
          [372, 412, 452, 492].map((x) => <path key={`${x}-${y}`} d={`M${x} ${y}h22`} strokeWidth="2.2" />),
        )}
        {[114, 194, 274, 354].map((y) =>
          [372, 412, 452, 492].map((x, i) => (
            <path key={`c${x}-${y}`} d={`M${x + 4} ${y + 3}l-6 12M${x + 18} ${y + 3}l6 12`} strokeOpacity={i % 2 ? 0.25 : 0.4} />
          )),
        )}
        <text x="372" y="102" {...text("lighting")}>Lighting</text>
      </g>
      <SchematicLink d="M402 446V360" hot={hot("lighting")} on={on("lighting")} />

      {/* Occupancy: people on floors, sensor on each ceiling */}
      <g {...group("occupancy")} fill="none">
        {[
          [420, 190],
          [470, 190],
          [440, 270],
          [380, 350],
          [500, 430],
          [455, 430],
        ].map(([x, y]) => (
          <g key={`${x}-${y}`}>
            <circle cx={x} cy={y - 30} r="5" />
            <path d={`M${x} ${y - 25}v17M${x - 7} ${y}l7-8 7 8M${x - 7} ${y - 18}h14`} />
          </g>
        ))}
        <text x="214" y="178" {...text("occupancy")}>Occupancy</text>
      </g>

      {/* EV charging */}
      <g {...group("ev")} fill="none">
        {[572, 604].map((x) => (
          <g key={x}>
            <rect x={x} y="384" width="14" height="46" fill="#FCFBF7" />
            <rect x={x + 3} y="390" width="8" height="9" />
          </g>
        ))}
        <path d="M640 430v-28h48l14 14v14" fill="#FCFBF7" />
        <circle cx="654" cy="430" r="6" fill="#FCFBF7" />
        <circle cx="690" cy="430" r="6" fill="#FCFBF7" />
        <path d="M618 404c14 0 16 10 22 12" strokeOpacity="0.6" />
        <text x="572" y="372" {...text("ev")}>EV charging</text>
      </g>
      <SchematicLink d="M434 474h26v12h118v-56" hot={hot("ev")} on={on("ev")} />
    </svg>
  );
}
