const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = [{
  entry: {
    lib: [
      path.join(__dirname, 'src/lib/index.js'),
    ],
  },
  mode: 'production',
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
                localIdentName: '[name]__[local]__[hash:base64:5]',
              }
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          { loader: 'svg-sprite-loader' },
        ],
      },
      {
        test: /\.(svg|jpg)$/,
        use: [
          { loader: 'file-loader?hash=sha512&digest=hex&name=[hash].[ext]' },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'umd',
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new VisualizerPlugin({
      filename: '../../lib-stats.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src/lib', 'node_modules'],
  },
}];
