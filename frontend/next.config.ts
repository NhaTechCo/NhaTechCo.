import type { NextConfig } from "next";

const internalBackendUrl =
  process.env.INTERNAL_BACKEND_URL ?? "http://127.0.0.1:4000";

const nextConfig: NextConfig = {
  devIndicators: false,
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${internalBackendUrl}/api/:path*`
      }
    ];
  }
};

export default nextConfig;
