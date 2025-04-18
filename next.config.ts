import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// next.config.js
module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path*", 
        destination: "https://https://xn----nbck7b7ald8atlv.xn--y9a3aq/strahovanie.loc/public/:path*",
      },
    ];
  },
};


export default nextConfig;
