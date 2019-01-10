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

Chrysalis also supports localisation now, and is available in English and
Hungarian.

## Hardware support

The [ErgoDox EZ][ergodox:ez] (and any other ErgoDox that is compatible with the
original) is now also supported.

 [ergodox:ez]: https://ergodox-ez.com/

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
