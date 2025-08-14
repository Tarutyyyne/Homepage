import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

type MdxMeta = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  thumbnail?: string;
};

export function listMdx(dir: "portfolio" | "blog"): MdxMeta[] {
  const root = path.join(process.cwd(), "src", "content", dir);
  if (!fs.existsSync(root)) return [];
  return fs
    .readdirSync(root)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => {
      const slug = f.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(root, f), "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date,
        summary: data.summary,
        tags: data.tags,
        thumbnail: data.thumbnail,
      } as MdxMeta;
    })
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function hasMdx(dir: "portfolio" | "blog", slug: string) {
  const p = path.join(process.cwd(), "src", "content", dir, `${slug}.mdx`);
  return fs.existsSync(p);
}
