Chrysalis-Firmware-Bundle 0.90.4
================================
Released on 2022-10-08

There are two major changes in this release, both of them affecting every
keyboard, and both of them aimed at improving existing functionality, making
them more straightforward to use.

The first big change is a complete rewrite of the MouseKeys system. With the new
code, mouse cursor movement is smoother, and easier to configure. The
configuration is not yet exposed to Chrysalis by the default firmware, that will
be coming in a later update. But the improved behaviour of mouse keys are
already here.

The other one is a change to the layer switching logic: layer key handling has
been updated to be more consistent with activation ordering. While in most cases
there will be no obvious differences, there will be subtle - or not so subtle -
differences in how the firmware handles edge cases. For more information about
these changes, see the [official documentation][docs:layer-changes].

 [docs:layer-changes]: https://kaleidoscope.readthedocs.io/en/latest/NEWS.html#layer-changes-updated

Chrysalis-Firmware-Bundle 0.90.3
================================
Released on 2022-10-03

Keyboardio Model 100
--------------------

The firmware now correctly recognizes when the host is suspended or goes to
sleep, and will turn LEDs off accordingly.

Chrysalis-Firmware-Bundle 0.90.2
================================
Released on 2022-09-28

Keyboardio Model 100
--------------------

Fixed a bug that prevented SpaceCadet from functioning properly. Once enabled
(either via Chrysalis, or the SpaceCadet On key), it will now work as expected
when tapped, and input the appropriate parenthesis.

The LEDs now have gamma correction applied to them, to make the color
distribution smoother.

Chrysalis-Firmware-Bundle 0.90.1
================================
Released on 2022-09-24

We have fixed a bug in the Arduino core used by the Keyboardio Model 100 which
often led to data loss and/or data corruption when using the keyboard with
Chrysalis.

Keyboardio Model 100 owners are highly encouraged to upgrade to this version.
Other keyboards are unaffected.

Chrysalis-Firmware-Bundle 0.90.0
================================
Released on 2022-09-23

We are decoupling the firmware version from Chrysalis, to make it more
straightforward to update them independently of each other. As such, the
firmware version has been bumped to 0.90.0.

Bugfixes
--------

We fixed a bug in the `LayerNames` plugin that would lead to data corruption
when setting custom layer names with Chrysalis. Even if not using custom layer
names, we strongly recommend upgrading your firmware if you are using the
Keyboardio Model 100, or the Keyboardio Atreus (where the plugin is enabled).

Keyboardio Model 100
--------------------

The Keyboardio Model 100 firmware had the following plugins added:

- [DefaultLEDModeConfig][plugin:default-led-mode-config], which lets Chrysalis
  configure a default LED mode for the keyboard to start up with.
- [Steno][plugin:steno], making it possible to create a Steno layer via
  Chrysalis, and use it with [Plover][plover].
- [SpaceCadetConfig][plugin:spacecadet], that makes it possible to permanently
  enable the SpaceCadet feature via Chrysalis, making it practical to use the
  plugin which has been included with the firmware for a while.

 [plugin:default-led-mode-config]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-DefaultLEDModeConfig.html
 [plugin:steno]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-Steno.html
 [plover]: https://www.openstenoproject.org/plover/
 [plugin:spacecadet]: https://kaleidoscope.readthedocs.io/en/latest/plugins/Kaleidoscope-SpaceCadet.html

Chrysalis-Firmware-Bundle 0.11.1
================================
Released on 2022-09-09

No changes in the sketches themselves, but all of them have been rebuilt with
current Kaleidoscope.

Known issues
------------

We are aware of an as of yet unsolved issue with the Model 100 firmware, where
sending data over Focus to it too fast can result in the keyboard locking up,
and becoming unresponsive. Chrysalis 0.11.1 has a workaround for this, but
saving anything to the keyboard will be a substantially longer process than
necessary.

Chrysalis-Firmware-Bundle 0.11.0
================================
Released on 2022-07-28

Keyboardio Model 100 & Atreus
-----------------------------

The Keyboardio Model 100 and Atreus firmwares now ships with the `LayerNames`
plugin enabled, allowing Chrysalis to set custom layer names.

**NOTE**: In case of the Keyboardio Atreus, this required us to reduce the
number of layers in the default firmware from 10 to 9, to free up some EEPROM
space. This is a breaking change.

Keyboardio Model 100
--------------------

The Arduino Core underpinning the Model 100 firmware has been updated to a new
version, which further improves its serial communication. Model 100 owners are
encouraged to upgrade their firmware.

Chrysalis-Firmware-Bundle 0.10.4
================================
Released on 2022-07-07

