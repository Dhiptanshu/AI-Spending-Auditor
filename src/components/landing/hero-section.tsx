import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SectionContainer } from "@/components/landing/section-container";
import { buttonVariants } from "@/components/ui/button";

const highlights = [
  "Find duplicate AI subscriptions",
  "Identify unmanaged tools",
  "Prioritize savings opportunities",
];

export function HeroSection() {
  return (
    <SectionContainer className="py-16 sm:py-20 lg:py-24">
      <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="flex max-w-3xl flex-col gap-6">
          <p className="text-muted-foreground text-sm font-medium">
            AI spend clarity for lean teams
          </p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-normal text-balance sm:text-5xl lg:text-6xl">
              Audit AI spend before it becomes a finance problem.
            </h1>
            <p className="text-muted-foreground max-w-2xl text-lg leading-8">
              AI Spend Audit helps teams review vendors, usage, risk, and
              savings opportunities from one focused workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/audit"
              className={buttonVariants({
                size: "lg",
                className: "h-10 px-4",
              })}
            >
              Start your audit
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="#how-it-works"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className: "h-10 px-4",
              })}
            >
              See how it works
            </Link>
          </div>
        </div>

        <div className="bg-card rounded-lg border p-5 shadow-sm">
          <div className="space-y-5">
            <div>
              <p className="text-muted-foreground text-sm font-medium">
                Audit snapshot
              </p>
              <p className="mt-2 text-3xl font-semibold">$42,800</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Monthly AI vendor spend under review
              </p>
            </div>
            <div className="grid gap-3">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="bg-background flex items-start gap-3 rounded-md border p-3"
                >
                  <CheckCircle2
                    className="text-foreground mt-0.5 size-4"
                    aria-hidden="true"
                  />
                  <span className="text-muted-foreground text-sm">
                    {highlight}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
