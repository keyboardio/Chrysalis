// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

const English = {
  errors: {
    deviceDisconnected: "Device disconnected"
  },
  components: {
    layer: "Layer #{0}",
    save: {
      success: "Saved!",
      saveChanges: "Save Changes"
    }
  },
  app: {
    device: "Device",
    menu: {
      welcome: "Welcome",
      layoutEditor: "Layout Editor",
      colormapEditor: "Colormap Editor",
      firmwareUpdate: "Firmware Update",
      settings: "Settings",
      selectAKeyboard: "Select a keyboard",
      selectAnotherKeyboard: "Select another keyboard",
      chat: "Real-time chat",
      feedback: "Send feedback",
      exit: "Exit Chrysalis"
    }
  },
  layoutEditor: {
    defaultLayer: "Default layer"
  },
  settings: {
    devtools: "Developer tools"
  },
  keyboardSelect: {
    unknown: "Unknown",
    selectPrompt: "Please select a keyboard:",
    noDevices: "No devices found!",
    connect: "Connect",
    scan: "Scan devices"
  },
  firmwareUpdate: {
    dialog: {
      selectFirmware: "Select a firmware",
      firmwareFiles: "Firmware files",
      allFiles: "All files"
    },
    flashing: {
      error: "Error flashing the firmware",
      success: "Firmware flashed successfully!",
      button: "Update",
      buttonSuccess: "Updated!"
    },
    defaultFirmware: "Default firmware",
    updatingTitle: "Updating the firmware",
    selected: "Selected firmware",
    custom: "Custom firmware",
    description: `Updating the firmware is a safe process, it's very hard to brick your keyboard even with bad firmware, as most keyboards provide a way to go stay in bootloader mode, where new firmware can be flashed. Nevertheless, updating the firmware will overwrite the previous one. If you customised your firmware, make sure you're flashing one that you are comfortable with.`,
    postUpload: `Once the upload is finished - either successfully or with errors -, you will be taken back to the initial keyboard selection screen. This is normal.`
  },
  welcome: {
    title: "Welcome to Chrysalis",
    contents: `Your keyboard is supported by Chrysalis, but the firmware it is using appears to be missing essential features. You can flash a firmware with reasonable defaults - including features essential for Chrysalis - by visiting the "{0}" page.`,
    gotoUpdate: "Go to the {0} page"
  }
};

export { English as default };
