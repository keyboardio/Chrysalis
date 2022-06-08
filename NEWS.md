Chrysalis 0.10.1
================
Released on 2022-06-08

## New features

Iterating on the Macro Editing feature introduced in the last release, it is now
possible to rearrange macro steps by dragging and dropping them.

Chrysalis can now configure the default LED mode to be used on keyboards that
support it. This requires the `DefaultLEDModeConfig` plugin on the firmware
side. The firmware Chrysalis ships with don't have it enabled yet.

## Firmware update

All of the firmware files Chrysalis ships with have been updated. The new
firmware contains bugfixes for the Keyboardio Model 100, which we hope will
enable Chrysalis to connect to the keyboard properly.

If you are unable to connect Chrysalis to your Model 100, unplug the keyboard
first, hold down the `PROG` key, and plug it back in while still holding it.
That will put the keyboard into programmable mode, and Chrysalis will be able to
flash new firmware onto it.

## UI/UX improvements

We have improved our dark mode support, by making it possible to choose an
option that follows the system theme preferences. If your system is set to use
dark mode for applications, Chrysalis will respect that preference, if it is set
to follow the system settings. This includes following automatic switching on
systems that support it.

The Layout Editor will now - by default - hide features from the Sidebar that
the currently running firmware does not support. This feature was added to
reduce potential confusion, when the Layout Editor offered keys that the
firmware did not support. The feature can be turned off on the Preferences
screen.

After connecting to a Keyboard, Chrysalis will now switch the initial layer
shown in the Layout Editor to the default layer, if it is set for the keyboard.

The configuration option that lets us configure whether Esc cancels OneShot or
not has been moved from the Layout Editor sidebar onto the "My Keyboard" tab of
the Preferences screen.

The Preferences screen has seen major improvements in this release too.

## Bugfixes

Chrysalis no longer ends up showing a white screen when trying to visit the
"Developer Tools" section of the Preferences screen without being connected to a
keyboard. Similarly, Chrysalis will properly handle stray files in the directory
where it stores EEPROM backups, and will not end up on a white screen when it
finds unexpected files.

Worked around an issue in Electron that caused Chrysalis to crash on Windows and
macOS when trying to print.

Chrysalis 0.10.0
================
Released on 2022-05-30

## New features

A long requested feature landed in Chrysalis this release: it now has a Macro
Editor.

When the firmware supports it, Chrysalis now supports assigning dynamic macros
to keys, and editing them within the application. Up to 32 such macros are
supported, they can be of any length, limited only by storage space on the
connected keyboard.

For now the Macro Editor is simple, plenty of convenience functions are planned
in the future, but it is usable in its current form.

The experimental firmware for the Keyboardio Model 100 and Atreus both have
support for this feature.

## UI/UX improvements

The Preferences screen has seen another large update: we have organized settings
within a page into logically similar groups, improved and added plenty of help
text and descriptions. We hope this is more discoverable, and less intimidating
now.

Choosing the host-side keyboard layout has been moved from the bottom of the
sidebar on the Layout Editor screen to the Preferences, for ease of use and
better discoverability.

On the Layout Editor screen, the sidebar will now hide sections and
functionality not supported by the firmware of the connected keyboard. This can
be disabled in the Preferences screen.

The sidebar of the Layout Editor has also had a number of glitches fixed:
dropdowns and other widgets should no longer overlap, among other things.

## Bugfixes

The flashing instructions for the Keyboardio Model 100 have been updated to
match production keyboards, and a layout library has been added too.

We fixed an issue that prevented Chrysalis from connecting to keyboards on
Windows, and we also improved Chrysalis' stability on Linux under Wayland.

Chrysalis 0.9.5
===============
Released on 2022-05-27

## UI/UX improvements

When upgrading the firmware, Chrysalis now makes the device specific
instructions stand out. While we always had these instructions on the screen,
they blended into the normal set of instructions, and were too easy to miss.

The Preferences screen has been updated to use a simpler, more consistent
design, and the "Keyboard" and "Advanced Keyboard" tabs have been merged into
"My Keyboard".

The style of the notifications Chrysalis uses have been updated to match the
current, Material design of Chrysalis.

## New features

Layout Cards can optionally display the color map of each layer. This can be
toggled in the "User Interface" tab of the Preferences.

