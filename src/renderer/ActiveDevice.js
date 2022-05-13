import Focus from "@api/focus";
import { truncate } from "original-fs";

export function ActiveDevice() {
  this.port = undefined;
  this.connected = false;
  this.commands = undefined;
  this.focusConnection = undefined;

  this.availableFocusCommands = undefined;

  this.focus = new Focus();

  this.focusCommands = async () => {
    if (this.commands === undefined) {
      this._probeFocusCommands();
    }
    return this.commands;
  };
  this._probeFocusCommands = () => {
    try {
      this.commands = this.focus.probe();
    } catch (e) {
      this.commands = [];
    }
  };

  this.focusDetected = async () => {
    if (this.hasCustomizableKeymaps() || this.hasCustomizableLEDMaps()) {
      return true;
    } else {
      return false;
    }
  };
  this.hasCustomizableKeymaps = async () => {
    const commands = await this.focusCommands();

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
    const commands = await this.focusCommands();
    if (
      commands.includes("colormap.map") > 0 &&
      commands.includes("palette") > 0
    ) {
      return true;
    } else {
      return false;
    }
  };
}
