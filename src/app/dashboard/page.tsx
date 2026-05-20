import { AppShell } from "@/components/layout/app-shell";
import { SpendSummary } from "@/components/dashboard/spend-summary";
import { RiskScoreCard } from "@/components/dashboard/risk-score-card";
import { PageHeading } from "@/components/shared/page-heading";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Dashboard"
          description="A lightweight route shell for the core AI spend audit overview."
        />
        <SpendSummary monthlySpend={0} potentialSavings={0} />
        <RiskScoreCard level="low" score={0} />
      </div>
    </AppShell>
  );
}
