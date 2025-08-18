/**
 * @file layout.tsx
 * @description サイトの全てのページに共通するテンプレートを定義。
 * HTMLの<html>,<body>タグ、全体に適用されるCSS、
 * 共通のヘッダーやフッターなどをここで定義。
 * @author Tarutyyyne
 * @created 2025-08-18
 */

import type { Metadata } from "next"; // Next.jsのメタデータ型をインポート
import { Geist, Geist_Mono } from "next/font/google"; // Google FontsからGeistフォントをインポート
import "./globals.css"; // グローバルCSSをインポート
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

// geistSansとgeistMonoはカスタムフォント
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"], // ラテン文字だけこのフォントを適用させる
});
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const siteName = "gallerYYYne"; // サイト名
const siteDescription =
  "情報系大学生たるてぃ～ぬの学習と制作の歩みを記録するブログサイト";
const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"; // ベースURLをNEXT_PUBLIC_SITE_URLという名前の環境変数から取得し、開発環境ではローカルホスト3000番を使用

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: siteName, template: `%s | ${siteName}` },
  description: siteDescription, // 検索結果のスニペットに該当
  // 以下はSNSシェア対策
  openGraph: {
    type: "website",
    siteName,
    title: siteName,
    description: siteDescription,
    url: baseUrl,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteName,
    description: siteDescription,
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
      >
        {/* Skip link */}
        <a
          href="#content"
          className="sr-only focus:not-sr-only fixed top-3 left-3 bg-background border px-3 py-2 rounded-md
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="container max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
