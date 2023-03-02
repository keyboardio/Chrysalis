// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import path from "path";
import { ipcRenderer } from "electron";

const isDevelopment = process.env.NODE_ENV !== "production";

function getStaticPath() {
  // The `__static` global doesn't match what it should in development.
  // Instead, it includes an unexpected `node_modules` path, specifically:
  // node_modules/electron/dist/Electron.app/Contents/Resources/static
  if (isDevelopment) {
    return path.join("/static");
  } else {
    return path.join("../../../../static");
  }
}

function getFilesystemPathForStaticAsset(asset) {
  if (isDevelopment) {
    return path.join(
      ipcRenderer.sendSync("file.get-application-root"),
      getStaticPath(),
      asset
    );
  } else {
    return path.join(__dirname, getStaticPath(), asset);
  }
}

export { isDevelopment, getStaticPath, getFilesystemPathForStaticAsset };
