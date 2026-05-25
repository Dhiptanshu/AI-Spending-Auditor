import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#overview", label: "Overview" },
];

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-semibold tracking-tight"
        >
          <span className="inline-flex size-6 items-center justify-center rounded bg-foreground text-background text-xs font-bold">
            C
          </span>
          Credex
        </Link>

        <nav aria-label="Primary navigation" className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm transition-colors duration-150"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/audit"
          className={buttonVariants({ size: "sm", className: "h-8 px-3 text-xs font-medium" })}
        >
          Start audit
        </Link>
      </div>
    </header>
  );
}
