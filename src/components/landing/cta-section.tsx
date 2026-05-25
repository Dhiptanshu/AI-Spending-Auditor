import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";
import { buttonVariants } from "@/components/ui/button";

export function CtaSection() {
  return (
    <SectionContainer className="py-12">
      <div className="rounded-xl border border-border/70 bg-card px-8 py-10 sm:px-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="max-w-lg space-y-1.5">
            <h2 className="text-xl font-semibold tracking-tight">
              Ready to map your AI spend?
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Start with a simple audit flow. No account required.
            </p>
          </div>
          <Link
            href="/audit"
            className={buttonVariants({
              size: "default",
              className: "h-9 shrink-0 px-5 text-sm font-medium",
            })}
          >
            Start audit
            <ArrowRight className="ml-1.5 size-3.5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </SectionContainer>
  );
}
