import { NextRequest, NextResponse } from "next/server";
import { changeAdminPassword, verifyAdminPassword } from "@/lib/admin-auth";
import { getClientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: NextRequest) {
  try {
    const limit = rateLimit(`login:${getClientIp(request)}`, 10, 10 * 60 * 1000);

    if (!limit.ok) {
      return NextResponse.json(
        { error: "Đăng nhập sai quá nhiều lần. Vui lòng thử lại sau." },
        { status: 429, headers: { "Retry-After": String(limit.retryAfterSeconds) } }
      );
    }

    const { password } = await request.json();

    if (!password || typeof password !== "string") {
      return NextResponse.json({ error: "Thiếu mật khẩu." }, { status: 400 });
    }

    const valid = await verifyAdminPassword(password);

    if (!valid) {
      return NextResponse.json({ error: "Sai mật khẩu." }, { status: 401 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Lỗi xác thực." },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const { currentPassword, newPassword } = await request.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json(
        { error: "Vui lòng nhập đầy đủ mật khẩu hiện tại và mật khẩu mới." },
        { status: 400 }
      );
    }

    const result = await changeAdminPassword(currentPassword, newPassword);

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Không thể đổi mật khẩu." },
      { status: 500 }
    );
  }
}
