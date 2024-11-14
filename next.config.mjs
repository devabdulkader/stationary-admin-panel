/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'dummyimage.com',
      },
      {
        protocol: 'https',
        hostname: 'test-bucket-zorgit.s3.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
