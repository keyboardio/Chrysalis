const path = require("path");
module.exports = {
  stats: {
    children: false,
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "src/api"),
      "@renderer": path.resolve(__dirname, "src/renderer"),
      "@main": path.resolve(__dirname, "src/main"),
    },
  },
};
