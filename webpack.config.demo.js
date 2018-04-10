const path = require('path');
const StyleLintPlugin = require('stylelint-webpack-plugin');

module.exports = [{
  devServer: {
    contentBase: './demo',
    disableHostCheck: true,
    historyApiFallback: true,
    inline: true,
  },
  entry: {
    demo: [
      'babel-polyfill',
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
        loaders: [
          'style-loader',
          'css-loader?importLoaders=2&modules&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
          'sass-loader',
        ],
        test: /\.scss$/,
      },
      {
        loaders: [
          'svg-sprite-loader',
        ],
        test: /\.svg$/,
      },
      {
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        ],
        test: /\.(svg|jpg)$/,
      },
      {
        include: /\.json$/,
        loaders: [
          'json-loader',
        ],
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'demo/generated'),
    publicPath: '/generated/',
  },
  plugins: [
    new StyleLintPlugin({
      configFile: 'stylelint.config.js',
      syntax: 'scss',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    modules: ['src', 'node_modules'],
  },
}];
