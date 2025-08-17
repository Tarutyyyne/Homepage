import { notFound } from "next/navigation";
import { listMdx, getMdxBySlug } from "@/lib/mdx";
import { type Metadata } from "next";

type Props = { params: { slug: string } };

// 生成した公開記事のみを許可（未生成 slug は 404）
export const dynamicParams = false;

// 公開記事のページだけをビルド時に事前生成
export async function generateStaticParams() {
  // `includeDraft: false` を指定することで、下書き記事は対象外になります
  const posts = listMdx("blog", { includeDraft: false });
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getMdxBySlug("blog", params.slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: [
        {
          url: process.env.NEXT_PUBLIC_SITE_URL
            ? new URL(
                `/blog/${params.slug}/opengraph-image`,
                process.env.NEXT_PUBLIC_SITE_URL
              ).toString()
            : `/blog/${params.slug}/opengraph-image`,
        },
      ],
    },
  };
}

// ページ本体のコンポーネント
export default function BlogDetail({ params }: Props) {
  // URLを直接指定された場合でも、下書きや存在しない記事は404に
  const post = getMdxBySlug("blog", params.slug); // 既定で下書きは除外
  if (!post) {
    return notFound(); // postが見つからなければ404ページを表示
  }

  // 取得したデータを表示に利用
  return (
    <main className="mx-auto max-w-3xl p-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      {post.summary && (
        <p className="mt-2 text-lg text-gray-700">{post.summary}</p>
      )}
      <p className="mt-2 text-sm text-gray-500">公開日: {post.date}</p>

      <hr className="my-6" />

      {/* ここにMDXの本文をレンダリングする処理を追加 */}
      <div className="prose dark:prose-invert">
        <p>（ここに記事の本文が表示されます）</p>
      </div>
    </main>
  );
}
