"use client";

import { motion } from "framer-motion";

const rows: [string, string, string?][] = [
  ["Site", "Riverside Office Campus · Bldg B"],
  ["Current load", "1,240 kW", "15-min interval"],
  ["Flexible window", "16:00–18:00", "today"],
  ["Comfort boundary", "21.0–24.0 °C", "zones at 22.4 °C"],
  ["Operator status", "Awaiting review"],
];

/**
 * The hero's annotated-field-report overlay: a paper slip with a leader line to the equipment.
 * Labels appear in sequence, like readings being written down.
 */
export function FieldAnnotation() {
  return (
    <>
      {/* Leader line + target on the air-handling unit */}
      <svg className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block" viewBox="0 0 400 500" preserveAspectRatio="none" aria-hidden>
        <motion.path
          d="M120 330 L190 270 L250 270"
          fill="none"
          stroke="#17221F"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.2, 0, 0, 1] }}
        />
      </svg>
      <motion.span
        aria-hidden
        className="absolute left-[62.5%] top-[54%] hidden sm:block -ml-2 -mt-2 h-4 w-4 rounded-full border border-ink bg-paper-white/60"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.4 }}
      />

      <motion.div
        className="absolute bottom-4 left-4 right-4 border border-forest/20 bg-paper-white px-4 py-4 sm:right-auto sm:w-[19rem] lg:bottom-8 lg:left-8"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.2, 0, 0, 1] }}
      >
        <div className="flex items-baseline justify-between border-b border-forest/15 pb-2">
          <span className="font-mono text-[11px] text-forest">Field report · AHU-2</span>
          <span className="font-mono text-[11px] text-mineral-ink">14:52</span>
        </div>
        <dl className="mt-2 space-y-1.5">
          {rows.map(([k, v, note], i) => (
            <motion.div
              key={k}
              className="grid grid-cols-[7.25rem_1fr] gap-2 text-[12.5px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + i * 0.18 }}
            >
              <dt className="font-mono text-mineral-ink">{k}</dt>
              <dd className="text-ink">
                {k === "Operator status" ? (
                  <span className="inline-flex items-center gap-1.5 text-copper-ink">
                    <span aria-hidden className="h-2 w-2 rounded-full border-[1.5px] border-current" />
                    {v}
                  </span>
                ) : (
                  <span className="tabular">{v}</span>
                )}
                {note && <span className="ml-1.5 text-mineral-ink">· {note}</span>}
              </dd>
            </motion.div>
          ))}
        </dl>
        <p className="mt-3 border-t border-forest/15 pt-2 font-mono text-[10.5px] text-mineral-ink">Illustrative example — not live data.</p>
      </motion.div>
    </>
  );
}
