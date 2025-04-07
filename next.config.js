/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  // Важно для правильной работы GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '/eis-portfolio' : '',
  images: {
    unoptimized: true,
  },
  // Не включать папку .github в сборку
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig 