import Link from "next/link";
import { listMdx } from "@/lib/mdx";
import Hero from "@/components/hero";

export default function WorksPage() {
  const items = listMdx("works");
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-6">
      <Hero />

      <section aria-labelledby="home-works">
        <div className="flex items-center justify-between">
          <h2 id="home-works" className="text-3xl font-bold">
            最新のWorks
          </h2>

          <Link
            href="/works"
            className="text-sm text-gray-600 dark:text-gray-300 hover:underline"
          >
            すべて見る →
          </Link>
        </div>

        {items.length === 0 ? (
          <p className="text-gray-600">
            まだ作品がありません。/src/content/works に .mdx
            を追加してください。
          </p>
        ) : (
          <ul className="space-y-4">
            {items.map((x) => (
              <li key={x.slug} className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold">
                  <Link href={`/works/${x.slug}`}>{x.title}</Link>
                </h2>
                {x.date && <p className="text-sm text-gray-500">{x.date}</p>}
                {x.summary && <p className="mt-2 text-gray-700">{x.summary}</p>}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
