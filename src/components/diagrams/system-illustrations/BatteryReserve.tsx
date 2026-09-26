import { COPPER, INK, MONO, MOSS, MUTED, Plate, SIGNAL } from "./shared";

/** Battery enclosure with SoC scale, reserve band and charge/discharge limits, plus an SoC trace across a day. */
export function BatteryReserve() {
  const x = (h: number) => 180 + (h / 24) * 280;
  const y = (soc: number) => 240 - soc * 1.8; // 0% → 240, 100% → 60
  const trace: [number, number][] = [
    [0, 55], [4, 90], [6, 92], [12, 88], [16, 86], [18, 40], [19, 32], [22, 36], [24, 55],
  ];
  const d = trace.map(([h, s], i) => `${i ? "L" : "M"}${x(h).toFixed(1)} ${y(s).toFixed(1)}`).join(" ");
  return (
    <Plate label="Battery: state of charge across a day. It charges overnight at low tariff, holds, discharges during the 16:00 to 19:00 event, and never goes below a 30% reserve kept for backup. Charge and discharge are limited to 250 kW.">
      {/* Enclosure */}
      <rect x="30" y="60" width="100" height="180" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} x="42" y={72 + i * 27} width="76" height="20" strokeOpacity="0.45" />
      ))}
      <rect x="42" y={y(30)} width="76" height={240 - y(30)} fill={SIGNAL} fillOpacity="0.2" stroke="none" />
      <text x="30" y="258" fill={MUTED} {...MONO} stroke="none">
        ±250 kW · 1 MWh usable
      </text>
      {/* Chart */}
      <path d={`M180 240H460M180 60V240`} strokeOpacity="0.35" />
      <rect x={x(0)} y={y(30)} width={x(24) - x(0)} height={240 - y(30)} fill={SIGNAL} fillOpacity="0.14" stroke="none" />
      <path d={`M${x(0)} ${y(30)}H${x(24)}`} stroke={SIGNAL} strokeWidth="1.4" />
      <text x={x(24)} y={y(30) - 6} textAnchor="end" fill="#7A5C0C" {...MONO} stroke="none">
        backup reserve 30%
      </text>
      <path d={`M${x(16)} 60V240M${x(19)} 60V240`} stroke={COPPER} strokeDasharray="3 3" />
      <text x={x(16) + 4} y="72" fill="#9A5530" {...MONO} stroke="none">
        event
      </text>
      <path d={d} strokeWidth="1.8" />
      <text x={x(1)} y={y(92) - 8} fill={MOSS} {...MONO} stroke="none">
        off-peak charge
      </text>
      {[0, 6, 12, 18, 24].map((h) => (
        <text key={h} x={x(h)} y="258" textAnchor="middle" fill={MUTED} {...MONO} stroke="none">
          {String(h % 24).padStart(2, "0")}:00
        </text>
      ))}
      {[30, 60, 90].map((s) => (
        <text key={s} x="174" y={y(s) + 4} textAnchor="end" fill={MUTED} {...MONO} stroke="none">
          {s}%
        </text>
      ))}
      <text x="180" y="286" fill={INK} {...MONO} stroke="none">
        tariff context: off-peak 00–06 · peak 16–19
      </text>
    </Plate>
  );
}
