# `@reforged/maker-appimage`

An unofficial AppImage target *maker* for the [Electron Forge][1]. Designed to
manage tasks asynchroniously and synchronize the tasks only when it is required
for them to finish. A part of the [*Reforged*][2] project.

## Usage:

Please reffer to [Electron Forge documentation][3] if you don't know about
general Electron Forge configuration.

The maker itself should work *out-of-the-box*, althrough it is recommended to
at least provide the path of the icon and `categories`. An example relevant part
of Electron Forge's configuration for this *maker* may look like this:
```js
{
  name: "@reforged/maker-appimage",
  config: {
    options: {
      // Package name.
      name: "example-app",
      // Executable name.
      bin: "app",
      // Human-friendly name of the application.
      productName: "Example Electron Application",
      // `GenericName` in generated `.desktop` file.
      genericName: "Example application",
      // Path to application's icon.
      icon: "/path/to/icon.png",
      // `Categories` in generated `.desktop` file.
      categories: [ "Utility" ],
      // Actions of generated `.desktop` file.
      actions: {
        new_window: {
          Name: "Launch in new window!",
          Icon: "/path/to/new-window.png",
          Exec: "example-app --new-window"
        }
      },
      // Desktop file to be used instead of the configuration above.
      desktopFile: "/path/to/example-app.desktop",
      // Release of `AppImage/AppImageKit`, either number or "continuous".
      AppImageKitRelease: "continuous"
    }
  }
}
```

You may also import `MakerAppImageConfig` interface if you wish to verify
Electron Forge configuration with TypeScript (when declaring it outside of
`package.json` in JS/TS file) and access JSDoc comments in your editor if it
supports them.

[1]: https://github.com/electron/forge
[2]: https://github.com/SpacingBat3/ReForged
[3]: https://www.electronforge.io/configuration