Chrysalis
=========

![Chrysalis screenshot](data/screenshot.png)

## Downloads

You can download pre-built binaries for the three major operating systems below:

Development builds:

[![Latest Linux build][badge:appimage]][build:appimage]
[![Latest macOS build][badge:dmg]][build:dmg]
[![Latest Windows build][badge:exe]][build:exe]

 [badge:appimage]: https://img.shields.io/badge/AppImage-latest-blue.svg?logo=linux&style=for-the-badge&logoColor=ffffff
 [badge:dmg]: https://img.shields.io/badge/dmg-latest-blue.svg?logo=apple&style=for-the-badge&logoColor=ffffff
 [badge:exe]: https://img.shields.io/badge/exe-latest-blue.svg?logo=windows&style=for-the-badge&logoColor=ffffff
 [build:appimage]: http://kaleidoscope-builds.s3-website-us-west-2.amazonaws.com/Chrysalis/latest/Chrysalis.AppImage
 [build:dmg]: http://kaleidoscope-builds.s3-website-us-west-2.amazonaws.com/Chrysalis/latest/Chrysalis.dmg
 [build:exe]: http://kaleidoscope-builds.s3-website-us-west-2.amazonaws.com/Chrysalis/latest/Chrysalis.exe


Current release:

[![](https://img.shields.io/github/release-pre/keyboardio/Chrysalis.svg?style=for-the-badge)](https://github.com/keyboardio/Chrysalis/releases)

## About

Chrysalis is a graphical configurator for
[Kaleidoscope][kaleidoscope]-powered keyboards. While still under
development, it is already usable for a number of tasks. To try it,
you don't even need to flash `Kaleidoscope` beforehand, Chrysalis
can do that for you, as it ships with reasonable default firmware
for each supported board.

 [kaleidoscope]: https://github.com/keyboardio/Kaleidoscope

The primary purpose of the application is to allow one to configure their
keyboard without having to compile or flash firmware, by storing the
configuration on the keyboard itself, in EEPROM. There are no external tools
required, just Chrysalis itself.

## Features

* **Layout editor** to edit the keymap on-the-fly, with the ability to copy one
  layer to another, and to set a default one.
* **Colormap editor** to edit the per-key LED colormap on boards that support it.
* **Firmware upgrade** to upload either the default, Chrysalis-enabled firmware that ships with the application, or a custom one.

## Supported Hardware

Chrysalis supports the [Keyboardio Model01][hw:model01] and the [Keyboardio
Atreus][hw:kbio-atreus], along with the original [Atreus][hw:atreus]. There's
also preliminary support for the [Dygma Raise][hw:raise].

The [ErgoDox EZ][hw:ergodox-ez] (and any other keyboard wired like it), the
[SOFT/HRUF Splitography][hw:splitography], [KBDFans KBD4x][hw:kbd4x], and older,
Teensy-based [OLKB Planck][hw:planck] keyboards are also supported, as long as
they run suitable firmware.

 [hw:kbio-atreus]: https://www.kickstarter.com/projects/keyboardio/atreus
 [hw:model01]: https://shop.keyboard.io/
 [hw:ergodox-ez]: https://ergodox-ez.com/
 [hw:atreus]: https://atreus.technomancy.us/
 [hw:raise]: https://www.dygma.com/raise/
 [hw:splitography]: https://softhruf.love/collections/writers/products/soft-hruf-erl
 [hw:kbd4x]: https://candykeys.com/product/kbd4x-custom
 [hw:planck]: https://olkb.com/planck

## Supported operating systems

Chrysalis is primarily developed under Linux, but we target all three major
operating systems, and test our releases on Windows and macOS too. That said, our
testing is done on **Ubuntu** 18.04 LTS, **Windows** 10, and **macOS** Mojave.

The protocol Chrysalis uses to communicate with the keyboard requires USB serial
support, which is known to be problematic on Windows prior to Windows 10.

## Installation

### From installer packages

Click on the badge for your operating system's packaging system above


### macOS Homebrew

```
brew update && brew upgrade
brew cask install chrysalis
```


## Reporting issues

Chrysalis is alpha quality software. There will be bugs, missing features and
non-obvious things. Reporting any and all of these help us make the software
better, please feel free to [open issues][issues] liberally!

 [issues]: https://github.com/keyboardio/Chrysalis/issues

## Development

To launch the development environment, simply type `yarn && yarn start`. To do a
production build, use `yarn run build:all`, or limit it to a particular OS:
`yarn run build:linux`, `yarn run build:mac` or `yarn run build:win`. See the
`scripts` section of `package.json` for more scripts.

### Debugging

There are sample ENV file & debugging configurations provided in the `dev/sample` directory. There is also an example launch.json for VSCode under the `.vscode` directory under `dev/sample/.vscode/launch.json`. To debug the main process, you _may_ wish to launch from an IDE (without using the above in a terminal), configurations for VSCode are provided. If using the launch or compound configurations, the `timeout` properties must allow enough time for the app to fully launch before the debugger(s) stop trying. In the case of compound, this applies to the renderer and main process debugger.

Note: The ports defined in your .env.development & your debugging configuration **must** match.
