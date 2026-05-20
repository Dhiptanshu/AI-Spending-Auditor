import { AppShell } from "@/components/layout/app-shell";
import { PageHeading } from "@/components/shared/page-heading";
import { EmptyState } from "@/components/shared/empty-state";
import { VendorTable } from "@/components/vendors/vendor-table";
import { listVendors } from "@/services/vendor-service";

export default async function VendorsPage() {
  const vendors = await listVendors();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeading
          title="Vendors"
          description="Track AI vendors, categories, spend, and risk posture."
        />
        {vendors.length > 0 ? (
          <VendorTable vendors={vendors} />
        ) : (
          <EmptyState
            title="No vendors yet"
            description="Vendor records will be derived from uploaded audit data."
          />
        )}
      </div>
    </AppShell>
  );
}
