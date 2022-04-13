# Focus API documentation

## Concept

The Focus API is a two-way communication mechanism between the Raise and any computer software that wants to get information or configure/activate the raise\'s plugins.

It discovers all the EEPROM assigned positions of the memory with specific commands to update or trigger them depending on the kind of plugin that uses them.

This means for example being capable of storing the macros or to be able to trigger them through the serial interface without touching the keyboard or Bazecor.

The focus library is a part of the Keyboard's Firmware but also has a helper class created in JavaScript for the Bazecor, we will show here the commands for the JavaScript Focus API and how to trigger them through the serial interface also, just as an example if you want to retrieve all available commands you have to send the keyboard the string "help".

**For JavaScript:** `focus.command("help")`

**Serial Command (Unix):** `echo 'help' > /dev/ttyACM0`

The serial interface will always end the current message by a newline feed plus a period.

You can expand on this knowledge in the docs about the [kaleidoscope Firmware](https://kaleidoscope.readthedocs.io/en/latest/index.html) from which the Raise extends

## Available Methods

Running `focus.command("help")` will get you the following list of available commands:

**Version**

The version of the firmware

[version](#version)

**KeyMap Section**

KeyMap commands allow you to read/wirte the current keymap stored in the keyboard for each layer

[keymap.custom](#keymapcustom)

[keymap.default](#keymapdefault)

[keymap.onlyCustom](#keymaponlycustom)

**Settings Section**

Settings allow you to check the integrity of the EEPROM stored data

[settings.defaultLayer](#settingsdefaultlayer)

[settings.valid?](#settingsvalid)

[settings.version](#settingsversion)

[settings.crc](#settingscrc)

[eeprom.contents](#eepromcontents)

[eeprom.free](#eepromfree)

**Leds Section**

Commands to help you with the testing and settings of the raise's leds

[led.at](#ledat)

[led.setAll](#ledsetall)

[led.mode](#ledmode)

[led.brightness](#ledbrightness)

[led.theme](#ledtheme)

**Colors Section**

Commands to read/write the color palette and colorMap from the raise to change it's static colors

[palette](#palette)

[colormap.map](#colormapmap)

**Led time to remain lit**

Time to wait until turning the led's off

[idleleds.time_limit](#idleledstime_limit)

**Hardware Section**

Hardware commands that allow you to perform certain operations like retrieving side's versions, watch power consumption, etc..

[hardware.version](#hardwareversion)

[hardware.side_power](#hardwareside_power)

[hardware.side_ver](#hardwareside_ver)

[hardware.sled_ver](#hardwaresled_ver)

[hardware.sled_current](#hardwaresled_current)

[hardware.layout](#hardwarelayout)

[hardware.joint](#hardwarejoint)

[hardware.keyscan](#hardwarekeyscan)

[hardware.crc_errors](#hardwarecrc_errors)

[hardware.firmware](#hardwarefirmware)

**Plugins section**

Plugin's section to configure them, like the DynamicMacros plugin.

[tapdance.map](#tapdancemap)

[macros.map](#macrosmap)

[macros.trigger](#macrostrigger)

[superkeys.map](#superkeysmap)

[superkeys.waitfor](#superkeyswaitfor)

[superkeys.timeout](#superkeystimeout)

[superkeys.repeat](#superkeysrepeat)

[superkeys.holdstart](#superkeysholdstart)

[superkeys.overlap](#superkeysoverlap)

**Sides Section**

Hardware commands specific to the sides for flashing them.

[hardware.flash_left_side](#hardwareflash_left_side)

[hardware.flash_right_side](#hardwareflash_right_side)

[hardware.verify_left_side](#hardwareverify_left_side)

[hardware.verify_right_side](#hardwareverify_right_side)

**Help**

Help command to display this list

[help](#help)

**Layers Section**

Layer commands to switch between them (for example when changing a from a program to another and more goodies)

[layer.activate](#layeractivate)

[layer.deactivate](#layerdeactivate)

[layer.isActive](#layerisactive)

[layer.moveTo](#layermoveto)

[layer.state](#layerstate)

### version

Returns the version of the Raise firmware stored in the keyboard's EEPROM

#### Commands

JavaScript: `focus.command("version")`
Serial Command (Unix): `echo 'version' > /dev/ttyACM0`

#### Expected output

it should give back 3 strings,

- Bazecor Version:
- `v0.2.5`
- Kaleidoscope's newest Git commit incorporated
- `6bd1f81e`
- Raise's Firmware newest Git commit
- `fe423ce-dirty`
- Dirty here means it was custom-built with the makefile, not built automatically by Travis.

### keymap.custom

This command of the focus API has two functions, when sent alone, it retrieves the whole custom keymap stored in the keyboard, when sent with the map as trailing numbers (in the same format as received) it will update the custom keymap stored in the EEPROM.

To know the actual correlation between the position of the map sent and the actual keys in the keyboard, [look here](https://github.com/Dygmalab/Raise-Firmware/blob/master/FOCUS_API.MD)

#### Commands

To retrieve:

- JavaScript: `focus.command("keymap.custom")`
- Serial Command (Unix): `echo 'keymap.custom' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("keymap.custom N N N N N N N N N N N N N N N")`
- Serial Command (Unix): `echo 'keymap.custom N N N N N N N N N N N N N N N' > /dev/ttyACM0`

Being `N N N...` the 16bit numbers that represent each key assigned to that position of the keymap the numbers amount 80(keys per layer)x10(custom layers)

#### Expected output

It should give back the whole custom keymap (80 key positions for each layer and all 10 layers) if sent alone, if sent with the keymap of the same length as received, it should return a nextline, period.

### keymap.default

This command works in the same way as keymap.custom, but affecting the default layers stored in the -1 and -2 positions of the layer stack.

To know the actual correlation between the position of the map sent and the actual keys in the keyboard, [look here](https://github.com/Dygmalab/Raise-Firmware/blob/master/FOCUS_API.MD)

#### Command

To retrieve:

- JavaScript: `focus.command("keymap.default")`
- Serial Command (Unix): `echo 'keymap.default' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("keymap.default N N N N N N N N N N N N N N N")`
- Serial Command (Unix): `echo 'keymap.default N N N N N N N N N N N N N N N' > /dev/ttyACM0`

Being `N N N...` the 16bit numbers that represent each key assigned to that position of the keymap the numbers amount 80(keys per layer)x2(default layers)

#### Expected output

It should give back the two default layers keymap (80 key positions for each layer for the two default layers) if sent alone, if sent with the keymap of the same length as received, it should return a nextline, period.

### keymap.onlyCustom

This command returns true or false depending on the user setting of hiding the default layers or not, it does not allow you to increment the number of available layers by start using the default ones, they are there so you can store a backup for two layers in your keyboard

#### Commands

To retrieve:

- JavaScript: `focus.command("keymap.onlyCustom")`
- Serial Command (Unix): `echo 'keymap.onlyCustom' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("keymap.onlyCustom true")`
- Serial Command (Unix): `echo 'keymap.onlyCustom trure' > /dev/ttyACM0`

#### Expected output

It should return the current state of the onlyCustom boolean variable stored in the keyboard, being it true or false, when sending the value added to the command, it should return a nextline, period.

### settings.defaultLayer

This command returns the default layer the keyboard will boot in, with this you can change the default layer in which the Raise starts working to any custom layer that you want.

#### Commands

To retrieve:

- JavaScript: `focus.command("keymap.defaultLayer")`
- Serial Command (Unix): `echo 'keymap.defaultLayer' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("keymap.defaultLayer 1")`
- Serial Command (Unix): `echo 'keymap.defaultLayer 1' > /dev/ttyACM0`

#### Expected output

It should return the current default layer stored in the EEPROM, if it's send with the new default layer, it should return a nextline, period.

### settings.valid?

This command returns a boolean value that states true if all checks have been performed to the current settings and it's upload was done in the intended way

#### Commands

To retrieve:

- JavaScript: `focus.command("settings.valid")`
- Serial Command (Unix): `echo 'settings.valid' > /dev/ttyACM0`

#### Expected output

It should return true if you changed your settings with Bazecor, if not, it can return false, but is currently not in use.

### settings.version

This command returns the current settings version, it allows Bazecor to identify any changes in the expected output to understand them and shape to them.

#### Commands

To retrieve:

- JavaScript: `focus.command("settings.version")`
- Serial Command (Unix): `echo 'settings.version' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("settings.version 1")`
- Serial Command (Unix): `echo 'settings.version 1' > /dev/ttyACM0`

#### Expected output

It should return the current settings version stored in the EEPROM.

### settings.crc

Returns the CRC checksum of the layout.

#### Commands

To retrieve:

- JavaScript: `focus.command("settings.crc")`
- Serial Command (Unix): `echo 'settings.crc' > /dev/ttyACM0`

#### Expected output

It should the check of each one of the memory positions reserved in the eeprom, for example 6228/6228

### eeprom.contents

This command returns the whole EEPROM contents. and allows you to send them in one go.

#### Commands

To retrieve:

- JavaScript: `focus.command("eeprom.contents")`
- Serial Command (Unix): `echo 'eeprom.contents' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("eeprom.contents NNNNNNNNNNNNN")`
- Serial Command (Unix): `echo 'eeprom.contents NNNNNNNNNNNN' > /dev/ttyACM0`

#### Expected output

It should return the whole EEPROM lenght of contents, in this case as CRC returned, 6228 bytes.

### eeprom.free

This command returns the remaining EEPROM bytes left.

#### Commands

To retrieve:

- JavaScript: `focus.command("eeprom.free")`
- Serial Command (Unix): `echo 'eeprom.free' > /dev/ttyACM0`

#### Expected output

It should return the free EEPROM memory, 2793 bytes in my case.

### led.at

This command returns the color that an individual led has right now in RGB code, also allows you to change that individual led\'s color with the rgb color following it\'s position.

#### Commands

To retrieve:

- JavaScript: `focus.command("led.at 21")`
- Serial Command (Unix): `echo 'led.at 21' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("led.at 21 3")`
- Serial Command (Unix): `echo 'led.at 21 3' > /dev/ttyACM0`

#### Expected output

With this function you can change, based on external events, a led color depending on code outside raise's firmware.

### led.setAll

This command sets all leds to a certain color transmitted by RGB.

#### Commands

To set:

- JavaScript: `focus.command("led.setAll 255 255 255")`
- Serial Command (Unix): `echo 'led.setAll 255 255 255' > /dev/ttyACM0`

#### Expected output

The keyboard will change color when the command is sent successfully, will return newline, period.

### led.mode

This command reads/writes the current led mode, which changes the type of led layout the keyboard shows, you can switch between the different led effects with this function, like rainbow, etc... does the same as LedEffect.Next key in Bazecor.

#### Commands

To retrieve:

- JavaScript: `focus.command("led.mode")`
- Serial Command (Unix): `echo 'led.mode' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("led.mode 2")`
- Serial Command (Unix): `echo 'led.mode 2' > /dev/ttyACM0`

#### Expected output

The keyboard will change it's effect or send the code of the current effect being shown.

### led.brightness

This command reads/writes the brightness setting stored in the EEPROM

#### Commands

To retrieve:

- JavaScript: `focus.command("led.brightness")`
- Serial Command (Unix): `echo 'led.brightness' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("led.brightness 210")`
- Serial Command (Unix): `echo 'led.brightness 210' > /dev/ttyACM0`

#### Expected output

With this function you can change, based on external events, the overall led brightness using code outside raise\'s firmware.

### led.theme

This command reads/writes the whole LED color assignment currently in use by using RGB codes.

#### Commands

To retrieve:

- JavaScript: `focus.command("led.theme")`
- Serial Command (Unix): `echo 'led.theme' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("led.theme NNN NNN NNN NNN NNN NNN")`
- Serial Command (Unix): `echo 'led.theme NNN NNN NNN NNN NNN NNN' > /dev/ttyACM0`

#### Expected output

With this function you can change, based on external events, the overall led colors using code outside raise\'s firmware independently of the current palette stored in the keyboard.

### palette

This command reads/writes the color palette that is used by the color map to establish each color that can be assigned to the keyboard.

#### Commands

To retrieve:

- JavaScript: `focus.command("palette")`
- Serial Command (Unix): `echo 'palette' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("led.palete NNN NNN NNN NNN NNN NNN")`
- Serial Command (Unix): `echo 'led.palette NNN NNN NNN NNN NNN NNN' > /dev/ttyACM0`

#### Expected output

This command reads / writes the palette stored in the eeprom, this means the command can change the lighting theme without changing the actual positions on which each color is assigned, you have to provide the whole palette when storing it.

### colormap.map

This command reads/writes the colorMap that assigns each color listed in the palette to individual leds mapping them to the keyboard's current layout.

To know the actual correlation between the position of the map sent and the actual keys in the keyboard, [look here](https://github.com/Dygmalab/Raise-Firmware/blob/master/FOCUS_API.MD)

#### Commands

To retrieve:

- JavaScript: `focus.command("colormap.map")`
- Serial Command (Unix): `echo 'colormap.map' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("colormap.map N N N N N N N N N N N N N N N N N N")`
- Serial Command (Unix): `echo 'colormap.map N N N N N N N N N N N N N N N N N N' > /dev/ttyACM0`

#### Expected output

This command allows you to assign each led to a different color stored in the palette, you have to provide the whole colormap when storing it.

### idleleds.time_limit

This command reads/writes the idle led time to be turned off in seconds.

#### Commands

To retrieve:

- JavaScript: `focus.command("idleleds.time_limit")`
- Serial Command (Unix): `echo 'idleleds.time_limit' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("idleleds.time_limit 600")`
- Serial Command (Unix): `echo 'idleleds.time_limit 600' > /dev/ttyACM0`

#### Expected output

returns the current time stored in the EEPROM and allows you to set it to another time, not exceding 65k seconds

### hardware.version

This empty command has no support as of today, or is disabled / not working properly.

### hardware.side_power

This empty command has no support as of today, or is disabled / not working properly.

### hardware.side_ver

This empty command has no support as of today, or is disabled / not working properly.

### hardware.sled_ver

This empty command has no support as of today, or is disabled / not working properly.

### hardware.sled_current

This empty command has no support as of today, or is disabled / not working properly.

### hardware.layout

This empty command has no support as of today, or is disabled / not working properly.

### hardware.joint

This empty command has no support as of today, or is disabled / not working properly.

### hardware.keyscan

This empty command has no support as of today, or is disabled / not working properly.

### hardware.crc_errors

This empty command has no support as of today, or is disabled / not working properly.

### hardware.firmware

This empty command has no support as of today, or is disabled / not working properly.

### tapdance.map

This empty command has no support as of today, or is disabled / not working properly.

### macros.map

This command reads/writes the macros map (2048 bytes of max lenght), each action in a macro is composed of an action type and a key attached to it.

- action 2 is delay
- action 3 is function key press
- action 4 is function key release
- action 5 is function press & release
- action 6 is keyCode press
- action 7 is keyCode release
- action 8 is keyCode press & release

then we send the actual keyCode that we can find in the [keymap database](https://github.com/Dygmalab/Bazecor/tree/development/src/api/keymap/db)

We repeat this for each action we want to perform until we finish the whole macro, then a zero is required to close the macro, afterwards we can insert more, when no more macros have to be added, end the map with a " 0 0 " to tell the plugin, no further macros are present.

#### Commands

To retrieve:

- JavaScript: `focus.command("macros.map")`
- Serial Command (Unix): `echo 'macros.map' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("macros.map 8 4 8 5 8 6 0 8 7 8 8 0 0")`
- Serial Command (Unix): `echo 'macros.map 8 4 8 5 8 6 0 8 7 8 8 0 0' > /dev/ttyACM0`

#### Expected output

The command allows you to remap the macros without bazecor, and to use hidden functions not currently supported by the graphical configurator. there is no need to send the whole map.

### macros.trigger

This command triggers a stored macro programatically.

#### Commands

To use:

- JavaScript: `focus.command("macros.trigger 0")`
- Serial Command (Unix): `echo 'macros.trigger 0' > /dev/ttyACM0`

#### Expected output

Allows you to test any macro stored in the EEPROM without assigning it to a key
### superkeys.map

This command reads/writes the superkeys map (1024 bytes of max lenght), each action in a superkey is represented by a keyCode number that encodes the action, for example if you use the number 44, you are encoding space, etc... to know more about keycodes and to find the right one for your actions, check [keymap database](https://github.com/Dygmalab/Bazecor/tree/development/src/api/keymap/db)

The structure is composed of the encoded actions in this order

- TAP
- HOLD
- TAP & HOLD
- DOUBLE TAP
- DOUBLE TAP & HOLD

To end a superkey, place the number of actions you want to use as keyCodes and then a zero is required to close the superkey, we can then start a new superkey or end the superkey list with a " 0 0 " to tell the plugin, no further superkeys have been configured.

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.map")`
- Serial Command (Unix): `echo 'superkeys.map' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.map 4 5 6 44 7 0 4 224 225 6 226 0 0")`
- Serial Command (Unix): `echo 'superkeys.map 4 5 6 44 7 0 4 224 225 6 226 0 0' > /dev/ttyACM0`

#### Expected output

The command allows you to remap the superkeys without bazecor, and to use hidden functions not currently supported by the graphical configurator. there is no need to send the whole map.

### superkeys.waitfor

This command allows you to get/set the waitfor value of the keyboard to alter the behaviour of the superkeys.

waitfor value specifies the time between the first and subsequent releases of the HOLD actions meanwhile is held, so for example, if the variable is set to 500ms, you can mantain the hold key, it will emmit a keyCode corresponding to the action that it triggers, then it will wait for waitfor time for making another keypress with that same keycode. This enables the user to delay the hold "machinegun" to be able to release the key and achieve a single keypress from a hold action.

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.waitfor")`
- Serial Command (Unix): `echo 'superkeys.waitfor' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.waitfor 500")`
- Serial Command (Unix): `echo 'superkeys.waitfor 500' > /dev/ttyACM0`

#### Expected output

Modifies/Retrieves the value stored in the keyboard for the waitfor timeout on the superkeys

### superkeys.timeout

This command allows you to get/set the timeout value of the keyboard to alter the behaviour of the superkeys.

timeout value specifies the time the keyboard waits after a superkey is pressed for a subsequent key press of the same superkey, in this time interval, that subsequent superkey press increases the counter of the action in the following order.

- TAP
- HOLD
- TAP & HOLD
- DOUBLE TAP
- DOUBLE TAP & HOLD

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.timeout")`
- Serial Command (Unix): `echo 'superkeys.timeout' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.timeout 250")`
- Serial Command (Unix): `echo 'superkeys.timeout 250' > /dev/ttyACM0`

#### Expected output

Modifies/Retrieves the value stored in the keyboard for the timeout between actions of the superkeys

### superkeys.repeat

This command allows you to get/set the repeat value of the keyboard to alter the behaviour of the superkeys.

the repeat value specifies the time between the second and subsequent keyCode releases when on hold, it only takes effect after the waitfor timer has been exceeded.

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.repeat")`
- Serial Command (Unix): `echo 'superkeys.repeat' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.repeat 250")`
- Serial Command (Unix): `echo 'superkeys.repeat 250' > /dev/ttyACM0`

#### Expected output

Modifies/Retrieves the value stored in the keyboard for the repeat time between released actions after the waitfor timeout.

### superkeys.holdstart

This command allows you to get/set the holdstart value of the keyboard to alter the behaviour of the superkeys.

the holdstart value specifies the minimum time that has to pass between the first keydown and any other action to trigger a hold, if held it will emmit a hold action.

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.holdstart")`
- Serial Command (Unix): `echo 'superkeys.holdstart' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.holdstart 200")`
- Serial Command (Unix): `echo 'superkeys.holdstart 200' > /dev/ttyACM0`

#### Expected output

Modifies/Retrieves the value stored in the keyboard for the holdstart time.

### superkeys.overlap

This command allows you to get/set the overlap value of the keyboard to alter the behaviour of the superkeys.

the overlap value specifies the percentage of overlap when fast typing that is allowed to happen before triggering a hold action to the overlapped key pressed after the superkey.

#### Commands

To retrieve:

- JavaScript: `focus.command("superkeys.overlap")`
- Serial Command (Unix): `echo 'superkeys.overlap' > /dev/ttyACM0`

To set:

- JavaScript: `focus.command("superkeys.overlap 80")`
- Serial Command (Unix): `echo 'superkeys.overlap 80' > /dev/ttyACM0`

#### Expected output

Modifies/Retrieves the value stored in the keyboard for the overlap threshold percentage.

### hardware.flash_left_side

### hardware.flash_right_side

### hardware.verify_left_side

### hardware.verify_right_side

### Help

The help command returns all the available commands in the current version of the serial protocol, the list above is taken from this command as per version 0.2.3 of Bazecor/Raise Firmware.

#### Commands

JavaScript: `focus.command("help")`
Serial Command (Unix): `echo 'help' > /dev/ttyACM0`

#### Expected output

The output of this command is a list of all available commands including itself, this list will be ended with a nextline, period trail.

### layer.activate

This empty command has no support as of today, or is disabled / not working properly.

### layer.deactivate

This empty command has no support as of today, or is disabled / not working properly.

### layer.isActive

This empty command has no support as of today, or is disabled / not working properly.

### layer.moveTo

This empty command has no support as of today, or is disabled / not working properly.

### layer.state

This empty command has no support as of today, or is disabled / not working properly.
