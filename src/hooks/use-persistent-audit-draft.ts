"use client";

import { useCallback, useEffect, useState } from "react";

import { defaultAuditFormData } from "@/lib/audit/defaults";
import {
  AUDIT_DRAFT_STORAGE_KEY,
  AUDIT_SUBMISSION_STORAGE_KEY,
  createPersistedAuditData,
  parsePersistedAuditData,
} from "@/lib/audit/storage";
import type { AuditFormData } from "@/types/audit";

type PersistentAuditDraftState = {
  draft: AuditFormData;
  isLoaded: boolean;
  updatedAt?: string;
  setDraft: (draft: AuditFormData) => void;
  saveSubmission: (submission: AuditFormData) => void;
  clearDraft: () => void;
};

export function usePersistentAuditDraft(): PersistentAuditDraftState {
  const [draft, setDraftState] = useState<AuditFormData>(defaultAuditFormData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>();

  useEffect(() => {
    const persisted = parsePersistedAuditData(
      window.localStorage.getItem(AUDIT_DRAFT_STORAGE_KEY),
    );

    if (persisted) {
      setDraftState(persisted.data);
      setUpdatedAt(persisted.updatedAt);
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      const persisted = createPersistedAuditData(draft);

      window.localStorage.setItem(
        AUDIT_DRAFT_STORAGE_KEY,
        JSON.stringify(persisted),
      );
      setUpdatedAt(persisted.updatedAt);
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [draft, isLoaded]);

  const setDraft = useCallback((nextDraft: AuditFormData) => {
    setDraftState(nextDraft);
  }, []);

  const saveSubmission = useCallback((submission: AuditFormData) => {
    const persisted = createPersistedAuditData(submission);

    window.localStorage.setItem(
      AUDIT_SUBMISSION_STORAGE_KEY,
      JSON.stringify(persisted),
    );
    window.localStorage.removeItem(AUDIT_DRAFT_STORAGE_KEY);
    setDraftState(submission);
    setUpdatedAt(persisted.updatedAt);
  }, []);

  const clearDraft = useCallback(() => {
    window.localStorage.removeItem(AUDIT_DRAFT_STORAGE_KEY);
    setDraftState(defaultAuditFormData);
    setUpdatedAt(undefined);
  }, []);

  return {
    draft,
    isLoaded,
    updatedAt,
    setDraft,
    saveSubmission,
    clearDraft,
  };
}
