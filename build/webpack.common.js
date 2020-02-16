const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const devConfig = require('./webpack.dev');
const prodConfig = require('./webpack.prod');

const CustomPlugin = require('./plugins/customPlugin');

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
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, './loaders')]
    },
    module: {
      rules: [
        // {
        //   test: require.resolve('../src/test-shim-module.js'),
        //   use: 'imports-loader?this=>window',
        // },
        // {
        //   test: require.resolve('../src/test-shim-module.js'),
        //   use: 'exports-loader?say=window.say',
        // },
        {
          test: /\.(t|j)s$/,
          exclude: /node_modules/,
          use: [
            'babel-loader',
            {
              loader: 'customLoader',
              options: {
                name: 'webpack'
              }
            }
          ]
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
      new CustomPlugin(),
      new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        title: 'webpack',
        template: './src/index.html'
      }),
      new webpack.DllReferencePlugin({
        manifest: path.resolve(__dirname, '../dll/vendors.manifest.json')
      }),

      // new webpack.ProvidePlugin({
      //   // _: 'lodash',
      //   __join: ['lodash', 'join'],
      // }),
    ],
    resolve: {
      extensions: ['.ts','.js'],
      // alias: {
      //   '@': path.resolve(__dirname, '../src/')
      // }
    }
  };

  return devMode ? merge(commonConfig, devConfig) : merge(commonConfig, prodConfig)
}