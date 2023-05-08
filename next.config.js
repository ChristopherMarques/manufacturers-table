/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        destination: '/manufacturers',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
