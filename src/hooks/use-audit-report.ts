import { useState, useEffect, useRef } from "react";
import { parsePersistedAuditData, readAuditStorage, AUDIT_SUBMISSION_STORAGE_KEY } from "@/lib/audit/storage";
import { normalizeAuditPayload } from "@/lib/audit/normalize";
import { generateAuditReport } from "@/lib/audit/engine";
import type { AuditEngineResult } from "@/types/engine";

type ReportState =
  | { status: "loading" | "error"; report: null; shareId?: never; error?: string }
  | { status: "success"; report: AuditEngineResult; shareId: string | null; error?: never };

export function useAuditReport(): ReportState {
  const [state, setState] = useState<ReportState>({ status: "loading", report: null });
  const hasSaved = useRef(false);

  useEffect(() => {
    const persisted = parsePersistedAuditData(readAuditStorage(AUDIT_SUBMISSION_STORAGE_KEY));
    const submission = persisted?.data;

    if (!submission || submission.tools.length === 0) {
      setState({
        status: "error",
        report: null,
        error: "No audit data found. Please complete the form first.",
      });
      return;
    }

    try {
      // 1. Hydrate the raw UI data into verified mathematical baselines
      const normalized = normalizeAuditPayload(submission);
      
      // 2. Run the deterministic recommendation pipeline
      const report = generateAuditReport(normalized);
      
      setState({ status: "success", report, shareId: null });

      // 3. Fire-and-forget background save to Supabase
      if (!hasSaved.current) {
        hasSaved.current = true;
        fetch("/api/audit/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ payload: normalized, engineResult: report })
        })
        .then(res => res.json())
        .then(data => {
          if (data.shareId) {
            console.log("Audit saved securely! Share ID:", data.shareId);
            setState(prev => prev.status === "success" ? { ...prev, shareId: data.shareId } : prev);
          }
        })
        .catch(err => console.error("Background save failed:", err));
      }
    } catch (err) {
      console.error("Failed to generate audit report:", err);
      setState({
        status: "error",
        report: null,
        error: "An error occurred while calculating your results.",
      });
    }
  }, []);

  return state;
}
