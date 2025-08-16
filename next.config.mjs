/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com', 'cdn.builder.io'],
  },
  sassOptions: {
    includePaths: ['./styles']
  },
  experimental: {
    // Optimize HMR and reduce memory usage
    optimizeCss: false,
  },
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
  },
  webpack: (config, { dev, isServer }) => {
    // Optimize webpack config for development
    if (dev && !isServer) {
      // Remove problematic devtool override for better HMR
      // Use Next.js default devtool setting

      // Reduce memory usage and improve HMR stability
      config.optimization = {
        ...config.optimization,
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }

      // Fix module resolution issues
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      }
    }

    return config
  },
  onDemandEntries: {
    // Reduce HMR overhead
    maxInactiveAge: 25 * 1000,
    pagesBufferLength: 2,
  },
}

export default nextConfig
