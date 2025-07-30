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
    domains: ['images.unsplash.com'],
  },
  sassOptions: {
    includePaths: ['./styles'],
    prependData: `@import "./styles/marketplace.module.scss";`
  },
  allowedDevOrigins: [
    '*.projects.builder.codes',
    '*.fly.dev'
  ],
}

export default nextConfig
