const { defineConfig } = require("@vue/cli-service");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    port: 3000,
    hot: true, // Enable Hot Module Replacement
    liveReload: true, // Enable live reloading
    allowedHosts: 'all'
  },
  configureWebpack: {
    plugins: [new NodePolyfillPlugin()],
    optimization: {
      splitChunks: {
        chunks: "all",
      },
    },
  }
});
