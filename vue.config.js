const CompressionPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  configureWebpack (config) {
    if (isProd) {
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js/,
            threshold: 5120
          })
        ]
      }
    }
  }
}
