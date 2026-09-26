"use client";

import { motion } from "framer-motion";

/** DGM-02 — four small figures for Observe, Forecast, Coordinate and Verify. */

const INK = "#24332E";
const COPPER = "#B96F45";
const MOSS = "#788F72";
const MONO = { fontFamily: "var(--font-mono), monospace", fontSize: 9, fill: "#56615C" };

const draw = (delay = 0) => ({
  initial: { pathLength: 0 },
  whileInView: { pathLength: 1 },
  viewport: { once: true },
  transition: { duration: 1.2, delay, ease: [0.2, 0, 0, 1] as const },
});

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 220 120" className="h-auto w-full" role="img" aria-label={label}>
      <path d="M0 119.5h220" stroke={INK} strokeOpacity="0.2" />
      {children}
    </svg>
  );
}

export function ObserveFigure() {
  const streams = [20, 40, 60, 80, 100];
  return (
    <Frame label="Several data streams converging into one view, with one gap flagged.">
      {streams.map((y, i) => (
        <motion.path
          key={y}
          d={`M8 ${y} C80 ${y}, 110 60, 170 60`}
          fill="none"
          stroke={INK}
          strokeOpacity="0.55"
          strokeDasharray={i === 3 ? "30 8 60 200" : undefined}
          {...draw(i * 0.08)}
        />
      ))}
      <rect x="170" y="46" width="40" height="28" fill="#FCFBF7" stroke={INK} />
      <path d="M178 56h24M178 64h16" stroke={INK} strokeOpacity="0.5" />
      <text x="40" y="76" {...MONO} fill="#7A5C0C">
        ▲ gap
      </text>
    </Frame>
  );
}

export function ForecastFigure() {
  return (
    <Frame label="A baseline load curve inside a flexible envelope, with a candidate window marked.">
      <path d="M8 80 C50 78 70 40 110 34 S170 60 212 70 L212 88 C170 80 150 60 110 58 S50 100 8 96Z" fill={MOSS} fillOpacity="0.22" />
      <motion.path d="M8 88 C50 88 70 46 110 46 S170 68 212 78" fill="none" stroke={INK} strokeWidth="1.5" {...draw()} />
      <path d="M96 14v96M140 14v96" stroke={COPPER} strokeDasharray="3 3" />
      <text x="100" y="12" {...MONO} fill="#9A5530">
        window
      </text>
    </Frame>
  );
}

export function CoordinateFigure() {
  const rows = [
    { y: 26, x: 70, w: 90, ok: true },
    { y: 50, x: 70, w: 90, ok: true },
    { y: 74, x: 96, w: 64, ok: false },
    { y: 98, x: 70, w: 90, ok: true },
  ];
  return (
    <Frame label="An event plan with four assets; three approved and one awaiting review.">
      {rows.map((r, i) => (
        <g key={r.y}>
          <path d={`M8 ${r.y}h40`} stroke={INK} strokeOpacity="0.35" />
          <motion.rect
            x={r.x}
            y={r.y - 7}
            height="14"
            fill={r.ok ? "#C7D2C0" : "#FCFBF7"}
            stroke={r.ok ? INK : COPPER}
            strokeDasharray={r.ok ? undefined : "3 2"}
            initial={{ width: 0 }}
            whileInView={{ width: r.w }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 * i }}
          />
          <text x="172" y={r.y + 3} {...MONO} fill={r.ok ? "#556B50" : "#9A5530"}>
            {r.ok ? "● ok" : "○ review"}
          </text>
        </g>
      ))}
    </Frame>
  );
}

export function VerifyFigure() {
  return (
    <Frame label="Baseline and observed load during an event, with the measured difference shaded.">
      <path d="M70 40 C100 40 130 42 160 44 L160 82 C130 80 100 78 70 76Z" fill={COPPER} fillOpacity="0.14" />
      <motion.path d="M8 44 C40 42 60 40 110 40 S180 46 212 48" fill="none" stroke={INK} strokeDasharray="4 3" {...draw()} />
      <motion.path d="M8 46 C40 44 60 44 70 60 S100 78 130 78 S150 76 160 60 S190 50 212 50" fill="none" stroke={INK} strokeWidth="1.6" {...draw(0.3)} />
      <text x="170" y="38" {...MONO}>
        baseline
      </text>
      <text x="96" y="100" {...MONO}>
        observed
      </text>
    </Frame>
  );
}
