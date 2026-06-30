import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: `Bài viết | ${siteName}`,
  description:
    "Kiến thức về thiết kế website, ứng dụng, phần mềm quản lý và chuyển đổi số cho doanh nghiệp.",
  alternates: {
    canonical: absoluteUrl("/bai-viet")
  },
  openGraph: {
    title: `Bài viết | ${siteName}`,
    description:
      "Kiến thức về thiết kế website, ứng dụng, phần mềm quản lý và chuyển đổi số cho doanh nghiệp.",
    url: absoluteUrl("/bai-viet"),
    type: "website"
  }
};

export const dynamic = "force-dynamic";

export default async function BlogIndexPage() {
  const posts = await getPublishedPosts();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-950">
      <section className="border-b border-slate-200 bg-white px-4 pt-16 pb-12 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28 lg:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-5 md:grid-cols-[1fr_320px] md:items-end">
            <div>
              <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-normal md:text-5xl">
                Bài viết và góc nhìn sản phẩm số
              </h1>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600">
                Các ghi chú thực tế về website, ứng dụng, vận hành và những quyết định kỹ thuật giúp doanh nghiệp đi nhanh hơn.
              </p>
            </div>
            <div className="relative">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
              <div className="min-h-12 rounded-2xl border border-slate-200 bg-slate-50 py-3 pl-11 pr-4 text-sm text-slate-500">
                Tìm kiếm sẽ được thêm ở phiên bản sau
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-5 md:grid-cols-2 lg:grid-cols-3">
          {posts.length ? (
            posts.map((post) => (
              <article
                className="flex min-h-[300px] flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
                key={post.id}
              >
                {post.coverImage ? (
                  <div
                    className="mb-5 aspect-[16/9] rounded-lg bg-cover bg-center"
                    style={{ backgroundImage: `url(${post.coverImage})` }}
                  />
                ) : null}
                <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                  <CalendarDays className="size-4" />
                  {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("vi-VN")}
                </div>
                <h2 className="text-2xl font-bold leading-tight tracking-normal">
                  {post.title}
                </h2>
                <p className="mt-3 line-clamp-3 flex-1 leading-7 text-slate-600">
                  {post.excerpt}
                </p>
                <Button asChild className="mt-5 w-fit" variant="glass">
                  <Link href={`/bai-viet/${post.slug}`}>Đọc bài viết</Link>
                </Button>
              </article>
            ))
          ) : (
            <div className="rounded-lg border border-slate-200 bg-white p-8 text-slate-600 md:col-span-2 lg:col-span-3">
              Chưa có bài viết được xuất bản.
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
