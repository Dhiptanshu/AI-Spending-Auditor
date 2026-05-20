"use client";

import { Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function AuditUploadForm() {
  return (
    <form className="flex flex-col gap-4 rounded-lg border p-4">
      <div className="grid gap-2">
        <Label htmlFor="audit-file">Spend export</Label>
        <Input id="audit-file" type="file" accept=".csv,.xlsx,.json" />
      </div>
      <Button type="button" className="w-full sm:w-fit">
        <Upload className="size-4" />
        Upload for audit
      </Button>
    </form>
  );
}
