const { spawn } = require("child_process");
const { generateCLDRData } = require("./tools/precompile.js");

module.exports = {
  packagerConfig: {
    asar: true,
    darwinDarkModeSupport: "true",
    icon: "build/icon",
    name: "Chrysalis",
    extraResource: ["static", "NEWS.md"],
    osxSign: {
      "pre-auto-entitlements": false,
      "gatekeeper-assess": false,
      identity: "Developer ID Application: Keyboard.io, Inc. (8AUZGMT2H5)",
      entitlements: "./build/entitlements",
      // optionsForFile: (filePath) => {
      // Here, we keep it simple and return a single entitlements.plist file.
      // You can use this callback to map different sets of entitlements
      // to specific files in your packaged app.
      // return { entitlements: './build/entitlements.mac.inherit.plist' }
      // }
    },
    osxNotarize: {
      tool: "notarytool",
      appleId: process.env.APPLE_ID,
      appleIdPassword: process.env.APPLE_PASSWORD,
      teamId: process.env.APPLE_TEAM_ID,
    },
    packageManager: "yarn",
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-dmg",
      config: {},
    },
    {
      name: "@electron-forge/maker-zip",
    },
{
  name: "@reforged/maker-appimage",
  config: {
    options: {
      // Package name.
      // name: "example-app",
      // Executable name.
      bin: "Chrysalis",
      // Human-friendly name of the application.
      // productName: "Example Electron Application",
      // `GenericName` in generated `.desktop` file.
      // genericName: "Example application",
      // Path to application's icon.
      icon: "build/icon.png",
      // `Categories` in generated `.desktop` file.
      categories: [ "Utility" ],
      // Actions of generated `.desktop` file.
      // actions: {
      //  new_window: {
      //    Name: "Launch in new window!",
      //    Icon: "/path/to/new-window.png",
      //    Exec: "example-app --new-window"
      //  }
      //},
      // Desktop file to be used instead of the configuration above.
      // desktopFile: "/path/to/example-app.desktop",
      // Release of `AppImage/AppImageKit`, either number or "continuous".
      // AppImageKitRelease: "continuous"
    }
  }
}



  ],
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "keyboardio",
          name: "Chrysalis",
        },
        draft: true,
      },
    },
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
      generateCLDRData();
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
        const npmInstall = spawn("npm", ["install", "--omit=dev"], {
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