## Bugfixes

Chrysalis will now save color maps correctly again.

The Firmware Upgrade screen has had numerous bugs squashed, and the steps of the
flashing process are now displayed properly, and consistently. These are purely
display fixes.

In case there are multiple Chrysalis-enabled devices present, and we go back to
the Keyboard selection screen while being connected to one, Chrysalis will once
again show the connected keyboard as the default selection in the menu.

Under Wayland, Chrysalis will disable GPU-accelerated rendering, because
Chromium does not support that under Wayland yet. This allows Chrysalis to start
up under Wayland out of the box, without further command-line arguments or
workarounds, still using the Wayland backend.

Chrysalis 0.9.4
===============
Released on 2022-05-25

This release is mostly about stabilizing and improving the Keyboard.io Model 100
support, but comes with important fixes for other supported devices as well.

## Bugfixes

We have fixed numerous bugs in the Model 100 flashing process, which should now
be as stable as the flashing process of any of the other supported keyboards. A
part of these fixes is a new firmware, which fixes a number of shortcomings in
the firmware-side handling of the protocol between the keyboard and Chrysalis.

Chrysalis also ships with updated udev rules for our Linux users, adding support
for the Model 100.

## UI/UX improvements

During the flashing process, Chrysalis will now show a notification when the key
held to enter programmable mode can be released.

## Firmware update

All of the firmware files Chrysalis ships with have been updated. The new
firmware brings a number of stability improvements, and bugfixes in the firmware
side handling of the protocol between Kaleidoscope-powered keyboards and
Chrysalis.

We're now shipping experimental firmware for the Keyboard.io Model 100 and the
Atreus too, with additional plugins enabled. If you want to make use of
secondary actions for select keys, or use sticky modifiers or layer keys, the
experimental firmware has the necessary plugins enabled.

## Miscellaneous

We have dropped support for the Dygma Raise, KBDFans KBD4x, and OLKB Planck
keyboards. Our support for these devices haven't been up to the standards one
would expect, so rather than carrying them around in an inferior state, we opted
to remove support for the time being.

Chrysalis 0.9.3
===============
Released on 2022-05-20

## New features

This release brings set of new features that we hope will make Chrysalis even
more useful! There likely will be a few rough edges around both these features,
we'll be releasing frequent updates to address them swiftly.

### Layout cards

The first new feature is a new screen: Layout Cards. On this screen, Chrysalis
renders all your layers onto a single, printable screen. We also made it easy to
print: just press Control+P (or Command+P on macOS), and you can print any
screen, including the layout cards.

### Floating key selector

We have redesigned the way you pick keys in the layout editor: rather than
picking a key to modify on the keymap, mousing over to the sidebar, selecting
"Pick a key", then find the key on the 104-key keyboard image that pops up, we
now have a permanent, floating key selector at the bottom of the screen. You
select the key you want to change on the keyboard, then click the key you want
on the floating selector, and you're done!

Rearranging the standard set of keys is one of the most common things people do
with Chrysalis. We hope this new selector makes the experience not only more
convenient, but faster and more efficient too!

## Bugfixes

The previous release introduced a new feature where every time a keyboard is
flashed, it's configuration (the EEPROM) gets automatically backed up, and the
"Backup & Restore" feature of the Editor offers these backups for restoration.

Unfortunately, these backups weren't device-type specific, so Chrysalis would
happily offer a backup made on an Atreus when restoring to a Model01. We have
fixed that, and Chrysalis will only offer backups for restoration for the same
type of keyboard.

Additionally, we also fixed an issue where the "Backup & Restore" screen made
the application unresponsive until one flashed new firmware onto a keyboard.

Chrysalis 0.9.2
===============
Released on 2022-05-20

## New features

### Resilient configuration transfer during flashing

Chrysalis will now save and restore the keyboard configuration during the
flashing process. This in turn makes the upgrade process more resilient, because
if the layout of the configuration changes on the firmware side, our restore
procedure will do the right thing, and rearrange the old layout to fit the new.

