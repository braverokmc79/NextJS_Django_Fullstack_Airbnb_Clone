import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000", // Django 개발 서버 포트를 사용하는 경우
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
