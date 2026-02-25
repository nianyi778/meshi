import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  transpilePackages: ["@meishi/ui", "@meishi/core"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
