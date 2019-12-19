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

const MouseMovementTable = {
    groupName: "Mouse movement",
    keys: [
        {
            code: 20481,
            labels: {
                top: "Mouse",
                primary: "UP"
            }
        },
        {
            code: 20482,
            labels: {
                top: "Mouse",
                primary: "DOWN"
            }
        },
        {
            code: 20484,
            labels: {
                top: "Mouse",
                primary: "LEFT"
            }
        },
        {
            code: 20488,
            labels: {
                top: "Mouse",
                primary: "RIGHT"
            }
        }
    ]
}

const MouseWheelTable = {
    groupName: "Mouse wheel",
    keys: [
        {
            code: 20497,
            labels: {
                top: "M.Wheel",
                primary: "UP"
            }
        },
        {
            code: 20498,
            labels: {
                top: "M.Wheel",
                primary: "DOWN"
            }
        },
        {
            code: 20500,
            labels: {
                top: "M.Wheel",
                primary: "LEFT"
            }
        },
        {
            code: 20504,
            labels: {
                top: "M.Wheel",
                primary: "RIGHT"
            }
        }
    ]
}

const MouseButtonTable = {
    groupName: "Mouse button",
    keys: [
        {
            code: 20545,
            labels: {
                top: "M.Btn",
                primary: "LEFT"
            }
        },
        {
            code: 20546,
            labels: {
                top: "M.Btn",
                primary: "RIGHT"
            }
        },
        {
            code: 20548,
            labels: {
                top: "M.Btn",
                primary: "MIDDLE"
            }
        }
    ]
}

const MouseWarpTable = {
    groupName: "Mouse warp",
    keys: [
        {
            code: 20576,
            labels: {
                top: "M.Warp",
                primary: "END"
            }
        },
        {
            code: 20517,
            labels: {
                top: "M.Warp",
                primary: "NW",
                verbose: "North-West"
            }
        },
        {
            code: 20518,
            labels: {
                top: "M.Warp",
                primary: "SW",
                verbose: "South-West"
            }
        },
        {
            code: 20521,
            labels: {
                top: "M.Warp",
                primary: "NE",
                verbose: "North-East"
            }
        },
        {
            code: 20522,
            labels: {
                top: "M.Warp",
                primary: "SE",
                verbose: "South-East"
            }
        }
    ]
}

export {
    MouseMovementTable,
    MouseWheelTable,
    MouseButtonTable,
    MouseWarpTable
}
