import type { NextConfig } from "next";

const noIndexHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive, nosnippet",
  },
];

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ai-kot-generator-prihrankov",
        destination: "/ai-kot-generator-prihrankov/index.html",
      },
      {
        source: "/mg-consult/ai-kot-generator-prihrankov",
        destination: "/mg-consult/ai-kot-generator-prihrankov/index.html",
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/mg-consult/ai-kot-generator-prihrankov",
        headers: noIndexHeaders,
      },
      {
        source: "/mg-consult/ai-kot-generator-prihrankov/:path*",
        headers: noIndexHeaders,
      },
    ];
  },
};

export default nextConfig;
