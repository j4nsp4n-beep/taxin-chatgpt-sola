import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/ai-kot-generator-prihrankov",
        destination: "/ai-kot-generator-prihrankov/index.html",
      },
    ];
  },
};

export default nextConfig;
