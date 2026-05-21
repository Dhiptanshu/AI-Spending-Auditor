import { getPlanConfig } from "@/lib/pricing/get-plan";
import { getFixedMonthlyEquivalentPrice } from "@/lib/pricing/estimate-official-spend";
import type { AiTool } from "@/types/audit";

export type ResolvedMonthlySpend = {
  amount: number;
  source: AiTool["pricingSource"];
  needsUserPricing: boolean;
};

export function resolveMonthlySpend(tool: AiTool): ResolvedMonthlySpend {
  if (
    tool.pricingSource !== "official" &&
    typeof tool.userOverrideMonthlySpend === "number"
  ) {
    return {
      amount: tool.userOverrideMonthlySpend,
      source: tool.pricingSource,
      needsUserPricing: false,
    };
  }

  const plan = getPlanConfig(tool.toolId, tool.planId);
  const amount = getFixedMonthlyEquivalentPrice(
    tool.toolId,
    tool.planId,
    tool.billingCycle,
  );

  if (!plan || typeof amount !== "number" || plan.requiresCustomPricing) {
    return {
      amount: tool.monthlySpend,
      source: tool.pricingSource,
      needsUserPricing: true,
    };
  }

  return {
    amount: amount * tool.seatCount,
    source: "official",
    needsUserPricing: false,
  };
}
