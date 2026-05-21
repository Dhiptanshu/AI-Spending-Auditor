import { Trash2 } from "lucide-react";

import { TOOL_PRICING_CONFIG } from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getDefaultPlanId, getToolConfig } from "@/lib/pricing/get-plan";
import { estimateOfficialMonthlySpend } from "@/lib/pricing/estimate-official-spend";
import { planRequiresCustomPricing } from "@/lib/pricing/pricing-guards";
import type { AiTool } from "@/types/audit";
import type { ToolId } from "@/types/pricing";

type ToolFieldsProps = {
  index: number;
  value: AiTool;
  onChange: (value: AiTool) => void;
  onRemove: () => void;
  canRemove: boolean;
};

export function ToolFields({
  index,
  value,
  onChange,
  onRemove,
  canRemove,
}: ToolFieldsProps) {
  const selectedTool = getToolConfig(value.toolId);
  const selectedPlan = selectedTool?.plans.find(
    (plan) => plan.id === value.planId,
  );
  const requiresCustomPricing = selectedPlan
    ? planRequiresCustomPricing(selectedPlan)
    : false;

  function updatePricingEstimate(nextValue: AiTool) {
    const estimate = estimateOfficialMonthlySpend(
      nextValue.toolId,
      nextValue.planId,
      nextValue.seatCount,
    );

    return {
      ...nextValue,
      monthlySpend: estimate ?? nextValue.monthlySpend,
      pricingSource: estimate ? "official" : "custom-enterprise",
      userOverrideMonthlySpend: estimate
        ? undefined
        : nextValue.userOverrideMonthlySpend,
    } satisfies AiTool;
  }

  return (
    <div className="rounded-lg border p-4">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="font-medium">Tool {index + 1}</h3>
          <p className="text-muted-foreground text-sm">
            Select the product, plan, seats, and monthly spend.
          </p>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={`Remove tool ${index + 1}`}
          disabled={!canRemove}
          onClick={onRemove}
        >
          <Trash2 className="size-4" aria-hidden="true" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="grid gap-2">
          <Label htmlFor={`${value.instanceId}-tool`}>Tool</Label>
          <select
            id={`${value.instanceId}-tool`}
            value={value.toolId}
            onChange={(event) => {
              const toolId = event.target.value as ToolId;
              const planId = getDefaultPlanId(toolId) ?? "";
              onChange(
                updatePricingEstimate({
                  ...value,
                  toolId,
                  planId,
                }),
              );
            }}
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
          >
            {TOOL_PRICING_CONFIG.map((tool) => (
              <option key={tool.id} value={tool.id}>
                {tool.name}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${value.instanceId}-plan`}>Plan</Label>
          <select
            id={`${value.instanceId}-plan`}
            value={value.planId}
            onChange={(event) =>
              onChange(
                updatePricingEstimate({
                  ...value,
                  planId: event.target.value,
                }),
              )
            }
            className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
          >
            {selectedTool?.plans.map((plan) => (
              <option key={plan.id} value={plan.id}>
                {plan.label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${value.instanceId}-seats`}>Seats</Label>
          <Input
            id={`${value.instanceId}-seats`}
            min={1}
            inputMode="numeric"
            type="number"
            value={value.seatCount}
            onChange={(event) => {
              const seatCount = Math.max(1, Number(event.target.value) || 1);
              onChange(updatePricingEstimate({ ...value, seatCount }));
            }}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor={`${value.instanceId}-monthly-spend`}>
            Monthly spend
          </Label>
          <Input
            id={`${value.instanceId}-monthly-spend`}
            min={0}
            inputMode="decimal"
            type="number"
            value={value.monthlySpend}
            onChange={(event) => {
              const monthlySpend = Math.max(0, Number(event.target.value) || 0);
              onChange({
                ...value,
                monthlySpend,
                pricingSource: requiresCustomPricing
                  ? "custom-enterprise"
                  : "user-override",
                userOverrideMonthlySpend: monthlySpend,
              });
            }}
          />
          <p className="text-muted-foreground text-xs">
            {requiresCustomPricing
              ? "Enter the negotiated or custom monthly amount."
              : "Official pricing is prefilled when available; edit to override."}
          </p>
        </div>
      </div>
    </div>
  );
}