As it happens, between 0.8.6 and 0.9.1, we shipped firmware that did change the
layout, which resulted in the keyboard configuration getting slightly clobbered.
If you have upgraded to such a firmware, and have fixed the problem yourself,
upgrading to 0.9.2 will not clobber it again. If you have upgraded, but not
fixed it yet, you can downgrade to Chrysalis 0.8.6 first, downgrade to the
firmware shipped with that version, and then upgrading to 0.9.2 and its firmware
will automatically fix the problem. If you have not upgraded to such a firmware,
upgrading now will do the right thing.

Additionally, each time you flash new firmware, a backup of the keyboard
configuration is saved to a file under Chrysalis's application data folder.
These files can be used for recovery in case something does go wrong: the
"Backup & restore" screen (accessible via the Editor) will offer these backups
automatically.

### Automatically connect on startup

When there is a single supported keyboard available, Chrysalis will now
automatically connect to it when starting up, removing the need to click the
"Connect" button first.

Chrysalis 0.9.1
===============
Released on 2022-05-18

## Bugfixes

A number of small, but particularly painful display issues (such as the color
swatches above the color picker being tiny) were fixed.

Chrysalis 0.9.0
===============
Released on 2022-05-17

## New features

Chrysalis now supports adding the dedicated OneShot cancel key to the keymap,
and also allows us to change whether Escape will cancel one-shot keys too -
enabled by default with the new firmwares shipped with Chrysalis.

Support for the upcoming Keyboardio Model 100 was added.

Chrysalis now ships with a custom Keyboardio color theme, and the Preferences
screen has been redesigned to be more accessible.

The macOS builds of Chrysalis are now Universal packages, and should work on
both x86-64 and M1 hardware.

## Bugfixes

Chrysalis should now launch properly on Linux distributions that aren't based on Debian.

Chrysalis' communication with the keyboard should be much more stable on macOS.

When selecting a layout used on the host other than the default `English (US)`,
Chrysalis will now display the shifted symbols correctly too, when the shift
modifier is enabled for a key. Additionally, keys with secondary functionality
now display labels according to the selected layout properly.

Detecting hotplug events - when keyboards are connected or disconnected - has
been greatly improved, and Chrysalis should be more responsive to these events
now.

## Firmware update

All of the firmware files Chrysalis ships with have been updated. All of the
firmwares that had the OneShot plugin enabled, now also have EscapeOneShot
enabled aswell, enabling the new feature mentioned above to function.

## Miscellaneous

Chrysalis now has a new item in the menu: `Changelog`, which displays this very
news file at the time of building the release. With this available, one can
easily look at what changed between their previous version and the current one,
without leaving Chrysalis itself.

The layout editor sidebar had some of its sections redone for more clarity and
easier access.

The "System Information" and "Feedback" menu items have been combined into a
single screen, as both are about bug reporting.

"Layout sharing" has been renamed to "Backup and Restore", because that's what
it essentially is.

Chrysalis 0.8.6
===============
Released on 2021-10-02

## Bugfixes

Fixed a typo in the Keyboardio Model01 flashing instructions.

## Miscellaneous

The macOS pre-built binaries are signed once again, making their installation
more straightforward and secure.

Chrysalis 0.8.5
===============
Released on 2021-09-27

## Firmware update

All of the firmware files Chrysalis ships with has been updated, built with the
latest Kaleidoscope. This fixes a large number of issues, mostly related to the
OneShot, TapDance, and Qukeys plugins. Upgrading to newer firmware is highly
recommended.

## UI/UX Improvements

Flashing instructions for the Keyboardio Model01 and the Keyboardio Atreus have
been improved.

## Bugfixes

The tooltip for sticky modifier keys no longer have the word "modifier"
duplicated.

Chrysalis 0.8.4
===============
Released on 2021-04-05

## Bugfixes

This release has additional fixes for consumer keys, including a way to
automatically migrate from old keycodes to new ones.

Chrysalis 0.8.3
===============
Released on 2021-03-29

## Bugfixes

Chrysalis now displays the correct labels for keys with a Secondary Action. We
had an issue in the code that augmented the base keys with secondary actions,
which resulted in a messed up keycode to label mapping. This bug has been fixed
now.

Another issue related to labels is that Chrysalis and Kaleidoscope have been in
a disagreement regarding consumer keys (volume keys, play/pause, and the rest)
since a change in Kaleidoscope a while ago. This has also been corrected, and
Chrysalis now agrees with Kaleidoscope, and these keys will both display and
function as expected.

