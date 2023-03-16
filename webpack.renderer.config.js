const path = require("path");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const rules = require('./webpack.rules');

rules.push({
  test: /\.css$/,
  use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
});

module.exports = {
  // Put your normal webpack config below here
    externals: {
  serialport: "serialport",
  usb: "usb",
    },
    module: {
    rules,
  },
plugins: 
    [new CopyWebpackPlugin(
      {
        patterns: [{
        from: path.resolve(__dirname, 'static'),
        to: path.resolve(__dirname, '.webpack/renderer/static')
        }]
      }
    )],
target: "electron-renderer" ,
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@main": path.resolve(__dirname, "src/main"),
      "@root": path.resolve(__dirname)
  },
 }
};
