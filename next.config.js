/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    qualities: [100],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
  },
}
module.exports = nextConfig
