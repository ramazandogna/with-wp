import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizasyonları
  experimental: {
    optimizePackageImports: ['react-icons']
  },

  // WordPress resimler için
  images: {
    domains: ['wp.ramazandogna.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.ramazandogna.com',
        pathname: '/wp-content/uploads/**'
      }
    ],
    formats: ['image/avif', 'image/webp']
  },

  // SEO için redirects
  async redirects() {
    return [
      {
        source: '/wp-admin/:path*',
        destination: '/',
        permanent: true
      }
    ];
  },

  // Headers for SEO and security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          }
        ]
      }
    ];
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  }
};

export default nextConfig;
