import type { AuditFormData, AuditResult } from "@/types/audit";

export function calculateAuditResults(input: AuditFormData): AuditResult {
  void input;

  return {
    totalMonthlySpend: 0,
    estimatedMonthlySavings: 0,
    estimatedAnnualSavings: 0,
    recommendations: [],
  };
}
