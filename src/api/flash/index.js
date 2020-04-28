/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import AvrGirl from "avrgirl-arduino";
import TeensyLoader from "teensy-loader";
import { spawn } from "child_process";
import path from "path";

import { getStaticPath } from "../../renderer/config";

const delay = ms => new Promise(res => setTimeout(res, ms));

async function AvrDude(_, port, filename, options) {
  const callback = options
    ? options.callback
    : function() {
        return;
      };

  const timeout = 1000 * 60 * 5;

  const runCommand = async args => {
    await callback("flash");
    return new Promise((resolve, reject) => {
      const avrdude = path.join(
        getStaticPath(),
        "avrdude",
        process.platform,
        "avrdude"
      );
      let child = spawn(avrdude, args);
      child.stdout.on("data", data => {
        console.log("avrdude:stdout:", data.toString());
      });
      child.stderr.on("data", data => {
        console.log("avrdude:stderr:", data.toString());
      });
      let timer = setTimeout(() => {
        child.kill();
        reject("avrdude timed out");
      }, timeout);
      child.on("exit", code => {
        clearTimeout(timer);
        if (code == 0) {
          resolve();
        } else {
          reject("avrdude exited abnormally");
        }
      });
    });
  };

  try {
    await port.close();
  } catch (_) {
    /* ignore the error */
  }
  await delay(1000);
  console.log("launching avrdude...");

  const configFile = path.join(getStaticPath(), "avrdude", "avrdude.conf");
  await runCommand([
    "-C",
    configFile,
    "-v",
    "-v",
    "-patmega32u4",
    "-cavr109",
    "-D",
    "-P",
    port.path,
    "-b57600",
    "-Uflash:w:" + filename + ":i"
  ]);
}

async function Avr109Bootloader(board, port, filename, options) {
  // We do not check if the external flasher exists here. The caller is
  // responsible for doing that.
  const preferExternalFlasher = options && options.preferExternalFlasher;
  if (preferExternalFlasher) return AvrDude(board, port, filename, options);

  const avrgirl = new AvrGirl({
    board: board,
    debug: true,
    manualReset: true
  });

  const callback = options
    ? options.callback
    : function() {
        return;
      };

  await callback("flash");
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async error => {
        if (error) {
          console.log(error);
          if (avrgirl.connection.serialPort.isOpen) {
            try {
              avrgirl.connection.serialPort.close();
            } catch (_) {
              /* ignore the error */
            }
          }
          reject(error);
        } else {
          resolve();
        }
      });
    } catch (e) {
      reject(e);
    }
  });
}

async function Avr109(board, port, filename, options) {
  let timeouts = options ? options.timeouts : null;
  const callback = options
    ? options.callback
    : function() {
        return;
      };
  timeouts = timeouts || {
    dtrToggle: 500, // Time to wait (ms) between toggling DTR
    bootLoaderUp: 4000 // Time to wait for the boot loader to come up
  };

  return new Promise((resolve, reject) => {
    callback("reset");
    port.update({ baudRate: 1200 }, async () => {
      console.log("baud update");
      await delay(timeouts.dtrToggle);
      port.set({ dtr: true }, async () => {
        console.log("dtr on");
        await delay(timeouts.dtrToggle);
        port.set({ dtr: false }, async () => {
          console.log("dtr off");
          await callback("bootloader");
          let bootPort = await options.focus.waitForBootloader(options.device);

          try {
            await Avr109Bootloader(board, bootPort, filename, options);
            resolve();
          } catch (e) {
            await callback("error");
            reject(e);
          }
        });
      });
    });
  });
}

async function teensy(filename) {
  return TeensyLoader.upload(0x16c0, 0x0478, filename);
}

async function DFUProgrammer(filename, mcu = "atmega32u4", timeout = 10000) {
  const runCommand = async args => {
    return new Promise((resolve, reject) => {
      let child = spawn("dfu-programmer", args);
      child.stdout.on("data", data => {
        console.log("dfu-programmer:stdout:", data.toString());
      });
      child.stderr.on("data", data => {
        console.log("dfu-programmer:stderr:", data.toString());
      });
      let timer = setTimeout(() => {
        child.kill();
        reject("dfu-programmer timed out");
      }, timeout);
      child.on("exit", code => {
        clearTimeout(timer);
        if (code == 0) {
          resolve();
        } else {
          reject("dfu-programmer exited abnormally");
        }
      });
    });
  };

  const delay = ms => new Promise(res => setTimeout(res, ms));

  for (let i = 0; i < 10; i++) {
    try {
      await runCommand([mcu, "erase"]);
    } catch (_) {
      await delay(1000);
      continue;
    }
    break;
  }
  await runCommand([mcu, "flash", filename]);
  await runCommand([mcu, "start"]);
}

export { Avr109, Avr109Bootloader, teensy, DFUProgrammer };
