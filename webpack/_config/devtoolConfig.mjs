/** @typedef {import('webpack').Configuration['devtool']} WebpackDevtoolConfig */

/**
 * @param {Environment} environment
 * @returns {WebpackDevtoolConfig}
 */
export const devtoolConfig = (environment) => (environment.WEBPACK_MODE === 'development'
  ? 'eval-cheap-module-source-map'
  : false);
