#!/usr/bin/env bash

# Run `lsusb` to get the IDs for the currently attached Dygma keyboard.
idstring=$(lsusb | grep Dygma | grep -o 'ID.*:[[:alnum:]]*' | sed 's/ID //')

# Split the string by delimiter ":" to get the two numbers.
ids=(${idstring//:/ })
XXXX=${ids[0]}
YYYY=${ids[1]}
line="SUBSYSTEMS==\"usb\", ATTRS{idVendor}==\"$YYYY\", ATTRS{idProduct}==\"$XXXX\", GROUP="users", MODE=\"0666\""

# Generate the rule file.
echo $line > tempfile
sudo mv tempfile /etc/udev/rules.d/50-dygma.rules

# Reload the `udev` rules.
sudo udevadm control --reload-rules 