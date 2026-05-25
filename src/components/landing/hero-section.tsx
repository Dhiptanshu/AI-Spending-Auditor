import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { buttonVariants } from "@/components/ui/button";

const highlights = [
  { label: "Duplicate subscriptions detected", value: "avg. 3.2/audit" },
  { label: "Potential annual savings", value: "$18,400" },
  { label: "Tools evaluated", value: "50+" },
];

export function HeroSection() {
  return (
    <SectionContainer className="py-20 sm:py-24 lg:py-28">
      <div className="grid gap-16 lg:grid-cols-[1fr_420px] lg:items-start">
        {/* Copy */}
        <div className="flex max-w-2xl flex-col gap-8">
          <div className="space-y-1">
            <p className="text-xs font-semibold tracking-widest uppercase text-muted-foreground">
              AI infrastructure auditing
            </p>
          </div>

          <div className="space-y-5">
            <h1 className="text-[2.6rem] font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl lg:text-[3.2rem]">
              Audit AI spend before it becomes a finance problem.
            </h1>
            <p className="text-muted-foreground max-w-lg text-base leading-7">
              AI Spending Audit helps teams review vendors, usage, risk, and savings
              opportunities from one focused workflow.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/audit"
              className={buttonVariants({
                size: "lg",
                className: "h-10 px-5 text-sm font-medium",
              })}
            >
              Start your audit
              <ArrowRight className="ml-1.5 size-3.5" aria-hidden="true" />
            </Link>
            <Link
              href="#how-it-works"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className: "h-10 px-5 text-sm font-medium text-muted-foreground",
              })}
            >
              See how it works
            </Link>
          </div>
        </div>

        {/* Console-style stats panel */}
        <div className="rounded-xl border border-border/70 bg-card shadow-sm overflow-hidden">
          {/* Panel header bar */}
          <div className="flex items-center gap-1.5 border-b border-border/60 bg-muted/40 px-4 py-3">
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="size-2.5 rounded-full bg-border" />
            <span className="ml-3 text-xs text-muted-foreground font-mono">audit_snapshot.json</span>
          </div>

          <div className="p-5 space-y-5">
            <div className="space-y-1">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Monthly spend under review
              </p>
              <p className="text-4xl font-semibold tracking-tight tabular-nums">
                $42,800
              </p>
              <p className="text-xs text-muted-foreground">Across 11 AI vendors</p>
            </div>

            <div className="space-y-2 border-t border-border/60 pt-4">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between py-1.5"
                >
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                  <span className="text-xs font-semibold font-mono tabular-nums">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-lg border border-border/60 bg-muted/30 px-4 py-3">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 size-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Audit completed in under 3 minutes. No account required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
