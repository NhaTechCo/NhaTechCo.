import { NextRequest, NextResponse } from "next/server";
import { adminFetch } from "@/lib/api";

type RouteContext = { params: Promise<{ key: string }> };

export async function GET(request: NextRequest, context: RouteContext) {
  const { key } = await context.params;

  try {
    const data = await adminFetch(`/api/admin/site-content/${key}`);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load content." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, context: RouteContext) {
  const { key } = await context.params;

  try {
    const body = await request.json();
    const data = await adminFetch(`/api/admin/site-content/${key}`, {
      method: "PUT",
      body: JSON.stringify(body)
    });
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to save content." },
      { status: 500 }
    );
  }
}
