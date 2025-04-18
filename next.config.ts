import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "https://xn----nbck7b7ald8atlv.xn--y9a3aq/strahovanie.loc/public/:path*",
      },
    ];
  },
};

export default nextConfig;
