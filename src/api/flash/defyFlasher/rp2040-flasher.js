/* bazecor-flash-defy-wired -- Dygma Defy wired flash helper for Bazecor
 * Copyright (C) 2019, 2022  DygmaLab SE
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

import { ipcRenderer } from "electron";
import fs from "fs";
import * as path from "path";
import sideFlaser from "./sideFlasher";

/**
 * Object rp2040 with flash method.
 */
export default class rp2040 {
  constructor(device) {
    this.device = device;
  }

  delay = ms => new Promise(res => setTimeout(res, ms));

  async flash(file, stateUpdate, finished) {
    ipcRenderer.invoke("list-drives", true).then(result => {
      let finalPath = path.join(result, "default.uf2");
      console.log("RESULTS!!!", result, file, " to ", finalPath);
      stateUpdate(2, 50);
      fs.copyFile(file, finalPath, err => {
        if (err) {
          console.log("Error Found:", err);
          finished(true, err);
        }
      });
      stateUpdate(3, 70);
      finished(false, "");
    });
  }

  async sideFlash(filenameSides, stateUpdate, finished) {
    // Flashing procedure for each side
    const sideFlash = new sideFlaser(this.device.path, filenameSides);
    let result = await sideFlash.flashSide("right");
    console.log("Primer flasheo terminado", result);
    result = await sideFlash.flashSide("left");
    console.log("Segundo flasheo terminado", result);
    result = await sideFlash.prepareNeuron();
    finished(false, "");
  }
}
