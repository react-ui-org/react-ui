const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const VisualizerPlugin = require('webpack-visualizer-plugin');

module.exports = [{
  devServer: {
    contentBase: './demo',
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    inline: true,
  },
  entry: {
    demo: [
      'core-js',
      path.join(__dirname, 'src/demo/index.jsx'),
    ],
  },
  module: {
    rules: [
      {
        include: path.join(__dirname, 'src'),
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
              },
            },
          },
          { loader: 'postcss-loader' },
          { loader: 'sass-loader' },
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'demo/generated'),
    publicPath: '/generated/',
  },
  performance: {
    maxAssetSize: 750000,
    maxEntrypointSize: 750000,
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
    new VisualizerPlugin({
      filename: '../../demo-stats.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
}];
