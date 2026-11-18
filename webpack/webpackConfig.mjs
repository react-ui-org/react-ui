import { devtoolConfig } from './_config/devtoolConfig.mjs';
import { entryConfig } from './_config/entryConfig.mjs';
import { externalsConfig } from './_config/externalsConfig.mjs';
import { moduleConfig } from './_config/moduleConfig.mjs';
import { optimizationConfig } from './_config/optimizationConfig.mjs';
import { outputConfig } from './_config/outputConfig.mjs';
import { performanceConfig } from './_config/performanceConfig.mjs';
import { pluginsConfig } from './_config/pluginsConfig.mjs';
import { resolveConfig } from './_config/resolveConfig.mjs';

/**
 * @typedef { import("webpack").Configuration } WebpackConfig
 */

/**
 * @typedef {Object} Environment
 * @property {'development' | 'production'} WEBPACK_MODE
 */

/**
 * @param webpackArgs
 * @returns {WebpackConfig}
 */
export const webpackConfig = (webpackArgs) => {
  /** @type {Environment} */
  const environment = {
    WEBPACK_MODE: webpackArgs.mode || 'development',
  };

  return ({
    devtool: devtoolConfig(environment),
    entry: entryConfig(),
    externals: externalsConfig(),
    module: moduleConfig(environment),
    optimization: optimizationConfig(environment),
    output: outputConfig(environment),
    performance: performanceConfig(environment),
    plugins: pluginsConfig(environment),
    resolve: resolveConfig(),
  });
};
