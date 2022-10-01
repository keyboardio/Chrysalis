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
  this._cache = {};
  this._storage = {};

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
      this._cache.settings_defaultLayer = undefined;
    }
    if (this._cache.settings_defaultLayer === undefined) {
      this._cache.settings_defaultLayer = await this.focus.command(
        "settings.defaultLayer"
      );
    }
    return this._cache.settings_defaultLayer;
  };

  this.keymap = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("keymap", newValue);
      this._cache.keymap = undefined;
    }
    if (this._cache.keymap === undefined) {
      this._cache.keymap = await this.focus.command("keymap");
    }
    return this._cache.keymap;
  };

  this.colormap = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("colormap", newValue);
      this._cache.colormap = undefined;
    }
    if (this._cache.colormap === undefined) {
      this._cache.colormap = await this.focus.command("colormap");
    }
    return this._cache.colormap;
  };

  this.macros = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("macros", newValue);
      this._cache.macros = undefined;
    }
    if (this._cache.macros === undefined) {
      this._cache.macros = await this.focus.command("macros");
    }
    return this._cache.macros;
  };

  this.layernames = async (newValue) => {
    if (newValue !== undefined) {
      await this.focus.command("layernames", newValue);
      this._cache.layernames = undefined;
    }
    if (this._cache.layernames === undefined) {
      this._cache.layernames = await this.focus.command("layernames");
    }
    return this._cache.layernames;
  };

  this.version = async () => {
    if (this._storage.version === undefined) {
      this._storage.version = await this.focus.command("version");
    }
    return this._storage.version;
  };
}
