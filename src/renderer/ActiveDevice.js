// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Focus from "@api/focus";

export function ActiveDevice() {
  this.port = undefined;
  this.connected = false;
  this.focusConnection = undefined;

  this.focus = new Focus();

  this.devicePath = async () => {
    return this.focus._port?.settings.path;
  };

  this.plugins = async () => {
    return await this.focus.plugins();
  };

  // This method is called when the device is connected.
  // it probes for help and plugins using focus, which lets us cache
  // that information, reducing repeated calls for the same data from the device
  // on connect.
  this.loadConfigFromDevice = async () => {
    await this.focus.supported_commands();
    await this.plugins();
  };

  this.supported_commands = () => {
    return this.focus.supported_commands();
  };

  this.focusDetected = async () => {
    if (this.hasCustomizableKeymaps() || this.hasCustomizableLEDMaps()) {
      return true;
    } else {
      return false;
    }
  };
  this.hasCustomizableKeymaps = async () => {
    const commands = await this.focus.supported_commands();
    if (
      commands.includes("keymap.custom") > 0 ||
      commands.includes("keymap.map") > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.hasCustomizableLEDMaps = async () => {
    const commands = await this.focus.supported_commands();
    if (
      commands.includes("colormap.map") > 0 &&
      commands.includes("palette") > 0
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.defaultLayer = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("settings.defaultLayer", newValue);
      this._settings_defaultLayer = undefined;
    }
    if (this._settings_defaultLayer === undefined) {
      this._settings_defaultLayer = await this.focus.command(
        "settings.defaultLayer"
      );
    }
    return this._settings_defaultLayer;
  };

  this.keymap = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("keymap", newValue);
      this._keymap = undefined;
    }
    if (this._keymap === undefined) {
      this._keymap = await this.focus.command("keymap");
    }
    return this._keymap;
  };

  this.colormap = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("colormap", newValue);
      this._colormap = undefined;
    }
    if (this._colormap === undefined) {
      this._colormap = await this.focus.command("colormap");
    }
    return this._colormap;
  };
}
