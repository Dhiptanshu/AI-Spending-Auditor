import type { AuditFormData } from "@/types/audit";

export function hasMinimumAuditInput(data: AuditFormData) {
  return data.tools.length > 0 && data.team.teamSize > 0;
}
