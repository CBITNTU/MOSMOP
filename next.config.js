/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['cdnjs.cloudflare.com'], // Add any other domains you're loading images from
  },
  // Add these lines for debugging
  webpack: (config, { dev, isServer }) => {
    if (dev && !isServer) {
      const originalEntry = config.entry;
      config.entry = async () => {
        const entries = await originalEntry();
        if (entries['main.js'] && !entries['main.js'].includes('./src/utils/debug.js')) {
          entries['main.js'].unshift('./src/utils/debug.js');
        }
        return entries;
      };
    }
    return config;
  },
}

module.exports = nextConfig

