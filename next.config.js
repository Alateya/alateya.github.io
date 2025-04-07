/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  output: 'export',
  // Важно для правильной работы GitHub Pages
  basePath: process.env.NODE_ENV === 'production' ? '' : '',
  images: {
    unoptimized: true,
  },
  // Не включать папку .github в сборку
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    // ⚠️ Опасно! Игнорируем все ошибки TS во время сборки
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig 