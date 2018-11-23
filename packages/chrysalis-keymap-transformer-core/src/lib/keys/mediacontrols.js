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

const MediaControlTable = {
  groupName: "Media",
  keys: [
    {
      code: 19682,
      labels: {
        top: "Media",
        primary: "Mute"
      }
    },
    {
      code: 22709,
      labels: {
        top: "Media",
        primary: "Next Trk",
        verbose: "Next track"
      }
    },
    {
      code: 22710,
      labels: {
        top: "Media",
        primary: "Prev Trk",
        verbose: "Previous track"
      }
    },
    {
      code: 22733,
      labels: {
        top: "Media",
        primary: "Play",
        verbose: "Play / pause"
      }
    },
    {
      code: 23785,
      labels: {
        top: "Media",
        primary: "Vol+",
        verbose: "Volume increase"
      }
    },
    {
      code: 23786,
      labels: {
        top: "Media",
        primary: "Vol-",
        verbose: "Volume decrease"
      }
    }
  ]
};

export default MediaControlTable;
