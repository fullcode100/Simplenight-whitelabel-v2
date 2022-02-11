/** @type {import('next').NextConfig} */
const path = require('path');
const withReactSvg = require('next-react-svg');

module.exports = withReactSvg({
  include: path.resolve(__dirname, 'public/icons'),
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  reactStrictMode: true,
  webpack(config, options) {
    return config;
  },
  experimental: {
    outputStandalone: true,
  },
});
