Chrysalis
=========

![Chrysalis screenshot](data/screenshot.png)

## About

Chrysalis is a graphical configuration tool for [Kaleidoscope][kaleidoscope]-powered keyboards. 

 [kaleidoscope]: https://github.com/keyboardio/Kaleidoscope

## Features

* **Layout editor** to edit the keymap on-the-fly, with the ability to copy one
  layer to another, and to set a default one.
* **Colormap editor** to edit the per-key LED colormap on boards that support it.
* **Firmware upgrade** to upload either the default, Chrysalis-enabled firmware that ships with the application, or a [custom](#using-custom-firmware) one.

## Supported Hardware

Chrysalis supports the [Keyboardio Model01][hw:model01], the [Keyboardio
Model100][hw:model100] and the [Keyboardio Atreus][hw:kbio-atreus].

 [hw:kbio-atreus]: https://shop.keyboard.io/collections/keyboardio-atreus
 [hw:model100]: https://www.indiegogo.com/projects/the-keyboardio-model-100--4/
 [hw:model01]: https://shop.keyboard.io/

## Supported Browsers

Chrysalis is a web based application that runs online at [https://chrysalis.keyboard.io][url]

  [url]: https://chrysalis.keyboard.io

Your browser needs to support the WebSerial and WebUSB standards. As of this writing, that includes
Chrome, Edge, Arc, Opera, Brave, and other browsers built on the Chromium engine.

## Reporting issues

Reporting bugs and feature requests help us make the software
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

To launch the development environment, simply type `yarn && yarn start`. 

### Translations

[![Translation status](https://hosted.weblate.org/widgets/chrysalis/-/svg-badge.svg)][weblate]

We're using [Weblate][weblate] to manage and maintain translations.

 [weblate]: https://hosted.weblate.org/engage/chrysalis/
