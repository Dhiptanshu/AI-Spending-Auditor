import { ClipboardList, FileUp, ListChecks } from "lucide-react";

import { SectionContainer } from "@/components/landing/section-container";

const steps = [
  {
    title: "Upload spend data",
    description:
      "Start with vendor exports, invoices, or a lightweight spreadsheet of AI tools and costs.",
    icon: FileUp,
  },
  {
    title: "Review findings",
    description:
      "Surface duplicate vendors, unused seats, unmanaged tools, and spend that needs owner review.",
    icon: ClipboardList,
  },
  {
    title: "Prioritize action",
    description:
      "Turn findings into a shortlist of savings, renewal questions, and risk follow-ups.",
    icon: ListChecks,
  },
];

export function HowItWorksSection() {
  return (
    <SectionContainer id="how-it-works">
      <div className="space-y-8">
        <div className="max-w-2xl space-y-3">
          <p className="text-muted-foreground text-sm font-medium">
            How it works
          </p>
          <h2 className="text-3xl font-semibold tracking-normal">
            Three steps from messy spend to clear decisions.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step, index) => (
            <article key={step.title} className="rounded-lg border p-5">
              <div className="mb-5 flex items-center justify-between gap-4">
                <span className="bg-muted flex size-9 items-center justify-center rounded-md text-sm font-semibold">
                  {index + 1}
                </span>
                <step.icon
                  className="text-muted-foreground size-5"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-lg font-semibold">{step.title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {step.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
