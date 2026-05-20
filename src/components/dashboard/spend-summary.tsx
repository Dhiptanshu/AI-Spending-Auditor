import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";

type SpendSummaryProps = {
  monthlySpend: number;
  potentialSavings: number;
};

export function SpendSummary({
  monthlySpend,
  potentialSavings,
}: SpendSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Monthly AI spend</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(monthlySpend)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Potential savings</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(potentialSavings)}
        </CardContent>
      </Card>
    </div>
  );
}
