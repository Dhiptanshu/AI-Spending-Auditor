import type { PrimaryUseCase } from "@/config/audit-options";
import type { BillingCycle } from "@/types/audit";
import type { BenchmarkResult } from "@/types/benchmark";

export type PricingSource = "official" | "custom-enterprise" | "user-override";

export type NormalizedToolEntry = {
  instanceId: string;
  // Hydrated metadata
  toolId: string;
  toolName: string;
  planId: string;
  planName: string;
  category: string;
  
  // Mathematical Truths
  declaredSeats: number;
  declaredMonthlySpend: number;
  pricingSource: PricingSource;
  billingCycle: BillingCycle;
  
  // Computed Engine Baselines
  baselineEffectiveMonthlyCostPerSeat: number | null; // null if API/Usage based
  expectedTotalMonthlySpend: number | null;
  spendDiscrepancyAmount: number; // positive = overpaying, negative = underpaying
  
  // Flags for the rule engine
  isCustomPriced: boolean;
  isUsageBased: boolean;
  isApiPlan: boolean;
};

export type NormalizedAuditPayload = {
  team: {
    teamSize: number;
    primaryUseCase: PrimaryUseCase;
    departmentsUsingAi: string[];
  };
  tools: NormalizedToolEntry[];
  aggregates: {
    totalDeclaredSpend: number;
    totalExpectedSpend: number;
    totalDiscrepancyAmount: number;
  };
};

export type RecommendationCategory = 
  | "annual-billing"
  | "downgrade-plan"
  | "tool-consolidation"
  | "seat-optimization"
  | "api-transition"
  | "price-discrepancy";

export type AuditRecommendation = {
  id: string; 
  relatedInstanceIds: string[]; 
  category: RecommendationCategory;
  
  title: string; 
  description: string; 
  rationale: string; 
  
  monthlySavings: number; 
  annualSavings: number;  
  
  confidence: "high" | "medium" | "low"; 
};

export type AuditEngineResult = {
  currentMonthlySpend: number;
  optimizedMonthlySpend: number;
  totalMonthlySavings: number;
  totalAnnualSavings: number;
  recommendations: AuditRecommendation[];
  benchmark: BenchmarkResult;
};

export type AuditRule = (payload: NormalizedAuditPayload) => AuditRecommendation[];
