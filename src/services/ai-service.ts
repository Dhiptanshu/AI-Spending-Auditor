export type SpendAuditPromptInput = {
  vendorName: string;
  monthlySpend: number;
  notes?: string;
};

export async function summarizeSpendRisk(input: SpendAuditPromptInput) {
  void input;
  throw new Error("AI provider is not configured yet.");
}
