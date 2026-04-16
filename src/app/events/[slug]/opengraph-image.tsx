import { ImageResponse } from "next/og";
import { getEventBySlug } from "@/lib/db/queries";

export const alt = "SPARQ Event";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = await getEventBySlug(slug);
  if (!event) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1D4ED8", color: "white", fontSize: 48 }}>
        Event Not Found
      </div>,
      { ...size }
    );
  }

  const d = new Date(event.date);
  const month = d.toLocaleDateString("en-GB", { month: "short" }).toUpperCase();
  const day = d.getDate();

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #0f1b3d 0%, #1a2f6e 50%, #1D4ED8 100%)",
          padding: 60,
          position: "relative",
        }}
      >
        <div style={{ display: "flex", gap: 32 }}>
          {/* Date badge */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              width: 100,
              height: 100,
              borderRadius: 20,
              background: "rgba(255,255,255,0.15)",
              flexShrink: 0,
            }}
          >
            <span style={{ fontSize: 18, fontWeight: 700, color: "rgba(234, 179, 8, 1)" }}>{month}</span>
            <span style={{ fontSize: 42, fontWeight: 800, color: "white", lineHeight: 1 }}>{day}</span>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ fontSize: 48, fontWeight: 800, color: "white", lineHeight: 1.2, maxWidth: 850 }}>
              {event.title}
            </div>
            <div style={{ fontSize: 20, color: "rgba(191, 219, 254, 0.9)" }}>
              {event.isVirtual ? "🌐 Virtual Event" : `📍 ${event.location}`}
            </div>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 20, color: "rgba(191, 219, 254, 0.8)", maxWidth: 750, lineHeight: 1.4 }}>
            {event.description.slice(0, 120)}{event.description.length > 120 ? "…" : ""}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>SPARQ</div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #EAB308, #22C55E, #2563EB)" }} />
      </div>
    ),
    { ...size }
  );
}
