module.exports = {
  mode: 'development',
  optimization: {
    usedExports: true,
  },
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    port: 3300,
    open: true,
  },
} 