import Link from "next/link";
import { listMdx } from "@/lib/mdx";

export default function BlogPage() {
  const items = listMdx("blog");
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <h1 className="text-3xl font-bold">Blog</h1>
      {items.length === 0 ? (
        <p className="text-gray-600">
          まだ記事がありません。/src/content/blog に .mdx を追加してください。
        </p>
      ) : (
        <ul className="space-y-4">
          {items.map((x) => (
            <li key={x.slug} className="border rounded-lg p-4">
              <h2 className="text-xl font-semibold">
                <Link href={`/blog/${x.slug}`}>{x.title}</Link>
              </h2>
              {x.date && <p className="text-sm text-gray-500">{x.date}</p>}
              {x.summary && <p className="mt-2 text-gray-700">{x.summary}</p>}
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
