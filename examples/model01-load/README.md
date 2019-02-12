model01-load
============

This is a simple demonstration of how to use the `@chrysalis-api` family of
packages. In this simple demo, we'll plot the average load of the host onto the
top row of the left half of a Model01 keyboard.

For this to work, the firmware must have the `Focus`, `LEDControl` and
`FocusLEDCommands` plugins (provided by the `FocusSerial` and `LEDControl`
libraries, respectively) enabled, and have a LED mode active that does not
refresh periodically (`LEDOff` is a good one for example).
