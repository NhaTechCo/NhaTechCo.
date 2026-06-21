import { NextRequest, NextResponse } from "next/server";
import { getBackendApiKey } from "@/lib/env";
import { deletePost, getPostById, normalizePostPayload, updatePost } from "@/lib/posts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

function checkAdmin(request: NextRequest): boolean {
  const token = request.headers.get("x-admin-key") ?? "";
  return token === getBackendApiKey();
}

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const payload = normalizePostPayload(await request.json());
    const post = await updatePost(id, payload);
    return NextResponse.json({ post });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Không thể cập nhật bài viết."
      },
      { status: 400 }
    );
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const post = await getPostById(id);

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ post });
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  await deletePost(id);
  return NextResponse.json({ ok: true });
}
