import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: process.env.NODE_ENV === "production" ? "standalone" : undefined,
  serverExternalPackages: ["drizzle-orm", "pg"],
};

export default nextConfig;
