import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Explicitly set the workspace root to avoid lockfile detection issues
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
