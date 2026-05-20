import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#overview", label: "Overview" },
];

export function LandingHeader() {
  return (
    <header className="bg-background/95 border-b">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-sm font-semibold tracking-normal">
          AI Spend Audit
        </Link>
        <nav aria-label="Primary navigation" className="hidden gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground hover:text-foreground text-sm"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/audit"
          className={buttonVariants({ size: "sm", className: "h-8 px-3" })}
        >
          Start audit
        </Link>
      </div>
    </header>
  );
}
