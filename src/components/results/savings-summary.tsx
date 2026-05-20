import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/formatters";
import type { AuditResult } from "@/types/audit";

type SavingsSummaryProps = {
  result: AuditResult;
};

export function SavingsSummary({ result }: SavingsSummaryProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Card>
        <CardHeader>
          <CardTitle>Total monthly spend</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(result.totalMonthlySpend)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Monthly savings</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(result.estimatedMonthlySavings)}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Annual savings</CardTitle>
        </CardHeader>
        <CardContent className="text-2xl font-semibold">
          {formatCurrency(result.estimatedAnnualSavings)}
        </CardContent>
      </Card>
    </div>
  );
}
