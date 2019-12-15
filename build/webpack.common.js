const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

module.exports = () => {
  const devMode = process.env.NODE_ENV === 'development';
  const commonConfig = {
    entry: {
      index: './src/index.js',
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
        // cacheGroups: {}
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
            {
              // 与style-loader冲突，适用于production，可以通过环境判断选择使用
              loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 
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
      // new webpack.ProvidePlugin({
      //   // _: 'lodash',
      //   __join: ['lodash', 'join'],
      // }),
    ],
  };

  return devMode ? merge(commonConfig, devConfig) : merge(commonConfig, prodConfig)
}