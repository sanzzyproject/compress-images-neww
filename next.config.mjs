/** @type {import('next').NextConfig} */
const nextConfig = {
  // Meningkatkan batas ukuran body untuk server actions/API
  experimental: {
    serverActions: {
      bodySizeLimit: '20mb',
    },
  },
};

export default nextConfig;
