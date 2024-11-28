/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnjs.cloudflare.com'], // Add any other domains you're loading images from
  },
}

module.exports = nextConfig

