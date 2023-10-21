const { i18n } = require('./next-i18next.config');

/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n,
  reactStrictMode: true,

  webpack(config, { isServer, dev, webpack }) {
    config.experiments = {
      asyncWebAssembly: true,
      layers: true,
    };
    
    return config;
  },
};

module.exports = nextConfig;
