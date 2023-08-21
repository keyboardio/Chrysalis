const paths = require("./paths");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const webpack = require("webpack");
const packageConfig = require("../package.json");
const PUBLIC_URL = packageConfig.homepage || "default_value";
console.log("PUBLIC_URL", PUBLIC_URL);
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const config = merge(common, {
  mode: "production",
  devtool: false,

  output: {
    path: paths.build,
    filename: "js/[name].[contenthash].bundle.js",
    publicPath: PUBLIC_URL + "/",
  },

  // Production: Magic happen here transpiling to es5 to partly support older browser like IE11
  target: ["web", "es5"],

  plugins: [
    new webpack.DefinePlugin({
      PUBLIC_URL: JSON.stringify(PUBLIC_URL),
    }),

    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash].css",
      chunkFilename: "[id].css",
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: "runtime",
    },
  },
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
});

module.exports = config;
