/** Shared drawing primitives for the system illustrations. */
export const INK = "#24332E";
export const COPPER = "#B96F45";
export const MOSS = "#788F72";
export const SIGNAL = "#D9B84C";
export const MUTED = "#56615C";
export const MONO = { fontFamily: "var(--font-mono), monospace", fontSize: 10.5 } as const;

/** Annotation: a dot on the subject, a leader line, and a mono label. */
export function Callout({ x, y, tx, ty, children, anchor = "start", tone = INK }: { x: number; y: number; tx: number; ty: number; children: React.ReactNode; anchor?: "start" | "end"; tone?: string }) {
  const lx = anchor === "start" ? tx - 4 : tx + 4;
  return (
    <g>
      <circle cx={x} cy={y} r="2.5" fill={tone} />
      <path d={`M${x} ${y}L${lx} ${ty - 4}`} stroke={tone} strokeOpacity="0.6" fill="none" />
      <text x={tx} y={ty} textAnchor={anchor} fill={tone === INK ? MUTED : tone} {...MONO}>
        {children}
      </text>
    </g>
  );
}

export function Plate({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <svg viewBox="0 0 480 300" className="h-auto w-full" role="img" aria-label={label}>
      <g fill="none" stroke={INK} strokeWidth="1.1" strokeLinejoin="round">
        {children}
      </g>
    </svg>
  );
}
