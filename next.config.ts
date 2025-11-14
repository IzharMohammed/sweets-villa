import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.storekit.app",
        pathname: "/**",
      },
    ]
  }
};

export default nextConfig;
