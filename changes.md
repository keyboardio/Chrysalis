## Recent updates
- 2025-08-09: Added Norwegian (macOS) keyboard layout variant - fixes issue where Mac users saw Windows layout characters (backslash instead of acute accent on equals key)
- 2025-08-07: New firmware build, focusing on Preonic updates - Bluetooth stability, LED effect at boot time, macOS mouse button support, and rotary encoder improvements
- 2025-08-04: Added EEPROM backup and restore functionality - backup all keyboard settings to a file and restore them later, with detailed diff view showing what will change (thanks @thehenkan)
- 2025-07-09: Initial post-manufacturing firmware update for the Preonic
- 2024-11-15: Better handling of Model 100 keyboards in bootloader mode; small cleanups to flashing flow
- 2024-08-14: Update udev instructions to not require a device replug
- 2024-05-17: Update udev rules to fix a typo.
- 2024-05-15: Clean up our tooltip presentation; improve print styling of layout cards
- 2024-05-14: Fixup our firefox support to at least explain that we don't support firefox.
- 2024-05-13: Update udev rules to match what we do in Kaleidoscope.
- 2024-05-01: Properly handle changing dual-use layers from the layers tab.
- 2024-03-18: Fixed an issue with the ability to edit sticky modifier keys
- 2024-03-15: The default preferences screen is now keyboard settings instead of user interface settings
- 2024-03-14: Honor system dark mode preference
- 2024-03-08: Update to 0.92.6 firmware builds which fix some settings getting set to bad defaults after a factory
  restore or EEPROM erase.
- 2024-03-08: Chrysalis now shows shifted keys as the shifted value on the keymap instead of "Shift" and the unshifted
  value.
- 2024-03-08: Chrysalis no longer shows the "you're in the bootloader and can't backup the settings" warning during
  firmware update unless you were in the bootloader when you first navigated to the screen.
- 2024-03-07: Chrysalis now restores your custom layer names when doing a firmware upgrade
- 2024-03-07: The bugfixes in 0.92.4 turned out to be incomplete. 0.92.5, hopefully, resolves the issue. Please let us
  know at help@keyboard.io if you're still having trouble.
- 2024-03-06: Firmware 0.92.3 may have accidentally overwritten some of your settings, like LED brightness or the
  "SpaceCadet Shift" configuration. You should install the latest 0.92.4 firmware and may also need to update those
  settings in Preferences -> My Device.
- An earlier update had accidentally reversed the display of transparent and blocked keys
- Updated firmware builds to better handle cases of corrupted EEPROM.
- Chrysalis no longer incorrectly states that it could not connect to your keyboard after a firmware update, requiring
  another firmware update.
- Chrysalis will now back up your configuration as a download every time you update your firmware
- "Report an issue" now provides system logs for reports

## Detailed changes

You can access Chrysalis' full source code and a detailed changelog on [the project's GitHub Repository](https://github.com/keyboardio/chrysalis).
