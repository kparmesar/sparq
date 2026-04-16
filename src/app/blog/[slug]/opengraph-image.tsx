import { ImageResponse } from "next/og";
import { getBlogPostBySlug } from "@/lib/db/queries";

export const alt = "SPARQ Blog";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const CAT_COLORS: Record<string, string> = {
  news: "#2563EB",
  training: "#16A34A",
  insights: "#7C3AED",
  events: "#D97706",
};

export default async function OGImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);
  if (!post) {
    return new ImageResponse(
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "#1D4ED8", color: "white", fontSize: 48 }}>
        Post Not Found
      </div>,
      { ...size }
    );
  }

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
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span
            style={{
              padding: "6px 16px",
              borderRadius: 20,
              fontSize: 16,
              fontWeight: 700,
              color: "white",
              background: CAT_COLORS[post.category] ?? "#2563EB",
              alignSelf: "flex-start",
            }}
          >
            {post.category.charAt(0).toUpperCase() + post.category.slice(1)}
          </span>
          <div style={{ fontSize: 52, fontWeight: 800, color: "white", lineHeight: 1.2, maxWidth: 950 }}>
            {post.title}
          </div>
          <div style={{ fontSize: 22, color: "rgba(191, 219, 254, 0.9)", lineHeight: 1.4, maxWidth: 850 }}>
            {post.excerpt.slice(0, 160)}{post.excerpt.length > 160 ? "…" : ""}
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 18, color: "rgba(147, 197, 253, 0.8)" }}>
            {post.author}
          </div>
          <div style={{ fontSize: 28, fontWeight: 700, color: "white" }}>SPARQ</div>
        </div>

        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 6, background: "linear-gradient(90deg, #EAB308, #22C55E, #2563EB)" }} />
      </div>
    ),
    { ...size }
  );
}
