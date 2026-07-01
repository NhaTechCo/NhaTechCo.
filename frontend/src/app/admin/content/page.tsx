import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { SiteContentEditor } from "@/components/cms/site-content-editor";

export const metadata = {
  title: "Nội dung trang chủ | NhaTech CMS"
};

export const dynamic = "force-dynamic";

export default async function AdminContentPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return <SiteContentEditor />;
}
