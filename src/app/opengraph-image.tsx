import { ImageResponse } from "next/og";

export const alt = "SPARQ — Severn Paediatric Audit, Research & Quality Improvement";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #0f1b3d 0%, #1a2f6e 50%, #1D4ED8 100%)",
          position: "relative",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(96, 165, 250, 0.08)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -60,
            left: -60,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(34, 197, 94, 0.08)",
          }}
        />

        {/* Logo text */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 20,
          }}
        >
          <div
            style={{
              fontSize: 72,
              fontWeight: 800,
              color: "white",
              letterSpacing: "-2px",
            }}
          >
            SPARQ
          </div>
          <div
            style={{
              fontSize: 24,
              color: "rgba(191, 219, 254, 1)",
              maxWidth: 700,
              textAlign: "center",
              lineHeight: 1.4,
            }}
          >
            Severn Paediatric Audit, Research & Quality Improvement
          </div>
          <div
            style={{
              marginTop: 16,
              fontSize: 18,
              color: "rgba(147, 197, 253, 0.8)",
              display: "flex",
              gap: 24,
            }}
          >
            <span>Research</span>
            <span style={{ color: "rgba(234, 179, 8, 0.8)" }}>·</span>
            <span>Quality Improvement</span>
            <span style={{ color: "rgba(234, 179, 8, 0.8)" }}>·</span>
            <span>Audit</span>
            <span style={{ color: "rgba(234, 179, 8, 0.8)" }}>·</span>
            <span>Training</span>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: "linear-gradient(90deg, #EAB308, #22C55E, #2563EB)",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
