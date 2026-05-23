import type { AuditRecommendation } from "@/types/engine";
import { RecommendationCard } from "./recommendation-card";
import { ShieldCheck } from "lucide-react";

type RecommendationListProps = {
  recommendations: AuditRecommendation[];
};

export function RecommendationList({ recommendations }: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
        <div className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 mb-4 rounded-full p-4">
          <ShieldCheck className="size-8" />
        </div>
        <h3 className="mb-2 text-xl font-bold">Your stack is optimized!</h3>
        <p className="text-muted-foreground max-w-md">
          We couldn&apos;t find any clear financial inefficiencies or unoptimized billing cycles in your declared stack. Great job.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold tracking-tight">Actionable Recommendations</h3>
        <p className="text-sm text-muted-foreground">
          Based on your tool usage and seat counts, we identified the following opportunities.
        </p>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-1">
        {recommendations.map((rec) => (
          <RecommendationCard key={rec.id} recommendation={rec} />
        ))}
      </div>
    </div>
  );
}
