/** @typedef {import('webpack').Configuration['resolve']} WebpackResolveConfig */

/**
 * @returns {WebpackResolveConfig}
 */
export const resolveConfig = () => ({
  extensions: ['.ts', '.tsx', '.js', '.jsx', '.scss'],
  modules: ['src', 'node_modules'],
});
