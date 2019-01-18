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
  language: "English",
  errors: {
    deviceDisconnected: "Device disconnected"
  },
  components: {
    layer: "Layer {0}",
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
    },
    deviceMenu: {
      Homepage: "Homepage",
      Forum: "Forum",
      Chat: "Chat"
    }
  },
  layoutEditor: {
    keyType: "Key type",
    keyCode: "Key code",
    groups: {
      Letters: "Letters",
      Digits: "Digits",
      Punctuation: "Punctuation",
      Spacing: "Spacing",
      Modifiers: "Modifiers",
      Navigation: "Navigation",
      "Fx keys": "Fx keys",
      Numpad: "Numpad",
      Miscellaneous: "Miscellaneous",
      "Shift to layer": "Shift to layer",
      "Lock layer to": "Lock layer to",
      "LED Effect": "LED Effect",
      Macros: "Macros",
      Media: "Media",
      "Mouse movement": "Mouse movement",
      "Mouse button": "Mouse button",
      "Mouse wheel": "Mouse wheel",
      "Mouse warp": "Mouse warp",
      "OneShot modifiers": "OneShot modifiers",
      "OneShot layers": "OneShot layers",
      TapDance: "TapDance",
      Leader: "Leader",
      Steno: "Steno",
      SpaceCadet: "SpaceCadet",
      Blank: "Blank",
      "Unknown keycodes": "Unknown keycodes"
    },
    defaultLayer: "Default layer",
    clearLayer: "Clear layer...",
    copyTo: "Copy to layer...",
    dualUse: "Modifier when held, normal key otherwise",
    dualUseLayer: "Layer shift when held, normal key otherwise"
  },
  colormapEditor: {
    clearLayer: "Clear layer...",
    copyTo: "Copy to layer..."
  },
  settings: {
    devtools: "Developer tools",
    language: "Language",
    interface: "Interface",
    advanced: "Advanced"
  },
  keyboardSelect: {
    unknown: "Unknown",
    selectPrompt: "Please select a keyboard:",
    noDevices: "No devices found!",
    connect: "Connect",
    disconnect: "Disconnect",
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
    repo: `To see what is included in the default firmware, please see the {0} repository.`,
    defaultFirmware: "Default firmware",
    updatingTitle: "Updating the firmware",
    selected: "Selected firmware",
    custom: "Custom firmware",
    description: `Updating the firmware is a safe process, it's very hard to brick your keyboard even with bad firmware, as most keyboards provide a way to go stay in bootloader mode, where new firmware can be flashed. Nevertheless, updating the firmware will overwrite the previous one. If you customised your firmware, make sure you're flashing one that you are comfortable with. If you wish to proceed, please consult the documentation of your keyboard to see how to enable uploading new firmware, and then press the {0} button to continue.`,
    tooling: `Your keyboard requires an external tool ({0}) for flashing. Please make sure that it is available, and on the PATH, otherwise Chrysalis will not be able to upload new firmware.`,
    postUpload: `Once the upload is finished - either successfully or with errors -, you will be taken back to the initial keyboard selection screen. This is normal.`
  },
  welcome: {
    title: "Welcome to Chrysalis",
    contents: `Your keyboard is supported by Chrysalis, but the firmware it is using appears to be missing essential features. You can flash a firmware with reasonable defaults - including features essential for Chrysalis - by visiting the "{0}" page.`,
    gotoUpdate: "Go to the {0} page",
    reconnect: "Reconnect",
    reconnectDescription: `There's a possibility that we misdetected the capabilities of the keyboard, or that the keyboard was starting up while we connected. In this case, you can try clicking the "{0}" button to attempt a reconnect, and look for the necessary features again.`
  }
};

export { English as default };
