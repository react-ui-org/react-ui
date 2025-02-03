const Path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin2');

const MAX_DEVELOPMENT_OUTPUT_SIZE = 3400000;
const MAX_PRODUCTION_OUTPUT_SIZE = 440000;

module.exports = (env, argv) => ({
  devtool: argv.mode === 'production'
    ? false
    : 'eval-cheap-module-source-map',
  entry: {
    'docs-custom-properties': Path.join(__dirname, 'src/docsCustomProperties.js'),
    'react-ui': Path.join(__dirname, 'src/index.js'),
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
        test: /\.(js|jsx)$/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true, // Enable CSS Modules only for files with `.module.*` extension
                exportLocalsConvention: 'as-is',
                localIdentName: argv.mode === 'production'
                  ? '[hash:base64:8]'
                  : '[name]__[local]__[hash:base64:8]',
                namedExport: false,
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
  optimization: {
    minimize: argv.mode === 'production',
    minimizer: [new TerserPlugin()],
  },
  output: {
    filename: argv.mode === 'production'
      ? '[name].js'
      : '[name].development.js',
    libraryTarget: 'umd',
    path: Path.join(__dirname, 'src/docs/_assets/generated/'),
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
    new MiniCssExtractPlugin({
      chunkFilename: argv.mode === 'production'
        ? '[id].css'
        : '[id].development.css',
      filename: argv.mode === 'production'
        ? '[name].css'
        : '[name].development.css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      files: 'src/**/*.scss',
    }),
    new VisualizerPlugin({
      filename: Path.join('..', '..', '..', '..', 'statistics.html'), // Relative to output.path
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
});
