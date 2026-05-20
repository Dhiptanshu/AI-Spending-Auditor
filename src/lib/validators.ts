import { SUPPORTED_AUDIT_FILE_TYPES } from "@/lib/constants";

export function isSupportedAuditFile(filename: string) {
  return SUPPORTED_AUDIT_FILE_TYPES.some((extension) =>
    filename.toLowerCase().endsWith(extension),
  );
}
