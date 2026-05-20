"use client";

import Link from "next/link";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePersistentAuditDraft } from "@/hooks/use-persistent-audit-draft";

export function AuditFormShell() {
  const { draft, isLoaded, updatedAt } = usePersistentAuditDraft();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit form state</CardTitle>
        <CardDescription>
          This shell wires the draft lifecycle without implementing form fields
          or audit calculations yet.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <dl className="grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-md border p-3">
            <dt className="text-muted-foreground">Loaded</dt>
            <dd className="font-medium">{isLoaded ? "Yes" : "Loading"}</dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="text-muted-foreground">Tools in draft</dt>
            <dd className="font-medium">{draft.tools.length}</dd>
          </div>
          <div className="rounded-md border p-3">
            <dt className="text-muted-foreground">Last saved</dt>
            <dd className="font-medium">{updatedAt ?? "Not yet"}</dd>
          </div>
        </dl>
        <Link
          href="/results"
          className={buttonVariants({ variant: "outline" })}
        >
          Preview results route
        </Link>
      </CardContent>
    </Card>
  );
}
