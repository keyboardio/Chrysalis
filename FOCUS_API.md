Focus API documentation
===========================

## Concept
The Focus API is a two-way communication mechanism between the Raise and any computer software that wants to get information or configure/activate the raise's plugins.

It discovers all the EEPROM assigned positions of the memory with specific commands to update or trigger them depending on the kind of plugin that uses them.

This means for example being capable of storing the macros or to be able to trigger them through the serial interface without touching the keyboard or Bazecor.

The focus library is a part of the Keyboard's Firmware but also has a helper class created in javascript for the Bazecor, we will show here the commands for the JavaScript Focus API and how to trigger them through the serial interface also, just as an example if you want to retrieve all available commands you have to send the keyboard the string "help".

**For JavaScript:** `focus.command("help")`
**Serial Command (Unix):** `echo 'help' > /dev/ttyAMC0`

The serial interface will allways end the current message by a newline feed plus a period.

## Available Methods
Running `focus.command("help")` will get you the following list of available commands:

```
version
keymap.custom
keymap.default
keymap.onlyCustom
settings.defaultLayer
settings.valid?
settings.version
settings.crc
eeprom.contents
eeprom.free
led.at
led.setAll
led.mode
led.brightness
led.theme
palette
colormap.map
idleleds.time_limit
hardware.version
hardware.side_power
hardware.side_ver
hardware.sled_ver
hardware.sled_current
hardware.layout
hardware.joint
hardware.keyscan
hardware.crc_errors
hardware.firmware
tapdance.map
macros.map
macros.trigger
hardware.flash_left_side
hardware.flash_right_side
hardware.verify_left_side
hardware.verify_right_side
help
layer.activate
layer.deactivate
layer.isActive
layer.moveTo
layer.state
_raise.eepromVersion
```

#### Help
The help command returns all the available commands in the current version of the serial protocol, the list above is taken from the 