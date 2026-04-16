import { ImageResponse } from "next/og";
import { getProjectBySlug } from "@/lib/db/queries";

export const alt = "SPARQ Project";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const TYPE_COLORS: Record<string, string> = {
  research: "#2563EB",
  qi: "#16A34A",
  audit: "#F97316",
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1D4ED8", color: "white", fontSize: 48 }}>
        Project Not Found
      </div>,
      { ...size }
    );
  }

  const typeColor = TYPE_COLORS[project.type] ?? "#2563EB";

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
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", gap: 12 }}>
            <span
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 16,
                fontWeight: 700,
                color: "white",
                background: typeColor,
              }}
            >
              {project.type === "qi" ? "QI" : project.type.charAt(0).toUpperCase() + project.type.slice(1)}
            </span>
            <span
              style={{
                padding: "6px 16px",
                borderRadius: 20,
                fontSize: 16,
                fontWeight: 600,
                color: "rgba(255,255,255,0.9)",
                background: "rgba(255,255,255,0.15)",
              }}
            >
              {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
            </span>
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 800,
              color: "white",
              lineHeight: 1.2,
              maxWidth: 900,
            }}
          >
            {project.title}
          </div>
          <div
            style={{
              fontSize: 22,
              color: "rgba(191, 219, 254, 0.9)",
              lineHeight: 1.4,
              maxWidth: 800,
              overflow: "hidden",
              display: "-webkit-box",
            }}
          >
            {project.description.slice(0, 150)}
            {project.description.length > 150 ? "…" : ""}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
          }}
        >
          <div style={{ fontSize: 20, color: "rgba(147, 197, 253, 0.8)" }}>
            {(project.leadAuthors ?? []).join(", ")}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>
            SPARQ
          </div>
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: 6,
            background: `linear-gradient(90deg, #EAB308, ${typeColor}, #2563EB)`,
          }}
        />
      </div>
    ),
    { ...size }
  );
}
