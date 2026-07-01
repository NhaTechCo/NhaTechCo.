import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, CalendarDays } from "lucide-react";
import { getPublishedPostBySlug, getPublishedPosts } from "@/lib/posts";
import { absoluteUrl, siteName } from "@/lib/site";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    return {
      title: `Không tìm thấy bài viết | ${siteName}`
    };
  }

  const title = post.seoTitle || post.title;
  const description = post.seoDescription || post.excerpt;
  const canonical = post.canonicalUrl || absoluteUrl(`/bai-viet/${post.slug}`);
  const image = post.ogImage || post.coverImage || "/images/hero-studio.png";

  return {
    title,
    description,
    alternates: {
      canonical
    },
    openGraph: {
      title,
      description,
      url: canonical,
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt,
      images: [image]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    }
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-950">
      <article>
        <header className="border-b border-slate-200 bg-slate-50 px-4 pt-28 pb-12 sm:px-6 sm:pt-32 lg:px-8 lg:pt-36 lg:pb-16">
          <div className="mx-auto max-w-3xl">
            <Link
              className="inline-flex items-center gap-2 text-sm font-bold text-cyan-700"
              href="/bai-viet"
            >
              <ArrowLeft className="size-4" />
              Tất cả bài viết
            </Link>
            <div className="mt-8 flex items-center gap-2 text-sm font-semibold text-slate-500">
              <CalendarDays className="size-4" />
              {new Date(post.publishedAt ?? post.createdAt).toLocaleDateString("vi-VN")}
            </div>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-normal md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-5 text-lg leading-8 text-slate-600">{post.excerpt}</p>
          </div>
        </header>

        {post.coverImage ? (
          <div className="mx-auto mt-8 max-w-5xl px-4 sm:px-6 lg:px-8">
            <div
              className="aspect-[16/7] rounded-lg bg-cover bg-center"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          </div>
        ) : null}

        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div
            className="cms-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </div>
      </article>
    </main>
  );
}
