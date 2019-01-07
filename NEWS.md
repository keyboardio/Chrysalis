Chrysalis 0.3.0
===============
**UNRELEASED**

## UI/UX changes

The user interface underwent a major overhaul, in an attempt to follow the Material Guidelines more closely. The new interface should be simpler, cleaner, and more discoverable. See [#116][prs:116] for more information and screenshots.

 [prs:116]: https://github.com/keyboardio/Chrysalis/pull/116

## New features

It is now possible to augment keys with modifiers, to have a key that sends -
for example - `Shift+2`. We had the UI in place for this, but not the supporting
code. We now have both.

## Hardware support

Chrysalis now supports the same hardware it did in previous versions, but it no
longer requires a Kaleidoscope-based firmware to be present. For devices that
come with different firmware, Chrysalis will detect them, and offer to flash a
reasonable, Kaleidoscope-based and Chrysalis-ready default.

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

The [ErgoDox EZ][ergodox:ez] (and any other ErgoDox that is compatible with the
original) is also supported.

 [ergodox:ez]: https://ergodox-ez.com/

## UI/UX changes

* The dropdown on the keyboard selection page will now list not only the ports,
  but which keyboard they belong to, too.
* The previous "Information" page was replaced by a bottom bar, providing the
  same functionality, in a more accessible place.

Chrysalis 0.1.0
===============
Released on 2018-12-24

Initial alpha release.
