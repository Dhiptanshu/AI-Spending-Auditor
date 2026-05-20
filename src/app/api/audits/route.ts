import { NextResponse } from "next/server";

import { listAudits } from "@/services/audit-service";

export async function GET() {
  const audits = await listAudits();

  return NextResponse.json({
    ok: true,
    data: audits,
  });
}
