const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    pageA: './src/pageA.js',
    // another: './src/another-module.js',
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        chunks: 'all',
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        // indexStyles: {
        //   name: 'index',
        //   test: (m, c, entry = 'index') =>
        //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true,
        // },
        // pageAStyles: {
        //   name: 'pageA',
        //   test: (m, c, entry = 'pageA') =>
        //     m.constructor.name === 'CssModule' && recursiveIssuer(m) === entry,
        //   chunks: 'all',
        //   enforce: true,
        // },
        // vendors: {
        //   chunks: 'all',
        //   test: /[\\/]node_modules[\\/]/, 
        //   priority: -10
        // },
        // default: false,
      }
    },
  },
  module: {
    rules: [
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
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].[id].css',
    }),

  ],
};