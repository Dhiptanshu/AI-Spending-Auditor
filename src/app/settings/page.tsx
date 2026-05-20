import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";

export default function SettingsPage() {
  return (
    <AppShell>
      <PageHeading
        title="Settings"
        description="Account, workspace, and provider configuration can live here when needed."
      />
    </AppShell>
  );
}
