/** @type {import('next').NextConfig} */
const nextConfig = {
  // experimental: {
  //   middleware: true,
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tandemall.s3.eu-central-1.amazonaws.com",
      },
      {
        protocol: "https",
        hostname: "www.apple.com",
      },
    ],
  },
};

export default nextConfig;
