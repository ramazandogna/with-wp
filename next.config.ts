import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Performance optimizasyonları
  experimental: {
    optimizePackageImports: ['react-icons']
  },

  // WordPress görseller için
  images: {
    domains: ['wp.ramazandogna.com', 'cldup.com', 'picsum.photos'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wp.ramazandogna.com',
        pathname: '/wp-content/uploads/**'
      },
      {
        protocol: 'https',
        hostname: 'cldup.com',
        pathname: '/**'
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        pathname: '/**'
      }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [50, 75, 80, 85, 90, 95]
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
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), usb=()'
          }
        ]
      }
    ];
  },

  // Production optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production'
  },

  // Webpack config for plaiceholder and Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Client-side bundle'da Node.js native modüllerini ignore et
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        child_process: false,
        'detect-libc': false
      };
    }
    return config;
  }
};

export default nextConfig;
