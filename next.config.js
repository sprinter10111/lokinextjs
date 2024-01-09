/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    // Expose environment variables to the client side
    APP_KEY: process.env.APP_KEY,
  },
};

module.exports = nextConfig;
