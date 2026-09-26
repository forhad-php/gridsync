import { COPPER, INK, MONO, MOSS, MUTED, Plate, SIGNAL } from "./shared";

/** Meter with 15-minute interval bars: one missing interval, one estimated, and a latency marker for data not yet delivered. */
export function MeterIntervals() {
  const values = [62, 64, 66, 70, 74, 71, 0, 69, 72, 68, 64, 60, 58, 57, 55, 54];
  const w = 16;
  const bx = (i: number) => 170 + i * (w + 2);
  const h = (v: number) => v * 1.9;
  return (
    <Plate label="Interval meter data: sixteen 15-minute readings. One interval is missing and flagged, one is estimated and marked, and the last three intervals have not yet arrived because of a two-hour delivery delay.">
      {/* Meter */}
      <rect x="30" y="70" width="100" height="150" />
      <rect x="44" y="86" width="72" height="34" />
      <text x="50" y="108" fill={INK} {...MONO} stroke="none">
        1 240 kW
      </text>
      <circle cx="80" cy="160" r="16" />
      <path d="M80 160l9-9" />
      <path d="M60 220v30M100 220v30" strokeOpacity="0.5" />
      <text x="30" y="270" fill={MUTED} {...MONO} stroke="none">
        MTR-01 · 15 min
      </text>
      {/* bars */}
      <path d="M166 240H470" strokeOpacity="0.4" />
      {values.map((v, i) => {
        const pending = i >= 13;
        const missing = v === 0;
        const estimated = i === 9;
        if (missing)
          return (
            <g key={i}>
              <rect x={bx(i)} y={240 - h(68)} width={w} height={h(68)} fill="none" stroke={SIGNAL} strokeDasharray="2 2" />
              <text x={bx(i) + w / 2} y={240 - h(68) - 6} textAnchor="middle" fill="#7A5C0C" {...MONO} stroke="none">
                ▲
              </text>
            </g>
          );
        return (
          <rect
            key={i}
            x={bx(i)}
            y={240 - h(v)}
            width={w}
            height={h(v)}
            fill={pending ? "none" : estimated ? "#FCFBF7" : MOSS}
            fillOpacity={pending ? 0 : estimated ? 1 : 0.55}
            stroke={pending ? INK : estimated ? INK : "none"}
            strokeOpacity={pending ? 0.3 : 0.7}
            strokeDasharray={pending ? "2 3" : undefined}
          />
        );
      })}
      <path d={`M${bx(13) - 1} 70V250`} stroke={COPPER} strokeDasharray="3 3" />
      <text x={bx(13) + 2} y="62" fill="#9A5530" {...MONO} stroke="none">
        now − 2 h latency
      </text>
      <g stroke="none">
        <text x="170" y="272" fill={MUTED} {...MONO}>
          ▲ missing (flagged, not filled)
        </text>
        <text x="170" y="288" fill={MUTED} {...MONO}>
          □ estimated read   ┆ not yet delivered
        </text>
      </g>
    </Plate>
  );
}
