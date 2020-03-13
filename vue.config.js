module.exports = {
  devServer: {
    proxy: {
      '/zky': {
        target: 'http://hyh.tanjie.wang:81/',
        changeOrigin: true,
        pathRewrite: {
          "^/zky": ""
        }
      }
    },
  }
}