"use client";

import type { FormEvent } from "react";
import { useMemo } from "react";
import { useRouter } from "next/navigation";

import { TeamInfoFields } from "@/components/audit/team-info-fields";
import { ToolList } from "@/components/audit/tool-list";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePersistentAuditDraft } from "@/hooks/use-persistent-audit-draft";
import { getDefaultPlanId } from "@/lib/pricing/get-plan";
import { estimateOfficialMonthlySpend } from "@/lib/pricing/estimate-official-spend";
import type { AiTool, AuditFormData } from "@/types/audit";

function createToolInput(instanceId?: string): AiTool {
  const toolId = "cursor";
  const planId = getDefaultPlanId(toolId) ?? "hobby";
  const seatCount = 1;

  return {
    instanceId:
      (instanceId ?? (typeof crypto !== "undefined" && "randomUUID" in crypto))
        ? crypto.randomUUID()
        : `tool-${Date.now()}`,
    toolId,
    planId,
    seatCount,
    monthlySpend: estimateOfficialMonthlySpend(toolId, planId, seatCount) ?? 0,
    pricingSource: "official",
  };
}

export function AuditFormShell() {
  const router = useRouter();
  const { draft, isLoaded, setDraft, saveSubmission } =
    usePersistentAuditDraft();
  const formData = useMemo<AuditFormData>(() => {
    if (draft.tools.length > 0) {
      return draft;
    }

    return {
      ...draft,
      tools: [createToolInput("initial-tool")],
    };
  }, [draft]);

  function updateTool(instanceId: string, tool: AiTool) {
    setDraft({
      ...formData,
      tools: formData.tools.map((currentTool) =>
        currentTool.instanceId === instanceId ? tool : currentTool,
      ),
    });
  }

  function addTool() {
    setDraft({
      ...formData,
      tools: [...formData.tools, createToolInput()],
    });
  }

  function removeTool(instanceId: string) {
    if (formData.tools.length <= 1) {
      return;
    }

    setDraft({
      ...formData,
      tools: formData.tools.filter((tool) => tool.instanceId !== instanceId),
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    saveSubmission(formData);
    router.push("/results");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Team context</CardTitle>
          <CardDescription>
            Start with the team size and primary reason the team uses AI tools.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <TeamInfoFields
            value={formData.team}
            onChange={(team) => setDraft({ ...formData, team })}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tool stack</CardTitle>
          <CardDescription>
            Capture each tool, plan, monthly spend, and seat count for the
            audit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ToolList
            tools={formData.tools}
            onAddTool={addTool}
            onUpdateTool={updateTool}
            onRemoveTool={removeTool}
          />
        </CardContent>
      </Card>

      <div className="bg-card flex flex-col items-start justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
        <p className="text-muted-foreground text-sm">
          {isLoaded
            ? "Draft changes are saved in this browser."
            : "Loading saved draft..."}
        </p>
        <Button type="submit" className="w-full sm:w-auto">
          Generate audit
        </Button>
      </div>
    </form>
  );
}
