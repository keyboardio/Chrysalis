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
