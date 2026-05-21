import type { ToolPlanConfig } from "@/types/pricing";

export function planRequiresCustomPricing(plan: ToolPlanConfig) {
  return plan.requiresCustomPricing === true;
}

export function planAllowsManualOverride(plan: ToolPlanConfig) {
  return plan.allowsManualOverride === true || planRequiresCustomPricing(plan);
}

export function isUsageBasedPlan(plan: ToolPlanConfig) {
  return plan.pricingModel === "usage-based";
}
