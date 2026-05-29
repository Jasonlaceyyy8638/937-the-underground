import type { NextConfig } from "next";

const nextConfig = {
  serverExternalPackages: ["@aws-sdk/client-s3", "@aws-sdk/s3-request-presigner"],
} as NextConfig;

export default nextConfig;
