/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2021  Keyboardio, Inc.
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
      legacyCode: 19682,
      label: {
        base: "Mute"
      }
    },
    {
      code: makeConsumer(0xb5),
      legacyCode: 22709,
      label: {
        base: {
          full: "Next track",
          "1u": "⏭"
        }
      }
    },
    {
      code: makeConsumer(0xb6),
      legacyCode: 22710,
      label: {
        base: {
          full: "Previous track",
          "1u": "⏮"
        }
      }
    },
    {
      code: makeConsumer(0xb7),
      legacyCode: 22711,
      label: {
        base: "Stop"
      }
    },
    {
      code: makeConsumer(0xcd),
      legacyCode: 22733,
      label: {
        base: {
          full: "Play / pause",
          "1u": "⏯"
        }
      }
    },
    {
      code: makeConsumer(0xe9),
      legacyCode: 23785,
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
      legacyCode: 23786,
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
      legacyCode: 23663,
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
      legacyCode: 23664,
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
