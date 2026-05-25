import type { AuditRecommendation } from "@/types/engine";
import { RecommendationCard } from "./recommendation-card";
import { ShieldCheck } from "lucide-react";

type RecommendationListProps = {
  recommendations: AuditRecommendation[];
};

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/70 bg-card/50 p-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/8">
          <ShieldCheck className="size-5 text-emerald-500" />
        </div>
        <h3 className="mb-1.5 text-sm font-semibold">Stack is optimized</h3>
        <p className="text-xs text-muted-foreground max-w-sm leading-relaxed">
          No clear financial inefficiencies or unoptimized billing cycles found
          in your declared stack.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold tracking-tight">
            Actionable Recommendations
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {recommendations.length} opportunit{recommendations.length === 1 ? "y" : "ies"} identified
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {recommendations.map((rec, i) => (
          <RecommendationCard key={rec.id} recommendation={rec} index={i} />
        ))}
      </div>
    </div>
  );
}
