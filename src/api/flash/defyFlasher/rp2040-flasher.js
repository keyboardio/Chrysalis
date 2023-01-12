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

import async from "async";
import fs from "fs";
import Focus from "../../focus";

var MAX_MS = 2000;

const PACKET_SIZE = 4096;

const TYPE_DAT = 0x00;
const TYPE_ELA = 0x04;

var focus = new Focus();

/**
 * Object rp2040 with flash method.
 */
export var rp2040 = {
  flash: (file, stateUpdate, finished) => {
    var func_array = [];

    let fileData = fs.readFileSync(file, { encoding: "utf8" });
    fileData = fileData.replace(/(?:\r\n|\r|\n)/g, "");

    var lines = fileData.split(":");
    lines.splice(0, 1);

    var dataObjects = [];
    var total = 0;

    var hexCount = 0;
    var address = dataObjects[0].address;
  }
};
