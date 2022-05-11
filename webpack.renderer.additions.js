const path = require("path");
module.exports = {
  stats: {
    children: false,
    loggingTrace: false,
    logging: "info",
  },
  devServer: {
    stats: "errors-only",
  },

  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@main": path.resolve(__dirname, "src/main"),
    },
  },
};
