import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";
import { AuditFormShell } from "@/components/audit/audit-form-shell";

export default function AuditPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Start AI spend audit"
          description="Enter your team context and AI tool spend to prepare a savings and risk review."
        />
        <AuditFormShell />
      </div>
    </AppShell>
  );
}