The warning about insufficient permissions is now correctly restricted to show
only on Linux, while it could erroneously appear on other operating systems
before.

## UI/UX Improvements

The key picker that pops up when selecting a standard key has been rearranged to
resemble a more common 104-key layout. Originally, it was displayed at the
bottom of the screen, and we wanted to save vertical space, but later on, we
moved the picker from the bottom into a popup in the center, rendering the space
saving attempt irrelevant, but we have not adapted the picker accordingly. We
now did so, and it looks much more like a common keyboard does, and now offers
some of the keys that we've been missing since 0.8.0.

Another major, noticable change is that the warning about using hardcoded and
custom layers together is no longer a tiny line below the toolbar. As we no
longer support such setups in Chrysalis, we want to make that clear, and not
allow one to edit the keymap anyway. A non-blocking, short warning was found to
be inadequate and not very self-explanatory. Therefore we made Chrysalis display
an "Action Required" screen, with better, longer explanation, and a button more
appropriately titled. Additionally, when selecting the option to switch to
custom layers only, Chrysalis will also set the default layer back to zero, to
avoid confusion. Furthermore, when Chrysalis detects an empty EEPROM, and
decides to copy the built-in keymap to it, it will also set the keyboard up to
use custom layers only. The practical consequence of this is that keyboards
fresh out of the factory, or keyboards that get flashed with the "restore
factory settings" option set will no longer unnecessarily trigger the warning.

We also made some smaller improvements, like having a default filename presented
when exporting keymaps, and showing legends in a larger font when they're
single-letter.

## New Features

Chrysalis now allows you to choose Croatian as the host keyboard layout, and has
initial support - albeit untested - for Wayland under Linux.

Chrysalis 0.8.2
===============
Released on 2021-01-28

## Bugfixes

Chrysalis will now correctly copy the built-in default keymap to the editable
area of the keyboard. In practice, this means if you connect a brand new
keyboard, Chrysalis will no longer show an empty keymap at start, but the
factory defaults instead.

We fixed a bug that - under some circumstances - made Chrysalis show a warning
about not having permissions to talk to the keyboard, even in cases, and on
systems where it made no sense.

A number of display issues and user experience shortcomings were also addressed:
certain keys, when augmented with modifiers, showed up wrong, as `[Object
object]`, instead of their proper label. They now show up with the correct
label. Furthermore, Chrysalis no longer allows one to augment a modifier with
the same modifier, because that's an unrepresentable situation.

## Firmware update

All of the firmware files Chrysalis ships with has been updated, built with the
latest Kaleidoscope. This fixes an issue that resulted in Macro keys not
working. If you're experiencing that problem, please update your firmware.

## UI/UX Improvements

The overview section that shows the mappings for the currently selected key on
every layer now has a short explanation on top of it.

Certain combinations of modifiers will be displayed with a shorter, perhaps more
familiar name: Control-Shift-Alt will show up as Meh, while
Control-Shift-Alt-Gui will show as Hyper.

Chrysalis 0.8.1
===============
Released on 2021-01-26

This release is primarily a bugfix release, with a number of small, but rather
annoying issues ironed out.

## Bugfixes

Chrysalis will now correctly show the `Show empty layers` button in the overview
area, when there are empty layers to show. When selecting the target of a layer
change button, Chrysalis will correctly limit the available options to what is
available (limited either by available layers in EEPROM, or by firmware
limitations in case of certain types of layer keys).

Chrysalis will now correctly show macro keys when clicking the `Macros...`
button. Furthermore, it will now allow augmenting _all_ standard keys with one
or more modifiers.

When Chrysalis detects that it does not have permission to talk to a device on
Linux, the udev rule installation will now correctly function.

This release also fixes a few display issues, like the warnings that may display
just below the title bar will no longer be partially shadowed by the sidebar on
the Editor screen. Also, when we display a loading screen during longer
operations, the spinning logo is now correctly displayed in production builds
too.

## New features

In this release, we reworked how the host operating system layout selection
works: we now load every available layout we ship with, and group them by
language. The selector is also smarter when it comes to auto-completion: it now
takes the entire text typed into account when narrowing possibilities.

