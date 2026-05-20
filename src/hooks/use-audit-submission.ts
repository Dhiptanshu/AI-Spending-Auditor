"use client";

import { useEffect, useState } from "react";

import {
  AUDIT_SUBMISSION_STORAGE_KEY,
  parsePersistedAuditData,
} from "@/lib/audit/storage";
import type { PersistedAuditData } from "@/types/audit";

export function useAuditSubmission() {
  const [submission, setSubmission] = useState<PersistedAuditData | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setSubmission(
      parsePersistedAuditData(
        window.localStorage.getItem(AUDIT_SUBMISSION_STORAGE_KEY),
      ),
    );
    setIsLoaded(true);
  }, []);

  return {
    submission,
    isLoaded,
  };
}
