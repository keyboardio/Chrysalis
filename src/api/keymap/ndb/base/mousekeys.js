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

import addCategories from "../addCategories";

const mousekeys = addCategories(
  ["mousekeys"],
  [
    // Mouse movement
    {
      code: 20481,
      label: {
        hint: "Mouse",
        base: "Up"
      }
    },
    {
      code: 20482,
      label: {
        hint: "Mouse",
        base: "Down"
      }
    },
    {
      code: 20484,
      label: {
        hint: "Mouse",
        base: "Left"
      }
    },
    {
      code: 20488,
      label: {
        hint: "Mouse",
        base: "Right"
      }
    },

    // Mouse wheel
    {
      code: 20497,
      label: {
        hint: "Mouse Wheel",
        base: "Up"
      }
    },
    {
      code: 20498,
      label: {
        hint: "Mouse Wheel",
        base: "Down"
      }
    },
    {
      code: 20500,
      label: {
        hint: "Mouse Wheel",
        base: "Left"
      }
    },
    {
      code: 20504,
      label: {
        hint: "Mouse Wheel",
        base: "Right"
      }
    },

    // Mouse buttons
    {
      code: 20545,
      label: {
        hint: "Mouse Button",
        base: "Left"
      }
    },
    {
      code: 20546,
      label: {
        hint: "Mouse Button",
        base: "Right"
      }
    },
    {
      code: 20548,
      label: {
        hint: "Mouse Button",
        base: "Middle"
      }
    },
    {
      code: 20552,
      label: {
        hint: "Mouse Button",
        base: "Back"
      }
    },
    {
      code: 20560,
      label: {
        hint: "Mouse Button",
        base: "Forward"
      }
    },

    // Mouse warp
    {
      code: 20576,
      label: {
        hint: "Mouse Warp",
        base: "End"
      }
    },
    {
      code: 20517,
      label: {
        hint: "Mouse Warp",
        base: "North-West"
      }
    },
    {
      code: 20518,
      label: {
        hint: "Mouse Warp",
        base: "South-West"
      }
    },
    {
      code: 20521,
      label: {
        hint: "Mouse Warp",
        base: "North-East"
      }
    },
    {
      code: 20522,
      label: {
        hint: "Mouse Warp",
        base: "South-East"
      }
    }
  ]
);

export { mousekeys };
