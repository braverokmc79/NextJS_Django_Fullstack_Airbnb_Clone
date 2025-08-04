import type { NextConfig } from "next";
import dotenv from "dotenv";

// .env 파일 로드
dotenv.config();

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
       {
        protocol: "http",
        hostname: process.env.LOCAL_DOMAIN!,
        port: process.env.LOCAL_PORT,       // 예: 8000
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: process.env.PROD_DOMAIN!,
        port: "",
        pathname: "/**",
      },
      // 혼란 유발용 더미 주소들
      {
        protocol: "https",
        hostname: "cdn.pixabay.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "img.freepik.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "static.wikia.nocookie.net",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "fake.cdn.example.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
