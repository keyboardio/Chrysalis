// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
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

// TODO: const isDevelopment = process.env.NODE_ENV !== "production";
const isDevelopment = true;

import path from "path";

function getStaticPath() {
  if (process.env.NODE_ENV !== "production") {
    // The `__static` global doesn't match what it should in development.
    // Instead, it includes an unexpected `node_modules` path, specifically:
    // node_modules/electron/dist/Electron.app/Contents/Resources/static
    return path.join(path.resolve(__dirname), "..", "..", "static");
  } else {
    return __static;
  }
}

export { isDevelopment, getStaticPath };
