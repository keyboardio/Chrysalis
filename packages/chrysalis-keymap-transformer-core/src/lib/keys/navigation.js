// -*- mode: js-jsx -*-
/* chrysalis-keymap-transformer-core -- Chrysalis keymap transformer library
 * Copyright (C) 2018  Keyboardio, Inc.
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

const NavigationTable = {
  groupName: "Navigation",
  keys: [
    {
      code: 75,
      labels: {
        primary: "PgUp",
        verbose: "Page Up"
      }
    },
    {
      code: 78,
      labels: {
        primary: "PgDn",
        verbose: "Page Down"
      }
    },
    {
      code: 74,
      labels: {
        primary: "Home"
      }
    },
    {
      code: 77,
      labels: {
        primary: "End"
      }
    },
    {
      code: 80,
      labels: {
        primary: "Left"
      }
    },
    {
      code: 81,
      labels: {
        primary: "Down"
      }
    },
    {
      code: 82,
      labels: {
        primary: "Up"
      }
    },
    {
      code: 79,
      labels: {
        primary: "Right"
      }
    },
    {
      code: 101,
      labels: {
        primary: "App"
      }
    }
  ]
};

export default NavigationTable;
