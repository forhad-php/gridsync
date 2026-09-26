"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { systems, findSystem, type SystemKey } from "@/content/systems";
import { cn } from "@/lib/cn";
import { BuildingSchematic } from "./BuildingSchematic";

type Props = {
  /** Subset of systems to offer as selections (defaults to all). */
  keys?: SystemKey[];
  initial?: SystemKey;
  className?: string;
};

/**
 * Interactive component 1 — building system explorer. Buttons (keyboard-first) select a system;
 * the schematic highlights it and the panel lists the constraints GridSync must respect.
 */
export function SystemExplorer({ keys = ["hvac", "lighting", "ev", "meters", "occupancy", "bms", "weather", "tariffs", "signal"], initial = "hvac", className }: Props) {
  const [active, setActive] = useState<SystemKey>(initial);
  const sys = findSystem(active);
  const list = systems.filter((s) => keys.includes(s.key));

  return (
    <div className={cn("grid gap-10 lg:grid-cols-12", className)}>
      <div className="lg:col-span-7">
        <div className="drafting border border-forest/15 bg-paper-white/40 p-3 sm:p-6">
          <BuildingSchematic
            active={[active]}
            onSelect={(k) => keys.includes(k) && setActive(k)}
            label={`Building schematic with ${sys.name} highlighted.`}
          />
        </div>
        <p className="mt-3 font-mono text-[12px] text-mineral-ink">DGM-01 · Schematic, not to scale. Select a system to see its operating constraints.</p>
      </div>

      <div className="lg:col-span-5">
        <div role="group" aria-label="Select a building system" className="flex flex-wrap gap-2">
          {list.map((s) => (
            <button
              key={s.key}
              type="button"
              aria-pressed={active === s.key}
              onClick={() => setActive(s.key)}
              className={cn(
                "rounded-[2px] border px-3 py-1.5 text-[14px] transition-colors",
                active === s.key ? "border-forest bg-forest text-paper" : "border-forest/25 text-forest hover:border-forest",
              )}
            >
              {s.name.replace(" and thermal plant", "").replace("Building management system", "BMS").replace("Utility or aggregator signal", "Grid signal")}
            </button>
          ))}
        </div>

        <div aria-live="polite" className="mt-8 border-t border-forest/15 pt-8">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={active} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
              <h3 className="h-sub">{sys.name}</h3>
              <p className="mt-3 text-forest/85">{sys.role}</p>
              <h4 className="label mt-8">Operating constraints</h4>
              <ul className="mt-3 divide-y divide-forest/10 border-y border-forest/10">
                {sys.constraints.map((c) => (
                  <li key={c} className="flex gap-3 py-3 text-[16px]">
                    <span aria-hidden className="mt-[0.6em] h-px w-3 shrink-0 bg-copper" />
                    {c}
                  </li>
                ))}
              </ul>
              <dl className="mt-6 grid grid-cols-[5.5rem_1fr] gap-x-4 gap-y-3 text-[15px]">
                <dt className="label pt-0.5">Reads</dt>
                <dd>{sys.reads}</dd>
                <dt className="label pt-0.5">Writes</dt>
                <dd>{sys.writes}</dd>
              </dl>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
