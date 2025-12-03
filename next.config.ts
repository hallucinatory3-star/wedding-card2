import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [],
    unoptimized: false,
  },
  // Ensure proper rendering
  reactStrictMode: true,
};

export default nextConfig;
