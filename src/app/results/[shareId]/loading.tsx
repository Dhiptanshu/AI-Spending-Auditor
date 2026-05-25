import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="mx-auto flex max-w-4xl flex-col items-center justify-center space-y-4 py-32 text-center animate-in fade-in-50 duration-500">
      <div className="rounded-full bg-muted p-4">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
      <h2 className="text-2xl font-semibold tracking-tight">Loading Audit Report</h2>
      <p className="text-muted-foreground">Securing connection and loading read-only dashboard...</p>
    </div>
  );
}
