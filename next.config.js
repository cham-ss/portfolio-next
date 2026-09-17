/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  allowedDevOrigins: ['10.0.1.1', '10.0.1.0/24'],
};

module.exports = nextConfig;
