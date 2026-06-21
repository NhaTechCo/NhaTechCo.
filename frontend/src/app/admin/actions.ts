"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSession,
  createAdminSession,
  verifyAdminPassword
} from "@/lib/admin-auth";

export async function loginAction(formData: FormData) {
  const password = String(formData.get("password") ?? "");

  if (!(await verifyAdminPassword(password))) {
    redirect("/admin?error=1");
  }

  await createAdminSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearAdminSession();
  redirect("/admin");
}
