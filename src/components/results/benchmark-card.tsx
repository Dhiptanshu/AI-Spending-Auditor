import { Card, CardContent } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";
import type { BenchmarkResult } from "@/types/benchmark";

export function BenchmarkCard({ benchmark }: { benchmark: BenchmarkResult }) {
  // Cap the visual indicator at 2x the average so it doesn't break the UI
  const maxVisualSpend = benchmark.averageIndustrySpendPerSeat * 2;
  const userPositionPercent = Math.min((benchmark.spendPerSeat / maxVisualSpend) * 100, 100);
  const avgPositionPercent = (benchmark.averageIndustrySpendPerSeat / maxVisualSpend) * 100;

  return (
    <Card className="border-slate-200 dark:border-slate-800">
      <CardContent className="p-6">
        <div className="mb-4 flex items-center gap-2">
          <BarChart3 className="size-5 text-indigo-500" />
          <h2 className="text-lg font-semibold tracking-tight">Industry Benchmark</h2>
        </div>
        
        <p className="text-muted-foreground text-sm leading-relaxed mb-6">
          {benchmark.comparativeInsight}
        </p>

        {/* Visual Spectrum Bar */}
        <div className="relative mt-8 h-4 w-full rounded-full bg-gradient-to-r from-emerald-400 via-amber-400 to-rose-500 overflow-hidden">
          {/* Average Marker */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-black dark:bg-white z-10"
            style={{ left: `${avgPositionPercent}%` }}
          />
          {/* User Marker */}
          <div 
            className="absolute top-0 bottom-0 w-1.5 bg-white dark:bg-black border border-slate-300 shadow-sm z-20 rounded-full"
            style={{ left: `calc(${userPositionPercent}% - 3px)` }}
          />
        </div>
        
        <div className="relative mt-2 h-8 w-full text-xs font-medium text-muted-foreground">
          <div 
            className="absolute -translate-x-1/2 whitespace-nowrap"
            style={{ left: `${avgPositionPercent}%` }}
          >
            Avg: ${benchmark.averageIndustrySpendPerSeat}/user
          </div>
          <div 
            className="absolute -translate-x-1/2 whitespace-nowrap mt-4 text-foreground font-bold"
            style={{ left: `${userPositionPercent}%` }}
          >
            You: ${Math.round(benchmark.spendPerSeat)}/user
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
