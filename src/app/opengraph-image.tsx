import { ImageResponse } from "next/og";

// Edge runtime: the Node runtime of @vercel/og fails to prerender on Windows.
export const runtime = "edge";
export const alt = "GridSync — Buildings that respond without disruption.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#17221F";
const PAPER = "#F3F0E8";
const COPPER = "#B96F45";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: PAPER, color: INK, fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke={INK} strokeWidth="2.5" strokeLinecap="square">
            <path d="M8 3.25v17.5" />
            <path d="M3.25 9h12.5" />
            <path d="M8 15h12.75" />
          </svg>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -1 }}>GridSync</div>
          <div style={{ fontSize: 20, color: "#56615C", marginLeft: 8 }}>GridSync.build</div>
        </div>

        <div style={{ display: "flex", fontSize: 76, lineHeight: 1.04, letterSpacing: -2, maxWidth: 900, color: "#24332E" }}>
          Buildings that respond without disruption.
        </div>

        {/* Drafted rule: a building load line inside a comfort band, with a marked window */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <svg width="1056" height="90" viewBox="0 0 1056 90">
            <path d="M0 89.5h1056" stroke={INK} strokeOpacity="0.35" />
            <path d="M0 70 C200 68 320 30 520 24 S860 50 1056 56 L1056 76 C860 70 700 52 520 48 S200 86 0 84Z" fill="#788F72" fillOpacity="0.25" />
            <path d="M0 78 C200 76 320 38 520 36 S860 62 1056 66" fill="none" stroke={INK} strokeWidth="2" />
            <path d="M640 4v84M760 4v84" stroke={COPPER} strokeDasharray="5 5" strokeWidth="1.5" />
          </svg>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "#56615C" }}>
            <span>Grid-interactive building operations</span>
            <span>Illustrative diagram</span>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
