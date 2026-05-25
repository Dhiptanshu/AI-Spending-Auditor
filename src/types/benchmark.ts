export type BenchmarkPercentile = "highly-optimized" | "average" | "over-provisioned";

export interface BenchmarkResult {
  spendPerSeat: number;
  averageIndustrySpendPerSeat: number;
  percentileRanking: BenchmarkPercentile;
  comparativeInsight: string;
}
