import { COPPER, INK, MONO, MOSS, MUTED, Plate, SIGNAL } from "./shared";

/** Cold room section with product temperature band, and a strip of compressor and defrost cycles. */
export function ColdRoom() {
  const x = (h: number) => 180 + (h / 8) * 280; // 8-hour strip
  const temp: [number, number][] = [
    [0, -21], [1, -21.4], [1.5, -21.8], [2, -21.2], [2.5, -20.4], [3, -19.8], [3.5, -19.5], [4, -20.3], [4.5, -21], [5, -20.6], [5.5, -19.4], [6, -20.8], [7, -21.3], [8, -21],
  ];
  const y = (t: number) => 60 + ((-17 - t) / 6) * 110; // −17 °C → 60, −23 °C → 170
  const d = temp.map(([h, t], i) => `${i ? "L" : "M"}${x(h).toFixed(1)} ${y(t).toFixed(1)}`).join(" ");
  return (
    <Plate label="Cold storage: product must stay at or below minus 18 °C. The room is pre-cooled before the event, compressors are paused during it, and the temperature rises to about minus 19.5 °C before cooling resumes. A defrost cycle is never moved into the event window.">
      {/* Room section */}
      <rect x="20" y="60" width="130" height="110" />
      {[0, 1, 2].map((r) =>
        [0, 1, 2].map((c) => <rect key={`${r}${c}`} x={32 + c * 38} y={112 + r * 18} width="30" height="14" strokeOpacity="0.5" />),
      )}
      <path d="M150 80h10v40h-10" />
      <path d="M40 60v-14h60v14" strokeOpacity="0.6" />
      <text x="20" y="190" fill={MUTED} {...MONO} stroke="none">
        product ≤ −18 °C
      </text>
      {/* Band */}
      <rect x={x(0)} y={y(-18)} width={x(8) - x(0)} height={y(-23) - y(-18)} fill={MOSS} fillOpacity="0.15" stroke="none" />
      <path d={`M${x(0)} ${y(-18)}H${x(8)}`} stroke={SIGNAL} strokeWidth="1.4" />
      <text x={x(8)} y={y(-18) - 6} textAnchor="end" fill="#7A5C0C" {...MONO} stroke="none">
        limit −18 °C
      </text>
      <path d={d} strokeWidth="1.6" />
      {/* event window */}
      <path d={`M${x(2)} 40V250M${x(3.5)} 40V250`} stroke={COPPER} strokeDasharray="3 3" />
      <text x={x(2) + 4} y="50" fill="#9A5530" {...MONO} stroke="none">
        event
      </text>
      {/* compressor strip */}
      <text x="20" y="224" fill={INK} {...MONO} stroke="none">
        compressor
      </text>
      {[
        [0, 1.9],
        [3.6, 5.2],
        [6, 8],
      ].map(([a, b]) => (
        <rect key={a} x={x(a)} y="214" width={x(b) - x(a)} height="12" fill={INK} fillOpacity="0.55" stroke="none" />
      ))}
      <text x="20" y="248" fill={INK} {...MONO} stroke="none">
        defrost
      </text>
      <rect x={x(5.2)} y="238" width={x(6) - x(5.2)} height="12" fill="#FCFBF7" stroke={INK} strokeDasharray="2 2" />
      <text x={x(3.2)} y="268" fill={MUTED} {...MONO} stroke="none">
        defrost kept after the event
      </text>
      {[0, 4, 8].map((h) => (
        <text key={h} x={x(h)} y="290" textAnchor={h === 0 ? "start" : h === 8 ? "end" : "middle"} fill={MUTED} {...MONO} stroke="none">
          {h} h
        </text>
      ))}
    </Plate>
  );
}
