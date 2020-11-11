Bazecor 0.2.4
=============

## New Features
Added #111 to improve layer saving and backup

## Bugfixes
Solved #117 by merging #120 that solved this issue updating the firmware
Solved #119 by merging #121 that added checkings to avoid reading undefined properties

Bazecor 0.2.3
=============

## New features

- Added #27 macro functionality to set up macros for the Raise Keyboard
- Added Backup/Restore, Import/Export tools to allow users to share/save their Macros.
- Improved flashing system so it also backs up Macros when flashing
- Added #57 new Firmware version that activates Macros and improves mouse movement.
- Added #87 Eject key for MAC so that they can eject disks from the keyboard.
- Added #111 with additional general Layers Backup System

## Bugfixes 

- Improved re-loading screen after canceling/saving changes to the Raise due to hiding this fact from the user
- Fixed bug that didn't allow MAC users to change overall brightness of the keyboard
- Fixed #108 the flashing process so that it works without getting hanged at the end of the process and recognizes correctly the keyboard in MAC & Linux
- Disabled White Color Balance due to sometimes altering the colors of already balanced for that keyboard.
- Fixed OSL not being able to terminate when a Macro was pressed while active.
- Fixed #68 update USB Package to solve issues with windows JAPANESE keyboard compiler.

Bazecor 0.2.2
=============

## New features

- Bazecor ships with an updated keyboard firmware, with new features, and plenty
  of bugfixes. Upgrading the firmware is highly recommended.
- You can now set keys to be the `Mouse Forward` and `Mouse Backward` buttons.
- The "Gui" key will now display a platform-specific name (`Win`, `Cmd`, or
  `Linux`, for Windows, macOS, and Linux, respectively).
- On Linux, before being able to connect to the Raise, permissions are checked
  first, and an error is displayed if they are found to be insufficient.
- The update instructions have been substantially improved, they should be much
  clearer now.

## Bugfixes

- The countdown at the flashing screen is now in sync with the process -
  pressing and holding the `Esc` key anytime during the countdown will work.
- It is once again possible to upload custom firmware.

Bazecor 0.2.0
=============

## New features

- Bazecor ships with an updated keyboard firmware, with new features, and plenty
  of bugfixes. Upgrading the firmware is highly recommended.
- With the new firmware, we're now recommending the use of "Move To Layer" keys
  instead of "Lock To Layer", because the former is easier to understand. Using
  it requires the new firmware.
- It is now possible to adjust the brightness of the LEDs.
- The idle time after which the LEDs shut off are also configurable now.
- The Preferences and Keyboard settings screens have been merged into a single
  Preferences screen.
- It is now possible to flash firmware onto a Raise in programmable mode.

## Bugfixes

- A lot of minor and major issues have been fixed, such as frequent white
  screens under certain conditions.
- Flashing has been made more stable and reliable.
- Notifications are dismissable again.
- It is now possible to get back to the keyboard selection screen, and even
  disconnect from the Raise.
- The "Software update" menu entry has been disabled - coming soon!

## Miscellaneous

- The application language cannot be changed anymore. We'll be doing
  translations in a different way, and the feature will be coming back then.
- Dark mode has been temporarily removed, until we iron out the quirks and make
  it usable. It's not worth having it when many important parts of the interface
  are almost invisible due to bad contrast.
- The Leader, SpaceCadet, Mouse warp and Steno keys are no longer offered by the
  key config popup.
- Dual-use functionality are no longer available for modifiers, because they do
  not make sense.
- The key config popup has been cleaned up, and rearranged.

## Known issues

- Due to unforeseen issues, we cannot provide pre-built binaries for OSX at this
  time.

Bazecor 0.1.1
=============

Initial release.
