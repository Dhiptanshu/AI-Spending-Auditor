import { PRIMARY_USE_CASES, type PrimaryUseCase } from "@/config/audit-options";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TeamInfo } from "@/types/audit";

type TeamInfoFieldsProps = {
  value: TeamInfo;
  onChange: (value: TeamInfo) => void;
};

const useCaseLabels: Record<PrimaryUseCase, string> = {
  coding: "Coding",
  writing: "Writing",
  data: "Data",
  research: "Research",
  mixed: "Mixed",
};

export function TeamInfoFields({ value, onChange }: TeamInfoFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="grid gap-2">
        <Label htmlFor="team-size">Team size</Label>
        <Input
          id="team-size"
          min={1}
          inputMode="numeric"
          type="number"
          value={value.teamSize}
          onChange={(event) =>
            onChange({
              ...value,
              teamSize: Math.max(1, Number(event.target.value) || 1),
            })
          }
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="primary-use-case">Primary use case</Label>
        <select
          id="primary-use-case"
          value={value.primaryUseCase}
          onChange={(event) =>
            onChange({
              ...value,
              primaryUseCase: event.target.value as PrimaryUseCase,
            })
          }
          className="border-input focus-visible:border-ring focus-visible:ring-ring/50 h-8 w-full rounded-lg border bg-transparent px-2.5 text-sm outline-none focus-visible:ring-3"
        >
          {PRIMARY_USE_CASES.map((useCase) => (
            <option key={useCase} value={useCase}>
              {useCaseLabels[useCase]}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
