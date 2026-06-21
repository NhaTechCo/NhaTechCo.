export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.NODE_ENV === "production"
    ? "https://nhatechvn.com"
    : "http://localhost:3000")
).replace(/\/$/, "");

export const siteName = "NhaTech Co.";

export function absoluteUrl(path = "") {
  if (!path) {
    return siteUrl;
  }

  if (/^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}
