/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.js$/,
      use: ['babel-loader'],
      include: [
        /node_modules\/leaflet/,
        /node_modules\/react-leaflet/,
      ],
    })
    return config
  },
}

module.exports = nextConfig