Also introduced in this release is a custom key code entry widget on the
Editor's sidebar. With this widget, you can set keys to custom key codes, or
codes as of yet unknown to Chrysalis.

## Known regressions

Due to Travis changing their pricing model, we can no longer use it for our
automatic builds. We have switched to GitHub Actions, but in doing so, we lost
access to a Linux/arm64 builder, and as such, we can't provide pre-build
binaries for that platform anymore.

Furthermore, we currently do not sign our macOS builds - this is a temporary
regression only, however.

Chrysalis 0.8.0
===============
Released on 2021-01-12

## UI/UX improvements

To make Chrysalis less resource intensive, and to avoid rare race conditions,
instead of scanning for new devices every time a new USB device is connected or
disconnected, we now scan periodically instead.

Chrysalis will also display a loading screen when performing actions that may
take a long time - this should stop you from seeing temporary blank screens
while slow work is being performed.

### New Editor

By far the biggest change in this release is the completely redesigned Editor
screen. It now allows you to see every possible thing you can change on a single
sidebar, making it considerably easier to navigate. It also offers a whole new
key picker for the standard keyboard keys. On top of all that, it allows you to
see the key mappings for the currently selected key on all layers.

Our goal with the new editor was to make it easier, faster and more
straightforward to see your options, the possible mappings, and as much of the
current layout as possible. We tried to reduce the number of clicks needed to
change (or discover) the mapping of a key.

## New features

To aid us in debugging Chrysalis issues, we now have a System Information
screen. This screen will offer to create a bundle of debug information, and save
it into a file, which you can forward to the developers, or attach it to bug
reports. We try hard not to include private information in the bundle, and
Chrysalis offers you to review the bundle before saving it.

On Linux systems, when using systemd, Chrysalis will offer to install udev rules
to aid in setting up the serial devices for supported keyboards to grant
Chrysalis access to them.

We also now provide pre-built binaries for Linux/ARM64 platforms.

## Breaking changes

As a result of having a new Editor things, a few breaking changes had to be
made, some permanent, some temporary. Chrysalis no longer supports mixing
hardcoded and custom layers, and will prompt when it detects such a case, to
automatically switch to using custom layers only. This is a permanent change
going forward.

Additionally, we temporarily dropped support for layer copying and erasing -
both of these will be coming back in a future update.

We also reworked layout sharing, which now exports and imports the whole layout,
all layers included, instead of doing so on a per-layer basis. At a later point,
we will allow more granularity.

## Bugfixes

Fixed an issue that resulted in Chrysalis displaying a white, blank screen when
a device it was connected to, disconnected from the host. Fixed another issue on
macOS, which made Chrysalis use excessive amounts of CPU.

## Firmware

All shipped firmware files have been updated to use the latest Kaleidoscope, and the latest layouts.

## Miscellaneous

The macOS pre-built binaries are now signed, making their installation more
straightforward and secure.

Chrysalis 0.7.9
===============
Released on 2020-07-03

## UI/UX improvements

Chrysalis now ships Colemak, Dvorak, and Qwerty layouts for the Keyboardio
Atreus, ready to be imported from the Import / export page.

The `MoveToLayer()` family of layer switch keys are also supported starting with
this release of Chrysalis.

## Bugfixes

It is once again possible to flash custom firmware with Chrysalis.

## Firmware

All shipped firmware files have been updated to use the latest Kaleidoscope, and the latest layouts.

## Miscellaneous

Chrysalis 0.7.8 was the same release as this, but with broken packaging. We
opted to cut a new release and delisting the broken one.

Chrysalis 0.7.7
===============
Released on 2020-06-17

## UI/UX improvements

If a keyboard has only a single firmware variant, Chrysalis will not display a
description anymore. Chances are, this variant is neither minimal, nor without
bells and whistles.

## Firmware

All shipped firmware files have been updated to use the latest Kaleidoscope, and the latest layouts.

Chrysalis 0.7.6
===============
Released on 2020-06-17

## UI/UX improvements

### Only showing available layers

When modifying the keymap to set a key up as a layer switch key, only offer
layers in the selector that the firmware supports. If the firmware is limited to
five layers, display only as much. If it is limited to ten, display ten.

### Clearer message when discarding changes

When leaving a screen with unsaved changes, the dialog now asks if changes
should be discarded, rather than canceled, to make it clearer what it actually
does: discard the changes, not cancel the operation.

