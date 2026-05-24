import { Trash2 } from "lucide-react";
import { useFormContext, useWatch } from "react-hook-form";

import { TOOL_PRICING_CONFIG } from "@/config/pricing";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { getDefaultPlanId, getToolConfig } from "@/lib/pricing/get-plan";
import { estimateOfficialMonthlySpend } from "@/lib/pricing/estimate-official-spend";
import { planRequiresCustomPricing } from "@/lib/pricing/pricing-guards";
import type { AiTool } from "@/types/audit";
import type { ToolId } from "@/types/pricing";
import type { AuditFormValues } from "@/lib/validations/audit";

type ToolFieldsProps = {
  index: number;
  onRemove: () => void;
  canRemove: boolean;
};

export function ToolFields({
  index,
  onRemove,
  canRemove,
}: ToolFieldsProps) {
  const { control, setValue, getValues } = useFormContext<AuditFormValues>();

  const currentTool = useWatch({
    control,
    name: `tools.${index}`,
  }) as AiTool;

  if (!currentTool) return null;

  const selectedTool = getToolConfig(currentTool.toolId);
  const selectedPlan = selectedTool?.plans.find(
    (plan) => plan.id === currentTool.planId,
  );
  const requiresCustomPricing = selectedPlan
    ? planRequiresCustomPricing(selectedPlan)
    : false;
  const supportsAnnualBilling =
    requiresCustomPricing ||
    selectedPlan?.pricing.some(
      (price) => price.kind === "fixed" && price.billingCadence === "annual",
    ) === true;

  function updatePricingEstimate(nextValue: AiTool) {
    const estimate = estimateOfficialMonthlySpend(
      nextValue.toolId,
      nextValue.planId,
      nextValue.seatCount,
      nextValue.billingCycle,
    );

    const monthlySpend = estimate ?? nextValue.monthlySpend;
    const pricingSource = estimate ? "official" : "custom-enterprise";
    const userOverrideMonthlySpend = estimate
      ? undefined
      : nextValue.userOverrideMonthlySpend;

    setValue(`tools.${index}.monthlySpend`, monthlySpend, { shouldValidate: true });
    setValue(`tools.${index}.pricingSource`, pricingSource);
    if (userOverrideMonthlySpend !== undefined) {
      setValue(`tools.${index}.userOverrideMonthlySpend`, userOverrideMonthlySpend);
    }
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
        <FormField
          control={control}
          name={`tools.${index}.toolId`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Tool</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(event) => {
                    const toolId = event.target.value as ToolId;
                    const planId = getDefaultPlanId(toolId) ?? "";
                    field.onChange(toolId);
                    setValue(`tools.${index}.planId`, planId);
                    setValue(`tools.${index}.billingCycle`, "monthly");

                    const nextValue = {
                      ...getValues(`tools.${index}`),
                      toolId,
                      planId,
                      billingCycle: "monthly",
                    } as AiTool;
                    updatePricingEstimate(nextValue);
                  }}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
                >
                  {TOOL_PRICING_CONFIG.map((tool) => (
                    <option key={tool.id} value={tool.id}>
                      {tool.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`tools.${index}.planId`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Plan</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(event) => {
                    const planId = event.target.value;
                    field.onChange(planId);
                    setValue(`tools.${index}.billingCycle`, "monthly");
                    const nextValue = {
                      ...getValues(`tools.${index}`),
                      planId,
                      billingCycle: "monthly",
                    } as AiTool;
                    updatePricingEstimate(nextValue);
                  }}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
                >
                  {selectedTool?.plans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.label}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`tools.${index}.billingCycle`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Billing</FormLabel>
              <FormControl>
                <select
                  {...field}
                  onChange={(event) => {
                    const billingCycle = event.target.value as AiTool["billingCycle"];
                    field.onChange(billingCycle);
                    const nextValue = {
                      ...getValues(`tools.${index}`),
                      billingCycle,
                    } as AiTool;
                    updatePricingEstimate(nextValue);
                  }}
                  className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
                >
                  <option value="monthly">Monthly billing</option>
                  <option value="annual" disabled={!supportsAnnualBilling}>
                    Yearly billing
                  </option>
                </select>
              </FormControl>
              <p className="text-muted-foreground text-xs">
                Prices are stored as monthly equivalents for audit calculations.
              </p>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`tools.${index}.seatCount`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Seats</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  min={1}
                  inputMode="numeric"
                  type="number"
                  onChange={(event) => {
                    const seatCount = Math.max(1, Number(event.target.value) || 1);
                    field.onChange(seatCount);
                    const nextValue = {
                      ...getValues(`tools.${index}`),
                      seatCount,
                    } as AiTool;
                    updatePricingEstimate(nextValue);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name={`tools.${index}.monthlySpend`}
          render={({ field }) => (
            <FormItem className="space-y-1">
              <FormLabel>Monthly spend</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  min={0}
                  step="any"
                  inputMode="decimal"
                  type="number"
                  onChange={(event) => {
                    const monthlySpend = Math.max(0, Number(event.target.value) || 0);
                    field.onChange(monthlySpend);
                    setValue(
                      `tools.${index}.pricingSource`,
                      requiresCustomPricing ? "custom-enterprise" : "user-override"
                    );
                    setValue(`tools.${index}.userOverrideMonthlySpend`, monthlySpend);
                  }}
                />
              </FormControl>
              <p className="text-muted-foreground text-xs">
                {requiresCustomPricing
                  ? "Enter the negotiated or custom monthly amount."
                  : "Official pricing is prefilled when available; edit to override."}
              </p>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
