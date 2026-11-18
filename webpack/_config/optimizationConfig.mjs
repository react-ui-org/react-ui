import TerserPlugin from 'terser-webpack-plugin';

/** @typedef { import("webpack").Configuration.optimization } WebpackOptimizationConfig * */

/**
 * @param {Environment} environment
 * @return {WebpackOptimizationConfig}
 */
export const optimizationConfig = (environment) => ({
  minimize: environment.WEBPACK_MODE === 'production',
  minimizer: [new TerserPlugin()],
});
