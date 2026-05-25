import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRecommendation } from "@/types/engine";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info, TrendingDown } from "lucide-react";
import { cn } from "@/lib/utils";

type RecommendationCardProps = {
  recommendation: AuditRecommendation;
  index: number;
};

const confidenceConfig = {
  high: {
    icon: CheckCircle2,
    color: "text-emerald-500",
    label: "High confidence",
    badgeCn: "border-emerald-500/20 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400",
  },
  medium: {
    icon: AlertTriangle,
    color: "text-amber-500",
    label: "Medium confidence",
    badgeCn: "border-amber-500/20 bg-amber-500/8 text-amber-600 dark:text-amber-400",
  },
  low: {
    icon: Info,
    color: "text-blue-500",
    label: "Low confidence",
    badgeCn: "border-blue-500/20 bg-blue-500/8 text-blue-600 dark:text-blue-400",
  },
};

export function RecommendationCard({
  recommendation,
  index,
}: RecommendationCardProps) {
  const conf =
    confidenceConfig[recommendation.confidence] ?? confidenceConfig.low;
  const ConfIcon = conf.icon;

  return (
    <div className="group rounded-lg border border-border/70 bg-card transition-colors hover:border-border overflow-hidden">
      {/* Card header */}
      <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-3 min-w-0">
          {/* Step number */}
          <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded border border-border/70 bg-muted text-xs font-semibold tabular-nums text-muted-foreground">
            {String(index + 1).padStart(2, "0")}
          </span>

          <div className="space-y-1 min-w-0">
            <h3 className="text-sm font-semibold leading-snug">
              {recommendation.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {recommendation.description}
            </p>
          </div>
        </div>

        {/* Savings badge */}
        {recommendation.monthlySavings > 0 && (
          <div className="flex shrink-0 flex-col items-start gap-1 sm:items-end">
            <Badge
              variant="outline"
              className="border-emerald-500/25 bg-emerald-500/8 text-emerald-600 dark:text-emerald-400 whitespace-nowrap px-2.5 py-1 text-xs font-semibold"
            >
              <TrendingDown className="mr-1 size-3" />
              {formatCurrency(recommendation.annualSavings)}/yr
            </Badge>
            <span className="text-xs text-muted-foreground tabular-nums">
              {formatCurrency(recommendation.monthlySavings)}/mo
            </span>
          </div>
        )}
      </div>

      {/* Footer rationale */}
      <div className="border-t border-border/60 bg-muted/20 px-5 py-3">
        <div className="flex items-start gap-2 text-xs">
          <ConfIcon
            className={cn("mt-0.5 size-3 shrink-0", conf.color)}
            aria-hidden="true"
          />
          <span className="text-muted-foreground leading-relaxed">
            <span className="font-medium text-foreground/70 mr-1">
              {conf.label}:
            </span>
            {recommendation.rationale}
          </span>
        </div>
      </div>
    </div>
  );
}
