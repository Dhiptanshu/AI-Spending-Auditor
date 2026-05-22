import { getToolConfig, getPlanConfig } from "@/lib/pricing/get-plan";
import {
  getFixedMonthlyEquivalentPrice,
  estimateOfficialMonthlySpend,
} from "@/lib/pricing/estimate-official-spend";
import type { AuditFormData } from "@/types/audit";
import type { NormalizedAuditPayload, NormalizedToolEntry } from "@/types/engine";

export function normalizeAuditPayload(
  formData: AuditFormData,
): NormalizedAuditPayload {
  let totalDeclaredSpend = 0;
  let totalExpectedSpend = 0;
  let totalDiscrepancyAmount = 0;

  const normalizedTools: NormalizedToolEntry[] = formData.tools.map((rawTool) => {
    const toolDef = getToolConfig(rawTool.toolId);
    const planDef = getPlanConfig(rawTool.toolId, rawTool.planId);

    const toolName = toolDef?.name ?? rawTool.toolId;
    const planName = planDef?.label ?? rawTool.planId;
    const category = toolDef?.category ?? "other";

    const isUsageBased = planDef?.pricingModel === "usage-based";
    const isApiPlan = planDef?.metadata?.isApiPlan ?? false;
    const isCustomPriced = planDef?.requiresCustomPricing ?? false;

    const baselineEffectiveMonthlyCostPerSeat =
      getFixedMonthlyEquivalentPrice(
        rawTool.toolId,
        rawTool.planId,
        rawTool.billingCycle,
      ) ?? null;

    const expectedTotalMonthlySpend = isUsageBased
      ? null
      : estimateOfficialMonthlySpend(
          rawTool.toolId,
          rawTool.planId,
          rawTool.seatCount,
          rawTool.billingCycle,
        ) ?? null;

    const declaredMonthlySpend = rawTool.monthlySpend;
    
    // Discrepancy > 0 means they are paying more than they mathematically should.
    // Discrepancy < 0 means they are paying less (e.g. legacy discount or enterprise).
    const spendDiscrepancyAmount =
      expectedTotalMonthlySpend !== null
        ? declaredMonthlySpend - expectedTotalMonthlySpend
        : 0;

    totalDeclaredSpend += declaredMonthlySpend;
    
    if (expectedTotalMonthlySpend !== null) {
      totalExpectedSpend += expectedTotalMonthlySpend;
      totalDiscrepancyAmount += spendDiscrepancyAmount;
    }

    return {
      instanceId: rawTool.instanceId,
      toolId: rawTool.toolId,
      toolName,
      planId: rawTool.planId,
      planName,
      category,
      declaredSeats: rawTool.seatCount,
      declaredMonthlySpend,
      pricingSource: rawTool.pricingSource,
      billingCycle: rawTool.billingCycle,
      baselineEffectiveMonthlyCostPerSeat,
      expectedTotalMonthlySpend,
      spendDiscrepancyAmount,
      isCustomPriced,
      isUsageBased,
      isApiPlan,
    };
  });

  return {
    team: {
      teamSize: formData.team.teamSize,
      primaryUseCase: formData.team.primaryUseCase,
      departmentsUsingAi: formData.team.departmentsUsingAi,
    },
    tools: normalizedTools,
    aggregates: {
      totalDeclaredSpend,
      totalExpectedSpend,
      totalDiscrepancyAmount,
    },
  };
}
