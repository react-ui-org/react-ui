import MiniCssExtractPlugin from 'mini-css-extract-plugin';

/** @typedef { import("webpack").Configuration.module } WebpackModuleConfig * */

/**
 * @param {Environment} environment
 * @return {WebpackModuleConfig}
 */
export const moduleConfig = (environment) => ({
  rules: [
    {
      exclude: /node_modules/,
      test: /\.(js|jsx|ts|tsx)$/,
      use: [{ loader: 'babel-loader' }],
    },
    {
      test: /\.scss$/,
      use: [
        MiniCssExtractPlugin.loader,
        {
          loader: 'css-loader',
          options: {
            modules: {
              auto: true, // Enable CSS Modules only for files with `.module.*` extension
              exportLocalsConvention: 'as-is',
              localIdentName: environment.WEBPACK_MODE === 'production'
                ? '[hash:base64:8]'
                : '[name]__[local]__[hash:base64:8]',
              namedExport: false,
            },
          },
        },
        { loader: 'postcss-loader' },
        { loader: 'sass-loader' },
      ],
    },
  ],
});
