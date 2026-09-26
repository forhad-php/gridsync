"use client";

import { Area, CartesianGrid, ComposedChart, Line, ReferenceArea, ResponsiveContainer, Tooltip, XAxis, YAxis, type TooltipProps } from "recharts";
import { candidateWindow, flexData, type FlexPoint } from "./flexibility-data";

const INK = "#24332E";
const MOSS = "#788F72";
const COPPER = "#B96F45";
const AXIS = "#56615C";
const MONO = "var(--font-mono), monospace";

function Tip({ active, payload }: TooltipProps<number, string>) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as FlexPoint;
  return (
    <div className="border border-forest/20 bg-paper-white px-3 py-2.5 text-[13px] text-ink">
      <p className="font-mono text-[12px] text-mineral-ink">{p.t}</p>
      <dl className="mt-1.5 grid grid-cols-[auto_auto] gap-x-5 gap-y-0.5 tabular">
        <dt>Expected load</dt>
        <dd className="text-right">{p.expected.toLocaleString("en-GB")} kW</dd>
        <dt>Flexible range</dt>
        <dd className="text-right">
          {p.lower.toLocaleString("en-GB")}–{p.upper.toLocaleString("en-GB")} kW
        </dd>
        <dt>Confidence</dt>
        <dd className="text-right">{p.confidence}%</dd>
      </dl>
    </div>
  );
}

export default function FlexibilityBoundaryChartInner() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <ComposedChart data={flexData} margin={{ top: 24, right: 22, bottom: 4, left: 0 }}>
        <CartesianGrid vertical={false} stroke={INK} strokeOpacity={0.1} />
        <XAxis
          dataKey="t"
          interval={3}
          tick={{ fill: AXIS, fontSize: 11, fontFamily: MONO }}
          tickLine={false}
          axisLine={{ stroke: INK, strokeOpacity: 0.4 }}
        />
        <YAxis
          width={66}
          domain={[0, 1600]}
          ticks={[0, 400, 800, 1200, 1600]}
          tickFormatter={(v: number) => `${v / 1000 >= 1 ? (v / 1000).toFixed(1) + " MW" : v + " kW"}`}
          tick={{ fill: AXIS, fontSize: 11, fontFamily: MONO }}
          tickLine={false}
          axisLine={false}
        />
        <ReferenceArea
          x1={candidateWindow.from}
          x2={candidateWindow.to}
          fill={COPPER}
          fillOpacity={0.08}
          stroke={COPPER}
          strokeDasharray="3 3"
          label={{ value: "Candidate window", position: "insideTop", fill: "#9A5530", fontSize: 11, fontFamily: MONO }}
        />
        <Area dataKey="band" type="monotone" stroke={MOSS} strokeOpacity={0.6} strokeWidth={1} fill={MOSS} fillOpacity={0.22} isAnimationActive={false} activeDot={false} />
        <Line dataKey="expected" type="monotone" stroke={INK} strokeWidth={2} dot={false} activeDot={{ r: 4, fill: INK, stroke: "#FCFBF7", strokeWidth: 2 }} isAnimationActive={false} />
        <Tooltip content={<Tip />} cursor={{ stroke: INK, strokeOpacity: 0.3 }} isAnimationActive={false} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
