import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative">
      <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight leading-tight">
        <span className="block">Next.js + TypeScript でつくる、</span>
        <span className="block">学びと実装の記録</span>
      </h1>

      <p className="mt-3 text-base sm:text-lg text-gray-600 dark:text-gray-400">
        情報系の大学生／見習いフロントエンドエンジニア
      </p>

      <p className="mt-3 max-w-prose text-gray-700 dark:text-gray-300">
        Next.js + TypeScript
        を基軸に、設計→実装→計測を小さく速く回す練習を公開しています。
        MDXで学習記録を整え、型安全とアクセシビリティを習慣に。
      </p>
    </section>
  );
}
