import type { AuditFormData } from "@/types/audit";

export const defaultAuditFormData: AuditFormData = {
  team: {
    companyName: "",
    teamSize: 1,
    primaryUseCase: "mixed",
    departmentsUsingAi: [],
  },
  tools: [],
};
