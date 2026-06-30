import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/posts";
import { absoluteUrl } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPublishedPosts();

  return [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1
    },
    {
      url: absoluteUrl("/bai-viet"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8
    },
    ...posts.map((post) => ({
      url: absoluteUrl(`/bai-viet/${post.slug}`),
      lastModified: new Date(post.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7
    }))
  ];
}
