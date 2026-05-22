import { describe, it, expect } from "vitest";
import { checkAnnualBilling } from "../check-annual-billing";
import type { NormalizedAuditPayload } from "@/types/engine";

describe("checkAnnualBilling", () => {
  it("should recommend annual billing when a monthly plan has a cheaper annual equivalent", () => {
    const payload = {
      team: { teamSize: 10, primaryUseCase: "coding", departmentsUsingAi: [] },
      aggregates: { totalDeclaredSpend: 400, totalExpectedSpend: 400, totalDiscrepancyAmount: 0 },
      tools: [
        {
          instanceId: "tool-1",
          toolId: "cursor",
          toolName: "Cursor",
          planId: "teams", // Monthly = 40, Annual = 32
          planName: "Teams",
          category: "coding",
          declaredSeats: 10,
          declaredMonthlySpend: 400, // 10 * 40
          pricingSource: "official",
          billingCycle: "monthly",
          baselineEffectiveMonthlyCostPerSeat: 40,
          expectedTotalMonthlySpend: 400,
          spendDiscrepancyAmount: 0,
          isCustomPriced: false,
          isUsageBased: false,
          isApiPlan: false,
        },
      ],
    } as NormalizedAuditPayload;

    const recommendations = checkAnnualBilling(payload);

    expect(recommendations.length).toBe(1);
    const rec = recommendations[0];
    
    expect(rec.category).toBe("annual-billing");
    // $400 monthly -> $320 annual equivalent (10 * 32)
    // Savings = $80/mo
    expect(rec.monthlySavings).toBe(80); 
    expect(rec.annualSavings).toBe(960);
  });

  it("should ignore tools already on annual billing", () => {
    const payload = {
      team: { teamSize: 10, primaryUseCase: "coding", departmentsUsingAi: [] },
      aggregates: { totalDeclaredSpend: 320, totalExpectedSpend: 320, totalDiscrepancyAmount: 0 },
      tools: [
        {
          instanceId: "tool-1",
          toolId: "cursor",
          toolName: "Cursor",
          planId: "teams", 
          planName: "Teams",
          category: "coding",
          declaredSeats: 10,
          declaredMonthlySpend: 320,
          pricingSource: "official",
          billingCycle: "annual", // <--- already annual
          baselineEffectiveMonthlyCostPerSeat: 32,
          expectedTotalMonthlySpend: 320,
          spendDiscrepancyAmount: 0,
          isCustomPriced: false,
          isUsageBased: false,
          isApiPlan: false,
        },
      ],
    } as NormalizedAuditPayload;

    const recommendations = checkAnnualBilling(payload);
    expect(recommendations.length).toBe(0);
  });
});
