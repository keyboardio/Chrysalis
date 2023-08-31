Chrysalis Firmware Bundle 0.91.0+68

## Build Information

| Architecture | Core                                                                               |
|:-------------|:-----------------------------------------------------------------------------------|
| AVR          | keyboardio/Kaleidoscope-Bundle-Keyboardio@7f6008abcc8ada3bca57897efa7520750a70d115 |
| GD32         | keyboardio/ArduinoCore-GD32-Keyboardio@c37a17a3c7e4b034ea5dbe868ec0ebf308da9ad9    |

### Libraries

| Library                   | Link                                                                          |
|:--------------------------|:------------------------------------------------------------------------------|
| KeyboardioHID (avr)       | keyboardio/KeyboardioHID@5a56f73deb23e00ae9f79aaf7cf06095edfbedc9             |
| KeyboardioHID (gd32)      | keyboardio/KeyboardioHID@5a56f73deb23e00ae9f79aaf7cf06095edfbedc9             |
| Kaleidoscope              | keyboardio/Kaleidoscope@27d07042f8b4e31d977569d99857f7007e94e8a5              |
| Chrysalis-Firmware-Bundle | keyboardio/Chrysalis-Firmware-Bundle@cd0fef367f335f82382d77f1980bc0c79c63bd21 |

# Changelog

Keyboardio Model 100
--------------------

A number of firmware fixes have been implemented that attempt to mitigate
Windows issues with missing or held keystrokes after a resume event.

Keyboardio Atreus
-----------------

The firmware now correctly sets up the desired `SpaceCadet` mode, and no longer
forces it off every time it is plugged in.
