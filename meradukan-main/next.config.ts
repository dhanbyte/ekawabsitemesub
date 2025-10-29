import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  outputFileTracingRoot: __dirname,
  typescript: {
    ignoreBuildErrors: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', '*.vercel.app', 'shopwave.social', '*.shopwave.social']
    }
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      }
    ],
  },
  compress: true,
  poweredByHeader: false,
  env: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || 'pk_test_Y2xlcmsuaW5jbHVkZWQua2F0eWRpZC05Mi5sY2wuZGV2JA',
    NEXT_PUBLIC_PHONEPE_MERCHANT_ID: process.env.NEXT_PUBLIC_PHONEPE_MERCHANT_ID,
    PHONEPE_SALT_KEY: process.env.PHONEPE_SALT_KEY,
    PHONEPE_SALT_INDEX: process.env.PHONEPE_SALT_INDEX,
    PHONEPE_MODE: process.env.PHONEPE_MODE
  },

}

export default nextConfig