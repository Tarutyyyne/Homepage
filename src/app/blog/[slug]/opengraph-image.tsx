import { ImageResponse } from "next/og";
import { listMdx } from "@/lib/mdx";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const runtime = "nodejs";

type MdxListItem = { slug: string; title?: string };

function getTitle(slug: string): string {
  try {
    const list = listMdx("blog") as MdxListItem[];
    const hit = list.find((x) => x.slug === slug);
    return hit?.title ?? slug;
  } catch {
    return slug;
  }
}

export default function OG({ params }: { params: { slug: string } }) {
  const title = getTitle(params.slug);
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "white",
        }}
      >
        <div
          style={{
            padding: 64,
            display: "flex",
            flexDirection: "column",
            gap: 24,
          }}
        >
          <div style={{ fontSize: 28, color: "#6366f1", fontWeight: 600 }}>
            Blog
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              lineHeight: 1.2,
              width: 1000,
            }}
          >
            {title}
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
