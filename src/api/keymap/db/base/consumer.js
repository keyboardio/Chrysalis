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

const makeConsumer = keyCode => {
  return keyCode + 18432;
};

const consumer = addCategories(
  ["consumer"],
  [
    {
      code: makeConsumer(0xe2),
      label: {
        base: "Mute"
      }
    },
    {
      code: makeConsumer(0xb5),
      label: {
        base: {
          full: "Next track",
          "1u": "⏭"
        }
      }
    },
    {
      code: makeConsumer(0xb6),
      label: {
        base: {
          full: "Previous track",
          "1u": "⏮"
        }
      }
    },
    {
      code: makeConsumer(0xb7),
      label: {
        base: "Stop"
      }
    },
    {
      code: makeConsumer(0xcd),
      label: {
        base: {
          full: "Play / pause",
          "1u": "⏯"
        }
      }
    },
    {
      code: makeConsumer(0xe9),
      label: {
        hint: {
          full: "Volume",
          "1u": "Vol."
        },
        base: {
          full: "Up",
          "1u": "🔊"
        }
      }
    },
    {
      code: makeConsumer(0xea),
      label: {
        hint: {
          full: "Volume",
          "1u": "Vol."
        },
        base: {
          full: "Down",
          "1u": "🔉"
        }
      }
    },
    {
      code: makeConsumer(0x6f),
      label: {
        hint: {
          full: "Brightness",
          "1u": "Brght."
        },
        base: {
          full: "Up",
          "1u": "🔆"
        }
      }
    },
    {
      code: makeConsumer(0x70),
      label: {
        hint: {
          full: "Brightness",
          "1u": "Brght."
        },
        base: {
          full: "Down",
          "1u": "🔅"
        }
      }
    }
  ]
);

export { consumer };
