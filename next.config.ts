// next.config.ts
import createMDX from "@next/mdx";
import remarkGfm from "remark-gfm";
import type { NextConfig } from "next";

const base: NextConfig = {
  experimental: {},
};

const withMDX = createMDX({
  options: { remarkPlugins: [remarkGfm] },
});

export default withMDX({
  ...base,
  pageExtensions: ["ts", "tsx", "md", "mdx"],
});
