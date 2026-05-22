import { describe, it, expect } from "vitest";
import { checkPriceDiscrepancy } from "../check-price-discrepancy";
import type { NormalizedAuditPayload } from "@/types/engine";

describe("checkPriceDiscrepancy", () => {
  it("should flag when a user is paying more than the standard official price", () => {
    const payload = {
      tools: [
        {
          instanceId: "tool-1",
          toolId: "github-copilot",
          toolName: "GitHub Copilot",
          planId: "business",
          planName: "Business",
          category: "coding",
          declaredSeats: 10,
          declaredMonthlySpend: 250, // User says they spend $250
          expectedTotalMonthlySpend: 190, // It should be $19/seat * 10 = $190
          spendDiscrepancyAmount: 60, // 250 - 190 = 60
          pricingSource: "user-override",
          billingCycle: "monthly",
          isCustomPriced: false,
          isUsageBased: false,
          isApiPlan: false,
        },
      ],
    } as NormalizedAuditPayload;

    const recommendations = checkPriceDiscrepancy(payload);

    expect(recommendations.length).toBe(1);
    expect(recommendations[0].category).toBe("price-discrepancy");
    expect(recommendations[0].monthlySavings).toBe(60);
    expect(recommendations[0].annualSavings).toBe(720);
  });

  it("should ignore tools where there is no discrepancy or negative discrepancy (legacy pricing)", () => {
    const payload = {
      tools: [
        {
          instanceId: "tool-1",
          toolId: "github-copilot",
          spendDiscrepancyAmount: 0,
          isCustomPriced: false,
          isUsageBased: false,
          expectedTotalMonthlySpend: 190,
        },
        {
          instanceId: "tool-2",
          toolId: "cursor",
          spendDiscrepancyAmount: -20, // Negative discrepancy (e.g., grandfathered)
          isCustomPriced: false,
          isUsageBased: false,
          expectedTotalMonthlySpend: 200,
        },
        {
          instanceId: "tool-3",
          toolId: "claude",
          isCustomPriced: true, // Should be ignored
          spendDiscrepancyAmount: 50,
          isUsageBased: false,
          expectedTotalMonthlySpend: 200,
        },
      ],
    } as unknown as NormalizedAuditPayload;

    const recommendations = checkPriceDiscrepancy(payload);
    expect(recommendations.length).toBe(0);
  });
});
