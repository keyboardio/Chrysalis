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

- Chrysalis no longer incorrectly states that it could not connect to your keyboard after a firmware update, requiring
  another firmware update.
- Chrysalis will now back up your configuration as a download every time you update your firmware
- "Report an issue" now provides system logs for reports
- Corrections for some incorrect key identifiers, particularly for dynamic macros

## Last Updated

March 4, 2024
