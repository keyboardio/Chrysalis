module.exports = function(wallaby) {
  return {
    files: [
      "src/**/*.+(js|jsx|json|snap|css|less|sass|scss|jpg|jpeg|gif|png|svg)",
      "jest.config.js", // <--
      "!src/**/__tests__/*.js",
      "!src/**/*.test.js",
      "config/**/*.js"
    ],

    tests: ["src/renderer/**/*.test.js", "src/renderer/**/__tests__/*.js"],

    env: {
      type: "node",
      runner: require("electron"),
      params: {
        env: "ELECTRON_RUN_AS_NODE=true"
      }
    },

    testFramework: "jest",

    compilers: {
      "**/*.js": wallaby.compilers.babel()
    },

    workers: {
      initial: 6,
      regular: 2
    },

    setup: function(wallaby) {
      var jestConfig = require("./jest.config.js");
      delete jestConfig.transform["^.+\\.(js|jsx)$"];
      delete jestConfig.testEnvironment;
      wallaby.testFramework.configure(jestConfig);
    }
  };
};