## Bugfixes

### Linux

In the previous release, the AppImage build was modified to try and detect if
the kernel has the necessary features for sandboxing. This detection wasn't
entirely bulletproof, and at least on some kernels, the script exited instead of
disabling the sandbox. This has been fixed, and the AppImage will now start up
correctly.

### Miscellaneous

Fixed a number of crashes related to not having a colormap when importing, or
when clearing a layer. These features now correctly ignore the colormap if there
isn't any to work with.

Chrysalis 0.7.5
===============
Released on 2020-05-05

## UI/UX improvements

The most important changes in this release are related to the firmware update
process: it's much more robust and reliable now. First of all, we now try to
find the serial port of the keyboard in bootloader mode after a reset, instead
of assuming it will be the same port as prior to the reset. This should fix
plenty of issues on Windows and macOS, where the assumption usually did not
hold. Furthermore, we also support flashing with an external (but still bundled)
program as a fallback measure for the rare case where our built-in flashing
methods fail to work for one reason or the other.

When flashing, Chrysalis will display a progress bar, showing what step of the
flashing process it is on, and which other steps are still ahead.

There's also an option to restore factory settings during flashing.

Apart from these improvements in flashing, Chrysalis will now try to auto-detect
the language of the operating system, and use the same language, if available.

## Bugfixes

### Linux

On Linux, prior to connecting to a keyboard, we now check device permissions,
and display an error if they are insufficient. This makes it easier to discover
this issue, without having to look at the developer console or the
troubleshooting guide.

The AppImage we ship will automatically disable the sandbox if it detects a
kernel that doesn't have the necessary features for it. This allows people on
older distros/kernels to run the AppImage without having to add the
`--no-sandbox` command-line argument.

### Layout & Colormap editor

The Layout & Colormap editor screen now supports keyboards that only have an
editable colormap, and no editable keymaps.

Also, the `Num Lock` key has been added to the key selector, and all lock keys
have been moved to the `Modifiers` group.

### Flashing

It is, again, possible to flash a keyboard already in bootloader mode. Chrysalis
will also ignore the `Esc` key on confirmation dialogs. This latter fix is
important, because on all of our supported keyboards that require a key to be
held to enter programmable mode, that key is mapped to `Esc` by default. We
don't want to cancel any confirmation dialogs while holding the `Prog` key.

### Miscellaneous

* The application header bar should now display its text in white while in dark
  mode.
* When a keyboard disconnects while we have pending, unsaved changes, we now
  forget all about those, and restore the application bar to its normal state.
* Plenty of internal changes and cleanups were made in order to reduce errors
  and warnings on the developer console: we catch and handle more (expected)
  errors.

## Firmware

All shipped firmware files have been updated to use the latest Kaleidoscope,
with plenty of bugfixes, including, but not limited to, restoring proper 6KRO
support, so that the firmware will work correctly on the macOS login screen and
older BIOSes that do not support NKRO.

Chrysalis 0.7.4
===============
Released on 2020-03-22

## UI/UX Improvements

If the connected keyboard does not support LEDs, or the Colormap plugin is not
enabled, do not display the layout/colormap switch button on the toolbar, and
only mention "Layout Editor" on the editor screen.

The layout editor now also supports the "Mouse Forward" and "Mouse Backward"
buttons for mice.

## Bugfixes

The default firmware shipped with Chrysalis for the Keyboardio Atreus has been
updated to have a default layout that matches the layout card, and the intended
factory layout for the keyboard.

Chrysalis 0.7.3
===============
Released on 2020-03-07

## Bugfixes

The issue with flashing the Keyboardio Model01 and the Atreus, where the
keyboard required an unplug and a replug after flashing to become available
again, has been fixed. Flashing will now result in a keyboard that's usable
immediately after.

Chrysalis 0.7.2
===============
Released on 2020-03-07

## Bugfixes

When there's an update available, Chrysalis will now provide a link to the
correct location on all platforms. We were previously providing a wrong link on
Windows.

The flashing screen now correctly shows the default firmware for the upcoming
Keyboardio Atreus. Additionally, the Atreus keymap image has been fixed to scale
better to the available space, without the labels getting misaligned from the
keys.

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
