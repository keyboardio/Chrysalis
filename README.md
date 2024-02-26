** This branch of Chrysalis is for the legacy desktop application. Chrysalis now runs on the web at [https://chrysalis.keyboard.io](https://chrysalis.keyboard.io). **


Chrysalis
=========

![Chrysalis screenshot](data/screenshot.png)

## Downloads

[![Latest production builds][badge:production]][build:prod]
[![Latest development builds][badge:development]][build:dev]

 [badge:development]: https://img.shields.io/github/v/release/keyboardio/chrysalis?include_prereleases&label=Development&style=for-the-badge
 [badge:production]: https://img.shields.io/github/v/release/keyboardio/chrysalis?label=Production&style=for-the-badge
 [build:prod]: https://github.com/keyboardio/Chrysalis/releases/latest
 [build:dev]: https://github.com/keyboardio/Chrysalis/releases/tag/v0.13.3-snapshot

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
* **Firmware upgrade** to upload either the default, Chrysalis-enabled firmware that ships with the application, or a [custom](#using-custom-firmware) one.

## Supported Hardware

Chrysalis supports the [Keyboardio Model01][hw:model01], the [Keyboardio
Model100][hw:model100] and the [Keyboardio Atreus][hw:kbio-atreus].

The original [Atreus][hw:atreus], the [ErgoDox EZ][hw:ergodox-ez] (and any other
keyboard wired like it), and the [SOFT/HRUF Splitography][hw:splitography]
keyboards are also supported, as long as they run suitable firmware.

 [hw:kbio-atreus]: https://shop.keyboard.io/collections/keyboardio-atreus
 [hw:model100]: https://www.indiegogo.com/projects/the-keyboardio-model-100--4/
 [hw:model01]: https://shop.keyboard.io/
 [hw:ergodox-ez]: https://ergodox-ez.com/
 [hw:atreus]: https://atreus.technomancy.us/
 [hw:splitography]: https://softhruf.love/collections/writers/products/soft-hruf-erl

## Supported operating systems

Chrysalis is primarily developed under Linux and macOS, but we
target and test on recent releases of Windows as well.

We generally support the most recent long-term-support releases of
Ubuntu and Fedora, as well as the current releases of macOS and
Windows 11. While we expect Chrysalis to work well on other recent
releases of macOS, Windows, and major Linux distributions, our
support resources are pretty limited and we may not be able to chase
down problems that we can't reproduce on a current operating system
release.

The protocol Chrysalis uses to communicate with the keyboard requires USB serial
support, which is known to be problematic on Windows prior to Windows 10.

Some Linux distributions package and build Chrysalis with changes
that cause it not to work correctly. If you're having trouble with
a vendor-packaged Chrysalis, we recommend that you try the latest
release distributed by the project.

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

## Using custom firmware

While Chrysalis comes bundled with supported firmware files, it also supports
custom firmware, as long as it has a few Kaleidoscope plugins enabled:
[FocusSerial][k:focus] to make it possible to communicate with the keyboard in
the first place, [EEPROM-Settings][k:eeprom-settings] to be able to store
configuration in EEPROM. The `FocusSerial` plugin provides multiple plugins, and
Chrysalis needs `Focus`, `FocusEEPROMCommand`, and `FocusSettingsCommand` all
enabled in the custom firmware's `KALEIDOSCOPE_INIT_PLUGINS()`.

Additionally, for Chrysalis to be able to edit the keymap, the
[EEPROM-Keymap][k:eeprom-keymap] plugin is also required. Similarly, to
configure the colormap, the custom firmware will need to have the
[Colormap][k:colormap] plugin enabled.

 [k:focus]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-FocusSerial.html
 [k:eeprom-settings]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-EEPROM-Settings.html
 [k:eeprom-keymap]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-EEPROM-Keymap.html
 [k:colormap]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-Colormap.html

If none of the bundled firmwares suit you, and you wish to customise them, or
build one from scratch, you can do that, and doing so is fully supported!

## Development

To launch the development environment, simply type `yarn && yarn start`. To do a
production build, use `yarn run build:all`, or limit it to a particular OS:
`yarn run build:linux`, `yarn run build:mac` or `yarn run build:win`. See the
`scripts` section of `package.json` for more scripts.

### Translations

[![Translation status](https://hosted.weblate.org/widgets/chrysalis/-/svg-badge.svg)][weblate]

We're using [Weblate][weblate] to manage and maintain translations.

 [weblate]: https://hosted.weblate.org/engage/chrysalis/

### Debugging

There are sample debugging configurations provided in the `dev/sample` directory. There is also an example launch.json for VSCode under the `.vscode` directory under `dev/sample/.vscode/launch.json`. To debug the main process, you _may_ wish to launch from an IDE (without using the above in a terminal), configurations for VSCode are provided. 
