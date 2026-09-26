"use client";

import { useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { OpStatus, type OpState } from "../ui/Status";

type Phase = {
  key: string;
  label: string;
  title: string;
  body: string;
  snapshot: { heading: string; rows: [string, string, OpState][] };
};

const phases: Phase[] = [
  {
    key: "before",
    label: "Before",
    title: "Decide with the building in view.",
    body: "The day before, the question is not how much the grid wants but what the building can give without anyone noticing. Operators see the window, each participating system, the limits that bound it and the confidence of the estimate—then approve, adjust or decline.",
    snapshot: {
      heading: "Plan review · D−1 14:30",
      rows: [
        ["Level 2–4 HVAC", "Pre-cool 13:30, band 21–24 °C", "ok"],
        ["EV charging", "Defer 6 sessions to 18:00", "ok"],
        ["Lighting, Level 1", "Dim 20% in daylight zones", "ok"],
        ["Meeting zones", "Excluded · booked", "excluded"],
        ["Plan", "Awaiting approval", "pending"],
      ],
    },
  },
  {
    key: "during",
    label: "During",
    title: "Follow delivery against the limits, not only the target.",
    body: "In the window, each asset is shown against its own boundary. If a zone approaches its comfort limit it steps out and the operator sees why. The plan adapts; the building stays inside the agreement.",
    snapshot: {
      heading: "Live · 16:47",
      rows: [
        ["Level 2 HVAC", "Zone 23.1 °C of 24.0", "ok"],
        ["Level 4 HVAC", "Zone 23.8 °C · near limit", "watch"],
        ["EV charging", "Sessions held until 18:00", "ok"],
        ["Level 3 east", "Stepped out 16:41 · limit", "constrained"],
        ["Operator", "No intervention", "ok"],
      ],
    },
  },
  {
    key: "after",
    label: "After",
    title: "Explain the result months later.",
    body: "Once final interval data arrives, the measured response is compared with the programme's baseline and with the plan. Deviations are attached to the asset and the reason, so the record can answer questions from a tenant, an auditor or a programme without anyone reconstructing the day.",
    snapshot: {
      heading: "Event record · D+1",
      rows: [
        ["Baseline method", "As programme rules", "ok"],
        ["Delivered vs plan", "Below plan · one step-out", "watch"],
        ["Deviation", "Level 3 east, 16:41, comfort limit", "constrained"],
        ["Approvals", "1 approver, 1 plan version", "ok"],
        ["Export", "Report ready", "ok"],
      ],
    },
  },
];

/** Interactive component 4 — before / during / after comparison with a proper tablist. */
export function EventPhaseTabs() {
  const [sel, setSel] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const id = useId();
  const p = phases[sel];

  const onKey = (e: React.KeyboardEvent) => {
    let next = sel;
    if (e.key === "ArrowRight") next = (sel + 1) % phases.length;
    else if (e.key === "ArrowLeft") next = (sel - 1 + phases.length) % phases.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = phases.length - 1;
    else return;
    e.preventDefault();
    setSel(next);
    tabs.current[next]?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="Event phase" onKeyDown={onKey} className="flex border-b border-forest/20">
        {phases.map((ph, i) => (
          <button
            key={ph.key}
            ref={(el) => {
              tabs.current[i] = el;
            }}
            role="tab"
            id={`${id}-t${i}`}
            aria-selected={i === sel}
            aria-controls={`${id}-p${i}`}
            tabIndex={i === sel ? 0 : -1}
            onClick={() => setSel(i)}
            className={cn(
              "relative -mb-px flex-1 border-b-2 px-2 py-4 text-left text-[1.125rem] transition-colors sm:flex-none sm:px-0 sm:pr-10",
              i === sel ? "border-copper font-medium text-forest" : "border-transparent text-mineral-ink hover:text-forest",
            )}
          >
            <span className="mr-2 font-mono text-[12px] text-copper-ink">0{i + 1}</span>
            {ph.label}
            <span className="hidden sm:inline"> an event</span>
          </button>
        ))}
      </div>

      {phases.map((ph, i) => (
        <div key={ph.key} id={`${id}-p${i}`} role="tabpanel" aria-labelledby={`${id}-t${i}`} hidden={i !== sel} tabIndex={0} className="pt-10">
          {i === sel && (
            <AnimatePresence mode="wait">
              <motion.div key={p.key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-10 lg:grid-cols-12">
                <div className="lg:col-span-5">
                  <h3 className="h-sub">{p.title}</h3>
                  <p className="mt-5 text-forest/85">{p.body}</p>
                </div>
                <figure className="lg:col-span-6 lg:col-start-7">
                  <div className="border border-forest/20 bg-paper-white">
                    <p className="border-b border-forest/15 px-4 py-2.5 font-mono text-[12px] text-forest">{p.snapshot.heading}</p>
                    <ul className="divide-y divide-forest/10 px-4">
                      {p.snapshot.rows.map(([k, v, st]) => (
                        <li key={k} className="grid gap-1 py-2.5 text-[14.5px] sm:grid-cols-[10rem_1fr]">
                          <span className="text-forest">{k}</span>
                          <OpStatus state={st} className="!text-[13px]">
                            {v}
                          </OpStatus>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <figcaption className="mt-2 font-mono text-[12px] text-mineral-ink">Illustrative example — not live data.</figcaption>
                </figure>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      ))}
    </div>
  );
}
