const paths = require("./paths");
const webpack = require("webpack");

const { merge } = require("webpack-merge");

const common = require("./webpack.common.js");

module.exports = merge(common, {
  // Set the mode to development or production
  mode: "development",

  // Control how source maps are generated
  devtool: "inline-source-map",

  // ENABLE "target: 'web'"  for use Hot Reload / HMR in Crome ( not in IE 11 )
  // DISABLE ['web', 'es5'] for use IE 11 during testing => Hot Reload / HMR will stop working in Chrome due to a bug in Webpack 5
  // target: ['web', 'es5'],
  target: "web",

  // Spin up a server for quick development
  devServer: {
    historyApiFallback: true,
    static: paths.build,
    open: true,
    compress: true,
    hot: false,
    port: 8080,
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env.PUBLIC_URL": "/public",
    }),
  ],
});
