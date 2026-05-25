import { Card, CardContent } from "@/components/ui/card";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight, BarChart3, TrendingDown, ShieldCheck } from "lucide-react";
import type { AuditEngineResult } from "@/types/engine";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ConversionCTA({ report }: { report: AuditEngineResult }) {
  const isHighSavings = report.totalAnnualSavings >= 1000;
  const isZeroSavings = report.totalAnnualSavings === 0;

  if (isHighSavings) {
    return (
      <Card className="border-green-200 bg-green-50 shadow-sm dark:border-green-900/40 dark:bg-green-950/20">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="bg-green-100 text-green-700 dark:bg-green-900/50 dark:text-green-400 rounded-full p-4">
            <TrendingDown className="size-8" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-bold text-green-950 dark:text-green-50">Your team has significant unoptimized spend.</h3>
            <p className="text-green-800/80 dark:text-green-200/70">
              Don&apos;t leave money on the table. Automate these savings and prevent future seat sprawl with Credex.
            </p>
          </div>
          <Link href="https://Credex.rocks" className={cn(buttonVariants({ size: "lg" }), "bg-green-600 text-white hover:bg-green-700 w-full shrink-0 sm:w-auto")}>
            Get Credex to automate
            <ArrowRight className="ml-2 size-4" />
          </Link>
        </CardContent>
      </Card>
    );
  }

  if (isZeroSavings) {
    return (
      <Card className="border-muted bg-muted/20">
        <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
          <div className="bg-background text-muted-foreground rounded-full border p-4 shadow-sm">
            <ShieldCheck className="size-8" />
          </div>
          <div className="flex-1 space-y-1">
            <h3 className="text-xl font-bold">Lock in this efficiency.</h3>
            <p className="text-muted-foreground">
              Your stack is 100% optimized. Prevent shadow IT and future seat overlap as your team scales by using Credex Monitoring.
            </p>
          </div>
          <Link href="https://Credex.rocks" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "w-full shrink-0 sm:w-auto")}>
            Try Credex Monitoring
          </Link>
        </CardContent>
      </Card>
    );
  }

  // Medium / Low savings (< $1000)
  return (
    <Card className="border-indigo-100 bg-indigo-50/50 dark:border-indigo-900/30 dark:bg-indigo-950/10">
      <CardContent className="flex flex-col items-center gap-4 p-8 text-center sm:flex-row sm:text-left">
        <div className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/50 dark:text-indigo-400 rounded-full p-4">
          <BarChart3 className="size-8" />
        </div>
        <div className="flex-1 space-y-1">
          <h3 className="text-xl font-bold text-indigo-950 dark:text-indigo-50">Track your future spend with Credex.</h3>
          <p className="text-indigo-800/80 dark:text-indigo-200/70">
            Your stack is relatively healthy, but as you add seats, overlap will grow. Keep your AI ROI positive.
          </p>
        </div>
        <Link href="https://Credex.rocks" className={cn(buttonVariants({ size: "lg" }), "bg-indigo-600 text-white hover:bg-indigo-700 w-full shrink-0 sm:w-auto")}>
          Start Tracking
          <ArrowRight className="ml-2 size-4" />
        </Link>
      </CardContent>
    </Card>
  );
}
