/**
 * Post types used by the frontend.
 * These mirror the backend Prisma models but are independent —
 * the frontend NEVER touches the database directly.
 */

export type PostStatus = "DRAFT" | "PUBLISHED";

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string | null;
  contentJson: unknown;
  contentHtml: string;
  status: PostStatus;
  seoTitle: string | null;
  seoDescription: string | null;
  focusKeyword: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  publishedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

/**
 * Payload used when creating or updating a post through the backend API.
 */
export type PostPayload = {
  title: string;
  slug: string;
  excerpt: string;
  coverImage?: string | null;
  contentJson: unknown;
  contentHtml: string;
  status: PostStatus;
  seoTitle?: string | null;
  seoDescription?: string | null;
  focusKeyword?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
};
