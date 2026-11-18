/** @typedef { import("webpack").Configuration.resolve } WebpackResolveConfig * */

/**
 * @return {WebpackResolveConfig}
 */
export const resolveConfig = () => ({
  extensions: ['.js', '.jsx', '.ts', '.tsx', '.scss'],
  modules: ['src', 'node_modules'],
});
