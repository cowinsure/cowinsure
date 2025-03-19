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
        hostname: 'webv1.insurecow.com',
        port: '',
        pathname: '/media/logos/**',
        search: '',
      },
    ],
    domains: ["webv1.insurecow.com"], // Adjusted this line
  },
  /* config options here */
};

export default nextConfig;
