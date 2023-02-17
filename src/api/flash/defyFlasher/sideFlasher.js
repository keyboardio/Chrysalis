import fs from "fs";
import { crc32 } from "easy-crc";
import SerialPort from "serialport";
import Delimiter from "@serialport/parser-delimiter";

export default class sideFlaser {
  constructor(path, filename) {
    this.path = path;
    this.filename = filename;
  }

  async prepareNeuron() {
    // Auxiliary Functions

    const sleep = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    // Serial port instancing

    const serialport = new SerialPort(this.path, { baudRate: 115200 });
    const parser = serialport.pipe(new Delimiter({ delimiter: "\r\n" }));
    let receivedData = [];
    parser.on("data", function (data) {
      receivedData.push(data.toString("utf-8"));
    });

    serialport.write("upgrade.neuron\n");
    await sleep(10);
    serialport.close(function (err) {
      if (err) console.warn("device already disconnected!! no need to close serialport");
      else console.log("port closed successfully");
    });
  }

  async flashSide(side, stateUpd) {
    // Auxiliary Functions
    const sleep = ms => {
      return new Promise(resolve => {
        setTimeout(resolve, ms);
      });
    };

    const recoverSeal = bin => {
      const uint = new Uint32Array(bin);
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

    async function readLine() {
      while (receivedData.length === 0) await sleep(1);
      return receivedData.pop();
    }

    // Update process

    const hexFile = fs.readFileSync(this.filename, "hex");
    const fromHexString = hexString => Uint8Array.from(hexString.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    const binaryFile = fromHexString(hexFile);
    const seal = recoverSeal(binaryFile.slice(0, 32));

    // Serial port instancing

    const serialport = new SerialPort(this.path, { baudRate: 115200 });
    const parser = serialport.pipe(new Delimiter({ delimiter: "\r\n" }));
    let receivedData = [];
    parser.on("data", function (data) {
      receivedData.push(data.toString("utf-8"));
    });

    // Begin upgrade process for selected side
    let ans;
    if (side === "right") {
      console.log("flashing right side keyboard");
      serialport.write("upgrade.keyscanner.beginRight\n");
      await readLine();
      ans = await readLine();
      if (ans.trim() !== "true") return { error: true, message: "Right side disconnected from keyboard\n" };
    } else {
      console.log("flashing left side keyboard");
      serialport.write("upgrade.keyscanner.beginLeft\n");
      await readLine();
      ans = await readLine();
      if (ans.trim() !== "true") return { error: true, message: "Left side disconnected from keyboard\n" };
    }

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
    let totalsteps = binaryFile.length / 256;
    console.log("CRC check is ", info.programCrc != seal.programCrc, ", info:", info.programCrc, "seal:", seal.programCrc);
    // if (info.programCrc != seal.programCrc) {
    for (let i = 0; i < binaryFile.length; i = i + 256) {
      serialport.write("upgrade.keyscanner.sendWrite ");
      const writeAction = new Uint8Array(new Uint32Array([info.flashStart + i, 256]).buffer);
      const data = binaryFile.slice(i, i + 256);
      const crc = new Uint8Array(new Uint32Array([crc32("CRC-32", data)]).buffer);
      const blob = new Uint8Array(writeAction.length + data.length + crc.length);
      blob.set(writeAction);
      blob.set(data, writeAction.length);
      blob.set(crc, data.length + writeAction.length);
      const buffer = new Buffer.from(blob);
      serialport.write(buffer);
      await readLine();
      let ack = await readLine();
      if (ack.trim() === "false") {
        break;
      }
      stateUpd(step / totalsteps);
      step++;
      // }
    }

    serialport.write("upgrade.keyscanner.finish\n");
    await readLine();
    await readLine();

    serialport.close();

    return { error: false, message: "" };
  }
}
