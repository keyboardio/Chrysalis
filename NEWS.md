Chrysalis 0.3.3
===============
**UNRELEASED**

## Bugfixes

### It is now possible to flash the experimental firmware

The previous release shipped with experimental firmware, but when it came to
deciding what to upload to the keyboard, Chrysalis erroneously chose the default
firmware even if the experimental was asked for. This has been corrected, and
one can now upgrade to the experimental one.

### Changed transparent and disabled key display

Having transparent keys labeled `[Trns]` was both confusing and ugly. We now
show them as blank keys. To not confuse them with disabled keys, those are shown
with an "XXX" label until we implement a better way to distinguish the two.

### Key label updates

Chrysalis can now properly display the non-US backslash / pipe keycode. It will also correctly label the SpaceCadet enable / disable keys (they were previously labeled SpaceCadet left/right, which was wrong).

Chrysalis 0.3.2
===============
Released on 2019-01-21

## UI/UX Improvements

A number of screens were simplified and otherwise updated to be easier to
discover and understand. Dropdown menus now look like drop downs, buttons are
more prominent, and to the point.

### The firmware update screen is now more informative

The firmware update screen now displays device-specific instructions, when
available.

### Layer copy direction is now copy from

Copying from another layer to the currently selected one turns out to be easier
to work with, less surprising, and much less error prone. So the previous "Copy
layer to..." feature was reversed, and now we can copy a layer from another
instead.

### The keyboard select screen has previews

When selecting a keyboard from the dropdown, we will now display the keyboard's
image, if available.

## New features

### Improved Keyboardio Model01 support

It is now possible to connect to and update the firmware of a Keyboardio Model01
which is already in programmable mode, in the bootloader.

### Minimal support for generic Teensy devices

Similarly to the above, it is now possible to connect to any Teensy device in
programmable mode, and upload custom firmware. Since we can't detect the
keyboard in this case, Chrysalis will only offer the custom firmware option.

## Bugfixes

### Clearing layers will restore the EEPROM default

When clearing a layer, Chrysalis will now restore the default EEPROM value,
instead of zeros. In practice, this means that when we clear a keymap layer,
we'll get transparent keys instead of blanks.

### Updated firmware

Chrysalis now ships with two firmware variants for all boards:

- A default one, which is as close to the factory firmware as possible. It only
  has the essential plugins enabled, just enough to mimic the factory firmware
  and also work with Chrysalis.
- The experimental one, which still follows the factory firmware closely, but
  has a few extra plugins enabled.

The idea is that the default firmware shouldn't be surprising. We now have the
experimental variant for testing features not in the original.

Chrysalis 0.3.1
===============
Released on 2019-01-17

## Bugfixes

### Clearing or copying a layer will allow us to cancel the clear

When clearing or copying a layer, the top bar will switch to its contextual
cancel mode, allowing us to cancel the clear.

### Colormap editor usability fixes

The palette colors now have a border, so any bright white colored swatches will
be visible too. We also made the color picker slightly wider, so the text on it
fits better, and we made the two halves of the palette stay in place, whether
the picker is shown or not.

### Model01 firmware update

The firmware Chrysalis ships with for the Keyboardio Model01 has been updated,
to fix a bug related to the `Colormap` plugin.

### Fixed firmware update on Windows and OSX

Updating the firmware of the Atreus and the ErgoDox should now work on Windows
and OSX too, alongside Linux where it already worked before.

Chrysalis 0.3.0
===============
Released on 2019-01-15

## UI/UX changes

The user interface underwent a major overhaul, in an attempt to follow the
Material Guidelines more closely. The new interface should be simpler, cleaner,
and more discoverable. We have also worked a lot on the various messages
displayed, to have them provide better guidance.

## New features

### Layer copying

It is now possible to copy one layer to another, making it easier to start from
the built-in, read-only layers: we no longer have to manually recreate them on a
writeable layer, but can start from a copy. Additionally, layers can also be
cleared, would we want to start afresh.

Both the layout and the colormap editor supports these.

### Modifier-augmented keys

We already had UI in place for showing modifier-augmented keys, such as
`Shift+2`, but the controls were disabled - they no longer are. We can now put
keys on the keymap with modifiers applied to them.

### Support for dual-use keys

Chrysalis now supports dual-use keys, both modifiers and layer keys. Dual-use
keys perform one function when held (usually act as either a modifier or a layer
shift key), and another when tapped. They're often used on smaller keyboards,
and Chrysalis knows now how to handle them, and present them in a useful way.

### Improved default layer support

When opening the layout editor, it will now start with the default layer
selected instead of the first one.

### Canceling pending changes

When there are unsaved, pending changes, the top bar will change color, and the
main menu turns into a cancel button. This allows us to undo any unsaved changes
we made, and refresh the state from the keyboard.

### Localisation

Chrysalis can now be translated, and is available in English and Hungarian.

### Debugging and developer tools

We made it easier to toggle the developer tools, in case something goes wrong (Chrysalis is alpha software!): pressing `Ctrl+Shift+I` will bring up the console.

## New hardware support

The [ErgoDox EZ][ergodox:ez] (and any other ErgoDox that is compatible with the
original) is now also supported.

 [ergodox:ez]: https://ergodox-ez.com/

### Default firmware

For all hardware that does not come with Kaleidoscope as its default firmware,
we no longer require them to be flashed with Kaleidoscope prior to using
Chrysalis. Instead, we offer a firmware upgrade, with reasonable defaults - just
like we do for boards that do come with Kaleidoscope by default.

Chrysalis 0.2.0
===============
Released on 2018-12-31

## Hardware support

Chrysalis now supports the [Atreus][atreus] keyboard, when it is running a
Chrysalis-enabled [Kaleidoscope][kaleidoscope] firmware. We ship with
[one][chrysalis-bundle:atreus], just in case.

 [atreus]: https://atreus.technomancy.us/
 [kaleidoscope]: https://github.com/keyboardio/Kaleidoscope
 [chrysalis-bundle:atreus]: https://github.com/keyboardio/Chrysalis-Firmware-Bundle/tree/master/Technomancy/Atreus

Chrysalis also has preliminary support for [Dygma Raise][raise] - it should
work, but it is untested on real hardware at this time.

 [raise]: https://www.dygma.com/raise/

## UI/UX changes

* The dropdown on the keyboard selection page will now list not only the ports,
  but which keyboard they belong to, too.
* The previous "Information" page was replaced by a bottom bar, providing the
  same functionality, in a more accessible place.

Chrysalis 0.1.0
===============
Released on 2018-12-24

Initial alpha release.
