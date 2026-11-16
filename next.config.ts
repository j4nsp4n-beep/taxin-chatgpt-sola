import type { NextConfig } from "next";

const noIndexHeaders = [
  {
    key: "X-Robots-Tag",
    value: "noindex, nofollow, noarchive, nosnippet",
  },
];

const securityHeaders = [
  {
    key: "Content-Security-Policy",
    value: "frame-ancestors 'self'",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
  },
];

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/7-dnevni-ai-audit",
        destination: "/pregled-pripravljenosti",
        permanent: true,
      },
      {
        source: "/ai-sistem-za-podjetje",
        destination: "/pregled-pripravljenosti",
        permanent: true,
      },
    ];
  },
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
        source: "/:path*",
        headers: securityHeaders,
      },
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
