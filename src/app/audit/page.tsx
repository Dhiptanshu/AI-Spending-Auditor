import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";

export default function AuditPage() {
  return (
    <AppShell>
      <PageHeading
        title="Start audit"
        description="This route is ready for the audit intake workflow when the MVP form is built."
      />
    </AppShell>
  );
}
