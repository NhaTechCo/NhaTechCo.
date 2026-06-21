import type { Post, PostStatus, Prisma } from "@prisma/client";
import { adminFetch, apiFetch } from "@/lib/api";

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

export async function createPost(payload: PostPayload) {
  const data = await adminFetch<{ post: Post }>("/api/admin/posts", {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return data.post;
}

export async function updatePost(id: string, payload: PostPayload) {
  const data = await adminFetch<{ post: Post }>(`/api/admin/posts/${id}`, {
    method: "PUT",
    body: JSON.stringify(payload)
  });
  return data.post;
}

export async function deletePost(id: string) {
  await adminFetch(`/api/admin/posts/${id}`, { method: "DELETE" });
}

export async function getAllPosts() {
  const data = await adminFetch<{ posts: Post[] }>("/api/admin/posts");
  return data.posts;
}

export async function getPostById(id: string) {
  const data = await adminFetch<{ post: Post }>(`/api/admin/posts/${id}`);
  return data.post;
}

export async function getPublishedPosts() {
  const data = await apiFetch<{ posts: Post[] }>("/api/posts");
  return data.posts;
}

export async function getPublishedPostBySlug(slug: string) {
  const data = await apiFetch<{ post: Post }>(`/api/posts/${slug}`);
  return data.post;
}

