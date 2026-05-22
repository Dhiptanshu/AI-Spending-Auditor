import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRule, AuditRecommendation } from "@/types/engine";

// Tools that heavily overlap in functionality
const OVERLAPPING_GROUPS = [
  { primary: "cursor", secondary: "github-copilot", category: "coding" },
];

export const checkConsolidation: AuditRule = (payload) => {
  const recommendations: AuditRecommendation[] = [];

  for (const group of OVERLAPPING_GROUPS) {
    const primaryTools = payload.tools.filter((t) => t.toolId === group.primary);
    const secondaryTools = payload.tools.filter((t) => t.toolId === group.secondary);

    if (primaryTools.length > 0 && secondaryTools.length > 0) {
      // Calculate total spend on the secondary tool
      const secondarySpend = secondaryTools.reduce(
        (sum, t) => sum + t.declaredMonthlySpend,
        0
      );

      // Only recommend if savings are notable (> $10)
      if (secondarySpend > 10) {
        const primaryName = primaryTools[0].toolName;
        const secondaryName = secondaryTools[0].toolName;
        const instanceIds = [...primaryTools, ...secondaryTools].map((t) => t.instanceId);

        recommendations.push({
          id: `consolidation-${group.primary}-${group.secondary}`,
          relatedInstanceIds: instanceIds,
          category: "tool-consolidation",
          title: `Consolidate ${secondaryName} into ${primaryName}`,
          description: `You are paying for both ${primaryName} and ${secondaryName}. Consolidating could save ${formatCurrency(secondarySpend)} per month.`,
          rationale: `Because ${primaryName} provides advanced ${group.category} capabilities that overlap significantly with ${secondaryName}, many teams choose to standardize on a single tool. Canceling ${secondaryName} would save ${formatCurrency(secondarySpend)}/mo.`,
          monthlySavings: secondarySpend,
          annualSavings: secondarySpend * 12,
          confidence: "medium", // Medium confidence because they might have valid reasons for both
        });
      }
    }
  }

  return recommendations;
};
