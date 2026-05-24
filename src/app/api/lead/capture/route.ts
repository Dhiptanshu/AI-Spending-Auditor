import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// We use the Service Role Key here because this is a secure server environment,
// and we need to bypass RLS to UPDATE the audit row with the new lead ID.
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || "",
  process.env.SUPABASE_SERVICE_ROLE_KEY || ""
);

export async function POST(req: Request) {
  try {
    const { email, shareId } = await req.json();

    if (!email || !shareId) {
      return NextResponse.json({ error: "Email and shareId are required" }, { status: 400 });
    }

    // 1. Upsert the Lead
    // We use ON CONFLICT (email) to safely handle returning visitors without crashing.
    const { data: lead, error: leadError } = await supabaseAdmin
      .from("leads")
      .upsert({ email }, { onConflict: "email" })
      .select("id")
      .single();

    if (leadError || !lead) {
      console.error("Lead UPSERT Error:", leadError);
      return NextResponse.json({ error: "Failed to capture lead", details: leadError }, { status: 500 });
    }

    // 2. Link the Lead to the Audit
    const { error: updateError } = await supabaseAdmin
      .from("audits")
      .update({ lead_id: lead.id })
      .eq("public_share_id", shareId);

    if (updateError) {
      console.error("Audit Update Error:", updateError);
      return NextResponse.json({ error: "Failed to link audit", details: updateError }, { status: 500 });
    }

    // 3. Send Transactional Email via Resend
    try {
      // In production, NEXT_PUBLIC_APP_URL should be set to your real domain (e.g. https://credex.rocks)
      const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      const auditUrl = `${baseUrl}/results/${shareId}`;
      
      await resend.emails.send({
        // Note: Resend requires a verified domain to send emails. 'onboarding@resend.dev' works for testing to your own email.
        from: "Credex <onboarding@resend.dev>",
        to: email,
        subject: "Your AI Spend Audit Results",
        html: `
          <h2>Your AI Spend Audit is ready!</h2>
          <p>Hi there,</p>
          <p>Thank you for using Credex. Your personalized AI spend audit and savings breakdown has been securely generated.</p>
          <p><strong><a href="${auditUrl}">Click here to view your full results</a></strong></p>
          <br />
          <p>Best,<br/>The Credex Team</p>
        `,
      });
    } catch (emailError) {
      // We catch this internally so we don't crash the UI if the email drops.
      // The lead is already safely captured in our database!
      console.error("Resend Email Error:", emailError);
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Lead Capture API Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
