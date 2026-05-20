import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { SectionContainer } from "@/components/landing/section-container";
import { buttonVariants } from "@/components/ui/button";

export function CtaSection() {
  return (
    <SectionContainer className="py-12">
      <div className="bg-card flex flex-col items-start justify-between gap-6 rounded-lg border p-6 sm:p-8 md:flex-row md:items-center">
        <div className="max-w-2xl space-y-2">
          <h2 className="text-2xl font-semibold tracking-normal">
            Ready to map your AI spend?
          </h2>
          <p className="text-muted-foreground text-sm leading-6">
            Start with a simple audit flow and build toward deeper reporting as
            the product matures.
          </p>
        </div>
        <Link
          href="/audit"
          className={buttonVariants({
            size: "lg",
            className: "h-10 w-full px-4 sm:w-auto",
          })}
        >
          Start audit
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </div>
    </SectionContainer>
  );
}
