export type AuditStatus = "pending" | "processing" | "completed" | "failed";

export type RiskLevel = "low" | "medium" | "high" | "critical";

export type BillingCycle = "monthly" | "annual";

export type AiToolCategory =
  | "chat"
  | "coding"
  | "image"
  | "video"
  | "meeting"
  | "search"
  | "automation"
  | "other";

export type AiTool = {
  id: string;
  name: string;
  category: AiToolCategory;
  planName?: string;
  seats: number;
  activeUsers?: number;
  monthlySpend: number;
  billingCycle: BillingCycle;
  ownerTeam?: string;
  notes?: string;
};

export type TeamInfo = {
  companyName?: string;
  teamSize: number;
  departmentsUsingAi: string[];
};

export type AuditFormData = {
  team: TeamInfo;
  tools: AiTool[];
};

export type RecommendationSeverity = "low" | "medium" | "high";

export type AuditRecommendation = {
  id: string;
  title: string;
  description: string;
  severity: RecommendationSeverity;
  estimatedMonthlySavings?: number;
  relatedToolIds: string[];
};

export type AuditResult = {
  totalMonthlySpend: number;
  estimatedMonthlySavings: number;
  estimatedAnnualSavings: number;
  recommendations: AuditRecommendation[];
};

export type PersistedAuditData = {
  schemaVersion: 1;
  updatedAt: string;
  data: AuditFormData;
};

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
