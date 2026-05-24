import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase/client";

export async function POST(req: Request) {
  try {
    const { payload, engineResult } = await req.json();

    if (!payload || !engineResult) {
      return NextResponse.json({ error: "Missing required data" }, { status: 400 });
    }

    // Generates a short, secure 10-character URL ID natively
    const publicShareId = crypto.randomUUID().replace(/-/g, "").substring(0, 10);

    const { data, error } = await supabase
      .from("audits")
      .insert([
        {
          public_share_id: publicShareId,
          payload,
          engine_result: engineResult,
          status: "completed",
        },
      ])
      .select("public_share_id")
      .single();

    if (error) {
      console.error("Supabase Error:", error);
      return NextResponse.json({ error: "Failed to save audit to database", details: error }, { status: 500 });
    }

    return NextResponse.json({ success: true, shareId: data.public_share_id });
  } catch (error) {
    console.error("Save Audit API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
