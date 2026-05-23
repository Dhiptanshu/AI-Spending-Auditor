import { useState, useEffect } from "react";
import { usePersistentAuditDraft } from "./use-persistent-audit-draft";
import { normalizeAuditPayload } from "@/lib/audit/normalize";
import { generateAuditReport } from "@/lib/audit/engine";
import type { AuditEngineResult } from "@/types/engine";

type ReportState =
  | { status: "loading" | "error"; report: null; error?: string }
  | { status: "success"; report: AuditEngineResult; error?: never };

export function useAuditReport(): ReportState {
  const { draft, isLoaded } = usePersistentAuditDraft();
  const [state, setState] = useState<ReportState>({ status: "loading", report: null });

  useEffect(() => {
    if (!isLoaded) return;

    if (!draft || draft.tools.length === 0) {
      setState({
        status: "error",
        report: null,
        error: "No audit data found. Please complete the form first.",
      });
      return;
    }

    try {
      // 1. Hydrate the raw UI data into verified mathematical baselines
      const normalized = normalizeAuditPayload(draft);
      
      // 2. Run the deterministic recommendation pipeline
      const report = generateAuditReport(normalized);
      
      setState({ status: "success", report });
    } catch (err) {
      console.error("Failed to generate audit report:", err);
      setState({
        status: "error",
        report: null,
        error: "An error occurred while calculating your results.",
      });
    }
  }, [draft, isLoaded]);

  return state;
}
