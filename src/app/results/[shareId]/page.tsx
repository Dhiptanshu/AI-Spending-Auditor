import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { createClient } from "@supabase/supabase-js";

import { AISummaryCard } from "@/components/results/ai-summary-card";
import { MetricsSummary } from "@/components/results/metrics-summary";
import { BenchmarkCard } from "@/components/results/benchmark-card";
import { RecommendationList } from "@/components/results/recommendation-list";
import { PdfExportButton } from "@/components/results/pdf-export-button";
import { buttonVariants } from "@/components/ui/button";
import type { AuditEngineResult } from "@/types/engine";

// Initialize Supabase strictly for fetching the row safely on the server
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""
);

type Props = {
  params: Promise<{ shareId: string }>;
};

// Generate dynamic Open Graph metadata for social sharing
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const shareId = (await params).shareId;

  const { data, error } = await supabase
    .from("audits")
    .select("engine_result")
    .eq("public_share_id", shareId)
    .single();

  if (error || !data) {
    return { title: "Audit Not Found | Credex" };
  }

  const result = data.engine_result as AuditEngineResult;
  const savings = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(result.totalAnnualSavings);

  return {
    title: `AI Spend Audit: ${savings} in Annual Savings | Credex`,
    description: "View the full itemized breakdown of this AI stack optimization.",
    openGraph: {
      title: `${savings} in Annual Savings | Credex AI Audit`,
      description: "View the full itemized breakdown of this AI stack optimization.",
    },
  };
}

export default async function PublicSharePage({ params }: Props) {
  const shareId = (await params).shareId;

  // Server-side fetch (cached by Next.js App Router)
  const { data, error } = await supabase
    .from("audits")
    .select("engine_result, created_at")
    .eq("public_share_id", shareId)
    .single();

  if (error || !data) {
    notFound();
  }

  const report = data.engine_result as AuditEngineResult;

  return (
    <div className="mx-auto max-w-4xl space-y-8 py-8 animate-in fade-in-50 slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Stack Audit</h1>
          <p className="text-muted-foreground mt-1">
            Generated on {new Date(data.created_at).toLocaleDateString()}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <PdfExportButton report={report} />
          <Link href="/" className={buttonVariants({ variant: "outline" })}>
            Run your own audit
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </div>
      </div>

      <AISummaryCard report={report} />

      <MetricsSummary
        currentMonthlySpend={report.currentMonthlySpend}
        optimizedMonthlySpend={report.optimizedMonthlySpend}
        totalAnnualSavings={report.totalAnnualSavings}
      />

      <BenchmarkCard benchmark={report.benchmark} />

      <RecommendationList recommendations={report.recommendations} />

      <div className="mt-12 rounded-xl border bg-card p-8 text-center shadow-sm">
        <h3 className="mb-2 text-xl font-semibold tracking-tight">Want to see if your team is overpaying?</h3>
        <p className="mb-6 text-muted-foreground">
          Run our free 2-minute diagnostic to calculate your potential savings.
        </p>
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Analyze My Stack
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </div>
    </div>
  );
}
