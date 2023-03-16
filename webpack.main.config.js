const path = require("path");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  entry: './src/main/index.js',
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
        externals: {
  serialport: "serialport",
  "@serialport": "@serialport",
  usb: "usb",
    },

  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@main": path.resolve(__dirname, "src/main"),
    },
  },

};
