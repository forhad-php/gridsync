"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import { AvailabilityTag } from "../ui/Status";
import { inputs, outputs, processing, type Source } from "./integration-data";

function Item({ s, active, onSelect }: { s: Source; active: boolean; onSelect: (s: Source) => void }) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={active}
        onClick={() => onSelect(s)}
        className={cn(
          "flex w-full items-center justify-between gap-3 border-b border-forest/10 px-3 py-2.5 text-left text-[15px] transition-colors",
          active ? "bg-forest text-paper" : "text-forest hover:bg-paper-white",
        )}
      >
        <span>{s.name}</span>
        <span aria-hidden className={cn("font-mono text-[12px]", active ? "text-copper-light" : "text-mineral-ink")}>
          {active ? "●" : "›"}
        </span>
      </button>
    </li>
  );
}

/**
 * Interactive component 5 / DGM-07 — integration map. Inputs and outputs are buttons; selecting
 * one highlights the processing steps it takes part in and opens its detail below.
 */
export function IntegrationMap() {
  const [sel, setSel] = useState<Source>(inputs[0]);
  const all = [...inputs, ...outputs];
  const isOutput = outputs.some((o) => o.id === sel.id);

  return (
    <div>
      <div className="grid gap-10 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-0">
        <div>
          <h3 className="label border-b border-forest/30 pb-3">Inputs · read</h3>
          <ul aria-label="Input sources">
            {inputs.map((s) => (
              <Item key={s.id} s={s} active={sel.id === s.id} onSelect={setSel} />
            ))}
          </ul>
        </div>

        <Arrow />

        <div>
          <h3 className="label border-b border-forest/30 pb-3">GridSync processing</h3>
          <ol className="drafting border-x border-b border-forest/15 bg-paper-white/50" aria-label="Processing steps">
            {processing.map((p, i) => {
              const on = sel.steps.includes(p.id);
              return (
                <li key={p.id} className={cn("border-b border-l-[3px] border-b-forest/10 px-4 py-3 transition-colors last:border-b-0", on ? "border-l-copper bg-paper-white" : "border-l-transparent")}>
                  <p className="flex items-baseline gap-3">
                    <span className={cn("font-mono text-[12px]", on ? "text-copper-ink" : "text-mineral-ink")}>0{i + 1}</span>
                    <span className={cn("text-[15px]", on ? "font-medium text-forest" : "text-forest")}>{p.name}</span>
                    {on && <span className="sr-only">(used by {sel.name})</span>}
                  </p>
                  <p className="mt-1 pl-7 text-[13.5px] leading-snug text-mineral-ink">{p.body}</p>
                </li>
              );
            })}
          </ol>
        </div>

        <Arrow />

        <div>
          <h3 className="label border-b border-forest/30 pb-3">Outputs · write and report</h3>
          <ul aria-label="Outputs">
            {outputs.map((s) => (
              <Item key={s.id} s={s} active={sel.id === s.id} onSelect={setSel} />
            ))}
          </ul>
        </div>
      </div>

      <div aria-live="polite" className="mt-10 grid gap-8 border-y border-forest/15 bg-paper-white px-5 py-8 sm:px-8 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label">{isOutput ? "Output" : "Input"} · {all.findIndex((a) => a.id === sel.id) + 1} of {all.length}</p>
          <h3 className="h-sub mt-2">{sel.name}</h3>
          <AvailabilityTag status={sel.status} className="mt-4" />
        </div>
        <dl className="grid gap-6 sm:grid-cols-2 lg:col-span-8">
          <div className="border-t border-forest/15 pt-3 sm:col-span-2">
            <dt className="label">{isOutput ? "What it contains" : "What is used"}</dt>
            <dd className="mt-1.5 text-forest">{sel.used}</dd>
          </div>
          <div className="border-t border-forest/15 pt-3">
            <dt className="label">How often</dt>
            <dd className="mt-1.5 text-forest">{sel.frequency}</dd>
          </div>
          <div className="border-t border-forest/15 pt-3">
            <dt className="label">Processing steps</dt>
            <dd className="mt-1.5 text-forest">{processing.filter((p) => sel.steps.includes(p.id)).map((p) => p.name).join(", ")}</dd>
          </div>
          {sel.standards && (
            <div className="border-t border-forest/15 pt-3 sm:col-span-2">
              <dt className="label">Connection routes</dt>
              <dd className="mt-2">
                <ul className="space-y-2">
                  {sel.standards.map((st) => (
                    <li key={st.name} className="flex flex-wrap items-center justify-between gap-2 text-[15px] text-forest">
                      {st.name}
                      <AvailabilityTag status={st.status} />
                    </li>
                  ))}
                </ul>
              </dd>
            </div>
          )}
        </dl>
      </div>
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden className="hidden items-center justify-center px-4 lg:flex">
      <svg viewBox="0 0 40 12" className="w-10">
        <path d="M0 6h34" stroke="#24332E" strokeOpacity="0.5" strokeDasharray="3 3" />
        <path d="M32 2l6 4-6 4" fill="none" stroke="#24332E" strokeOpacity="0.6" />
      </svg>
    </div>
  );
}
