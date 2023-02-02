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
import { crc32 } from "easy-crc";
import SerialPort from "serialport";
import Delimiter from "@serialport/parser-delimiter";

/**
 * Object rp2040 with flash method.
 */
export default class rp2040 {
  constructor(device) {
    this.device = device;
    this.serialport = "";
    this.parser = "";
    this.receivedData = [];
  }

  hex2byte = hex => {
    var bytes = [];

    for (var i = 0; i < hex.length; i += 2) bytes.push(parseInt(hex.substr(i, 2), 16));

    return bytes;
  };

  delay = ms => new Promise(res => setTimeout(res, ms));
  init = async () => {
    console.log("Trying to open port from focus", this.device.path);
    this.serialport = new SerialPort(
      this.device.path,
      {
        baudRate: 115200,
        lock: true
      },
      err => {
        if (err !== null) {
          console.error(err);
        }
      }
    );
    this.parser = this.serialport.pipe(new Delimiter({ delimiter: "\r\n" }));
    this.parser.on("data", data => {
      data = data.toString("utf-8");
      console.log("SerialPort data:", data);
      this.receivedData.push(data);
    });
    // Setup error port alert
    this.serialport.on("error", function (err) {
      console.error("Error on SerialPort: " + err);
    });
  };

  readLine = async numberOfLines => {
    while (this.receivedData.length < 1) await this.delay(1);
    return this.receivedData.pop();
  };

  recoverSeal = hex => {
    let bytes = new Uint8Array(this.hex2byte(hex));
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
  };

  binToFW = file => {
    let blocks = new Array();
    for (let index = 0; index < file.length; index = index + 512) {
      let aux = this.hex2byte(file.slice(index, index + 512));
      let block = { data: new Uint8Array(aux), crc: new Uint32Array([crc32("CRC-32", aux)]).buffer };
      blocks.push(block);
    }
    return blocks;
  };

  flash = (file, stateUpdate, finished) => {
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
  };

  sideFlash = async (filenameSides, stateUpdate, finished) => {
    await this.init();
    let sideBin = fs.readFileSync(filenameSides, "hex");
    const seal = this.recoverSeal(sideBin.slice(0, 64));
    const blocks = this.binToFW(sideBin);

    // Check if both sides are plugged in, if not reject operation
    // Left side
    this.serialport.write("upgrade.keyscanner.beginLeft");
    let klStatus = await this.readLine(2);
    console.log(klStatus, this.receivedData);
    if (klStatus != "true") finished(true, "Left side disconnected from keyboard");
    // Right side
    this.serialport.write("upgrade.keyscanner.beginRight");
    let krStatus = await this.readLine(2);
    console.log(krStatus, this.receivedData);
    if (krStatus != "true") finished(true, "Right side disconnected from keyboard");

    // Start with checkings for the right side first to know if the firmware has to be flashed
    this.serialport.write("upgrade.keyscanner.getInfo");
    krStatus = await this.readLine(2);
    console.log(krStatus, this.receivedData);
    krStatus = krStatus.split(" ");
    krStatus = {
      hardwareVersion: krStatus[0],
      flashStart: krStatus[1],
      programVersion: krStatus[2],
      programCrc: krStatus[3],
      validation: krStatus[4]
    };
    if (krStatus.programCrc == seal.programCrc) {
      console.log("CRC Check", krStatus.programCrc != seal.programCrc, krStatus.programCrc, seal.programCrc, krStatus);
      // The firmware has to be updated
      let index,
        retries = 0;
      for (index = 0; index < blocks.length; index++) {
        if (retries > 9) break;
        const writeAction = new Uint8Array(new Uint32Array([index * 256 + krStatus.flashStart, 256]).buffer);
        const datablob = new Uint8Array(blocks[index].data);
        const crcblob = new Uint8Array(blocks[index].crc);
        let blob = new Uint8Array(writeAction.length + datablob.length + crcblob.length);
        blob.set(writeAction);
        blob.set(datablob, writeAction.length);
        blob.set(crcblob, writeAction.length + datablob.length);
        this.serialport.write("upgrade.keyscanner.sendWrite ");
        this.serialport.write(Buffer.from(blob));
        let ans = await this.readLine(2);
        console.log(ans);
        if (ans === false) {
          index = index - 1;
          retries++;
        } else {
          retries = 0;
        }
      }
      if (index < blocks.length) finished(true, "Right side flashing procedure interrupted");
    }

    // Continue with checkings for the left side first to know if the firmware has to be flashed
    this.serialport.write("upgrade.keyscanner.beginLeft");
    klStatus = await this.readLine(2);
    if (klStatus != "true") finished(true, "Left side disconnected from keyboard");
    this.serialport.write("upgrade.keyscanner.getInfo");
    klStatus = await this.readLine(2);
    klStatus = klStatus.split(" ");
    klStatus = {
      hardwareVersion: klStatus[0],
      flashStart: klStatus[1],
      programVersion: klStatus[2],
      programCrc: klStatus[3],
      validation: klStatus[4]
    };
    // if (klStatus.programCrc != seal.programCrc) {
    //   console.log("CRC Check", krStatus.programCrc != seal.programCrc, krStatus.programCrc, seal.programCrc);
    //   // The firmware has to be updated
    //   let index,
    //     retries = 0;
    //   for (index = 0; index < blocks.length; index++) {
    //     if (retries > 9) break;
    //     const writeAction = new Uint32Array([index * 256 + klStatus.flashStart, 256]);
    //     let datachain = "";
    //     blocks[index].data.map(elem => {
    //       datachain = datachain + elem;
    //     });
    //     let ans = await this.serialport.write("upgrade.keyscanner.sendWrite " + writeAction + blocks[index].data + blocks[index].crc);
    //     if (ans == "false") {
    //       index = index - 1;
    //       retries++;
    //     } else {
    //       retries = 0;
    //     }
    //   }
    //   if (index < blocks.length) finished(true, "Left side flashing procedure interrupted");
    // }
    finished(false, "");
  };
}
