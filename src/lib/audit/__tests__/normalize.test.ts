import { describe, it, expect } from "vitest";
import { normalizeAuditPayload } from "../normalize";
import type { AuditFormData } from "@/types/audit";

describe("normalizeAuditPayload", () => {
  it("should normalize a monthly standard plan and compute expected spend correctly", () => {
    const rawData: AuditFormData = {
      team: {
        teamSize: 10,
        primaryUseCase: "coding",
        departmentsUsingAi: [],
      },
      tools: [
        {
          instanceId: "tool-1",
          toolId: "cursor",
          planId: "teams", // $40/mo per user monthly
          billingCycle: "monthly",
          seatCount: 10,
          monthlySpend: 400,
          pricingSource: "official",
        },
      ],
    };

    const normalized = normalizeAuditPayload(rawData);

    expect(normalized.team.teamSize).toBe(10);
    expect(normalized.tools.length).toBe(1);

    const cursor = normalized.tools[0];
    expect(cursor.baselineEffectiveMonthlyCostPerSeat).toBe(40);
    expect(cursor.expectedTotalMonthlySpend).toBe(400); // 10 * 40
    expect(cursor.spendDiscrepancyAmount).toBe(0); // 400 - 400

    expect(normalized.aggregates.totalDeclaredSpend).toBe(400);
    expect(normalized.aggregates.totalExpectedSpend).toBe(400);
    expect(normalized.aggregates.totalDiscrepancyAmount).toBe(0);
  });

  it("should detect a price discrepancy (overpaying)", () => {
    const rawData: AuditFormData = {
      team: {
        teamSize: 5,
        primaryUseCase: "coding",
        departmentsUsingAi: [],
      },
      tools: [
        {
          instanceId: "tool-1",
          toolId: "github-copilot",
          planId: "business", // $19/mo per user monthly
          billingCycle: "monthly",
          seatCount: 5,
          monthlySpend: 150, // User declares 150, but it should be 5 * 19 = 95
          pricingSource: "user-override",
        },
      ],
    };

    const normalized = normalizeAuditPayload(rawData);
    const tool = normalized.tools[0];

    expect(tool.expectedTotalMonthlySpend).toBe(95);
    expect(tool.spendDiscrepancyAmount).toBe(55); // 150 - 95
    expect(normalized.aggregates.totalDiscrepancyAmount).toBe(55);
  });
});
