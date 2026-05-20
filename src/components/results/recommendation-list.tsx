import { EmptyState } from "@/components/shared/empty-state";
import type { AuditRecommendation } from "@/types/audit";

type RecommendationListProps = {
  recommendations: AuditRecommendation[];
};

export function RecommendationList({
  recommendations,
}: RecommendationListProps) {
  if (recommendations.length === 0) {
    return (
      <EmptyState
        title="No recommendations yet"
        description="Recommendation cards will appear here once the audit engine is implemented."
      />
    );
  }

  return (
    <div className="grid gap-4">
      {recommendations.map((recommendation) => (
        <article key={recommendation.id} className="rounded-lg border p-4">
          <h2 className="font-medium">{recommendation.title}</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            {recommendation.description}
          </p>
        </article>
      ))}
    </div>
  );
}
