import { formatCurrency } from "@/lib/audit/formatters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type MetricsSummaryProps = {
  currentMonthlySpend: number;
  optimizedMonthlySpend: number;
  totalAnnualSavings: number;
};

export function MetricsSummary({
  currentMonthlySpend,
  optimizedMonthlySpend,
  totalAnnualSavings,
}: MetricsSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Current Monthly Spend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(currentMonthlySpend)}
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground text-sm font-medium">
            Optimized Monthly Spend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(optimizedMonthlySpend)}
          </div>
        </CardContent>
      </Card>

      <Card className={totalAnnualSavings > 0 ? "border-green-200 bg-green-50 dark:border-green-900/50 dark:bg-green-950/20" : ""}>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-green-700 dark:text-green-400">
            Total Annual Savings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-700 dark:text-green-400">
            {formatCurrency(totalAnnualSavings)}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
