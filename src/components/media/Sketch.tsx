import type { Sketch as SketchKey } from "@/content/media-plan";

/**
 * Architectural line sketches used inside media placeholders. They indicate the subject of the
 * commissioned photograph without pretending to be one.
 */
export function Sketch({ kind }: { kind: SketchKey }) {
  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid meet"
      className="absolute inset-x-[6%] inset-y-[10%] h-[80%] w-[88%] [&_*]:[vector-effect:non-scaling-stroke]"
      aria-hidden
    >
      <g fill="none" stroke="#24332E" strokeOpacity="0.5" strokeWidth="1" strokeLinejoin="round">
        {drawings[kind]}
      </g>
    </svg>
  );
}

const floor = <path d="M0 250h400" strokeOpacity="0.3" />;

const drawings: Record<SketchKey, React.ReactNode> = {
  plant: (
    <>
      {floor}
      <rect x="70" y="140" width="170" height="110" />
      <path d="M70 175h170M155 140v110" strokeOpacity="0.25" />
      <circle cx="112" cy="208" r="26" />
      <circle cx="112" cy="208" r="4" />
      <path d="M112 182v52M86 208h52" strokeOpacity="0.25" />
      <rect x="175" y="188" width="50" height="40" />
      <path d="M180 196h40M180 204h40M180 212h40M180 220h40" strokeOpacity="0.3" />
      <path d="M190 140V60h60v-40M220 140V80h120" />
      <path d="M200 140V70h50M230 140V90h110" strokeOpacity="0.35" />
      <path d="M260 250v-60h90M275 250v-45h75" />
      <circle cx="300" cy="190" r="6" /><circle cx="330" cy="205" r="6" />
    </>
  ),
  roof: (
    <>
      <path d="M0 200h400" />
      <path d="M0 210h400" strokeOpacity="0.25" />
      <circle cx="320" cy="96" r="18" strokeOpacity="0.3" />
      <path d="M20 200v-18h60v18M100 200v-40h70v40M200 200v-28h54v28" />
      <circle cx="135" cy="175" r="12" /><circle cx="227" cy="186" r="8" />
      <path d="M40 182v-8h20v8" strokeOpacity="0.4" />
      <path d="M290 200v-70h40v70M300 140h20M300 155h20M300 170h20" strokeOpacity="0.3" />
      <path d="M340 150l14-40 14 40M354 110v90M345 128h18" strokeOpacity="0.3" />
      <path d="M368 128c10 4 22 6 32 6" strokeOpacity="0.2" />
    </>
  ),
  meter: (
    <>
      {floor}
      <path d="M40 40h320" strokeOpacity="0.3" />
      <path d="M40 30h320" strokeOpacity="0.2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={60 + i * 75} y="70" width="60" height="150" />
          <rect x={70 + i * 75} y="85" width="40" height="26" />
          <circle cx={90 + i * 75} cy="140" r="10" />
          <path d={`M${90 + i * 75} 40v30`} strokeOpacity="0.35" />
          <path d={`M${72 + i * 75} 170h36M${72 + i * 75} 180h36M${72 + i * 75} 190h36`} strokeOpacity="0.25" />
        </g>
      ))}
    </>
  ),
  desk: (
    <>
      <path d="M0 230l400-30" strokeOpacity="0.3" />
      <path d="M90 60l170-18 22 160-170 18z" />
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={i} d={`M${108 + i * 0.4} ${86 + i * 16}l${140} ${-15}`} strokeOpacity="0.28" />
      ))}
      <path d="M160 70l18 158M210 64l18 158" strokeOpacity="0.2" />
      <path d="M300 150l60-8 4 30-60 8z" strokeOpacity="0.45" />
      <circle cx="80" cy="200" r="20" /><circle cx="80" cy="200" r="15" strokeOpacity="0.3" />
      <path d="M250 190l70 -60" strokeWidth="2" strokeOpacity="0.5" />
    </>
  ),
  pipes: (
    <>
      {[70, 120, 170].map((y, i) => (
        <g key={y}>
          <path d={`M0 ${y}h400M0 ${y + 24}h400`} />
          <path d={`M${120 + i * 60} ${y - 4}v32M${128 + i * 60} ${y - 4}v32`} />
          <circle cx={260 + i * 30} cy={y + 12} r="9" />
          <path d={`M${260 + i * 30} ${y + 3}v-14h-12`} strokeOpacity="0.4" />
        </g>
      ))}
      {floor}
      <rect x="150" y="210" width="70" height="40" />
      <circle cx="185" cy="230" r="14" />
      <path d="M220 230h40v-36" />
    </>
  ),
  office: (
    <>
      <path d="M0 60h400M0 60l150 90M400 60l-150 90M150 150h100" strokeOpacity="0.3" />
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} x={40 + i * 70} y="72" width="44" height="8" fill={i < 3 ? "#D9B84C" : "none"} fillOpacity="0.35" />
      ))}
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={95 + i * 55} y="100" width="30" height="6" fill={i < 2 ? "#D9B84C" : "none"} fillOpacity="0.3" />
      ))}
      <path d="M60 250l60-60h160l60 60" />
      <path d="M100 230h200M130 210h140" strokeOpacity="0.3" />
      <path d="M0 150v100M400 150v100" strokeOpacity="0.2" />
    </>
  ),
  ev: (
    <>
      {floor}
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={50 + i * 90} y="120" width="22" height="100" />
          <rect x={54 + i * 90} y="130" width="14" height="16" />
          <path d={`M${72 + i * 90} 180c20 0 24 30 28 40`} strokeOpacity="0.4" />
          <path d={`M${40 + i * 90} 250l12-30M${120 + i * 90} 250l-2-30`} strokeOpacity="0.25" />
        </g>
      ))}
      <path d="M90 225v-50h70l20 25v25zM270 225v-50h70l20 25v25z" strokeOpacity="0.4" />
    </>
  ),
  dock: (
    <>
      {floor}
      <path d="M0 80h400" strokeOpacity="0.3" />
      <rect x="120" y="90" width="160" height="160" />
      {Array.from({ length: 10 }).map((_, i) => (
        <path key={i} d={`M${128 + i * 15.5} 94v156`} strokeOpacity="0.35" />
      ))}
      <path d="M30 250v-30h60v30M30 220l60-0M40 220v-20h40v20" strokeOpacity="0.4" />
      <path d="M300 250h70v-12h-70z" strokeOpacity="0.4" />
    </>
  ),
  exterior: (
    <>
      <path d="M0 260h400" />
      <rect x="60" y="50" width="190" height="210" />
      {Array.from({ length: 7 }).map((_, r) =>
        Array.from({ length: 5 }).map((__, c) => (
          <rect key={`${r}-${c}`} x={74 + c * 35} y={64 + r * 26} width="24" height="16" strokeOpacity="0.3" />
        )),
      )}
      <rect x="290" y="200" width="70" height="60" />
      <path d="M296 212h58M296 222h58M296 232h58" strokeOpacity="0.3" />
      <path d="M270 260l0-110 20-0M325 200v-40" strokeOpacity="0.25" />
    </>
  ),
  panel: (
    <>
      <rect x="40" y="30" width="320" height="240" />
      {[80, 150, 220].map((y) => (
        <g key={y}>
          <path d={`M60 ${y}h280`} strokeWidth="3" strokeOpacity="0.3" />
          {Array.from({ length: 9 }).map((_, i) => (
            <rect key={i} x={66 + i * 30} y={y - 22} width="22" height="44" />
          ))}
        </g>
      ))}
      <path d="M77 102c0 12 20 12 20 26M107 102c0 14 30 10 30 26M167 172c0 12-30 14-30 26" strokeOpacity="0.4" />
    </>
  ),
};
