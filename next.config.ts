import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.example.com',
        port: '',
        pathname: '/account123/**',
        search: '',
      },
      {
        protocol: 'https',
        hostname: '13.126.3.2',
        port: '',
        pathname: '/media/logos/**',
        search: '',
      },
    ],
    domains: ["13.126.3.2"], // Add this line
  },
  /* config options here */
};

export default nextConfig;
