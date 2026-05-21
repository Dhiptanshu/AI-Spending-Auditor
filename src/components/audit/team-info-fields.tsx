import { useFormContext } from "react-hook-form";
import { PRIMARY_USE_CASES, type PrimaryUseCase } from "@/config/audit-options";
import { Input } from "@/components/ui/input";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import type { AuditFormValues } from "@/lib/validations/audit";

const useCaseLabels: Record<PrimaryUseCase, string> = {
  coding: "Coding",
  writing: "Writing",
  data: "Data",
  research: "Research",
  mixed: "Mixed",
};

export function TeamInfoFields() {
  const { control } = useFormContext<AuditFormValues>();

  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormField
        control={control}
        name="team.teamSize"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Team size</FormLabel>
            <FormControl>
              <Input
                {...field}
                min={1}
                inputMode="numeric"
                type="number"
                onChange={(e) => field.onChange(e.target.valueAsNumber || 1)}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={control}
        name="team.primaryUseCase"
        render={({ field }) => (
          <FormItem className="space-y-1">
            <FormLabel>Primary use case</FormLabel>
            <FormControl>
              <select
                {...field}
                className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
              >
                {PRIMARY_USE_CASES.map((useCase) => (
                  <option key={useCase} value={useCase}>
                    {useCaseLabels[useCase]}
                  </option>
                ))}
              </select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
