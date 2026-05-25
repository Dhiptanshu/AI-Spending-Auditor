import { auditRules } from "./rules";
import { calculateBenchmark } from "./benchmark-engine";
import type { NormalizedAuditPayload, AuditEngineResult } from "@/types/engine";

export function generateAuditReport(payload: NormalizedAuditPayload): AuditEngineResult {
  // 1. Run all rules to generate recommendations
  const allRecommendations = auditRules.flatMap((rule) => rule(payload));

  // 2. Sort recommendations by highest savings first
  const sortedRecommendations = allRecommendations.sort(
    (a, b) => b.monthlySavings - a.monthlySavings
  );

  // 3. Calculate aggregate savings
  const totalMonthlySavings = sortedRecommendations.reduce(
    (sum, rec) => sum + rec.monthlySavings,
    0
  );
  const totalAnnualSavings = totalMonthlySavings * 12;

  // 4. Determine final costs
  const currentMonthlySpend = payload.aggregates.totalDeclaredSpend;
  const optimizedMonthlySpend = Math.max(0, currentMonthlySpend - totalMonthlySavings);

  // 5. Calculate industry benchmarks
  const benchmark = calculateBenchmark(payload);

  return {
    currentMonthlySpend,
    optimizedMonthlySpend,
    totalMonthlySavings,
    totalAnnualSavings,
    recommendations: sortedRecommendations,
    benchmark,
  };
}
