"use client";

import { useAuditReport } from "@/hooks/use-audit-report";
import { MetricsSummary } from "./metrics-summary";
import { RecommendationList } from "./recommendation-list";
import { AISummaryCard } from "./ai-summary-card";
import { ConversionCTA } from "./conversion-cta";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";

export function ResultsDashboard() {
  const { status, report, error } = useAuditReport();

  if (status === "loading") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
        <p className="text-sm text-muted-foreground">Calculating your audit...</p>
      </div>
    );
  }

  if (status === "error" || !report) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center space-y-4 rounded-lg border border-dashed p-8 text-center">
        <p className="text-red-500 font-medium">{error}</p>
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          <ArrowLeft className="mr-2 size-4" />
          Return to Form
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Audit Results</h1>
          <p className="text-muted-foreground mt-1">
            Review your optimized spend and actionable recommendations.
          </p>
        </div>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
          <ArrowLeft className="mr-2 size-4" />
          Edit inputs
        </Link>
      </div>

      <AISummaryCard report={report} />

      <MetricsSummary
        currentMonthlySpend={report.currentMonthlySpend}
        optimizedMonthlySpend={report.optimizedMonthlySpend}
        totalAnnualSavings={report.totalAnnualSavings}
      />

      <RecommendationList recommendations={report.recommendations} />

      <ConversionCTA report={report} />
    </div>
  );
}
