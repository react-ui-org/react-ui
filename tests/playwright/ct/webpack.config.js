const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const LIBRARY_CONFIG_PATH = require.resolve('../../../webpack.config');

const libraryConfig = require(LIBRARY_CONFIG_PATH);

/**
 * Webpack configuration of the Playwright Component Testing page.
 *
 * The dev server is started by Playwright (see `webServer` in `playwright-ct.config.ts`). The loader rules and the
 * module resolution are shared with the library build so that the components are compiled the same way.
 */
module.exports = (env, argv) => {
  const {
    module: libraryModule,
    resolve,
  } = libraryConfig(env, argv);

  return {
    // Persist the compilation cache to speed up subsequent runs; invalidate it when either configuration changes
    cache: {
      buildDependencies: {
        config: [
          __filename,
          LIBRARY_CONFIG_PATH,
        ],
      },
      cacheDirectory: Path.resolve(__dirname, '../.temp/playwright-ct-cache'),
      type: 'filesystem',
    },
    devServer: {
      // The page is static, the dev server client (live reload, overlay) is not needed
      client: false,
      hot: false,
      liveReload: false,
      static: {
        directory: __dirname,
      },
    },
    devtool: 'cheap-module-source-map',
    entry: Path.join(__dirname, 'index.tsx'),
    mode: 'development',
    module: libraryModule,
    output: {
      filename: 'ct.js',
      path: Path.resolve(__dirname, '../.temp/playwright-ct-dist'),
      publicPath: '/',
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: 'ct.css',
      }),
    ],
    resolve,
  };
};
