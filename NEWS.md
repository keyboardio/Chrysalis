Chrysalis 0.7.1
===============
Released on 2020-03-06

## New features

Major improvements were made to the upcoming [Keyboardio
Atreus][kickstarter:atreus] support: instead of displaying an outline of the
keys, we now use an image of the keyboard as a background. This looks much more
like the real keyboard. The font sizes for most keys were also increased, both
to match the keycaps, and to make them easier to see.

 [kickstarter:atreus]: https://www.kickstarter.com/projects/keyboardio/atreus

When flashing new firmware onto the keyboard, Chrysalis now displays flashing
instructions aswell.

## Miscellaneous

A number of improvements were made to the key labels: `Backspace` is now
shortened to `Bksp`, which is much more standard; the arrow keys are now
displayed as Unicode arrow symbols; and digits show their shifted symbol on top
now. Additionally, the "Gui" key is now properly labeled on each operating
system: `Super` on Linux, `Win` on Windows, and `Cmd` on macOS.

Chrysalis 0.7.0
===============
Released on 2020-03-02

## New features

The biggest new feature in this release is support for the upcoming Keyboardio
Atreus keyboard. Chrysalis now ships with full support for it, including a
recent build of the firmware shipped with it.

Apart from that, for keyboards that support LEDs - like the Keyboardio Model01
-, Chrysalis now offers brightness controls, and if the `IdleLEDs` plugin is
enabled, the idle time after which the LEDs turn off can also be configured.

## Miscellaneous

The "Settings" and "Keyboard Preferences" screens have been merged into a single
"Preferences" screen, because having them split was confusing.

All of the shipped firmware files have been updated to use the latest
Kaleidoscope version, too.

## Bugfixes

* We fixed a number of issues around importing keymaps.
* Notifications can - once again - be dismissed.
* One can now use `AltGr` as a modifier when setting up dual-use keys.

Chrysalis 0.6.2
===============
Released on 2019-08-23

## New features

We added an option to the preferences screen (under the "Advanced" section) to
enable verbose logging. This is intended to aid us in discovering what's
happening behind the scenes if something goes wrong. The logs are available on
the developer console, which can be toggled in the same preferences section.

## Bugfixes

A number of timeouts were increased, in an attempt to fix flashing on OSX, when
doing so via a Hub. The bundled firmwares were also updated to use a version of
Kaleidoscope with a number of important issues fixed (such as the Colormap
plugin coloring the wrong keys).

Chrysalis 0.6.1
===============
Released on 2019-07-29

## Bugfixes

Fixed an issue affecting OSX users, which prevented Chrysalis from being able to
connect to the keyboard.

Chrysalis 0.6.0
===============
Released on 2019-07-19

## UI/UX improvements

The most visible change in this release is the redesigned color picker. The new
one should be considerably friendlier, and easier to use. The bottom bar, where
the palette colors and the key selector are, is now visible by default too.
Apart from these, we now have a rudimentary dark mode - far from polished, but a
usable dark mode nevertheless.

We also made some small changes like moving the layer selection dropdown on the
Editor screen to the right side, and changing the "clear layer" icon to
something that conveys the intended meaning better.

To aid in troubleshooting, when flashing fails, we now display a button that
opens the Troubleshooting page on our Wiki.

## Bugfixes

Plenty of bugs since the last release have been squashed, the color editor is
much more stable and reliable now, copy-pasting and exporting-importing layers
have also been fixed.

## Miscellaneous

We also made sure that pre-built binaries work correctly on all platforms. The
default and experimental firmware files were updated to their latest versions
too, bringing in plenty of improvements and bugfixes.

Chrysalis 0.5.0
===============
Released on 2019-03-09

## UI/UX improvements

The biggest change in this release is that we merged the layout and colormap
editors, they're available on the same screen now. Them being on separate
screens turned out to be both confusing, and prone to errors. On the same
screen, we have tighter integration, and editing one or the other requires far
less clicking around.

Another important change is that we now ask for confirmation (instead of just
dropping the changes on the floor) if we're about to throw away pending changes
or do something destructive like clearing the layer. We hope this allows
everyone to experiment more freely, as the chance of losing one's changes. We
also changed the icon of the save button, to one that better conveys its meaning
(it also has a tooltip now).

In spirit of making the Chrysalis experience less confusing, read-only layers
are now visibly dimmed, to make it easier to see at a glance that they're not
meant to be modified.

## New features

Because Chrysalis is still alpha-quality software, it sometimes gets confused if
it encounters an EEPROM state it can't figure out, for one reason or the other.
To make it easier to get out of this situation, it is now possible to clear the
EEPROM, and reset it to factory settings.

For similar reasons, the sidebar will now show if there's a new version of
Chrysalis available: if one's running a tagged release, and there's a new one,
it will show that. If one's running a snapshot build, the update notice will
show any new snapshot builds. It will not suggest upgrading from a release to a
snapshot build, however.

We also added a way to export and import keymaps, colormaps and the palette. The
interface for that is very, very minimal, and is in no way final. It does make
it possible to transfer layers and colormaps from one keyboard to another.

## New hardware support

Chrysalis now supports the [Splitography][splitography] keyboard, one designed
to be used for Steno with [Plover][plover].

 [splitography]: https://softhruf.love/collections/writers
 [plover]: http://www.openstenoproject.org/plover/

## Bugfixes

We fixed a fair amount of bugs, ranging from navigation issues to small subtle
things that were confusing, like the keyboard image's strange jumps in size when
resizing the window - that should be much smoother now.

Chrysalis 0.4.0
===============
Released on 2019-02-06

## UI/UX improvements

We have made major progress in all areas of Chrysalis, it should be much simpler
and friendlier by now. We've received some amazing feedback, and tried to adjust
the user experience accordingly. Please keep them coming!

The major highlight of this release is how the new layout editor works. It now
tries its best to hide uninteresting details, and present you with an editable
keymap out of the box. Hardcoded layers are not shown by default anymore, they
are copied into editable memory on first use. This made it possible to move a
number of knobs that were making the layout editor feel crowded, elsewhere.

Setting the default layer, whether to show hardcoded layers, and whether to use
custom layers only all moved to the new "Keyboard settings" screen.

## Contributors

Major contributors to this release were [@TreTuna][u:TreTuna], [@obra][u:obra],
and [@algernon][u:algernon].

 [u:TreTuna]: https://github.com/TreTuna
 [u:obra]: https://github.com/obra
 [u:algernon]: https://github.com/algernon

Thanks to everyone who tried Chrysalis, gave feedback, or reported issues - your
guidance drives Chrysalis forward.

Chrysalis 0.3.3
===============
Released on 2019-01-25

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
