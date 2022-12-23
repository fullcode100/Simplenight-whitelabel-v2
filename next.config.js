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
      'assets3.thrillist.com',
      'q-xx.bstatic.com',
      'property-gallery.rakutentravelxchange.com',
      'i.travelapi.com',
      'hare-media-cdn.tripadvisor.com',
      's3-media1.fl.yelpcdn.com',
      's3-media2.fl.yelpcdn.com',
      's3-media3.fl.yelpcdn.com',
      's3-media4.fl.yelpcdn.com',
      'cdn.parkopedia.com',
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
