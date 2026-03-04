/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Required so Docker build can copy .next/standalone as expected
  output: 'standalone',
}

export default nextConfig
