"use client";

import dynamic from "next/dynamic";
import { candidateWindow, flexData } from "./flexibility-data";

// Recharts loads only where this chart is used.
const Inner = dynamic(() => import("./FlexibilityBoundaryChartInner"), {
  ssr: false,
  loading: () => <div className="h-full w-full bg-forest/[0.03]" />,
});

type Props = { className?: string; title?: string };

/**
 * Interactive component 3 / DGM-05 — flexibility boundary chart. Expected load, the flexible
 * envelope around it, and the candidate window. Legend, tooltip and a table view are included.
 * Always labelled as an illustrative scenario.
 */
export function FlexibilityBoundaryChart({ className, title = "Flexible envelope for a warm weekday" }: Props) {
  return (
    <figure className={className}>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <span className="font-medium text-forest">{title}</span>
        <span className="font-mono text-[12px] text-mineral-ink">DGM-05 · Illustrative scenario — not measured data</span>
      </figcaption>
      <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-[14px] text-forest" aria-label="Legend">
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-0.5 w-5 bg-forest" /> Expected load
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-5 border border-moss/60 bg-moss/25" /> Flexible envelope
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden className="h-3 w-5 border border-dashed border-copper bg-copper/10" /> Candidate window {candidateWindow.from}–{candidateWindow.to}
        </li>
      </ul>
      <div
        className="mt-4 h-[300px] sm:h-[360px]"
        role="img"
        aria-label="Chart: expected building load rises from about 420 kW at 06:00 to about 1,260 kW in late afternoon. The flexible envelope allows up to about 240 kW of reduction around 16:00 to 18:00, the candidate window. Confidence falls from 95% in the morning to about 82% by evening."
      >
        <Inner />
      </div>
      <details className="mt-3 border-t border-forest/15 pt-3 text-[14px]">
        <summary className="cursor-pointer font-mono text-[12px] text-mineral-ink hover:text-forest">View the data as a table</summary>
        <div className="mt-3 max-h-72 overflow-auto">
          <table className="w-full text-left font-mono text-[12.5px] tabular">
            <thead className="sticky top-0 bg-paper text-mineral-ink">
              <tr>
                <th className="py-1 pr-3 font-normal">Time</th>
                <th className="py-1 pr-3 font-normal">Expected (kW)</th>
                <th className="py-1 pr-3 font-normal">Lower (kW)</th>
                <th className="py-1 pr-3 font-normal">Upper (kW)</th>
                <th className="py-1 font-normal">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {flexData.map((d) => (
                <tr key={d.t} className="border-t border-forest/10">
                  <td className="py-1 pr-3">{d.t}</td>
                  <td className="pr-3">{d.expected}</td>
                  <td className="pr-3">{d.lower}</td>
                  <td className="pr-3">{d.upper}</td>
                  <td>{d.confidence}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </figure>
  );
}
