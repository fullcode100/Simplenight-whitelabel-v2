/* eslint-disable @typescript-eslint/no-var-requires */
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
  images: {
    domains: [
      'photos.hotelbeds.com',
      'mobileimg.priceline.com',
      'cataas.com',
      'dummyimage.com',
      'q-xx.bstatic.com',
      'property-gallery.rakutentravelxchange.com',
    ],
  },
  webpackDevMiddleware: (config) => {
    config.watchOptions = {
      poll: 500,
      aggregateTimeout: 300,
    };
    return config;
  },
});
