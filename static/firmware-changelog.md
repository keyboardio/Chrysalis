Chrysalis-Firmware-Bundle 0.10.3-snapshot
=========================================
**UNRELEASED**

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
