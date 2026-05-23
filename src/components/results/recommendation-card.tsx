import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRecommendation } from "@/types/engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckCircle2, Info, TrendingDown } from "lucide-react";

type RecommendationCardProps = {
  recommendation: AuditRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  // Icon based on confidence
  const getConfidenceIcon = () => {
    switch (recommendation.confidence) {
      case "high":
        return <CheckCircle2 className="text-green-600 size-5" />;
      case "medium":
        return <AlertTriangle className="text-amber-500 size-5" />;
      case "low":
        return <Info className="text-blue-500 size-5" />;
      default:
        return <Info className="text-blue-500 size-5" />;
    }
  };

  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-md">
      <CardHeader className="pb-4">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2.5">
              {getConfidenceIcon()}
              <CardTitle className="text-lg leading-tight tracking-tight">
                {recommendation.title}
              </CardTitle>
            </div>
            <CardDescription className="text-base text-foreground/90 mt-1 max-w-2xl">
              {recommendation.description}
            </CardDescription>
          </div>
          
          {recommendation.monthlySavings > 0 && (
            <div className="flex shrink-0 flex-col items-end gap-1">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100/80 dark:bg-green-900/40 dark:text-green-400 whitespace-nowrap px-3 py-1.5 text-sm font-semibold shadow-sm">
                <TrendingDown className="mr-1.5 size-4" />
                Save {formatCurrency(recommendation.annualSavings)}/yr
              </Badge>
              <span className="text-muted-foreground pr-1 text-xs font-medium">
                ({formatCurrency(recommendation.monthlySavings)}/mo)
              </span>
            </div>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="mt-auto border-t bg-muted/40 px-6 py-4 dark:bg-muted/10">
        <div className="flex items-start gap-2 text-sm text-muted-foreground">
          <span className="font-semibold text-foreground/80">Rationale:</span>
          <span className="leading-relaxed">{recommendation.rationale}</span>
        </div>
      </CardContent>
    </Card>
  );
}
