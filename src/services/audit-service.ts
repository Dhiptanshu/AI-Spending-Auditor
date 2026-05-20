import type { Audit, AuditFinding } from "@/types/audit";

export async function listAudits(): Promise<Audit[]> {
  return [];
}

export async function listAuditFindings(
  auditId: string,
): Promise<AuditFinding[]> {
  void auditId;
  return [];
}
