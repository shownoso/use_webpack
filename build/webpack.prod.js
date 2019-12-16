const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');

module.exports = {
  mode: 'production',
  // devtool: 'cheap-module-source-map',
  plugins: [
    // new BundleAnalyzerPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:6].css',
      chunkFilename: 'css/[name].[id].css',
    }),
    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling "old" SWs to hang around
      clientsClaim: true,
      skipWaiting: true,
    }),
  ]
}