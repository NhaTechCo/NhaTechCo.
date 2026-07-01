import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/site-content — public, returns all site content as { [key]: value }
export async function GET() {
  try {
    const rows = await prisma.siteContent.findMany();
    const content: Record<string, unknown> = {};

    for (const row of rows) {
      content[row.key] = row.value;
    }

    return NextResponse.json(content, {
      headers: { "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300" }
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to load content." },
      { status: 500 }
    );
  }
}
