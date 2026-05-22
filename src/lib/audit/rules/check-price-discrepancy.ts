import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRule, AuditRecommendation } from "@/types/engine";

export const checkPriceDiscrepancy: AuditRule = (payload) => {
  const recommendations: AuditRecommendation[] = [];

  for (const tool of payload.tools) {
    if (tool.isCustomPriced || tool.isUsageBased || tool.expectedTotalMonthlySpend === null) {
      continue;
    }

    if (tool.spendDiscrepancyAmount > 0) {
      // User is paying more than the standard official price
      recommendations.push({
        id: `price-discrepancy-over-${tool.instanceId}`,
        relatedInstanceIds: [tool.instanceId],
        category: "price-discrepancy",
        title: `Overpaying for ${tool.toolName}`,
        description: `Your declared spend is higher than the standard official pricing.`,
        rationale: `You declared ${formatCurrency(tool.declaredMonthlySpend)}/mo for ${tool.declaredSeats} seats, but standard ${tool.billingCycle} pricing should be ${formatCurrency(tool.expectedTotalMonthlySpend)}/mo. You may have unused active seats or a billing error.`,
        monthlySavings: tool.spendDiscrepancyAmount,
        annualSavings: tool.spendDiscrepancyAmount * 12,
        confidence: "high",
      });
    }
  }

  return recommendations;
};
