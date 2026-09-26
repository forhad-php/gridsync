import { COPPER, INK, MONO, MOSS, MUTED, Plate, SIGNAL } from "./shared";

/** Charger elevation plus a per-vehicle timeline: plug-in, deferred charging, departure deadline and required SoC. */
export function ChargerTimeline() {
  const x = (h: number) => 150 + ((h < 12 ? h + 24 : h) - 16) * 18; // 16:00 → 08:00
  const vans = [
    { name: "Van 03 · priority", arrive: 17, depart: 6, need: 90, now: 34, charge: [[17, 19]] },
    { name: "Van 07", arrive: 18, depart: 6, need: 80, now: 52, charge: [[21, 1]] },
    { name: "Van 11", arrive: 19, depart: 7, need: 80, now: 61, charge: [[23, 2]] },
  ];
  return (
    <Plate label="EV charging: three vans with arrival, departure deadline and required state of charge. The priority van charges on arrival; the others are deferred past the 16:00 to 20:00 peak and finish before departure. Site limit is shared with the building.">
      {/* Charger elevation */}
      <rect x="30" y="60" width="44" height="130" />
      <rect x="38" y="72" width="28" height="30" />
      <path d="M74 150c30 0 34 40 30 60" />
      <path d="M20 190h70" strokeOpacity="0.4" />
      <text x="30" y="210" fill={MUTED} {...MONO} stroke="none">
        22 kW max
      </text>
      {/* peak shading */}
      <rect x={x(16)} y="36" width={x(20) - x(16)} height="210" fill={SIGNAL} fillOpacity="0.12" stroke="none" />
      <text x={x(16) + 4} y="50" fill="#7A5C0C" {...MONO} stroke="none">
        site peak 16–20
      </text>
      {/* axis */}
      <path d={`M150 250H${x(8)}`} strokeOpacity="0.4" />
      {[16, 20, 0, 4, 8].map((h) => (
        <text key={h} x={x(h)} y="266" textAnchor="middle" fill={MUTED} {...MONO} stroke="none">
          {String(h).padStart(2, "0")}:00
        </text>
      ))}
      {vans.map((v, i) => {
        const y = 90 + i * 55;
        return (
          <g key={v.name}>
            <text x="150" y={y - 12} fill={INK} {...MONO} stroke="none">
              {v.name} · {v.now}% → {v.need}%
            </text>
            <path d={`M${x(v.arrive)} ${y}H${x(v.depart)}`} strokeOpacity="0.25" strokeWidth="8" />
            {v.charge.map(([a, b]) => (
              <rect key={a} x={x(a)} y={y - 4} width={x(b) - x(a)} height="8" fill={MOSS} fillOpacity="0.8" stroke="none" />
            ))}
            <path d={`M${x(v.depart)} ${y - 12}v24`} stroke={COPPER} strokeWidth="1.6" />
            <text x={x(v.depart) + 5} y={y + 4} fill="#9A5530" {...MONO} stroke="none">
              departs
            </text>
          </g>
        );
      })}
      <text x="150" y="290" fill={MUTED} {...MONO} stroke="none">
        ■ charging   ▬ plugged in, waiting   │ departure deadline
      </text>
    </Plate>
  );
}
