import { getPlanConfig } from "@/lib/pricing/get-plan";
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
  const fixedPrice = plan?.pricing.find((price) => price.kind === "fixed");

  if (!plan || !fixedPrice || plan.requiresCustomPricing) {
    return {
      amount: tool.monthlySpend,
      source: tool.pricingSource,
      needsUserPricing: true,
    };
  }

  const amount =
    fixedPrice.currency === "USD"
      ? fixedPrice.amountMonthly
      : (fixedPrice.estimatedUsdMonthly ?? fixedPrice.amountMonthly);

  return {
    amount: amount * tool.seatCount,
    source: "official",
    needsUserPricing: false,
  };
}
