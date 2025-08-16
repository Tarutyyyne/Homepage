"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
      <div className="container max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight">
          Mon Portfolio
        </Link>
        <nav className="flex items-center gap-2">
          {NAV.map((item) => {
            const current = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={current ? "page" : undefined}
                className={[
                  "rounded-md px-3 py-2 text-sm transition",
                  "hover:bg-accent hover:text-accent-foreground",
                  current
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary",
                ].join(" ")}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
