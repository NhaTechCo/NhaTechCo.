import { NextRequest, NextResponse } from "next/server";
import { getBackendApiKey } from "@/lib/env";
import { createLead, listLeads } from "@/lib/leads";
import { getClientIp, rateLimit } from "@/lib/rate-limit";
import { sendLeadToSlack } from "@/lib/slack";

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.FRONTEND_ORIGIN ?? "http://localhost:3000",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, x-admin-key"
};

function isAdmin(request: NextRequest): boolean {
  return (request.headers.get("x-admin-key") ?? "") === getBackendApiKey();
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: corsHeaders
  });
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401, headers: corsHeaders }
    );
  }

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
  const limit = rateLimit(`lead:${getClientIp(request)}`, 5, 10 * 60 * 1000);

  if (!limit.ok) {
    return NextResponse.json(
      { ok: false, error: "Ban gui qua nhanh. Vui long thu lai sau it phut." },
      {
        status: 429,
        headers: { ...corsHeaders, "Retry-After": String(limit.retryAfterSeconds) }
      }
    );
  }

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
