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
import cloneDeep from "lodash.clonedeep";
import isEqual from "lodash.isequal";

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

  this.chunked_writes = (newValue) => {
    if (newValue !== undefined) {
      this.focus.chunked_writes = Boolean(newValue);
    }
    return this.focus.chunked_writes;
  };

  // This method is called when the device is connected.
  // it probes for help and plugins using focus, which lets us cache
  // that information, reducing repeated calls for the same data from the device
  // on connect.
  this.loadConfigFromDevice = async () => {
    // When connecting to a keyboard, clear *both* the cache, and the persistent
    // storage, because the keyboard we're connecting to might be an entirely
    // different one.
    this._cache = {};
    this._storage = {};
    await this.focus.supported_commands();
    await this.plugins();
  };

  this.supported_commands = () => {
    return this.focus.supported_commands();
  };

  this.focusDeviceDescriptor = () => {
    return this.focus.focusDeviceDescriptor;
  };

  this.supportsFocusCommand = async (command) => {
    const commands = await this.supported_commands();
    return commands?.includes(command);
  };

  this.focusDetected = () => {
    if (!this.focus.isInApplicationMode()) {
      return false;
    }
    if (this.hasCustomizableKeymaps() || this.hasCustomizableLEDMaps()) {
      return true;
    } else {
      return false;
    }
  };
  this.hasCustomizableKeymaps = async () => {
    if (
      this.supportsFocusCommand("keymap.custom") ||
      this.supportsFocusCommand("keymap.map")
    ) {
      return true;
    } else {
      return false;
    }
  };

  this.hasCustomizableLEDMaps = async () => {
    if (
      this.supportsFocusCommand("colormap.map") ||
      this.supportsFocusCommand("palette")
    ) {
      return true;
    } else {
      return false;
    }
  };

  this._cachedDeviceData = async (command, newValue) => {
    if (newValue !== undefined) {
      if (isEqual(newValue, this._cache[command])) {
        // If the values are the same, don't bother sending it to the device.
        return cloneDeep(this._cache[command]);
      }

      await this.focus.command(command, newValue);
      delete this._cache[command];
    }
    if (!(command in this._cache)) {
      this._cache[command] = await this.focus.command(command);
    }
    return cloneDeep(this._cache[command]);
  };

  const cacheableFocusCommands = {
    defaultLayer: "settings.defaultLayer",
    keymap: "keymap",
    colormap: "colormap",
    macros: "macros",
    layernames: "layernames",
    escape_oneshot_cancel_key: "escape_oneshot.cancel_key",
    spacecadet_timeout: "spacecadet.timeout",
    spacecadet_mode: "spacecadet.mode",
    led_brightness: "led.brightness",
    led_mode_default: "led_mode.default",
    idleleds_time_limit: "idleleds.time_limit",
    keymap_onlyCustom: "keymap.onlyCustom",
    mousekeys_scroll_interval: "mousekeys.scroll_interval",
    mousekeys_init_speed: "mousekeys.init_speed",
    mousekeys_base_speed: "mousekeys.base_speed",
    mousekeys_accel_duration: "mousekeys.accel_duration",
    mousekeys_warp_grid_size: "mousekeys.warp_grid_size",
    oneshot_timeout: "oneshot.timeout",
    oneshot_hold_timeout: "oneshot.hold_timeout",
    oneshot_double_tap_timeout: "oneshot.double_tap_timeout",
    oneshot_stickable_keys: "oneshot.stickable_keys",
    oneshot_auto_mods: "oneshot.auto_mods",
    oneshot_auto_layers: "oneshot.auto_layers",
  };

  Object.keys(cacheableFocusCommands).forEach((command) => {
    this[command] = async (newValue) => {
      return await this._cachedDeviceData(
        cacheableFocusCommands[command],
        newValue
      );
    };
  });

  this.version = async () => {
    if (this._storage.version === undefined) {
      this._storage.version = await this.focus.command("version");
    }
    return this._storage.version;
  };
}
