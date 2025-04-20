/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      { hostname: "cdn.sanity.io" },
      { hostname: "images.unsplash.com" },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  typescript: {
    ignoreBuildErrors: process.env.VERCEL_ENV === "production",
  },
  eslint: {
    ignoreDuringBuilds: process.env.VERCEL_ENV === "production",
  },
  // Enable compression
  compress: true,
};

export default nextConfig;
