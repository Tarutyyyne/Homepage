import Link from "next/link";

export const metaData = {
  title: "About | gallerYYYne",
  description:
    "情報系の大学生／見習いフロントエンドエンジニアの自己紹介。Next.js + TypeScript を基軸に学習と実装を公開。",
};

export default function AboutPage() {
  return (
    <main className="mx-auto max-w-3xl p-6 space-y-8">
      <header>
        <h1 className="text-3xl font-bold">自己紹介</h1>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          情報系の学部に通う大学一年生、フロントエンドエンジニアを目指す見習いです！
        </p>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Next.js + TypeScript を基軸に、
          設計→実装→計測を小さく速く回す練習を公開しています。MDXで学習記録を整え、
          型安全とアクセシビリティを習慣にしていきます
        </p>
      </header>

      <section aria-labelledby="profile">
        <h2 id="profile" className="text-xl font-semibold">
          現在地
        </h2>
        <ul className="mt-3 grid gap-2 text-sm text-gray-700 dark:text-gray-200">
          <li>所属：情報系の学部（学部生）</li>
          <li>志向：Next.js / TypeScript</li>
          <li>
            記録： 制作物を
            <Link href="/works" className="underline ml-1">
              Works
            </Link>{" "}
            に、学習記録を
            <Link href="/blog" className="underline">
              Blog
            </Link>{" "}
            にて公開中
          </li>
        </ul>
      </section>

      <section aria-labelledby="stack">
        <h2 id="stack" className="text-xl font-semibold">
          主なスタック
        </h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {[
            "Next.js",
            "TypeScript",
            "React",
            "Tailwind CSS",
            "MDX",
            "zod",
            "shadcn/ui(予定)",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-xs text-gray-800 dark:text-gray-100 dark:border-gray-700"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      <section aria-labelledby="approach">
        <h2 id="approach" className="text-xl font-semibold">
          学び方と方針
        </h2>
        <ol className="mt-3 list-decimal list-inside space-y-2 text-sm text-gray-700 dark:text-gray-200">
          <li>小さく作って公開（RSC/SSG・型安全を重視）</li>
          <li>計測で判断（Lighthouse / a11y / バンドルサイズ）</li>
          <li>ケーススタディとして整理（設計→解決→学び）</li>
        </ol>
      </section>

      <section aria-labelledby="links">
        <h2 id="links" className="text-xl font-semibold">
          リンク
        </h2>
        <ul className="mt-3 grid gap-2 text-sm">
          <li>
            <Link
              href="/works"
              className="text-gray-700 dark:text-gray-200 hover:underline"
            >
              Works（制作一覧）
            </Link>
          </li>
          <li>
            <Link
              href="/blog"
              className="text-gray-700 dark:text-gray-200 hover:underline"
            >
              Blog（学習記録）
            </Link>
          </li>
          <li>
            <Link
              href="/contact"
              className="text-gray-700 dark:text-gray-200 hover:underline"
            >
              Contact（連絡）
            </Link>
          </li>
          <li>
            <a
              href="https://github.com/your-username"
              target="_blank"
              rel="noopener"
              className="text-gray-700 dark:text-gray-200 hover:underline"
            >
              GitHub
            </a>
          </li>
          <li>
            <a
              href="https://x.com/your-username"
              target="_blank"
              rel="noopener"
              className="text-gray-700 dark:text-gray-200 hover:underline"
            >
              X
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
