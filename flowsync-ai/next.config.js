/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    appDir: false,
  },
  images: {
    domains: ['localhost'],
  },
  env: {
    CUSTOM_KEY: 'flowsync-ai',
  },
}

module.exports = nextConfig