export type AuditStatus = "pending" | "processing" | "completed" | "failed";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type Audit = {
  id: string;
  name: string;
  status: AuditStatus;
  createdAt: string;
  findingCount: number;
};

export type AuditFinding = {
  id: string;
  title: string;
  vendorName: string;
  riskLevel: RiskLevel;
  description: string;
};
