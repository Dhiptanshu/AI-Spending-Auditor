import type { RiskLevel } from "@/types/audit";

export type Vendor = {
  id: string;
  name: string;
  category: "model" | "productivity" | "developer-tooling" | "infrastructure";
  monthlySpend: number;
  riskLevel: RiskLevel;
};
