import { AppShell } from "@/components/layout/app-shell";
import { ResultsShell } from "@/components/results/results-shell";
import { PageHeading } from "@/components/shared/page-heading";

export default function ResultsPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Audit results"
          description="Results will read from the submitted audit snapshot and render calculated savings."
        />
        <ResultsShell />
      </div>
    </AppShell>
  );
}
