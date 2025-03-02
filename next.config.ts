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
        protocol: 'http',
        hostname: '52.66.196.177',
        port: '',
        pathname: '/media/logos/**',
        search: '',
      },
    ],
    domains: ['52.66.196.177'], // Add this line
  },
  /* config options here */
};

export default nextConfig;
