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
import Focus from "../../focus";
import { crc32 } from "easy-crc";

var focus = new Focus();

function hex2byte(hex) {
  var bytes = [];

  for (var i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));

  return bytes;
}

/**
 * Object rp2040 with flash method.
 */
var rp2040 = {
  recoverSeal: hex => {
    let bytes = new Uint8Array(hex2byte(hex));
    const uint = new Uint32Array(bytes.buffer);
    // Seal(hardwareVersion=SealHeader(deviceId=1263747922, version=1, size=32, crc=197434883), programStart=20736, programSize=57552, programCrc=3782824883, programVersion=16777217
    return {
      deviceId: uint[0],
      version: uint[1],
      size: uint[2],
      crc: uint[3],
      programStart: uint[4],
      programSize: uint[5],
      programCrc: uint[6],
      programVersion: uint[7]
    };
  },
  binToFW: file => {
    let blocks = new Array();
    for (let index = 0; index < file.length; index = index + 512) {
      let aux = hex2byte(file.slice(index, index + 512));
      blocks.push({ data: aux, crc: crc32("CRC-32", aux) });
    }
    return blocks;
  },
  flash: (file, stateUpdate, finished) => {
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
  },
  flashSides: () => {
    console.log("flashing sides");
  }
};

export default rp2040;
