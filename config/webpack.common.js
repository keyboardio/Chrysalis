const path = require("path");
const paths = require("./paths");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');

module.exports = {
  // Where webpack looks to start building the bundle and include polyfill
  entry: ["whatwg-fetch", paths.src + "/renderer/index.js"],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: "[name].bundle.js",
    publicPath: "/",
  },

  resolve: {
    //extensions: [".js", ".jsx", "json"],
    fallback: {
      util: require.resolve("util/"),
      path: require.resolve("path-browserify"),
      os: require.resolve("os-browserify/browser"),
      stream: require.resolve("stream-browserify"),
      https: require.resolve("https-browserify"),
      http: require.resolve("stream-http"),
      zlib: require.resolve("browserify-zlib"),
      assert: require.resolve("assert/"),
      crypto: require.resolve("crypto-browserify"),
      url: require.resolve("url/"),
    },
    alias: {
      "@api": path.resolve(__dirname, "../src/api"),
      "@renderer": path.resolve(__dirname, "../src/renderer"),
      "@main": path.resolve(__dirname, "../src/main"),
      "@root": path.resolve(__dirname, ".."),
      components: path.resolve(__dirname, "../src/components/"),
      images: path.resolve(__dirname, "../src/images/"),
      styles: path.resolve(__dirname, "../src/styles/"),
    },
  },

  // Customize the webpack build process
  plugins: [
    //new FriendlyErrorsPlugin(),

    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: "assets",
          globOptions: {
            ignore: ["*.DS_Store"],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: "webpack Boilerplate",
      favicon: paths.src + "/images/favicon.png",
      template: paths.src + "/template.html", // template file
      filename: "index.html", // output file
    }),
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
      // JavaScript: Use Babel to transpile JavaScript files
        {
    test: /\.jsx?$/,
    use: {
      loader: 'babel-loader',
      options: {
        exclude: /node_modules/,
        presets: ['@babel/preset-react']
      }
    }
  },


      // Styles: Inject CSS into the head with source maps
      {
        test: /\.(scss|css)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { sourceMap: true, importLoaders: 1 },
          },
          { loader: "postcss-loader", options: { sourceMap: true } },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },

      // Images: Copy image files to build folder
      { test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: "asset/resource" },

      // Fonts and SVGs: Inline files
      { test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: "asset/inline" },
    ],
  },
};
