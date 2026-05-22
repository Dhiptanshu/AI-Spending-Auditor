import { getFixedMonthlyEquivalentPrice } from "@/lib/pricing/estimate-official-spend";
import { formatCurrency, formatSeats } from "@/lib/audit/formatters";
import type { AuditRule, AuditRecommendation } from "@/types/engine";

export const checkAnnualBilling: AuditRule = (payload) => {
  const recommendations: AuditRecommendation[] = [];

  for (const tool of payload.tools) {
    // Skip usage-based, custom priced, or already annual tools
    if (tool.isUsageBased || tool.isCustomPriced || tool.billingCycle === "annual") {
      continue;
    }

    const currentCost = tool.declaredMonthlySpend;
    const currentCostPerSeat = currentCost / tool.declaredSeats;

    // Check if an annual plan exists for this tool & plan
    const annualMonthlyEquivalent = getFixedMonthlyEquivalentPrice(
      tool.toolId as any,
      tool.planId,
      "annual"
    );

    if (annualMonthlyEquivalent !== undefined && annualMonthlyEquivalent < currentCostPerSeat) {
      const expectedMonthlyAnnualTotal = annualMonthlyEquivalent * tool.declaredSeats;
      const monthlySavings = currentCost - expectedMonthlyAnnualTotal;

      if (monthlySavings > 0) {
        recommendations.push({
          id: `annual-billing-${tool.instanceId}`,
          relatedInstanceIds: [tool.instanceId],
          category: "annual-billing",
          title: `Switch ${tool.toolName} to Annual Billing`,
          description: `Switching to annual billing could save you ${formatCurrency(monthlySavings)} per month.`,
          rationale: `You are currently paying ${formatCurrency(currentCost)}/mo for ${formatSeats(tool.declaredSeats)} on monthly billing. The annual plan drops the effective cost to ${formatCurrency(annualMonthlyEquivalent)}/mo per seat (${formatCurrency(expectedMonthlyAnnualTotal)}/mo total). Difference: ${formatCurrency(monthlySavings)}/mo.`,
          monthlySavings,
          annualSavings: monthlySavings * 12,
          confidence: "high",
        });
      }
    }
  }

  return recommendations;
};
