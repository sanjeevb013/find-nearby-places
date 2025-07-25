import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_FOURSQUARE_API_KEY: process.env.NEXT_PUBLIC_FOURSQUARE_API_KEY,
  },
  images: {
    domains: ["openweathermap.org", "ss3.4sqi.net"],
  },
};

export default nextConfig;
