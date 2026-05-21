import { TOOL_PRICING_CONFIG } from "@/config/pricing";
import type {
  ToolId,
  ToolPlanConfig,
  ToolPricingConfig,
} from "@/types/pricing";

export function getToolConfig(toolId: ToolId): ToolPricingConfig | undefined {
  return TOOL_PRICING_CONFIG.find((tool) => tool.id === toolId);
}

export function getPlanConfig(
  toolId: ToolId,
  planId: string,
): ToolPlanConfig | undefined {
  return getToolConfig(toolId)?.plans.find((plan) => plan.id === planId);
}

export function getDefaultPlanId(toolId: ToolId): string | undefined {
  return getToolConfig(toolId)?.plans[0]?.id;
}

export function getSelectableTools(): ToolPricingConfig[] {
  return [...TOOL_PRICING_CONFIG];
}
