import { FileSearch, ShieldCheck, WalletCards } from "lucide-react";

import { SectionContainer } from "@/components/landing/section-container";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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
    <SectionContainer id="overview" className="bg-muted/30 border-y">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <div className="space-y-3">
          <p className="text-muted-foreground text-sm font-medium">
            What the tool does
          </p>
          <h2 className="text-3xl font-semibold tracking-normal text-balance">
            A practical audit layer for AI vendor spend.
          </h2>
          <p className="text-muted-foreground text-base leading-7">
            The MVP focuses on helping teams collect spend data, review vendor
            usage, and decide what needs action. It is intentionally simple:
            clear inputs, clear findings, and a path to savings.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {capabilities.map((capability) => (
            <Card key={capability.title}>
              <CardHeader>
                <capability.icon
                  className="text-muted-foreground size-5"
                  aria-hidden="true"
                />
                <CardTitle>{capability.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{capability.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionContainer>
  );
}
