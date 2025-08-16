import Link from "next/link";
import Image from "next/image";
import { listMdx } from "@/lib/mdx";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type BlogItem = {
  slug: string;
  title: string;
  date?: string;
  summary?: string;
  tags?: string[];
  thumbnail?: string;
};

export default function BlogPage() {
  const items = listMdx("blog") as BlogItem[];

  return (
    // レイアウト側に <main id="content"> がある前提で <section> を使います
    <section className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight">Blog</h1>

      {items.length === 0 ? (
        <p className="text-muted-foreground">
          まだ記事がありません。<code>/src/content/blog</code> に{" "}
          <code>.mdx</code> を追加してください。
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((x) => (
            <Card key={x.slug} className="flex flex-col">
              {/* サムネイル（無い場合はプレースホルダー） */}
              <div className="relative aspect-video overflow-hidden rounded-t-xl">
                <Image
                  src={x.thumbnail ?? "/placeholder.svg"}
                  alt={x.title}
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 33vw, (min-width:640px) 50vw, 100vw"
                  priority={false}
                />
              </div>

              <CardHeader>
                <CardTitle className="line-clamp-2">{x.title}</CardTitle>
                {x.date && (
                  <p className="text-sm text-muted-foreground">
                    {new Date(x.date).toLocaleDateString("ja-JP")}
                  </p>
                )}
              </CardHeader>

              <CardContent className="grow">
                {x.summary && (
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {x.summary}
                  </p>
                )}

                {x.tags?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {x.tags.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-full border px-2 py-0.5 text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                ) : null}
              </CardContent>

              <CardFooter className="justify-end">
                <Button asChild>
                  <Link href={`/blog/${x.slug}`}>View</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
}
