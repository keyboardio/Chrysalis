Chrysalis
=========

![Chrysalis screenshot](data/screenshot.png)

## Downloads

[![Latest production builds][badge:production]][build:prod]
[![Latest development builds][badge:development]][build:dev]

 [badge:development]: https://img.shields.io/github/v/release/keyboardio/chrysalis?include_prereleases&label=Development&style=for-the-badge
 [badge:production]: https://img.shields.io/github/v/release/keyboardio/chrysalis?label=Production&style=for-the-badge
 [build:prod]: https://github.com/keyboardio/Chrysalis/releases/latest
 [build:dev]: https://github.com/keyboardio/Chrysalis/releases/tag/snapshot

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

Choose whether to install the production release, or a development snapshot from
the links [above](#downloads), and from the release page, select the installer
appropriate for your operating system.

### macOS Homebrew

```
brew update && brew upgrade
brew install --cask chrysalis
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
