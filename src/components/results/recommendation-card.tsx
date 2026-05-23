import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRecommendation } from "@/types/engine";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, CheckCircle2, TrendingDown } from "lucide-react";

type RecommendationCardProps = {
  recommendation: AuditRecommendation;
};

export function RecommendationCard({ recommendation }: RecommendationCardProps) {
  const isHighConfidence = recommendation.confidence === "high";

  return (
    <Card className="flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {isHighConfidence ? (
                <CheckCircle2 className="text-green-600 size-5" />
              ) : (
                <AlertCircle className="text-amber-500 size-5" />
              )}
              <CardTitle className="text-lg leading-tight">
                {recommendation.title}
              </CardTitle>
            </div>
            <CardDescription className="text-base text-foreground mt-1">
              {recommendation.description}
            </CardDescription>
          </div>
          
          {recommendation.monthlySavings > 0 && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 whitespace-nowrap px-3 py-1 text-sm font-medium">
              <TrendingDown className="mr-1.5 size-3.5" />
              Save {formatCurrency(recommendation.monthlySavings)}/mo
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="mt-auto border-t bg-muted/30 pt-4">
        <div className="text-sm text-muted-foreground">
          <span className="font-semibold text-foreground/80">Rationale: </span>
          {recommendation.rationale}
        </div>
      </CardContent>
    </Card>
  );
}
