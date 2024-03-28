/** @type {import('next').NextConfig} */
const nextConfig = {
  // disabling strict mode since the examples use
  // useEffect with no dependencies to ensure the function
  // is only run once and only run on the client.
  reactStrictMode: false,
  swcMinify: true,
  images: {
    dangerouslyAllowSVG: true,
    domains: ['static.ably.dev'],
  },
  experimental: {
    serverComponentsExternalPackages: ['ably'],
  },
};

module.exports = nextConfig;
