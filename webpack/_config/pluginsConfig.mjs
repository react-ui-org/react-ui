import path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import VisualizerPlugin from 'webpack-visualizer-plugin2';

/** @typedef {import('webpack').Configuration['plugins']} WebpackPluginsConfig */

/**
 * @param {Environment} environment
 * @returns {WebpackPluginsConfig}
 */
export const pluginsConfig = (environment) => [
  new MiniCssExtractPlugin({
    chunkFilename: environment.WEBPACK_MODE === 'production'
      ? '[id].css'
      : '[id].development.css',
    filename: environment.WEBPACK_MODE === 'production'
      ? '[name].css'
      : '[name].development.css',
    ignoreOrder: false, // Enable to remove warnings about conflicting order
  }),
  new StyleLintPlugin({
    configFile: 'stylelint.config.mjs',
    files: 'src/**/*.scss',
  }),
  new VisualizerPlugin({
    filename: path.join('..', '..', '..', '..', 'statistics.html'), // Relative to `output.path`
  }),
];
