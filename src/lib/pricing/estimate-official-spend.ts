import { getPlanConfig } from "@/lib/pricing/get-plan";
import type { ToolId } from "@/types/pricing";

export function estimateOfficialMonthlySpend(
  toolId: ToolId,
  planId: string,
  seatCount: number,
) {
  const plan = getPlanConfig(toolId, planId);
  const fixedPrice = plan?.pricing.find((price) => price.kind === "fixed");

  if (!plan || !fixedPrice || plan.requiresCustomPricing) {
    return undefined;
  }

  const amount =
    fixedPrice.currency === "USD"
      ? fixedPrice.amountMonthly
      : (fixedPrice.estimatedUsdMonthly ?? fixedPrice.amountMonthly);

  return amount * seatCount;
}
