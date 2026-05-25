"use client";

import { useEffect, useState } from "react";
import { Sparkles } from "lucide-react";
import type { AuditEngineResult } from "@/types/engine";
import { formatCurrency } from "@/lib/audit/formatters";

export function AISummaryCard({ report }: { report: AuditEngineResult }) {
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchSummary() {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        const res = await fetch("/api/generate-summary", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ report }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!res.ok) throw new Error("API Failed");

        const data = await res.json();
        if (isMounted && data.summary) setSummary(data.summary);
      } catch {
        if (isMounted) {
          if (report.totalAnnualSavings > 0) {
            setSummary(
              `Based on our audit, your team is spending ${formatCurrency(report.currentMonthlySpend * 12)} annually. By addressing overlapping tools and unoptimized billing cycles, you can reduce this to ${formatCurrency(report.optimizedMonthlySpend * 12)}/yr, saving you ${formatCurrency(report.totalAnnualSavings)} annually.`,
            );
          } else {
            setSummary(
              "Your AI tool stack is currently optimized with no clear financial inefficiencies found based on your declared usage.",
            );
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSummary();
    return () => {
      isMounted = false;
    };
  }, [report]);

  return (
    <div className="rounded-lg border border-border/70 bg-card overflow-hidden">
      {/* Top accent line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded border border-indigo-500/20 bg-indigo-500/8">
            <Sparkles className="size-3.5 text-indigo-500" />
          </div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            AI Executive Summary
          </h2>
        </div>

        <div className="min-h-[60px]">
          {isLoading ? (
            <div className="space-y-2 animate-pulse">
              <div className="h-3.5 w-full rounded-sm bg-muted" />
              <div className="h-3.5 w-11/12 rounded-sm bg-muted" />
              <div className="h-3.5 w-4/5 rounded-sm bg-muted" />
            </div>
          ) : (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {summary}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
