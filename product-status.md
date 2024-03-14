# Keyboardio Chrysalis

This is Chrysalis, the graphical configuration tool for Keyboardio's Kaleidoscope-powered keyboards.

## What should work

- Changing your layout
- Changing your LED configuration
- Changing device settings
- Loading stock firmware
- Custom firmware updates
- Backup and restore
- Factory reset

## What doesn't work

- Device disconnect detection
- Loading "pre-configured" layouts

## Device support

- Keyboardio Model 100
- Keyboardio Atreus
- Keyboardio Model 01

_Note:_ On macOS, the Atreus and Model 01 may experience unreliable connectivity with firmware versions before 0.92.1

## Browser support

Chrysalis requires a browser with WebSerial support. Right now, this means Chrome, Edge, Arc, Brave, and other browsers based on Chromium. We're hopeful that Firefox and Apple will implement WebSerial and WebUSB, but neither browser maker has yet announced their intention to do so.

## Recent updates
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

## Last Updated
2024.0314.1919
