const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
function recursiveIssuer(m) {
  if (m.issuer) {
    return recursiveIssuer(m.issuer);
  } else if (m.name) {
    return m.name;
  } else {
    return false;
  }
}

module.exports = {
  entry: {
    index: './src/index.js',
    // pageA: './src/pageA.js',
    // another: './src/another-module.js',
  },
  output: {
    filename: '[name].[contenthash:6].js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    // runtimeChunk: 'single',
    moduleIds: 'hashed',
    splitChunks: {

      chunks: 'all',
      // cacheGroups: {


      // }
    },
  },
  module: {
    rules: [
      {
        test: require.resolve('../src/test-shim-module.js'),
        use: 'imports-loader?this=>window',
      },
      {
        test: require.resolve('../src/test-shim-module.js'),
        use: 'exports-loader?say=window.say',
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        sideEffects: true,
        use: [
          // 'style-loader',
          {
            loader: MiniCssExtractPlugin.loader, // 与style-loader冲突，适用于production，可以通过环境判断选择使用
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            }
          },
          'postcss-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'webpack',
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[id].css',
    }),
    new webpack.ProvidePlugin({
      // _: 'lodash',
      __join: ['lodash', 'join'],
    }),
  ],
};