const commonConfig = require('./webpack.common');
const merge = require('webpack-merge');

const devConfig = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3300,
    open: true,
  },
};

module.exports = merge(commonConfig, devConfig);