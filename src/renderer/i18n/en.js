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
    deviceDisconnected: "Keyboard disconnected"
  },
  components: {
    layer: "Layer {0}",
    save: {
      success: "Saved!",
      saveChanges: "Save Changes"
    }
  },
  dialog: {
    ok: "Ok",
    cancel: "Cancel"
  },
  app: {
    device: "Keyboard",
    menu: {
      welcome: "Welcome",
      editor: "Layout & Colormap Editor",
      firmwareUpdate: "Firmware Update",
      keyboardSettings: "Keyboard Settings",
      preferences: "Preferences",
      selectAKeyboard: "Select a keyboard",
      selectAnotherKeyboard: "Select another keyboard",
      chat: "Real-time chat",
      feedback: "Send feedback",
      exit: "Exit Chrysalis",
      keyboardSection: "Keyboard",
      chrysalisSection: "Chrysalis",
      miscSection: "Miscellaneous",
      upgradeAvailable: "An upgrade is available!"
    },
    deviceMenu: {
      Homepage: "Homepage",
      Forum: "Forum",
      Chat: "Chat"
    }
  },
  editor: {
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
    clearLayer: "Clear layer...",
    clearLayerQuestion: "Clear layer?",
    clearLayerPrompt: "This will reset the layer to its default state.",
    copyFrom: "Copy from layer...",
    pleaseSelectLayer: "Please select a layer...",
    dualUse: "Modifier when held, normal key otherwise",
    dualUseLayer: "Layer shift when held, normal key otherwise",
    layoutMode: "Edit the keyboard layout",
    colormapMode: "Edit the colormap"
  },
  preferences: {
    devtools: "Developer tools",
    language: "Language",
    interface: "Interface",
    advanced: "Advanced"
  },
  keyboardSettings: {
    advanced: "Advanced",
    keymap: {
      title: "Keymap settings",
      noDefault: "No default",
      showHardcoded: "Show hardcoded layers",
      onlyCustom: "Use custom layers only",
      defaultLayer: "Default layer"
    },
    advancedOps: "Advanced keyboard settings & operations",
    resetEEPROM: {
      button: "Reset EEPROM to factory defaults",
      dialogTitle: "Reset EEPROM to factory defaults?",
      dialogContents: `This will reset the EEPROM to factory defaults.
 You will lose all customizations made.`
    }
  },
  keyboardSelect: {
    unknown: "Unknown",
    selectPrompt: "Please select a keyboard:",
    noDevices: "No keyboards found!",
    connect: "Connect",
    disconnect: "Disconnect",
    scan: "Scan keyboards"
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
    defaultFirmware: "Chrysalis {0} default",
    defaultFirmwareDescription: "Minimal, without bells and whistles",
    experimentalFirmware: "Chrysalis {0} experimental",
    experimentalFirmwareDescription: "Experimental, with more plugins enabled",
    selected: "Selected firmware",
    custom: "Custom firmware",
    description: `Updating or "flashing" your keyboard's firmware is how we teach it new tricks. Chrysalis will install a new version of your keyboard's firmware which includes support for customizing the key layout, as well as other features. If you've previously customized your keyboard's firmware, this will overwrite your custom firmware. You can always find the source code of the firmware Chrysalis is installing here:`,
    postUpload: `Once the upload is done, Chrysalis will take you back to the keyboard selection screen.`
  },
  welcome: {
    title: "Welcome to Chrysalis",
    contents: `Chrysalis recognizes your keyboard, but needs to update its firmware before you can continue.`,
    gotoUpdate: "Update Firmware",
    reconnect: "Reconnect",
    reconnectDescription: `There's a possibility that we misdetected the capabilities of the keyboard, or that the keyboard was starting up while we connected. In this case, you can try clicking the "{0}" button to attempt a reconnect, and look for the necessary features again.`
  }
};

export { English as default };
