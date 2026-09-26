import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#17221F" }}>
        <svg width="112" height="112" viewBox="0 0 24 24" fill="none" stroke="#F3F0E8" strokeWidth="2.5" strokeLinecap="square">
          <path d="M8 3.25v17.5" />
          <path d="M3.25 9h12.5" />
          <path d="M8 15h12.75" />
        </svg>
      </div>
    ),
    size,
  );
}
