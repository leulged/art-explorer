import bundleAnalyzer from "@next/bundle-analyzer";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.metmuseum.org",
        pathname: "/**",
      },
    ],
  },
};
const withAnalyzer = bundleAnalyzer({ enabled: process.env.ANALYZE === "true" });

export default withAnalyzer(nextConfig);
