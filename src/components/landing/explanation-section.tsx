import { FileSearch, ShieldCheck, WalletCards } from "lucide-react";
import { SectionContainer } from "@/components/landing/section-container";

const capabilities = [
  {
    title: "Spend visibility",
    description:
      "See which AI tools are being paid for, where spend is growing, and which subscriptions may overlap.",
    icon: WalletCards,
  },
  {
    title: "Usage review",
    description:
      "Separate essential tools from low-usage products so finance and operators can make clear decisions.",
    icon: FileSearch,
  },
  {
    title: "Risk context",
    description:
      "Track unmanaged vendors, policy gaps, and review priorities before renewals or budget cycles.",
    icon: ShieldCheck,
  },
];

export function ExplanationSection() {
  return (
    <SectionContainer id="overview" className="border-y border-border/60 bg-muted/20">
      <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-start">
        <div className="space-y-4">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            What the tool does
          </p>
          <h2 className="text-2xl font-semibold leading-tight tracking-tight text-balance">
            A practical audit layer for AI vendor spend.
          </h2>
          <p className="text-muted-foreground text-sm leading-7">
            The product focuses on helping teams collect spend data, review
            vendor usage, and decide what needs action. Clear inputs, clear
            findings, and a path to savings.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {capabilities.map((capability) => (
            <div
              key={capability.title}
              className="group rounded-lg border border-border/70 bg-card p-5 transition-colors hover:border-border"
            >
              <div className="mb-4 flex size-8 items-center justify-center rounded-md border border-border/70 bg-background">
                <capability.icon
                  className="size-4 text-muted-foreground group-hover:text-foreground transition-colors"
                  aria-hidden="true"
                />
              </div>
              <h3 className="mb-1.5 text-sm font-semibold">{capability.title}</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {capability.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
