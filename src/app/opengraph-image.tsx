import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
// EdgeでもOK（FSを使わないので）
export const runtime = "edge";

export default function OG() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          background: "linear-gradient(135deg,#eef2ff,#e2e8f0)",
        }}
      >
        <div style={{ padding: 48, fontSize: 40, fontWeight: 700 }}>
          Mon Portfolio
        </div>
        <div style={{ padding: "0 48px", fontSize: 28, color: "#334155" }}>
          学びと制作の記録 — Next.js + MDX
        </div>
      </div>
    ),
    { ...size }
  );
}
