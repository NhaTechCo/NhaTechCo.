import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { deletePost, updatePost } from "@/lib/posts";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: NextRequest, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Frontend Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    const post = await updatePost(id, await request.json());
    return NextResponse.json({ post });
  } catch (error: any) {
    console.error("PUT Error:", error);
    const status = error.message.includes("401") || error.message.includes("Unauthorized") ? 401 : 400;
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Không thể cập nhật bài viết."
      },
      { status }
    );
  }
}

export async function DELETE(_request: NextRequest, context: RouteContext) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  try {
    await deletePost(id);
    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Không thể xóa bài viết."
      },
      { status: 500 }
    );
  }
}
