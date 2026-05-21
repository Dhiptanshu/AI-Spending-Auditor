import { getPlanConfig } from "@/lib/pricing/get-plan";
import type { BillingCycle } from "@/types/audit";
import type { FixedPrice, PricingEntry, ToolId } from "@/types/pricing";

function isFixedPrice(price: PricingEntry): price is FixedPrice {
  return price.kind === "fixed";
}

export function getFixedMonthlyEquivalentPrice(
  toolId: ToolId,
  planId: string,
  billingCycle: BillingCycle,
) {
  const plan = getPlanConfig(toolId, planId);
  const fixedPrice =
    plan?.pricing.find(
      (price): price is FixedPrice =>
        isFixedPrice(price) && price.billingCadence === billingCycle,
    ) ?? plan?.pricing.find(isFixedPrice);

  if (!plan || !fixedPrice || plan.requiresCustomPricing) {
    return undefined;
  }

  return fixedPrice.currency === "USD"
    ? fixedPrice.amountMonthly
    : (fixedPrice.estimatedUsdMonthly ?? fixedPrice.amountMonthly);
}

export function estimateOfficialMonthlySpend(
  toolId: ToolId,
  planId: string,
  seatCount: number,
  billingCycle: BillingCycle = "monthly",
) {
  const amount = getFixedMonthlyEquivalentPrice(toolId, planId, billingCycle);

  if (typeof amount !== "number") {
    return undefined;
  }

  return amount * seatCount;
}
