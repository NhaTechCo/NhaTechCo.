import type { Post, PostStatus, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slug";

export type PostPayload = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  contentJson: Prisma.InputJsonValue;
  contentHtml: string;
  status: PostStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
};

function optionalString(value: unknown): string | null {
  if (typeof value === "string" && value.trim().length > 0) {
    return value.trim();
  }
  return null;
}

export function normalizePostPayload(input: Record<string, unknown>): PostPayload {
  const title = String(input.title ?? "").trim();
  const excerpt = String(input.excerpt ?? "").trim();
  const contentHtml = String(input.contentHtml ?? "").trim();
  const rawSlug = String(input.slug ?? title).trim();
  const slug = slugify(rawSlug);
  const status = input.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT";

  if (title.length < 4) {
    throw new Error("Tiêu đề cần ít nhất 4 ký tự.");
  }

  if (!slug) {
    throw new Error("Slug chưa hợp lệ.");
  }

  if (excerpt.length < 20) {
    throw new Error("Mô tả ngắn cần ít nhất 20 ký tự.");
  }

  if (contentHtml.length < 80) {
    throw new Error("Nội dung bài viết còn quá ngắn.");
  }

  return {
    title,
    slug,
    excerpt,
    coverImage: optionalString(input.coverImage),
    contentJson: (input.contentJson ?? {}) as Prisma.InputJsonValue,
    contentHtml,
    status,
    seoTitle: optionalString(input.seoTitle),
    seoDescription: optionalString(input.seoDescription),
    focusKeyword: optionalString(input.focusKeyword),
    canonicalUrl: optionalString(input.canonicalUrl),
    ogImage: optionalString(input.ogImage)
  };
}

function resolvePublishedAt(current: Post, newStatus: PostStatus): Date | null {
  if (newStatus === "PUBLISHED" && current.status !== "PUBLISHED") {
    return new Date();
  }
  if (newStatus === "PUBLISHED" && current.publishedAt) {
    return current.publishedAt;
  }
  if (newStatus === "DRAFT") {
    return null;
  }
  return current.publishedAt;
}

export async function createPost(payload: PostPayload) {
  return prisma.post.create({
    data: {
      ...payload,
      publishedAt: payload.status === "PUBLISHED" ? new Date() : null
    }
  });
}

export async function updatePost(id: string, payload: PostPayload) {
  const current = await prisma.post.findUnique({ where: { id } });

  if (!current) {
    throw new Error("Không tìm thấy bài viết.");
  }

  return prisma.post.update({
    where: { id },
    data: {
      ...payload,
      publishedAt: resolvePublishedAt(current, payload.status)
    }
  });
}

export async function deletePost(id: string) {
  await prisma.post.delete({ where: { id } });
}

export async function getAllPosts() {
  return prisma.post.findMany({
    orderBy: [{ updatedAt: "desc" }]
  });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({
    orderBy: [{ publishedAt: "desc" }, { createdAt: "desc" }],
    where: { status: "PUBLISHED" }
  });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({
    where: {
      slug,
      status: "PUBLISHED"
    }
  });
}

export async function getPostById(id: string) {
  return prisma.post.findUnique({ where: { id } });
}
