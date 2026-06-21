import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AdminPostEditor } from "@/components/cms/admin-post-editor";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export const metadata = {
  title: "Tạo bài viết | NhaTech CMS"
};

export const dynamic = "force-dynamic";

export default async function NewPostPage() {
  if (!(await isAdminAuthenticated())) {
    redirect("/admin");
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50/30">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <span className="grid size-9 place-items-center rounded-xl bg-gradient-to-br from-cyan-600 to-blue-700 text-sm font-bold text-white shadow-lg shadow-cyan-500/25">
              N
            </span>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-700">
                NhaTech CMS
              </p>
              <p className="text-sm text-slate-500">Tạo bài viết mới</p>
            </div>
          </div>
          <Button asChild variant="ghost" size="sm" className="gap-2">
            <Link href="/admin">
              <ArrowLeft className="size-4" />
              Quay lại
            </Link>
          </Button>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <AdminPostEditor />
      </main>
    </div>
  );
}
