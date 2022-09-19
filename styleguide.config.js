const path = require('path');

module.exports = {
  // components: 'components/**/*.{js,jsx,ts,tsx}',
  propsParser: require('react-docgen-typescript').withCustomConfig(
    './tsconfig.json',
    [{}],
  ).parse,
  ignore: ['layouts/DevToolbar/*'],
  require: [path.resolve(__dirname, 'styles/globals.css')],
  styleguideComponents: {
    Wrapper: path.join(__dirname, 'styleguide/Wrapper'),
  },
  sections: [
    {
      name: 'Core/Global',
      components: 'components/global/**/*.{js,jsx,ts,tsx}',
    },
    {
      name: 'Categories',
      sections: [
        {
          name: 'Hotels',
          components: 'components/categories/hotels/**/*.{js,jsx,ts,tsx}',
        },
        {
          name: 'Flights',
          components: 'components/categories/flights/**/*.{js,jsx,ts,tsx}',
        },
      ],
    },
  ],
  webpackConfig: {
    module: {
      rules: [
        // Babel loader will use your project’s babel.config.js
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react'],
          },
        },
        // Other loaders that are needed for your components
        {
          test: /\.css$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },
          ],
          exclude: /\.module\.css$/,
        },
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/,
          options: {
            configFile: 'tsconfig.styleguidist.json',
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            'style-loader',
            // Translates CSS into CommonJS
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                modules: true,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      'postcss-preset-env',
                      {
                        // Options
                      },
                    ],
                  ],
                },
              },
            },

            // Compiles Sass to CSS
            'sass-loader',
          ],
        },
      ],
    },

    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        apiCalls: path.resolve(__dirname, 'apiCalls'),
        public: path.resolve(__dirname, 'public'),
        components: path.resolve(__dirname, 'components'),
        styles: path.resolve(__dirname, 'styles'),
        hooks: path.resolve(__dirname, 'hooks'),
        store: path.resolve(__dirname, 'store'),
        types: path.resolve(__dirname, 'types'),
        helpers: path.resolve(__dirname, 'helpers'),
        config: path.resolve(__dirname, 'config'),
        layouts: path.resolve(__dirname, 'layouts'),
        brandSpecificComponents: path.resolve(
          __dirname,
          'brandSpecificComponents',
        ),
      },
    },
  },
};
