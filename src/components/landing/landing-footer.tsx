import Link from "next/link";

export function LandingFooter() {
  return (
    <footer className="border-t">
      <div className="text-muted-foreground mx-auto flex w-full max-w-6xl flex-col gap-3 px-4 py-8 text-sm sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <p>AI Spend Audit</p>
        <nav aria-label="Footer navigation" className="flex gap-4">
          <Link href="#overview" className="hover:text-foreground">
            Overview
          </Link>
          <Link href="#how-it-works" className="hover:text-foreground">
            How it works
          </Link>
          <Link href="/audit" className="hover:text-foreground">
            Start audit
          </Link>
        </nav>
      </div>
    </footer>
  );
}
