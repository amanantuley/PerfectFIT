import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'placehold.co', pathname: '/**' },
      { protocol: 'https', hostname: 'picsum.photos', pathname: '/**' },
    ],
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      path: false,
      '@opentelemetry/exporter-jaeger': false,
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: [
      'handlebars',
      'dotprompt',
      'genkit',
      '@genkit-ai/core',
    ],
  },
  output: 'standalone',
};

export default nextConfig;
