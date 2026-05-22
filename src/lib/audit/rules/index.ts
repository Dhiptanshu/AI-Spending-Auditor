import { checkAnnualBilling } from "./check-annual-billing";
import { checkPriceDiscrepancy } from "./check-price-discrepancy";
import { checkConsolidation } from "./check-consolidation";
import { checkEnterpriseTier } from "./check-enterprise-tier";
import type { AuditRule } from "@/types/engine";

export const auditRules: AuditRule[] = [
  checkAnnualBilling,
  checkPriceDiscrepancy,
  checkConsolidation,
  checkEnterpriseTier,
];
