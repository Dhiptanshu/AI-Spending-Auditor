import { NextResponse } from "next/server";

import { listVendors } from "@/services/vendor-service";

export async function GET() {
  const vendors = await listVendors();

  return NextResponse.json({
    ok: true,
    data: vendors,
  });
}
