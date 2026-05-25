import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { BenchmarkResult } from "@/types/benchmark";

export function BenchmarkCard({ benchmark }: { benchmark: BenchmarkResult }) {
  const maxVisualSpend = benchmark.averageIndustrySpendPerSeat * 2;
  const userPositionPercent = Math.min(
    (benchmark.spendPerSeat / maxVisualSpend) * 100,
    100,
  );
  const avgPositionPercent =
    (benchmark.averageIndustrySpendPerSeat / maxVisualSpend) * 100;

  return (
    <div className="rounded-lg border border-border/70 bg-card overflow-hidden">
      <div className="p-5">
        <div className="mb-3 flex items-center gap-2">
          <div className="flex size-6 items-center justify-center rounded border border-border/70 bg-muted">
            <BarChart3 className="size-3.5 text-muted-foreground" />
          </div>
          <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Industry Benchmark
          </h2>
        </div>

        <p className="text-sm text-muted-foreground leading-relaxed mb-6">
          {benchmark.comparativeInsight}
        </p>

        {/* Spectrum bar */}
        <div className="space-y-2">
          <div className="relative h-2 w-full rounded-full bg-gradient-to-r from-emerald-500 via-amber-400 to-rose-500 overflow-hidden">
            {/* Avg tick */}
            <div
              className="absolute top-0 bottom-0 w-px bg-foreground/60"
              style={{ left: `${avgPositionPercent}%` }}
            />
            {/* User tick */}
            <div
              className="absolute top-1/2 -translate-y-1/2 size-3 rounded-full border-2 border-background bg-foreground shadow-sm"
              style={{ left: `calc(${userPositionPercent}% - 6px)` }}
            />
          </div>

          <div className="relative h-6 w-full text-[10px] font-medium text-muted-foreground">
            <div
              className="absolute -translate-x-1/2 whitespace-nowrap"
              style={{ left: `clamp(10%, ${avgPositionPercent}%, 90%)` }}
            >
              Avg ${benchmark.averageIndustrySpendPerSeat}/user
            </div>
            <div
              className="absolute -translate-x-1/2 whitespace-nowrap text-foreground font-semibold tabular-nums"
              style={{ left: `clamp(15%, ${userPositionPercent}%, 85%)` }}
            >
              You ${Math.round(benchmark.spendPerSeat)}/user
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
