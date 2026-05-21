import { defaultAuditFormData } from "@/lib/audit/defaults";
import { PRIMARY_USE_CASES, type PrimaryUseCase } from "@/config/audit-options";
import type {
  AiTool,
  AuditFormData,
  BillingCycle,
  PersistedAuditData,
} from "@/types/audit";

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

export function readAuditStorage(key: string) {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeAuditStorage(key: string, value: PersistedAuditData) {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeAuditStorage(key: string) {
  try {
    window.localStorage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function normalizePrimaryUseCase(value: unknown): PrimaryUseCase {
  return PRIMARY_USE_CASES.includes(value as PrimaryUseCase)
    ? (value as PrimaryUseCase)
    : defaultAuditFormData.team.primaryUseCase;
}

function normalizeBillingCycle(value: unknown): BillingCycle {
  return value === "annual" ? "annual" : "monthly";
}

function normalizeTools(value: unknown): AiTool[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.map((tool) => ({
    ...tool,
    billingCycle: normalizeBillingCycle((tool as Partial<AiTool>).billingCycle),
  })) as AiTool[];
}

function normalizeAuditFormData(data: Partial<AuditFormData>): AuditFormData {
  return {
    ...defaultAuditFormData,
    ...data,
    team: {
      ...defaultAuditFormData.team,
      ...data.team,
      teamSize:
        typeof data.team?.teamSize === "number" && data.team.teamSize > 0
          ? data.team.teamSize
          : defaultAuditFormData.team.teamSize,
      primaryUseCase: normalizePrimaryUseCase(data.team?.primaryUseCase),
      departmentsUsingAi: Array.isArray(data.team?.departmentsUsingAi)
        ? data.team.departmentsUsingAi
        : defaultAuditFormData.team.departmentsUsingAi,
    },
    tools: normalizeTools(data.tools),
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
      data: normalizeAuditFormData(parsed.data),
    };
  } catch {
    return null;
  }
}
