import type { NormalizedAuditPayload } from "@/types/engine";
import type { BenchmarkResult } from "@/types/benchmark";

export function calculateBenchmark(payload: NormalizedAuditPayload): BenchmarkResult {
  // 1. Calculate realistic active AI seats
  // We look at the tool with the highest seat count to determine the "active AI workforce" size.
  const maxSeats = Math.max(
    ...payload.tools.map((t) => t.declaredSeats),
    1
  );
  
  // Cap it at team size to prevent logical impossibilities
  const activeAiSeats = Math.min(maxSeats, payload.team.teamSize);

  // 2. Calculate Spend per AI User
  const spendPerSeat = payload.aggregates.totalDeclaredSpend / activeAiSeats;

  // 3. Define Heuristics based on primary use case
  // In a real app, this comes from an aggregated database. For MVP, we use logical industry estimates.
  let averageIndustrySpendPerSeat = 35; 
  
  if (payload.team.primaryUseCase === "coding") {
    // Developers usually need an IDE (Cursor $20) + Chat (Claude/ChatGPT $20)
    averageIndustrySpendPerSeat = 45;
  } else if (payload.team.primaryUseCase === "research" || payload.team.primaryUseCase === "data") {
    averageIndustrySpendPerSeat = 50;
  } else if (payload.team.primaryUseCase === "writing") {
    averageIndustrySpendPerSeat = 30;
  }

  // 4. Determine Percentile
  let percentileRanking: BenchmarkResult["percentileRanking"] = "average";
  let comparativeInsight = "";

  if (spendPerSeat < averageIndustrySpendPerSeat * 0.7) {
    percentileRanking = "highly-optimized";
    comparativeInsight = `Your team is in the top 20% of optimized startups. At $${spendPerSeat.toFixed(0)}/user, your AI stack is extremely lean compared to the industry average of $${averageIndustrySpendPerSeat}/user for ${payload.team.primaryUseCase} teams.`;
  } else if (spendPerSeat > averageIndustrySpendPerSeat * 1.4) {
    percentileRanking = "over-provisioned";
    comparativeInsight = `Your team is spending $${spendPerSeat.toFixed(0)}/user, which is significantly higher than the typical $${averageIndustrySpendPerSeat}/user for similar ${payload.team.primaryUseCase} startups. You likely have overlapping subscriptions or unutilized licenses.`;
  } else {
    percentileRanking = "average";
    comparativeInsight = `Your spend of $${spendPerSeat.toFixed(0)}/user is right in line with the industry average of $${averageIndustrySpendPerSeat}/user for ${payload.team.primaryUseCase} teams. There may still be minor optimization opportunities.`;
  }

  return {
    spendPerSeat,
    averageIndustrySpendPerSeat,
    percentileRanking,
    comparativeInsight,
  };
}
