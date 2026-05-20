import type { ComponentPropsWithoutRef, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionContainerProps = {
  children: ReactNode;
  className?: string;
} & ComponentPropsWithoutRef<"section">;

export function SectionContainer({
  children,
  className,
  ...props
}: SectionContainerProps) {
  return (
    <section className={cn("px-4 py-14 sm:px-6 lg:px-8", className)} {...props}>
      <div className="mx-auto w-full max-w-6xl">{children}</div>
    </section>
  );
}
