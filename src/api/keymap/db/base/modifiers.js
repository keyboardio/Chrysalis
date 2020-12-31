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

import { GuiLabel } from "./gui";
import addCategories from "../addCategories";
import { withModifiers } from "../modifiers";

const modifiers = withModifiers(
  addCategories(
    ["modifier"],
    [
      {
        code: 224,
        label: {
          base: {
            full: "Control",
            "1u": "Ctrl"
          }
        },
        location: "left"
      },
      {
        code: 225,
        label: {
          base: "Shift"
        },
        location: "left"
      },
      {
        code: 226,
        label: {
          base: "Alt"
        },
        location: "left"
      },
      {
        code: 227,
        label: {
          base: GuiLabel
        },
        location: "left"
      },
      {
        code: 228,
        label: {
          base: {
            full: "Control",
            "1u": "Ctrl"
          }
        },
        location: "right"
      },
      {
        code: 229,
        label: {
          base: "Shift"
        },
        location: "right"
      },
      {
        code: 230,
        label: {
          base: {
            full: "AltGr",
            "1u": "AGr"
          }
        },
        location: "right"
      },
      {
        code: 231,
        label: {
          base: GuiLabel
        },
        location: "right"
      }
    ]
  )
);

export { modifiers };
