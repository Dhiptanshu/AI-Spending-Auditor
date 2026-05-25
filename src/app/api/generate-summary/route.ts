import { google } from "@ai-sdk/google";
import { generateText } from "ai";
import { NextResponse } from "next/server";
import { formatCurrency } from "@/lib/audit/formatters";
import type { AuditRecommendation } from "@/types/engine";

export async function POST(req: Request) {
  try {
    const { report } = await req.json();

    if (!report || typeof report.totalAnnualSavings !== "number") {
      return NextResponse.json({ error: "Invalid report data" }, { status: 400 });
    }

    const promptContext = `
      Current Spend: ${formatCurrency(report.currentMonthlySpend * 12)}/yr
      Optimized Spend: ${formatCurrency(report.optimizedMonthlySpend * 12)}/yr
      Total Annual Savings: ${formatCurrency(report.totalAnnualSavings)}/yr
      Recommendations: ${report.recommendations.map((r: AuditRecommendation) => `- ${r.title}: ${r.rationale}`).join("\n")}
    `;

    const { text } = await generateText({
      model: google("gemini-2.5-flash"),
      system: "You are an impartial AI spend auditor. Summarize the user's financial audit data in strictly 3 short sentences. Tone: Professional, B2B SaaS. Do not perform math, invent numbers, or sound like an aggressive salesperson. Simply explain why they are saving money based ONLY on the provided rationale.",
      prompt: `Write a summary for the following audit results:\n${promptContext}`,
    });

    return NextResponse.json({ summary: text });
  } catch (error) {
    console.error("AI Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate summary" }, { status: 500 });
  }
}
