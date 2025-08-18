import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";

function normalizeThumbnail(v: unknown): string | undefined {
  if (typeof v !== "string") return undefined;
  const s = v.trim();
  if (!s) return undefined;
  return s.startsWith("/") || s.startsWith("http") ? s : `/${s}`;
}

type MdxMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  thumbnail?: string;
  draft?: boolean;
};

const FrontmatterSchema = z.object({
  title: z.string().min(1),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .optional(),
  summary: z.string().optional(),
  tags: z.preprocess(
    (v) =>
      typeof v === "string"
        ? v
            .split(",")
            .map((s) => s.trim())
            .filter(Boolean)
        : v,
    z.array(z.string()).default([])
  ),
  thumbnail: z.preprocess((v) => normalizeThumbnail(v), z.string().optional()),
  draft: z.boolean().default(false),
});

export function listMdx(
  dir: "portfolio" | "blog",
  opts?: { includeDraft?: boolean }
): MdxMeta[] {
  const root = path.join(process.cwd(), "src", "content", dir);
  if (!fs.existsSync(root)) return [];
  const includeDraft = opts?.includeDraft ?? false;

  const posts = fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".mdx"))
    .map((f): MdxMeta | null => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(root, f), "utf-8");
      const { data } = matter(raw);

      const parsed = FrontmatterSchema.safeParse(data);

      const title = parsed.success ? parsed.data.title : data.title ?? slug;
      const meta: MdxMeta = {
        slug,
        title,
        date: parsed.success
          ? parsed.data.date
          : typeof data.date === "string"
          ? data.date
          : undefined,
        summary: parsed.success
          ? parsed.data.summary
          : typeof data.summary === "string"
          ? data.summary
          : undefined,
        tags: parsed.success
          ? parsed.data.tags
          : Array.isArray(data.tags)
          ? data.tags.filter((t) => typeof t === "string")
          : [],
        thumbnail: parsed.success
          ? parsed.data.thumbnail
          : normalizeThumbnail(data.thumbnail),
        draft: parsed.success ? parsed.data.draft : data.draft ?? false,
      };

      if (!includeDraft && meta.draft) {
        return null;
      }
      return meta;
    })
    .filter((meta): meta is MdxMeta => meta !== null)
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));

  return posts;
}

export function hasMdx(dir: "portfolio" | "blog", slug: string) {
  const p = path.join(process.cwd(), "src", "content", dir, `${slug}.mdx`);
  return fs.existsSync(p);
}

export function getMdxBySlug(
  dir: "portfolio" | "blog",
  slug: string,
  opts?: { includeDraft?: boolean }
): MdxMeta | null {
  const file = path.join(process.cwd(), "src", "content", dir, `${slug}.mdx`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf-8");
  const { data } = matter(raw);
  const parsed = FrontmatterSchema.safeParse(data);

  const title = parsed.success ? parsed.data.title : data.title ?? slug;

  const meta: MdxMeta = {
    slug,
    title,
    date: parsed.success
      ? parsed.data.date
      : typeof data.date === "string"
      ? data.date
      : undefined,
    summary: parsed.success
      ? parsed.data.summary
      : typeof data.summary === "string"
      ? data.summary
      : undefined,
    tags: parsed.success
      ? parsed.data.tags
      : Array.isArray(data.tags)
      ? data.tags.filter((t) => typeof t === "string")
      : [],
    thumbnail: parsed.success
      ? parsed.data.thumbnail
      : normalizeThumbnail(data.thumbnail),
    draft: parsed.success ? parsed.data.draft : data.draft ?? false,
  };

  const includeDraft = opts?.includeDraft ?? false;
  if (!includeDraft && meta.draft) return null;

  return meta;
}
