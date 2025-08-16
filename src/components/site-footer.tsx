export function SiteFooter() {
  return (
    <footer className="border-t mt-16">
      <div className="container max-w-5xl mx-auto px-4 py-8 text-sm text-muted-foreground">
        © {new Date().getFullYear()} Mon Portfolio. All rights reserved.
      </div>
    </footer>
  );
}
