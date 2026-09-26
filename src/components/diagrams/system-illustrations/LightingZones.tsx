import { Callout, COPPER, INK, MONO, MUTED, Plate, SIGNAL } from "./shared";

/** Floor plan with lighting zones: perimeter daylight zones, occupied and unoccupied core zones, and fixed emergency fittings. */
export function LightingZones() {
  const fittings: [number, number][] = [];
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) fittings.push([110 + c * 44, 70 + r * 44]);
  const level = (x: number, y: number) => {
    if (x < 150) return 0.3; // perimeter, daylight
    if (y > 170 && x > 300) return 0; // unoccupied
    return 0.85;
  };
  return (
    <Plate label="Lighting plan: perimeter zone dimmed to 30% using daylight, core zone at 85% while occupied, one unoccupied zone off, emergency fittings excluded from control.">
      {/* windows side with daylight gradient drawn as stepped hatching */}
      <rect x="80" y="40" width="340" height="190" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <path key={i} d={`M${84 + i * 10} 44v182`} stroke={SIGNAL} strokeOpacity={0.35 - i * 0.05} strokeWidth="4" />
      ))}
      <path d="M72 50v170" strokeWidth="3" strokeOpacity="0.4" />
      <path d="M150 40v190M300 170h120v60" strokeDasharray="3 3" strokeOpacity="0.5" />
      {fittings.map(([x, y]) => {
        const l = level(x, y);
        const emergency = (x === 110 && y === 70) || (x === 374 && y === 202);
        return (
          <g key={`${x}-${y}`}>
            <rect x={x - 12} y={y - 3} width="24" height="6" fill={emergency ? "#FCFBF7" : SIGNAL} fillOpacity={emergency ? 1 : l * 0.7} stroke={emergency ? COPPER : INK} strokeOpacity="0.7" />
            {emergency && <path d={`M${x - 12} ${y - 3}l24 6`} stroke={COPPER} />}
          </g>
        );
      })}
      <g stroke="none">
        <text x="80" y="250" fill={MUTED} {...MONO}>
          daylight zone · 30%
        </text>
        <text x="212" y="250" fill={MUTED} {...MONO}>
          occupied core · 85%
        </text>
        <text x="342" y="250" fill={MUTED} {...MONO}>
          unoccupied · off
        </text>
        <Callout x={110} y={70} tx={20} ty={24} tone={COPPER}>
          emergency fitting: never controlled
        </Callout>
        <Callout x={330} y={114} tx={470} ty={24} anchor="end">
          dimming floor 40% when occupied
        </Callout>
        <text x="20" y="286" fill={INK} {...MONO}>
          window ← daylight sensor reads 620 lux at perimeter
        </text>
      </g>
    </Plate>
  );
}
