import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getBackendApiKey } from "@/lib/env";

export async function PUT(request: NextRequest) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
  const apiKey = getBackendApiKey();

  try {
    const body = await request.json();
    const res = await fetch(`${backendUrl}/api/admin/auth`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-admin-key": apiKey
      },
      body: JSON.stringify(body)
    });

    const data = await res.json();

    if (!res.ok) {
      return NextResponse.json(
        { error: data.error || "Không thể đổi mật khẩu." },
        { status: res.status }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi kết nối backend." },
      { status: 500 }
    );
  }
}
