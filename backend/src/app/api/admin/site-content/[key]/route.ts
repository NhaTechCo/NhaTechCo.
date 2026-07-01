import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const ADMIN_KEY = process.env.BACKEND_API_KEY || "";

function isAuthorized(request: NextRequest): boolean {
  return request.headers.get("x-admin-key") === ADMIN_KEY && ADMIN_KEY !== "";
}

type RouteContext = { params: Promise<{ key: string }> };

// GET /api/admin/site-content/:key
export async function GET(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await context.params;

  try {
    const row = await prisma.siteContent.findUnique({ where: { key } });

    if (!row) {
      return NextResponse.json({ key, value: null });
    }

    return NextResponse.json({ key: row.key, value: row.value });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load content." },
      { status: 500 }
    );
  }
}

// PUT /api/admin/site-content/:key
export async function PUT(request: NextRequest, context: RouteContext) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { key } = await context.params;

  try {
    const body = await request.json();
    const { value } = body;

    if (value === undefined || value === null) {
      return NextResponse.json({ error: "Missing value." }, { status: 400 });
    }

    const row = await prisma.siteContent.upsert({
      where: { key },
      update: { value },
      create: { key, value }
    });

    return NextResponse.json({ key: row.key, value: row.value });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save content." },
      { status: 500 }
    );
  }
}
