const CompressionPlugin = require('compression-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  productionSourceMap: false,
  pwa: {
    name: 'Jay Playlists',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    workboxPluginMode: 'InjectManifest',
    workboxOptions: {
      swSrc: 'src/service-worker.js'
    }
  },
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
