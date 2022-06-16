Bazecor
=======

![Bazecor screenshot](data/screenshot.png)

## About

Bazecor is the graphical configurator for the Dygma Raise. While still heavily under development, it's at a stage where it is already usable.

The primary purpose of the application is to allow one to configure their keyboard without having to compile or flash firmware, by storing the configuration on the keyboard itself, in EEPROM. There are no external tools required, just Bazecor itself.

## Features

* **Layout editor** to edit the keymap on-the-fly, with the ability to copy one
  layer to another, and to set a default one.
* **Macro editor** to create and manage macros for the keyboard, it also allows you to backup a single macro or all of them, so you can share them with more Raise users or just back them up.
* **Colormap editor** to edit the per-key and underglow LED colormap.
* **Firmware upgrade** to upload new versions of the firmware that ships with the application.

## Supported operating systems

Bazecor is supported on all three major operating systems, we test our releases on Windows 10, MacOS, and Ubuntu LTS.

The protocol Bazecor uses to communicate with the keyboard requires USB serial
support, which is known to be problematic on Windows prior to Windows 10.

## Reporting issues

Bazecor is beta quality software. There will be bugs, missing features and
non-obvious things. Reporting any and all of these help us make the software
better, please feel free to [open issues][issues] liberally!

 [issues]: https://github.com/Dygmalab/Bazecor/issues

## Development

To launch the development environment, simply install nodejs and yarn (check node version in package.json engine.node) then type `yarn && yarn start`. To do a
production build, use `yarn run build:all`, or limit it to a particular OS:
`yarn run build:linux`, `yarn run build:mac` or `yarn run build:win`. See the
`scripts` section of `package.json` for more scripts.

## Additional Information
To get more information about our efforts, how Bazecor communicates with the Raise and the latest development news, please check the links below

* [News](https://github.com/Dygmalab/Bazecor/blob/development/NEWS.md)
* [Code of conduct](https://github.com/Dygmalab/Bazecor/blob/development/CODE_OF_CONDUCT.md)
* [How does Bazecor program the Raise Keyboard?](https://github.com/Dygmalab/Bazecor/blob/development/FOCUS_API.md)
