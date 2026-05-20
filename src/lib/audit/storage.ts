import { defaultAuditFormData } from "@/lib/audit/defaults";
import type { AuditFormData, PersistedAuditData } from "@/types/audit";

export const AUDIT_DRAFT_STORAGE_KEY = "ai-spend-audit:draft";
export const AUDIT_SUBMISSION_STORAGE_KEY = "ai-spend-audit:submission";

const CURRENT_SCHEMA_VERSION = 1;

export function createPersistedAuditData(
  data: AuditFormData,
): PersistedAuditData {
  return {
    schemaVersion: CURRENT_SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    data,
  };
}

export function parsePersistedAuditData(
  value: string | null,
): PersistedAuditData | null {
  if (!value) {
    return null;
  }

  try {
    const parsed = JSON.parse(value) as Partial<PersistedAuditData>;

    if (
      parsed.schemaVersion !== CURRENT_SCHEMA_VERSION ||
      !parsed.updatedAt ||
      !parsed.data
    ) {
      return null;
    }

    return {
      schemaVersion: CURRENT_SCHEMA_VERSION,
      updatedAt: parsed.updatedAt,
      data: {
        ...defaultAuditFormData,
        ...parsed.data,
        team: {
          ...defaultAuditFormData.team,
          ...parsed.data.team,
        },
        tools: Array.isArray(parsed.data.tools) ? parsed.data.tools : [],
      },
    };
  } catch {
    return null;
  }
}
