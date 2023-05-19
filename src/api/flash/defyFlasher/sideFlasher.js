/* bazecor-side-flasher -- Dygma keyboards keyscanner updater module for Bazecor
 * Supported Commands in order of execution -->
 *
 * upgrade.start
 * upgrade.neuron
 * upgrade.end
 * upgrade.keyscanner.isConnected (0:Right / 1:Left)
 * upgrade.keyscanner.isBootloader (0:Right / 1:Left)
 * upgrade.keyscanner.begin (0:Right / 1:Left) // after this one, FW remembers the chosen side
 * upgrade.keyscanner.getInfo
 * upgrade.keyscanner.sendWrite
 * upgrade.keyscanner.validate
 * upgrade.keyscanner.finish
 * upgrade.keyscanner.sendStart
 *
 * Copyright (C) 2019, 2020  DygmaLab SE
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

import fs from "fs";
import { crc32 } from "easy-crc";
import { SerialPort } from "serialport";
import { DelimiterParser } from "@serialport/parser-delimiter";

export default class sideFlaser {
  constructor(path, firmwareSides) {
    this.path = path;
    this.firmwareSides = firmwareSides;
  }

  async prepareNeuron() {
    // Auxiliary Functions

    const sleep = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    // Serial port instancing
    const serialport = new SerialPort({ path: this.path, baudRate: 115200 });
    const parser = serialport.pipe(new DelimiterParser({ delimiter: "\r\n" }));
    let receivedData = [];
    parser.on("data", function (data) {
      receivedData.push(data.toString("utf-8"));
    });
    console.log("Upgrading the neuron...");
    serialport.write("upgrade.neuron\n");
    await sleep(10);
    serialport.close(function (err) {
      if (err) console.warn("device already disconnected!! no need to close serialport");
      else console.log("port closed successfully");
    });
  }

  async flashSide(side, stateUpd, wiredOrWireless) {
    // Auxiliary Functions
    const sleep = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    const recoverSeal = bin => {
      const uint = new Uint32Array(new Uint8Array(bin).buffer);
      return {
        version: uint[0],
        size: uint[1],
        crc: uint[2],
        programStart: uint[3],
        programSize: uint[4],
        programCrc: uint[5],
        programVersion: uint[6]
      };
    };

    async function readLine() {
      while (receivedData.length === 0) await sleep(1);
      return receivedData.pop();
    }

    // Update process
    console.log(this.firmwareSides);
    const seal = recoverSeal(this.firmwareSides.slice(0, 28));
    console.log("This is the seal", seal);
    console.dir(seal);

    // Serial port instancing

    await SerialPort.list();
    const serialport = new SerialPort({ path: this.path, baudRate: 115200 });
    const parser = serialport.pipe(new DelimiterParser({ delimiter: "\r\n" }));
    let receivedData = [];
    parser.on("data", function (data) {
      receivedData.push(data.toString("utf-8"));
    });

    // Begin upgrade process for selected side
    let ans;
    const sideId = side === "right" ? 0 : 1;
    console.log(`flashing ${side} side keyboard`);
    serialport.write(`upgrade.keyscanner.isConnected ${sideId}\n`);
    await readLine();
    let isConnected = await readLine();
    serialport.write(`upgrade.keyscanner.isBootloader ${sideId}\n`);
    await readLine();
    let isItBootloader = await readLine();
    if (!isConnected || !isItBootloader) return;
    serialport.write(`upgrade.keyscanner.begin ${sideId}\n`);
    await readLine();
    ans = await readLine();
    if (ans.trim() !== "true") return { error: true, message: `${side} side disconnected from keyboard\n` };

    serialport.write("upgrade.keyscanner.getInfo\n");
    await readLine();
    ans = await readLine();
    console.log("Received data from Side: ", ans);
    ans = ans.split(" ");
    let info = {
      hardwareVersion: parseInt(ans[0]),
      flashStart: parseInt(ans[1]),
      programVersion: parseInt(ans[2]),
      programCrc: parseInt(ans[3]),
      validation: parseInt(ans[4])
    };

    // Write Firmware FOR Loop
    let step = 0;
    let totalsteps = this.firmwareSides.length / 256;
    console.log("CRC check is ", info.programCrc !== seal.programCrc, ", info:", info.programCrc, "seal:", seal.programCrc);
    // if (info.programCrc != seal.programCrc) {
    let validate = "false",
      retry = 0;
    // while (validate !== "true" && retry < 3) {
    // console.log("retry count: ", retry);
    for (let i = 0; i < this.firmwareSides.length; i = i + 256) {
      console.log(`Addres ${i} of ${this.firmwareSides.length}`);
      serialport.write("upgrade.keyscanner.sendWrite ");
      if (wiredOrWireless == "wireless") await sleep(2);
      const writeAction = new Uint8Array(new Uint32Array([info.flashStart + i, 256]).buffer);
      const data = this.firmwareSides.slice(i, i + 256);
      const crc = new Uint8Array(new Uint32Array([crc32("CRC-32", data)]).buffer);
      const blob = new Uint8Array(writeAction.length + data.length + crc.length);
      blob.set(writeAction);
      blob.set(data, writeAction.length);
      blob.set(crc, data.length + writeAction.length);
      const buffer = new Buffer.from(blob);
      console.log("write sent: ", buffer);
      serialport.write(buffer);
      if (wiredOrWireless == "wireless") await sleep(2);
      await readLine();
      let ack = await readLine();
      console.log("ack received: ", ack);
      if (ack.trim() === "false") {
        break;
      }
      stateUpd(step / totalsteps);
      step++;
      // }
    }
    serialport.write("upgrade.keyscanner.validate\n");
    await readLine();
    validate = await readLine();
    // retry++;
    // }

    serialport.write("upgrade.keyscanner.finish\n");
    await readLine();
    await readLine();

    if (wiredOrWireless == "wireless" && side == "left") {
      serialport.write("upgrade.neuron\n");
    }

    await serialport.close();
    console.log("after serialport close");

    return { error: false, message: "" };
  }
}
