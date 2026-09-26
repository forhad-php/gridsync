import type { DiagramSystem } from "@/content/use-cases/details";

type Props = {
  site: string;
  inputs: string[];
  systems: DiagramSystem[];
  /** Accessible summary; defaults to one generated from the data. */
  label?: string;
  className?: string;
};

const INK = "#24332E";
const COPPER = "#B96F45";
const MONO = "var(--font-mono), monospace";
const ROW = 74;

const stateText: Record<DiagramSystem["state"], string> = {
  participates: "participates",
  limited: "within limits",
  excluded: "excluded",
};

/**
 * Data-driven building-system diagram for a use case: inputs → site → participating systems,
 * each annotated with the constraint that bounds it. Line style encodes state (solid, dashed,
 * dotted) and every state is also written out, so meaning never depends on colour.
 */
export function UseCaseDiagram({ site, inputs, systems, label, className }: Props) {
  const rows = Math.max(systems.length, inputs.length);
  const h = rows * ROW + 40;
  const mid = h / 2;
  const sysY = (i: number) => 20 + i * ROW + (rows - systems.length) * (ROW / 2);
  const inY = (i: number) => 20 + i * ROW + (rows - inputs.length) * (ROW / 2) + 10;

  const summary =
    label ??
    `${site}: inputs ${inputs.join(", ")}. Systems: ${systems.map((s) => `${s.name} (${stateText[s.state]}, ${s.constraint})`).join("; ")}.`;

  return (
    <svg viewBox={`0 0 640 ${h}`} className={className ?? "h-auto w-full"} role="img" aria-label={summary}>
      {/* Inputs */}
      {inputs.map((name, i) => {
        const y = inY(i);
        return (
          <g key={name}>
            <rect x="8" y={y} width="132" height="30" fill="#FCFBF7" stroke={INK} strokeOpacity="0.45" strokeDasharray="3 3" />
            <text x="18" y={y + 19} fill={INK} fontFamily={MONO} fontSize="11">
              {name}
            </text>
            <path d={`M140 ${y + 15} C170 ${y + 15} 168 ${mid} 190 ${mid}`} fill="none" stroke={INK} strokeOpacity="0.4" strokeDasharray="3 3" />
          </g>
        );
      })}

      {/* Site node */}
      <rect x="190" y={mid - 30} width="178" height="60" fill="#17221F" />
      <g stroke="#F3F0E8" strokeWidth="1.8" strokeLinecap="square" fill="none" transform={`translate(202 ${mid - 9}) scale(0.75)`}>
        <path d="M8 0v24M0 7h14M8 17h14" />
      </g>
      <text x="224" y={mid + 4} fill="#F3F0E8" fontSize="12.5" fontWeight="500">
        {site}
      </text>

      {/* Systems */}
      {systems.map((s, i) => {
        const y = sysY(i);
        const cy = y + 28;
        const dash = s.state === "participates" ? undefined : s.state === "limited" ? "5 3" : "1 4";
        const stroke = s.state === "participates" ? COPPER : INK;
        return (
          <g key={s.name}>
            <path
              d={`M368 ${mid} C382 ${mid} 380 ${cy} 392 ${cy}`}
              fill="none"
              stroke={stroke}
              strokeOpacity={s.state === "excluded" ? 0.45 : 1}
              strokeWidth={s.state === "participates" ? 1.5 : 1}
              strokeDasharray={dash}
            />
            <rect
              x="392"
              y={y}
              width="240"
              height="58"
              fill={s.state === "excluded" ? "none" : "#FCFBF7"}
              stroke={INK}
              strokeOpacity={s.state === "excluded" ? 0.35 : 0.6}
              strokeDasharray={s.state === "excluded" ? "2 3" : undefined}
            />
            <text x="402" y={y + 18} fill={INK} fillOpacity={s.state === "excluded" ? 0.6 : 1} fontSize="12.5">
              {s.name}
            </text>
            <text x="402" y={y + 34} fill="#56615C" fontFamily={MONO} fontSize="10.5">
              {s.constraint}
            </text>
            <text x="402" y={y + 49} fill={s.state === "participates" ? "#9A5530" : s.state === "limited" ? "#7A5C0C" : "#56615C"} fontFamily={MONO} fontSize="10">
              {s.state === "participates" ? "● " : s.state === "limited" ? "◐ " : "— "}
              {stateText[s.state]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** HTML legend to sit under a UseCaseDiagram. */
export function UseCaseDiagramLegend() {
  return (
    <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1.5 font-mono text-[11.5px] text-mineral-ink" aria-label="Diagram legend">
      <li className="flex items-center gap-2">
        <span aria-hidden className="h-[1.5px] w-6 bg-copper" /> participates
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="w-6 border-t border-dashed border-forest" /> within limits
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="w-6 border-t border-dotted border-forest/60" /> excluded
      </li>
      <li className="flex items-center gap-2">
        <span aria-hidden className="h-3 w-5 border border-dashed border-forest/50" /> input
      </li>
    </ul>
  );
}
