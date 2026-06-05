import { NextRequest, NextResponse } from "next/server";
import { createLead, listLeads } from "@/lib/leads";
import { sendLeadToSlack } from "@/lib/slack";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type"
};

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  });
}

export async function GET() {
  const leads = await listLeads();

  return NextResponse.json(
    {
      count: leads.length,
      leads
    },
    { headers: corsHeaders }
  );
}

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;
    const lead = await createLead({
      name: String(body.name ?? ""),
      email: String(body.email ?? ""),
      company: String(body.company ?? ""),
      service: String(body.service ?? ""),
      budget: String(body.budget ?? ""),
      message: String(body.message ?? "")
    });

    try {
      await sendLeadToSlack(lead);
    } catch (error) {
      console.error("Khong the gui lead sang Slack.", error);
    }

    return NextResponse.json(
      {
        ok: true,
        lead
      },
      { status: 201, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Khong the tao lead."
      },
      { status: 400, headers: corsHeaders }
    );
  }
}
