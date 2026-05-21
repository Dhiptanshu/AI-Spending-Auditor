import * as z from "zod";
import { PRIMARY_USE_CASES, SUPPORTED_AUDIT_TOOL_IDS } from "@/config/audit-options";

export const aiToolSchema = z.object({
  instanceId: z.string().min(1, "Instance ID is required"),
  toolId: z.enum(SUPPORTED_AUDIT_TOOL_IDS, {
    message: "Please select an AI tool",
  }),
  planId: z.string().min(1, "Please select a plan"),
  billingCycle: z.enum(["monthly", "annual"]),
  seatCount: z
    .number()
    .int("Seat count must be a whole number")
    .min(1, "Must have at least 1 seat"),
  monthlySpend: z
    .number()
    .min(0, "Spend cannot be negative"),
  pricingSource: z.enum(["official", "user-override", "custom-enterprise"]),
  userOverrideMonthlySpend: z.number().min(0).optional(),
  notes: z.string().optional(),
});

export const teamInfoSchema = z.object({
  companyName: z.string().optional(),
  teamSize: z
    .number()
    .int("Team size must be a whole number")
    .min(1, "Team size must be at least 1")
    .max(100000, "Please contact support for massive enterprise teams"),
  primaryUseCase: z.enum(PRIMARY_USE_CASES, {
    message: "Please select a primary use case",
  }),
  departmentsUsingAi: z.array(z.string()),
});

export const auditFormSchema = z.object({
  team: teamInfoSchema,
  tools: z
    .array(aiToolSchema)
    .min(1, "Please add at least one AI tool to audit"),
});

export type AuditFormValues = z.infer<typeof auditFormSchema>;
