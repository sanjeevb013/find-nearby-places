import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_FOURSQUARE_API_KEY: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
};

export default nextConfig;