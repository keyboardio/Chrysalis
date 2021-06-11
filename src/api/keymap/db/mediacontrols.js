/* bazecor-keymap -- Bazecor keymap library
 * Copyright (C) 2018  Keyboardio, Inc.
 * Copyright (C) 2019  DygmaLab SE
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
        primary: "🔇",
        verbose: "MUTE"
      }
    },
    {
      code: 22709,
      labels: {
        top: "Media",
        primary: "⏭",
        verbose: "Next track"
      }
    },
    {
      code: 22710,
      labels: {
        top: "Media",
        primary: "⏮",
        verbose: "Prev. track"
      }
    },
    {
      code: 22711,
      labels: {
        top: "Media",
        primary: "⏹",
        verbose: "STOP"
      }
    },
    {
      code: 22733,
      labels: {
        top: "Media",
        primary: "⏯",
        verbose: "Play / pause"
      }
    },
    {
      code: 23785,
      labels: {
        top: "Media",
        primary: "🔊",
        verbose: "Volume up"
      }
    },
    {
      code: 23786,
      labels: {
        top: "Media",
        primary: "🔉",
        verbose: "Volume down"
      }
    },
    {
      code: 22712,
      labels: {
        top: "Media",
        primary: "⏏",
        verbose: "Eject"
      }
    }
  ]
};

export default MediaControlTable;
