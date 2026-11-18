/** @typedef {import('webpack').Configuration['externals']} WebpackExternalsConfig */

/**
 * @returns {WebpackExternalsConfig}
 */
export const externalsConfig = () => ({
  react: {
    amd: 'react',
    commonjs: 'react',
    commonjs2: 'react',
    root: 'React',
    umd: 'react',
  },
  'react-dom': {
    amd: 'react-dom',
    commonjs: 'react-dom',
    commonjs2: 'react-dom',
    root: 'ReactDOM',
    umd: 'react-dom',
  },
});
