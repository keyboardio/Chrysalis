/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

const GuiLabels = {
  linux: {
    full: "Super",
    "1u": "Sup."
  },
  win32: {
    full: "Windows",
    "1u": "Win"
  },
  darwin: {
    full: "Command",
    "1u": "Cmd"
  },
  default: {
    full: "Gui",
    "1u": "Gui"
  }
};

const GuiLabel = GuiLabels[process.platform] || GuiLabels.default;

export { GuiLabel };
