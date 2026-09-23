module.exports = {
  plugins: [
    [
      'babel-plugin-polyfill-corejs3',
      {
        method: 'usage-global',
        version: require('core-js/package.json').version,
      },
    ],
  ],
  presets: [
    [
      '@babel/preset-env',
      {
        modules: 'commonjs',
      },
    ],
    [
      '@babel/preset-react',
      {
        runtime: 'classic',
      },
    ],
    '@babel/preset-typescript',
  ],
};
