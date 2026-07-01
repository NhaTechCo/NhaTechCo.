const BACKEND_URL =
  process.env.INTERNAL_BACKEND_URL ||
  process.env.NEXT_PUBLIC_BACKEND_URL ||
  "http://localhost:4000";

export type SiteContentMap = Record<string, Record<string, unknown>>;

export async function getSiteContent(): Promise<SiteContentMap> {
  try {
    const res = await fetch(`${BACKEND_URL}/api/site-content`, {
      next: { revalidate: 60 }
    });

    if (!res.ok) return {};

    return (await res.json()) as SiteContentMap;
  } catch {
    return {};
  }
}
