import { NextRequest, NextResponse } from "next/server";
import { getBackendApiKey } from "@/lib/env";
import { createPost, getAllPosts, normalizePostPayload } from "@/lib/posts";

function checkAdmin(request: NextRequest): boolean {
  const token = request.headers.get("x-admin-key") ?? "";
  return token === getBackendApiKey();
}

export async function GET(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const posts = await getAllPosts();
  return NextResponse.json({ posts });
}

export async function POST(request: NextRequest) {
  if (!checkAdmin(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const payload = normalizePostPayload(await request.json());
    const post = await createPost(payload);
    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Không thể tạo bài viết."
      },
      { status: 400 }
    );
  }
}
