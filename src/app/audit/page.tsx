import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";
import { AuditFormShell } from "@/components/audit/audit-form-shell";

export default function AuditPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Start audit"
          description="The audit flow now has a lightweight local state and persistence foundation."
        />
        <AuditFormShell />
      </div>
    </AppShell>
  );
}
