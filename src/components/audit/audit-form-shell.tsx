"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
import { Form } from "@/components/ui/form";
import { usePersistentAuditDraft } from "@/hooks/use-persistent-audit-draft";
import { getDefaultPlanId } from "@/lib/pricing/get-plan";
import { estimateOfficialMonthlySpend } from "@/lib/pricing/estimate-official-spend";
import type { AiTool, AuditFormData } from "@/types/audit";
import { auditFormSchema, type AuditFormValues } from "@/lib/validations/audit";

function createToolInput(instanceId?: string): AiTool {
  const toolId = "cursor";
  const planId = getDefaultPlanId(toolId) ?? "hobby";
  const seatCount = 1;

  return {
    instanceId:
      instanceId ??
      (typeof crypto !== "undefined" && "randomUUID" in crypto
        ? crypto.randomUUID()
        : `tool-${Date.now()}`),
    toolId,
    planId,
    billingCycle: "monthly",
    seatCount,
    monthlySpend: estimateOfficialMonthlySpend(toolId, planId, seatCount) ?? 0,
    pricingSource: "official",
  };
}

export function AuditFormShell() {
  const router = useRouter();
  const { draft, isLoaded, storageError, setDraft, saveSubmission } =
    usePersistentAuditDraft();

  const form = useForm<AuditFormValues>({
    resolver: zodResolver(auditFormSchema),
    defaultValues: draft,
    mode: "onTouched",
  });

  // Sync draft to form once on initial load
  useEffect(() => {
    if (isLoaded) {
      if (draft.tools.length > 0) {
        form.reset(draft);
      } else {
        form.reset({
          ...draft,
          tools: [createToolInput("initial-tool")],
        });
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoaded, form, draft.tools.length]); // Intentionally omitting full draft to avoid resetting on every change

  // Sync form to persistent draft
  useEffect(() => {
    const subscription = form.watch((value) => {
      // Form fields exist, but TS thinks value could be Partial. Safe cast to AuditFormValues
      setDraft(value as AuditFormValues);
    });
    return () => subscription.unsubscribe();
  }, [form, setDraft]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "tools",
    keyName: "key", // use 'key' since 'id' might conflict or not be needed here
  });

  function addTool() {
    append(createToolInput());
  }

  function removeTool(instanceId: string) {
    const index = fields.findIndex((field) => field.instanceId === instanceId);
    if (index !== -1) {
      remove(index);
    }
  }

  function handleSubmit(values: AuditFormValues) {
    saveSubmission(values as AuditFormData);
    router.push("/results");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Team context</CardTitle>
            <CardDescription>
              Start with the team size and primary reason the team uses AI tools.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <TeamInfoFields />
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
              tools={fields as unknown as { instanceId: string; key: string }[]}
              onAddTool={addTool}
              onRemoveTool={removeTool}
            />
          </CardContent>
        </Card>

        <div className="bg-card flex flex-col items-start justify-between gap-3 rounded-lg border p-4 sm:flex-row sm:items-center">
          <p className="text-muted-foreground text-sm">
            {storageError ??
              (isLoaded
                ? "Draft changes are saved in this browser."
                : "Loading saved draft...")}
          </p>
          <Button type="submit" className="w-full sm:w-auto" disabled={!isLoaded || form.formState.isSubmitting}>
            {form.formState.isSubmitting ? "Analyzing stack..." : "Generate audit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
