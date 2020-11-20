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

const consumer = addCategories(
  ["consumer"],
  [
    {
      code: 19682,
      label: {
        base: "Mute"
      }
    },
    {
      code: 22709,
      label: {
        base: "Next track"
      }
    },
    {
      code: 22710,
      label: {
        base: "Prev. track"
      }
    },
    {
      code: 22711,
      label: {
        base: "Stop"
      }
    },
    {
      code: 22733,
      label: {
        base: "Play / pause"
      }
    },
    {
      code: 23785,
      label: {
        base: "Volume up"
      }
    },
    {
      code: 23786,
      label: {
        base: "Volume down"
      }
    },
    {
      code: 23663,
      label: {
        base: "Brightness up"
      }
    },
    {
      code: 23664,
      label: {
        base: "Brightness down"
      }
    }
  ]
);

export { consumer };
