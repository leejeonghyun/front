// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  // options...
  transpileDependencies: [
    'resize-detector',
    'scroll-dir',
    'vue-daum-postcode',
    'strip-ansi',
  ],
  devServer: {
    disableHostCheck: true
  },
  chainWebpack: (config) => {
    config.plugins.delete('prefetch');
  },
  // configureWebpack: {
  //     plugins: [new BundleAnalyzerPlugin()]
  // }
}
