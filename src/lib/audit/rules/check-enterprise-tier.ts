import { formatCurrency, formatSeats } from "@/lib/audit/formatters";
import type { AuditRule, AuditRecommendation } from "@/types/engine";

export const checkEnterpriseTier: AuditRule = (payload) => {
  const recommendations: AuditRecommendation[] = [];

  for (const tool of payload.tools) {
    // Look for Enterprise or high-tier plans
    const isEnterprisePlan = 
      tool.planId.toLowerCase().includes("enterprise") || 
      tool.planId.toLowerCase().includes("premium");

    // Only flag if team size is small (e.g., < 15) and they are on a high tier
    if (isEnterprisePlan && payload.team.teamSize < 15 && !tool.isUsageBased) {
      
      // If we don't know expected spend, skip
      if (tool.expectedTotalMonthlySpend === null) continue;

      // Calculate what a standard "Pro" tier would cost roughly (assuming ~$20/seat as baseline for Pro AI tools)
      const estimatedProCostPerSeat = 20; 
      const estimatedProMonthlySpend = estimatedProCostPerSeat * tool.declaredSeats;
      
      const potentialSavings = tool.declaredMonthlySpend - estimatedProMonthlySpend;

      if (potentialSavings > 20) {
        recommendations.push({
          id: `unnecessary-enterprise-${tool.instanceId}`,
          relatedInstanceIds: [tool.instanceId],
          category: "downgrade-plan",
          title: `Evaluate ${tool.toolName} Enterprise Tier`,
          description: `Your team size is small, but you are on an Enterprise/Premium tier. Downgrading to a Pro tier could save ~${formatCurrency(potentialSavings)}/mo.`,
          rationale: `You are paying ${formatCurrency(tool.declaredMonthlySpend)}/mo for ${formatSeats(tool.declaredSeats)} on the ${tool.planName} plan. For a team of ${payload.team.teamSize}, standard Pro tiers (typically ~${formatCurrency(estimatedProCostPerSeat)}/seat) often provide sufficient capabilities. Switching could save approximately ${formatCurrency(potentialSavings)}/mo unless strict Enterprise compliance features are required.`,
          monthlySavings: potentialSavings,
          annualSavings: potentialSavings * 12,
          confidence: "medium", // Medium because they might actually need the compliance features
        });
      }
    }
  }

  return recommendations;
};
