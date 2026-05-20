import { AuditUploadForm } from "@/components/audits/audit-upload-form";
import { AppShell } from "@/components/layout/app-shell";
import { EmptyState } from "@/components/shared/empty-state";
import { PageHeading } from "@/components/shared/page-heading";

export default function AuditsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Audits"
          description="Upload spend data and review audit results as the workflow grows."
        />
        <AuditUploadForm />
        <EmptyState
          title="No audits yet"
          description="Uploaded files and generated findings will appear here."
        />
      </div>
    </AppShell>
  );
}
