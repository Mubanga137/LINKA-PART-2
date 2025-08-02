/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
    tsconfigPath: './tsconfig.json',
  },
  images: {
    unoptimized: true,
    domains: ['images.unsplash.com'],
  },
  sassOptions: {
    includePaths: ['./styles']
  },
  allowedDevOrigins: [
    '*.projects.builder.codes',
    '*.fly.dev'
  ],
  serverExternalPackages: [],
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ]
  },
}

export default nextConfig
