import Path from 'path';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import libraryConfig from '../../../webpack.config.mjs';

const LIBRARY_CONFIG_PATH = Path.resolve(import.meta.dirname, '../../../webpack.config.mjs');

/**
 * Webpack configuration of the Playwright Component Testing page.
 *
 * The dev server is started by Playwright (see `webServer` in `playwright-ct.config.ts`). The loader rules and the
 * module resolution are shared with the library build so that the components are compiled the same way.
 */
export default (env, argv) => {
  const {
    module: libraryModule,
    resolve,
  } = libraryConfig(env, argv);

  return {
    // Persist the compilation cache to speed up subsequent runs; invalidate it when either configuration changes
    cache: {
      buildDependencies: {
        config: [
          import.meta.filename,
          LIBRARY_CONFIG_PATH,
        ],
      },
      cacheDirectory: Path.resolve(import.meta.dirname, '../.temp/playwright-ct-cache'),
      type: 'filesystem',
    },
    devServer: {
      // The page is static, the dev server client (live reload, overlay) is not needed
      client: false,
      hot: false,
      liveReload: false,
      static: {
        directory: import.meta.dirname,
      },
    },
    devtool: 'cheap-module-source-map',
    entry: Path.join(import.meta.dirname, 'index.tsx'),
    mode: 'development',
    module: libraryModule,
    output: {
      filename: 'ct.js',
      path: Path.resolve(import.meta.dirname, '../.temp/playwright-ct-dist'),
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
