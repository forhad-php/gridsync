import { Callout, COPPER, MONO, MOSS, MUTED, Plate } from "./shared";

/** Chiller, pump and air-handling unit on one chilled-water loop, with the controllable points marked. */
export function HvacLoop() {
  return (
    <Plate label="Chilled-water loop: a chiller and pump feed an air-handling unit that supplies two zones. Controllable points are the chilled-water setpoint, supply-air setpoint and zone setpoints; ventilation minimum is fixed.">
      {/* Chiller */}
      <rect x="30" y="180" width="110" height="70" />
      <circle cx="60" cy="215" r="16" />
      <circle cx="104" cy="215" r="16" />
      <path d="M60 199v32M44 215h32M104 199v32M88 215h32" strokeOpacity="0.3" />
      {/* Pump */}
      <circle cx="190" cy="235" r="14" />
      <path d="M180 245l10-20 10 20" strokeOpacity="0.5" />
      {/* Flow and return */}
      <path d="M140 200h40v-120h90" stroke={COPPER} />
      <path d="M140 235h36M204 235h96V110h-30" />
      <path d="M176 80l-4-4M176 80l-4 4" stroke={COPPER} />
      {/* AHU */}
      <rect x="270" y="60" width="130" height="70" />
      <path d="M300 60v70M340 60v70" strokeOpacity="0.3" />
      <circle cx="370" cy="95" r="18" />
      <path d="M360 95h20M370 85v20" strokeOpacity="0.4" />
      <path d="M284 72l10 46M290 72l10 46" strokeOpacity="0.5" />
      {/* Supply duct to zones */}
      <path d="M400 95h50v150" />
      <path d="M450 170h-40M450 240h-40" />
      <rect x="330" y="155" width="80" height="30" strokeOpacity="0.5" />
      <rect x="330" y="225" width="80" height="30" strokeOpacity="0.5" />
      <text x="338" y="174" fill={MUTED} {...MONO} stroke="none">
        Zone L3
      </text>
      <text x="338" y="244" fill={MUTED} {...MONO} stroke="none">
        Zone L4
      </text>
      {/* Thermal mass hatch */}
      <path d="M330 190h80M330 260h80" stroke={MOSS} strokeWidth="3" strokeOpacity="0.5" />
      <g stroke="none">
        <Callout x={140} y={200} tx={30} ty={160} tone={COPPER}>
          chilled-water setpoint
        </Callout>
        <Callout x={190} y={235} tx={170} ty={285}>
          pump: min flow fixed
        </Callout>
        <Callout x={292} y={100} tx={270} ty={40}>
          fresh-air damper · minimum held
        </Callout>
        <Callout x={400} y={95} tx={476} ty={40} anchor="end" tone={COPPER}>
          supply-air setpoint
        </Callout>
        <Callout x={410} y={262} tx={476} ty={290} anchor="end" tone={MOSS}>
          thermal mass: slab + fit-out
        </Callout>
      </g>
    </Plate>
  );
}