We have fixed a bug in the Arduino core used by the Keyboardio Model 100, which
could result in high-speed serial traffic completely locking up the keyboard to
the point of it needing a reboot. This deadlock has been observed during normal
use of Chrysalis, too.

A bug in the Keyboardio Atreus firmware, which made it try to allocate more
storage space than what is available, has also been fixed. The bug manifested
itself in Chrysalis accidentally overwriting the first 32 keys of the first
layer upon saving an updated keymap. We fixed the issue by decreasing the amount
of space reserved for Dynamic Macros from 128 bytes to 48.

Keyboardio Model 100 and Atreus owners are strongly encouraged to upgrade their
firmware. Other keyboards are not affected.

Chrysalis-Firmware-Bundle 0.10.3
================================
Released on 2022-07-06

In this release, we're shipping one firmware per keyboard only. The former
"default" and "experimental" distinction is gone. In the new versions, the goal
was to be a strict superset of the former default firmware, and in most cases,
that goal has been achieved. In most cases, the new sketches are closer to the
former "experimental" ones, too, as far as included functionality goes.

There have been cases (like in the case of the Keyboardio Model 01), where we
could not enable all the plugins the former "experimental" firmware had, due to
firmware size limitations, and our primary goal of not removing features
compared to the former default sketches.

On top of the reorganization, the firmware will now switch to the default layer
(if any has been configured) when the keyboard starts up. A new Focus command
(`version`) was also added to the sketches, which allows Chrysalis to query the
version of the firmware running on the keyboard.

For a full comparison for every keyboard, see the tables listing and comparing
plugins enabled in each firmware below.

Keyboardio Model100
-------------------

| Plugin                 | current | default | experimental |
|------------------------|---------|---------|--------------|
| Colormap               | ✔       | ✔       | ✔            |
| DynamicMacros          | ✔       | ✔       | ✔            |
| EEPROMSettings         | ✔       | ✔       | ✔            |
| EEPROMKeymap           | ✔       | ✔       | ✔            |
| FocusSerial            | ✔       | ✔       | ✔            |
| HardwareTestMode       | ✔       | ✔       | ✔            |
| HostPowerManagement    | ✔       | ✔       | ✔            |
| IdleLEDs               | ✔       | ✔       | ✔            |
| LEDControl             | ✔       | ✔       | ✔            |
| LED-AlphaSquare        | ✔       | ✔       | ✔            |
| LED-Stalker            | ✔       | ✔       | ✔            |
| LEDEffect-BootGreeting | ✔       | ✔       | ✔            |
| LEDEffect-Breathe      | ✔       | ✔       | ✔            |
| LEDEffect-Chase        | ✔       | ✔       | ✔            |
| LEDEffect-Rainbow      | ✔       | ✔       | ✔            |
| LEDEffect-SolidColor   | ✔       | ✔       | ✔            |
| LEDPaletteTheme        | ✔       | ✔       | ✔            |
| Macros                 | ✔       | ✔       | ✔            |
| MagicCombos            | ✔       | ✔       | ✔            |
| MouseKeys              | ✔       | ✔       | ✔            |
| NumPad                 | ✔       | ✔       | ✔            |
| OneShot                | ✔       | ✔       | ✔            |
| Qukeys                 | ✔       | ✔       | ✔            |
| SpaceCadet             | ✔       | :x:     | ✔            |
| USBQuirks              | ✔       | ✔       | ✔            |

In the current firmware, there's enough space reserved for 5 layers (both for
the keymap, and for colormap), and 1024 bytes for Dynamic Macros.

Additionally, pressing `Left Fn + Prog + Esc` together will now toggle between
the built-in and custom keymaps.

Keyboardio Model01
------------------

| Plugin                 | current | default | experimental |
|------------------------|---------|---------|--------------|
| Colormap               | ✔       | ✔       | ✔            |
| DynamicMacros          | ✔       | :x:     | :x:          |
| EEPROMSettings         | ✔       | ✔       | ✔            |
| EEPROMKeymap           | ✔       | ✔       | ✔            |
| FocusSerial            | ✔       | ✔       | ✔            |
| HardwareTestMode       | ✔       | ✔       | :x:          |
| HostPowerManagement    | ✔       | ✔       | ✔            |
| LEDControl             | ✔       | ✔       | ✔            |
| LED-ActiveModColor     | :x:     | :x:     | ✔            |
| LED-AlphaSquare        | :x:     | ✔       | :x:          |
| LED-Stalker            | :x:     | ✔       | :x:          |
| LEDEffect-BootGreeting | ✔       | ✔       | :x:          |
| LEDEffect-Breathe      | ✔       | ✔       | :x:          |
| LEDEffect-Chase        | ✔       | ✔       | :x:          |
| LEDEffect-Rainbow      | ✔       | ✔       | (partial)    |
| LEDEffect-SolidColor   | ✔       | ✔       | :x:          |
| LEDPaletteTheme        | ✔       | ✔       | ✔            |
| Macros                 | ✔       | ✔       | ✔            |
| MagicCombos            | ✔       | ✔       | ✔            |
| MouseKeys              | ✔       | ✔       | ✔            |
| NumPad                 | ✔       | ✔       | :x:          |
| OneShot                | ✔       | :x:     | ✔            |
| Qukeys                 | ✔       | :x:     | ✔            |
| SpaceCadet             | ✔       | :x:     | :x:          |
| USBQuirks              | ✔       | ✔       | ✔            |

