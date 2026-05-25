import { formatCurrency } from "@/lib/audit/formatters";
import { ArrowDown } from "lucide-react";

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
  const savingsPct =
    currentMonthlySpend > 0
      ? Math.round(
          ((currentMonthlySpend - optimizedMonthlySpend) / currentMonthlySpend) * 100,
        )
      : 0;

  const metrics = [
    {
      label: "Current monthly",
      value: formatCurrency(currentMonthlySpend),
      sub: "Active spend",
      highlight: false,
    },
    {
      label: "Optimized monthly",
      value: formatCurrency(optimizedMonthlySpend),
      sub: savingsPct > 0 ? `${savingsPct}% reduction` : "No change found",
      highlight: false,
    },
    {
      label: "Annual savings",
      value: formatCurrency(totalAnnualSavings),
      sub: "Potential recovery",
      highlight: totalAnnualSavings > 0,
    },
  ];

  return (
    <div className="grid gap-px rounded-xl border border-border/70 bg-border/70 overflow-hidden sm:grid-cols-3">
      {metrics.map((m) => (
        <div
          key={m.label}
          className={`flex flex-col gap-1 bg-card px-5 py-4 ${
            m.highlight ? "bg-emerald-950/10 dark:bg-emerald-950/20" : ""
          }`}
        >
          <p
            className={`text-xs font-medium uppercase tracking-wider ${
              m.highlight
                ? "text-emerald-600 dark:text-emerald-400"
                : "text-muted-foreground"
            }`}
          >
            {m.label}
          </p>
          <div className="flex items-baseline gap-2">
            <span
              className={`text-2xl font-semibold tabular-nums tracking-tight ${
                m.highlight ? "text-emerald-600 dark:text-emerald-400" : ""
              }`}
            >
              {m.value}
            </span>
            {m.highlight && totalAnnualSavings > 0 && (
              <ArrowDown className="size-3.5 text-emerald-500 shrink-0" />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{m.sub}</p>
        </div>
      ))}
    </div>
  );
}
