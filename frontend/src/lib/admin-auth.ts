import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { getAdminSessionSecret } from "@/lib/env";

const cookieName = "nhatech_admin";

function sign(value: string) {
  return createHmac("sha256", getAdminSessionSecret()).update(value).digest("hex");
}

function safeEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(cookieName)?.value;

  if (!raw) {
    return false;
  }

  const [value, signature] = raw.split(".");
  return Boolean(value && signature && safeEqual(sign(value), signature));
}

export async function createAdminSession() {
  const value = "admin";
  const cookieStore = await cookies();

  cookieStore.set(cookieName, `${value}.${sign(value)}`, {
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production"
  });
}

export async function clearAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(cookieName);
}

export async function verifyAdminPassword(password: string): Promise<boolean> {
  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";

  try {
    const res = await fetch(`${backendUrl}/api/admin/auth`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password })
    });

    return res.ok;
  } catch {
    return false;
  }
}
