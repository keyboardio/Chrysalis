const { spawn } = require("child_process");

module.exports = {
  packagerConfig: {
    asar: true,
    extraResource: ["./build/launcher.sh", "static", "NEWS.md"],
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
      platforms: ["darwin"],
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
   "publishers": [
  {
    "name": "@electron-forge/publisher-github",
    "config": {
      "repository": {
        "owner": "obra",
        "name": "chrysalis-test"
      },
    "draft": true
    }
  }
    ],

  plugins: [
    {
      name: "@electron-forge/plugin-auto-unpack-natives",
      config: {},
    },
    {
      name: "@electron-forge/plugin-webpack",
      config: {
        devContentSecurityPolicy: `default-src 'self' 'unsafe-inline' data:; script-src 'self' 'unsafe-eval' 'unsafe-inline' data:`,
        mainConfig: "./webpack.main.config.js",
        renderer: {
          config: "./webpack.renderer.config.js",
          entryPoints: [
            {
              html: "./src/renderer/index.html",
              js: "./src/renderer/index.js",
              name: "main_window",
              preload: {
                js: "./src/preload.js",
              },
            },
          ],
        },
      },
    },
  ],
  hooks: {
    generateAssets: async (forgeConfig, platform, arch) => {
      // TODO move precompile.mjs here
    },
    readPackageJson: async (forgeConfig, packageJson) => {
      // only copy deps if there isn't any
      if (Object.keys(packageJson.dependencies).length === 0) {
        const originalPackageJson = await fs.readJson(
          path.resolve(__dirname, "package.json")
        );
        const webpackConfigJs = require("./webpack.renderer.config.js");
        Object.keys(webpackConfigJs.externals).forEach((package) => {
          console.log(package);
          packageJson.dependencies[package] =
            originalPackageJson.dependencies[package];
        });
      }
      return packageJson;
    },
    packageAfterPrune: async (forgeConfig, buildPath) => {
      console.log(buildPath);
      return new Promise((resolve, reject) => {
        const npmInstall = spawn("npm", ["install"], {
          cwd: buildPath,
          stdio: "inherit",
          shell: true,
        });

        npmInstall.on("close", (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error("process finished with error code " + code));
          }
        });

        npmInstall.on("error", (error) => {
          reject(error);
        });
      });
    },
  },
};
