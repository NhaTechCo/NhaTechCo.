import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { SettingsForm } from "./settings-form";

export const metadata = {
  title: "Cài đặt tài khoản | NhaTech CMS"
};

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return <SettingsForm />;
}
