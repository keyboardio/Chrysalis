#!/usr/bin/env fish

# Fish scripting manual: https://developerlife.com/2021/01/19/fish-scripting-manual/

# Run lsusb to get the IDs for the currently attached Dygma keyboard.
set -l idstring (lsusb | grep Dygma | grep -o 'ID.*:[[:alnum:]]*' | sed 's/ID //')
set -l ids (string split ":" $idstring)
set -l XXXX $ids[1]
set -l YYYY $ids[2]
set -l line SUBSYSTEMS=="usb", ATTRS{idVendor}=="$YYYY", ATTRS{idProduct}=="$XXXX", GROUP="users", MODE="0666"

# Generate the rule file.
echo $line > tempfile
sudo mv tempfile /etc/udev/rules.d/50-dygma.rules

# Reload the `udev` rules.
sudo udevadm control --reload-rules