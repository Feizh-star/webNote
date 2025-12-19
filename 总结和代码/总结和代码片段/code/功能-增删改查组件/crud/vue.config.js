const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        "path": require.resolve("path-browserify")
      }
    }
  },
  devServer: {
    proxy: {
      // https://cn.vitejs.dev/config/#server-proxy
      '/dev-api': {
        target: `http://localhost:10080`,
        changeOrigin: true,
        pathRewrite: {
          '^/dev-api': ''
        }
      }
    }
  },
})
