import type { NextConfig } from "next";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL;

const nextConfig: NextConfig = {
  async rewrites() {
    if (!apiBaseUrl) {
      console.warn("NEXT_PUBLIC_API_URL not set; skipping /api rewrite.");
      return [];
    }

    const normalizedApiBase = apiBaseUrl.replace(/\/$/, "");

    return [
      {
        source: "/api/:path*",
        destination: `${normalizedApiBase}/:path*`, // Proxy to Backend
      },
    ];
  },
};

export default nextConfig;
