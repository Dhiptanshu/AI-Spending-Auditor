import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/audits", label: "Audits" },
  { href: "/vendors", label: "Vendors" },
  { href: "/settings", label: "Settings" },
];

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-tight">
          Frugal | AI Spending Audit
        </Link>

        <nav className="hidden items-center gap-0.5 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
                className: "h-8 px-3 text-xs font-medium text-muted-foreground hover:text-foreground",
              })}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
