"use client";

import { useCallback, useEffect, useState } from "react";

import { defaultAuditFormData } from "@/lib/audit/defaults";
import {
  AUDIT_DRAFT_STORAGE_KEY,
  AUDIT_SUBMISSION_STORAGE_KEY,
  createPersistedAuditData,
  parsePersistedAuditData,
  readAuditStorage,
  removeAuditStorage,
  writeAuditStorage,
} from "@/lib/audit/storage";
import type { AuditFormData } from "@/types/audit";

type PersistentAuditDraftState = {
  draft: AuditFormData;
  isLoaded: boolean;
  updatedAt?: string;
  storageError?: string;
  setDraft: (draft: AuditFormData) => void;
  saveSubmission: (submission: AuditFormData) => void;
  clearDraft: () => void;
};

export function usePersistentAuditDraft(): PersistentAuditDraftState {
  const [draft, setDraftState] = useState<AuditFormData>(defaultAuditFormData);
  const [isLoaded, setIsLoaded] = useState(false);
  const [updatedAt, setUpdatedAt] = useState<string>();
  const [storageError, setStorageError] = useState<string>();

  useEffect(() => {
    const persisted = parsePersistedAuditData(
      readAuditStorage(AUDIT_DRAFT_STORAGE_KEY),
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
      const didWrite = writeAuditStorage(AUDIT_DRAFT_STORAGE_KEY, persisted);

      if (didWrite) {
        setUpdatedAt(persisted.updatedAt);
        setStorageError(undefined);
      } else {
        setStorageError("Unable to save audit draft in this browser.");
      }
    }, 400);

    return () => window.clearTimeout(timeoutId);
  }, [draft, isLoaded]);

  const setDraft = useCallback((nextDraft: AuditFormData) => {
    setDraftState(nextDraft);
  }, []);

  const saveSubmission = useCallback((submission: AuditFormData) => {
    const persisted = createPersistedAuditData(submission);
    const didWrite = writeAuditStorage(AUDIT_SUBMISSION_STORAGE_KEY, persisted);

    removeAuditStorage(AUDIT_DRAFT_STORAGE_KEY);
    setDraftState(submission);
    setUpdatedAt(persisted.updatedAt);

    if (didWrite) {
      setStorageError(undefined);
    } else {
      setStorageError("Unable to save audit submission in this browser.");
    }
  }, []);

  const clearDraft = useCallback(() => {
    removeAuditStorage(AUDIT_DRAFT_STORAGE_KEY);
    setDraftState(defaultAuditFormData);
    setUpdatedAt(undefined);
    setStorageError(undefined);
  }, []);

  return {
    draft,
    isLoaded,
    updatedAt,
    storageError,
    setDraft,
    saveSubmission,
    clearDraft,
  };
}
