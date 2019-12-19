module.exports = {
  runtimeCompiler: true,
  devServer: {
    port: 8081,
    proxy: {
      '/v1': {
        target: 'http://134.175.4.31:8080/v1',
        ws: false,
        changeOrigin: true,
        pathRewrite: {
          '^/v1': ''
        }
      }
    }
  },
  publicPath: './'
}
