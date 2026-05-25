import { ClipboardList, FileUp, ListChecks } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";

const steps = [
  {
    title: "Enter your stack",
    description:
      "Add AI tools, their plans, seat counts, and billing cycles. No spreadsheet exports needed.",
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
      <div className="space-y-10">
        <div className="max-w-xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            How it works
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight">
            Three steps from messy spend to clear decisions.
          </h2>
        </div>

        <div className="grid gap-px rounded-xl border border-border/70 bg-border/70 overflow-hidden md:grid-cols-3">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="flex flex-col gap-5 bg-card p-6"
            >
              <div className="flex items-center justify-between">
                <span className="flex size-7 items-center justify-center rounded-md border border-border/70 bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <step.icon
                  className="text-muted-foreground/60 size-4"
                  aria-hidden="true"
                />
              </div>
              <div className="space-y-1.5">
                <h3 className="text-sm font-semibold">{step.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
