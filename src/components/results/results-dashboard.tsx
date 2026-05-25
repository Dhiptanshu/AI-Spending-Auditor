"use client";

import { useAuditReport } from "@/hooks/use-audit-report";
import { MetricsSummary } from "./metrics-summary";
import { RecommendationList } from "./recommendation-list";
import { AISummaryCard } from "./ai-summary-card";
import { BenchmarkCard } from "./benchmark-card";
import { ConversionCTA } from "./conversion-cta";
import { LeadCaptureGate } from "./lead-capture-gate";
import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { PdfExportButton } from "./pdf-export-button";

export function ResultsDashboard() {
  const { status, report, shareId, error } = useAuditReport();

  if (status === "loading") {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-3">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
        <p className="text-xs text-muted-foreground">Calculating your audit...</p>
      </div>
    );
  }

  if (status === "error" || !report) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-border/70 bg-card/50 p-8 text-center">
        <p className="text-sm font-medium text-destructive">{error}</p>
        <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
          <ArrowLeft className="mr-1.5 size-3.5" />
          Return to form
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">Audit Results</h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            Review your optimized spend and actionable recommendations.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <PdfExportButton report={report} />
          <Link
            href="/audit"
            className={buttonVariants({ variant: "outline", size: "sm", className: "h-8 px-3 text-xs" })}
          >
            <ArrowLeft className="mr-1.5 size-3.5" />
            Edit inputs
          </Link>
        </div>
      </div>

      {/* AI Summary */}
      <AISummaryCard report={report} />

      {/* Financial metrics */}
      <MetricsSummary
        currentMonthlySpend={report.currentMonthlySpend}
        optimizedMonthlySpend={report.optimizedMonthlySpend}
        totalAnnualSavings={report.totalAnnualSavings}
      />

      {/* Benchmark */}
      <BenchmarkCard benchmark={report.benchmark} />

      {/* Recommendations (gated) */}
      <LeadCaptureGate shareId={shareId ?? null}>
        <RecommendationList recommendations={report.recommendations} />
        <ConversionCTA report={report} />
      </LeadCaptureGate>
    </div>
  );
}
