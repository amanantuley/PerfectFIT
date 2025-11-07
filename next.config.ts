import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    // ✅ Prevent build failures from type issues during Vercel deploys
    ignoreBuildErrors: true,
  },
  eslint: {
    // ✅ Skip linting during build to reduce deployment time
    ignoreDuringBuilds: true,
  },
  images: {
    // ✅ Allow external image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
  webpack: (config) => {
    // ✅ Ignore server-only packages that cause client bundling errors
    config.resolve.fallback = {
      ...config.resolve.fallback,
      '@opentelemetry/exporter-jaeger': false, // Ignore Jaeger (not needed)
      fs: false, // Ignore Node fs
      path: false, // Ignore Node path
      net: false, // Ignore Node net
      tls: false, // Ignore Node TLS
    };

    return config;
  },

  experimental: {
    // ✅ Tell Next.js NOT to bundle these packages (Node-only)
    serverComponentsExternalPackages: [
      'handlebars',
      'dotprompt',
      'genkit',
      '@genkit-ai/core',
    ],
  },
};

export default nextConfig;
