/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    REACT_APP_FRONTEND: process.env.REACT_APP_FRONTEND,
    REACT_APP_BACKEND: process.env.REACT_APP_BACKEND
  },
  experimental: {
    fontLoaders: [
      { loader: '@next/font/google', options: { subsets: ['latin'] } },
    ],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true
  },
}

module.exports = nextConfig
