const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

const MAX_DEVELOPMENT_OUTPUT_SIZE = 1850000;
const MAX_PRODUCTION_OUTPUT_SIZE = 200000;

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production'
    ? false
    : 'eval-cheap-module-source-map',
  entry: {
    lib: [
      path.join(__dirname, 'src/lib/index.js'),
    ],
  },
  externals: {
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
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src/lib'),
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: argv.mode === 'production'
                  ? '[hash:base64:8]'
                  : '[name]__[local]__[hash:base64:8]',
              },
            },
          },
          { loader: 'postcss-loader' },
          {
            loader: 'sass-loader',
            options: {
              sassOptions: {
                includePaths: ['node_modules'],
              },
            },
          },
        ],
      },
    ],
  },
  output: {
    filename: argv.mode === 'production'
      ? '[name].js'
      : '[name].development.js',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  performance: {
    hints: 'error',
    maxAssetSize: argv.mode === 'production'
      ? MAX_PRODUCTION_OUTPUT_SIZE
      : MAX_DEVELOPMENT_OUTPUT_SIZE,
    maxEntrypointSize: argv.mode === 'production'
      ? MAX_PRODUCTION_OUTPUT_SIZE
      : MAX_DEVELOPMENT_OUTPUT_SIZE,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      files: '**/*.scss',
      syntax: 'scss',
    }),
    new VisualizerPlugin({
      filename: argv.mode === 'production'
        ? '../lib-stats.html'
        : '../lib-stats.development.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src/lib', 'node_modules'],
  },
});

