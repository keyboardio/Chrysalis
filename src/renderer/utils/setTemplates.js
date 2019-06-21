// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

/**
 * Use to reduce the amount of code
 * @param {number} value Size in pixels
 */
export const setButtonSizeTamplate = value => ({
  minWidth: value,
  minHeight: value,
  maxWidth: value,
  maxHeight: value
});

/**
 * Use to reduce the amount of code
 * @param {object} color Object with keys that defining colors using the Red-green-blue-alpha (RGBA) model
 */
export const setColorTamplate = color => ({
  r: color.r,
  g: color.g,
  b: color.b,
  rgb: `rgb(${color.r}, ${color.g}, ${color.b})`
});
