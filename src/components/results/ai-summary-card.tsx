"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
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
        const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

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
        // Fallback gracefully
        if (isMounted) {
          if (report.totalAnnualSavings > 0) {
            setSummary(`Based on our audit, your team is spending ${formatCurrency(report.currentMonthlySpend * 12)} annually. By addressing overlapping tools and unoptimized billing cycles, you can reduce this to ${formatCurrency(report.optimizedMonthlySpend * 12)}/yr, saving you ${formatCurrency(report.totalAnnualSavings)} annually.`);
          } else {
            setSummary("Your AI tool stack is currently optimized with no clear financial inefficiencies found based on your declared usage.");
          }
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchSummary();
    return () => { isMounted = false; };
  }, [report]);

  return (
    <Card className="bg-muted/30 relative overflow-hidden border-indigo-100 dark:border-indigo-900/30">
      <div className="absolute top-0 left-0 h-1 w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 opacity-70" />
      <CardContent className="p-6">
        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="size-5 text-indigo-500" />
          <h2 className="text-lg font-semibold tracking-tight text-indigo-950 dark:text-indigo-100">AI Executive Summary</h2>
        </div>
        
        <div className="min-h-[80px]">
          {isLoading ? (
            <div className="space-y-2 animate-pulse mt-2">
              <div className="h-4 w-full rounded bg-muted"></div>
              <div className="h-4 w-11/12 rounded bg-muted"></div>
              <div className="h-4 w-4/5 rounded bg-muted"></div>
            </div>
          ) : (
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              {summary}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
