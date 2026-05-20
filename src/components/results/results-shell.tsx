"use client";

import { calculateAuditResults } from "@/lib/audit/calculations";
import { useAuditSubmission } from "@/hooks/use-audit-submission";
import { EmptyState } from "@/components/shared/empty-state";
import { SavingsSummary } from "@/components/results/savings-summary";
import { RecommendationList } from "@/components/results/recommendation-list";

export function ResultsShell() {
  const { submission, isLoaded } = useAuditSubmission();

  if (!isLoaded) {
    return null;
  }

  if (!submission) {
    return (
      <EmptyState
        title="No submitted audit yet"
        description="Complete the audit form to generate a results snapshot."
      />
    );
  }

  const result = calculateAuditResults(submission.data);

  return (
    <div className="space-y-6">
      <SavingsSummary result={result} />
      <RecommendationList recommendations={result.recommendations} />
    </div>
  );
}