The Model01 firmware had a number of plugins enabled in the former
"experimental" sketch which we can no longer include, due to limitations in
firmware size. Previously, we could only do so by not including plugins that
were present in the default firmware.

As we strive to be a strict superset of the default, we can no longer remove a
substantial amount of plugins to make space for others.

With that said, compared to the former default firmware, our current one does
not include `AlphaSquare` and `LEDStalker` plugins, because while they were
pretty, they did not add much functionality, and we deemed `Qukeys` and
`DynamicMacros` more important to have.

The current firmware ships with 128 bytes of space reserved for Dynamic Macros,
and enough space reserved for 5 layers (for both keymap and colormap).

Keyboardio Atreus
-----------------

| Plugin         | current | default | experimental |
|----------------|---------|---------|--------------|
| DynamicMacros  | ✔       | :x:     | ✔            |
| EEPROMSettings | ✔       | ✔       | ✔            |
| EEPROMKeymap   | ✔       | ✔       | ✔            |
| FocusSerial    | ✔       | ✔       | ✔            |
| Macros         | ✔       | ✔       | ✔            |
| MouseKeys      | ✔       | ✔       | ✔            |
| OneShot        | ✔       | :x:     | ✔            |
| Qukeys         | ✔       | ✔       | ✔            |
| SpaceCadet     | ✔       | :x:     | ✔            |

In addition to these changes, the former "experimental" firmware for the
Keyboardio Atreus shipped with 5 layers enabled, and 512 bytes for Dynamic
Macros. To remain a strict superset of the default firmware, the current sketch
has 10 layers like the former default, and only 128 bytes of space for Dynamic
Macros.

Original Atreus
---------------

| Plugin         | current | default | experimental |
|----------------|---------|---------|--------------|
| DynamicMacros  | ✔       | :x:     | :x:          |
| EEPROMSettings | ✔       | ✔       | ✔            |
| EEPROMKeymap   | ✔       | ✔       | ✔            |
| FocusSerial    | ✔       | ✔       | ✔            |
| Macros         | ✔       | ✔       | ✔            |
| MouseKeys      | ✔       | :x:     | ✔            |
| OneShot        | ✔       | :x:     | ✔            |
| Qukeys         | ✔       | :x:     | ✔            |
| SpaceCadet     | ✔       | :x:     | ✔            |

The current firmware has 256 bytes reserved for Dynamic Macros, and enough space
for 5 layers.

ErgoDox EZ
----------

| Plugin         | current | default | experimental |
|----------------|---------|---------|--------------|
| DynamicMacros  | ✔       | :x:     | :x:          |
| EEPROMSettings | ✔       | ✔       | ✔            |
| EEPROMKeymap   | ✔       | ✔       | ✔            |
| FocusSerial    | ✔       | ✔       | ✔            |
| MouseKeys      | ✔       | ✔       | ✔            |
| OneShot        | ✔       | :x:     | ✔            |
| Qukeys         | ✔       | ✔       | ✔            |
| SpaceCadet     | ✔       | :x:     | ✔            |

The current firmware has 256 bytes reserved for Dynamic Macros, and enough space
for 5 layers.

SOFT/HRUF Splitography
----------------------

| Plugin         | current | default | experimental |
|----------------|---------|---------|--------------|
| DynamicMacros  | ✔       | :x:     | :x:          |
| EEPROMSettings | ✔       | ✔       | ✔            |
| EEPROMKeymap   | ✔       | ✔       | ✔            |
| FocusSerial    | ✔       | ✔       | ✔            |
| MouseKeys      | ✔       | :x:     | ✔            |
| OneShot        | ✔       | :x:     | ✔            |
| Qukeys         | ✔       | :x:     | ✔            |
| SpaceCadet     | ✔       | :x:     | ✔            |
| Steno          | ✔       | ✔       | ✔            |

The current firmware has 256 bytes reserved for Dynamic Macros, and enough space
for 6 layers.
