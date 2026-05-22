import { checkAnnualBilling } from "./check-annual-billing";
import { checkPriceDiscrepancy } from "./check-price-discrepancy";
import type { AuditRule } from "@/types/engine";

// The order of rules doesn't strictly matter as they are independent pure functions
export const auditRules: AuditRule[] = [
  checkAnnualBilling,
  checkPriceDiscrepancy,
];
