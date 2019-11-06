/* chrysalis-keymap -- Chrysalis keymap library
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

const OneShotModifierTable = {
    groupName: "OneShot modifiers",
    keys: [
        {
            code: 49153,
            labels: {
                top: "OSM",
                primary: "LEFT CONTROL",
                verbose: "Left Control"
            }
        },
        {
            code: 49154,
            labels: {
                top: "OSM",
                primary: "LSHIFT",
                verbose: "Left Shift"
            }
        },
        {
            code: 49155,
            labels: {
                top: "OSM",
                primary: "LALT",
                verbose: "Left Alt"
            }
        },
        {
            code: 49156,
            labels: {
                top: "OSM",
                primary: "LEFT GUI",
                verbose: "Left Gui"
            }
        },
        {
            code: 49157,
            labels: {
                top: "OSM",
                primary: "RCTRL",
                verbose: "Right Control"
            }
        },
        {
            code: 49158,
            labels: {
                top: "OSM",
                primary: "RSHIFT",
                verbose: "Right Shift"
            }
        },
        {
            code: 49159,
            labels: {
                top: "OSM",
                primary: "RALT",
                verbose: "AltGr"
            }
        },
        {
            code: 49160,
            labels: {
                top: "OSM",
                primary: "RGui",
                verbose: "Right Gui"
            }
        }
    ]
}

const OneShotLayerTable = {
    groupName: "OneShot layers",
    keys: [
        {
            code: 49161,
            labels: {
                top: "OSL",
                primary: "0"
            }
        },
        {
            code: 49162,
            labels: {
                top: "OSL",
                primary: "1"
            }
        },
        {
            code: 49163,
            labels: {
                top: "OSL",
                primary: "2"
            }
        },
        {
            code: 49164,
            labels: {
                top: "OSL",
                primary: "3"
            }
        },
        {
            code: 49165,
            labels: {
                top: "OSL",
                primary: "4"
            }
        },
        {
            code: 49166,
            labels: {
                top: "OSL",
                primary: "5"
            }
        },
        {
            code: 49167,
            labels: {
                top: "OSL",
                primary: "6"
            }
        },
        {
            code: 49168,
            labels: {
                top: "OSL",
                primary: "7"
            }
        }
    ]
}

export { OneShotModifierTable, OneShotLayerTable }
