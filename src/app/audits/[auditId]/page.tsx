import { AuditResultsTable } from "@/components/audits/audit-results-table";
import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";
import { listAuditFindings } from "@/services/audit-service";

type AuditDetailPageProps = {
  params: Promise<{
    auditId: string;
  }>;
};

export default async function AuditDetailPage({
  params,
}: AuditDetailPageProps) {
  const { auditId } = await params;
  const findings = await listAuditFindings(auditId);

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Audit detail"
          description="A route shell for reviewing vendor findings and risk context."
        />
        <AuditResultsTable findings={findings} />
      </div>
    </AppShell>
  );
}
