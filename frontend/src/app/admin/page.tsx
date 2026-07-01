import Link from "next/link";
import { redirect } from "next/navigation";
import {
  FilePenLine,
  FileText,
  Globe,
  LogOut,
  PenLine,
  Plus,
  Settings,
  Sparkles,
  TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { getAllPosts } from "@/lib/posts";
import { loginAction, logoutAction } from "@/app/admin/actions";
import { AdminPostFilter } from "@/components/cms/admin-post-filter";
import { AdminShell } from "@/components/cms/admin-shell";

type AdminPageProps = {
  searchParams: Promise<{ error?: string; q?: string; status?: string }>;
};

export const metadata = {
  title: "Admin CMS | NhaTech Co."
};

export const dynamic = "force-dynamic";

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const isAuthed = await isAdminAuthenticated();
  const searchParamsAwaited = await searchParams;

  if (!isAuthed) {
    return <LoginPanel hasError={searchParamsAwaited.error === "1"} />;
  }

  const allPosts = await getAllPosts();
  const publishedCount = allPosts.filter((p) => p.status === "PUBLISHED").length;
  const draftCount = allPosts.filter((p) => p.status === "DRAFT").length;
  
  const q = searchParamsAwaited.q?.toLowerCase() || "";
  const statusFilter = searchParamsAwaited.status || "ALL";

  let posts = allPosts;
  if (q) {
    posts = posts.filter(
      (p) => p.title.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q)
    );
  }
  if (statusFilter && statusFilter !== "ALL") {
    posts = posts.filter((p) => p.status === statusFilter);
  }

  return (
    <AdminShell 
      title="Tổng quan" 
      subtitle="Quản lý nội dung bài viết và số liệu"
      headerActions={
        <Button
          aria-label="Tạo bài viết mới"
          asChild
          size="sm"
          title="Tạo bài viết mới"
          variant="admin"
          className="gap-2"
        >
          <Link href="/admin/posts/new">
            <Plus className="size-4" />
            <span className="hidden sm:inline">Bài viết mới</span>
          </Link>
        </Button>
      }
    >
      {/* Stats */}
      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <span className="grid size-12 place-items-center rounded-xl bg-cyan-50 text-cyan-600">
            <FileText className="size-6" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">{posts.length}</p>
            <p className="text-sm text-slate-500">Tổng bài viết</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
          <span className="grid size-12 place-items-center rounded-xl bg-emerald-50 text-emerald-600">
            <TrendingUp className="size-6" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">{publishedCount}</p>
            <p className="text-sm text-slate-500">Đã xuất bản</p>
          </div>
        </div>
        <div className="flex items-center gap-4 rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:col-span-2 lg:col-span-1">
          <span className="grid size-12 place-items-center rounded-xl bg-amber-50 text-amber-600">
            <PenLine className="size-6" />
          </span>
          <div>
            <p className="text-2xl font-bold text-slate-900">{draftCount}</p>
            <p className="text-sm text-slate-500">Bản nháp</p>
          </div>
        </div>
      </div>

        {/* Posts table */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="border-b border-slate-100 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Danh sách bài viết</h2>
              <p className="mt-0.5 text-sm text-slate-500">
                Blog hiển thị tại{" "}
                <Link className="font-medium text-cyan-700 hover:underline" href="/bai-viet">
                  /bai-viet
                </Link>
              </p>
            </div>
            <AdminPostFilter />
          </div>

          {posts.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <div className="mb-4 grid size-20 place-items-center rounded-full bg-slate-100">
                <Sparkles className="size-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Chưa có bài viết nào</h3>
              <p className="mt-1 max-w-sm text-sm text-slate-500">
                Tạo bài viết đầu tiên để bắt đầu xây dựng nội dung cho blog của bạn.
              </p>
              <Button asChild variant="admin" className="mt-6 gap-2">
                <Link href="/admin/posts/new">
                  <Plus className="size-4" />
                  Tạo bài viết đầu tiên
                </Link>
              </Button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[700px] border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/50 text-left text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    <th className="px-6 py-3.5">Tiêu đề</th>
                    <th className="px-6 py-3.5">Trạng thái</th>
                    <th className="px-6 py-3.5">Slug</th>
                    <th className="px-6 py-3.5">Cập nhật</th>
                    <th className="px-6 py-3.5 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {posts.map((post) => (
                    <tr
                      className="group transition-colors hover:bg-slate-50/80"
                      key={post.id}
                    >
                      <td className="px-6 py-4">
                        <p className="font-semibold text-slate-900">{post.title}</p>
                        <p className="mt-0.5 line-clamp-1 text-xs text-slate-500">
                          {post.excerpt}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
                            post.status === "PUBLISHED"
                              ? "bg-emerald-50 text-emerald-700"
                              : "bg-amber-50 text-amber-700"
                          }`}
                        >
                          <span
                            className={`size-1.5 rounded-full ${
                              post.status === "PUBLISHED" ? "bg-emerald-500" : "bg-amber-500"
                            }`}
                          />
                          {post.status === "PUBLISHED" ? "Đã xuất bản" : "Bản nháp"}
                        </span>
                      </td>
                      <td className="px-6 py-4 font-mono text-xs text-slate-500">
                        /{post.slug}
                      </td>
                      <td className="px-6 py-4 text-xs text-slate-500">
                        {new Date(post.updatedAt).toLocaleDateString("vi-VN", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric"
                        })}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button asChild size="sm" variant="ghost" className="gap-1.5">
                          <Link href={`/admin/posts/${post.id}/edit`}>
                            <FilePenLine className="size-3.5" />
                            Sửa
                          </Link>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
    </AdminShell>
  );
}

function LoginPanel({ hasError }: { hasError: boolean }) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 size-96 rounded-full bg-cyan-500/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 size-96 rounded-full bg-blue-600/10 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-sm">
        <div className="mb-8 text-center">
          <span className="inline-grid size-14 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 text-xl font-bold text-white shadow-xl shadow-cyan-500/30">
            N
          </span>
          <h1 className="mt-4 text-2xl font-bold text-white">NhaTech CMS</h1>
          <p className="mt-1 text-sm text-slate-400">Đăng nhập để quản lý nội dung</p>
        </div>

        <form
          action={loginAction}
          className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
        >
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-300" htmlFor="password">
              Mật khẩu
            </label>
            <input
              autoFocus
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu admin"
              type="password"
            />
          </div>

          {hasError ? (
            <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-400">
              Mật khẩu chưa đúng. Vui lòng thử lại.
            </div>
          ) : null}

          <Button className="mt-6 w-full gap-2" type="submit" variant="admin">
            <Sparkles className="size-4" />
            Vào CMS
          </Button>
        </form>
      </div>
    </div>
  );
}
