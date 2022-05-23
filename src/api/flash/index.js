/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
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

import Log from "@api/log";
import { getStaticPath } from "@renderer/config";
import AvrGirl from "avrgirl-arduino";
import { spawn } from "child_process";
import { ipcRenderer } from "electron";
import path from "path";
import TeensyLoader from "teensy-loader";
import { v4 as uuidv4 } from "uuid";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function FocusCommands(options) {
  const logger = new Log();

  this.reboot = async () => {
    const focus = options.focus;
    const timeouts = options?.timeouts || {
      dtrToggle: 500, // Time to wait (ms) between toggling DTR
      bootLoaderUp: 4000, // Time to wait for the boot loader to come up
    };
    const port = focus._port;

    const baudUpdate = () => {
      return new Promise((resolve) => {
        logger.debug("baud update");
        port.update({ baudRate: 1200 }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    const dtrToggle = (state) => {
      return new Promise((resolve) => {
        logger.debug("dtr", state ? "on" : "off");
        port.set({ dtr: state }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    // Attempt calling device.reset first, if present.
    const commands = await focus.command("help");
    if (commands.includes("device.reset")) {
      await focus.command("device.reset");
    }

    // Attempt to reset the device with a serial HUP.
    // If the device supports `device.reset`, this will be a no-op, because we're
    // likely rebooting already. Worst case, we'll reboot twice. If the device
    // does not support `device.reset`, then this will hopefully do the trick.
    await baudUpdate();
    await dtrToggle(true);
    await dtrToggle(false);
  };

  // Saves the data from the keyboard's EEPROM using eeprom.contents, in one,
  // unstructured blob.
  this.saveEEPROMContents = async () => {
    const focus = options.focus;
    const dump = focus.command("eeprom.contents");
    const key = ".internal." + uuidv4();
    logger.debug("Saving EEPROM to session storage", dump);

    return key;
  };

  // Restores `eeprom.contents` in full, not caring about structure.
  this.restoreEEPROMContents = async (key) => {
    const focus = options.focus;
    const dump = sessionStorage.getItem(key);

    logger.debug("Restoring EEPROM from session storage", key, dump);
    sessionStorage.setItem(key, dump);
    return key;
  };

  // Saves the data from the keyboard's EEPROM using
  // focus.readKeyboardConfiguration, which saves each known slot in the EEPROM
  // using individual focus commands.
  // Use restoreEEPROM() to restore the data saved by this function.
  this.saveEEPROM = async () => {
    const focus = options.focus;
    const structured_dump = await focus.readKeyboardConfiguration();
    const json_dump = JSON.stringify(structured_dump);

    const key = ".internal." + uuidv4();
    logger.debug(
      "Writing structured EEPROM data to session storage",
      key,
      structured_dump
    );
    sessionStorage.setItem(key, json_dump);

    const r = ipcRenderer.sendSync(
      "backups.save-file",
      focus.focusDeviceDescriptor.info,
      Date.now(),
      json_dump
    );

    return key;
  };

  // Restores the data the keyboard's EEPROM using focus.writeKeyboardConfiguration, which
  // updates each known slot in the EEPROM using individual focus commands.
  // This method is more able to handle changes to the keyboard's EEPROM layout.
  this.restoreEEPROM = async (key) => {
    const focus = options.focus;
    const structured_dump = JSON.parse(sessionStorage.getItem(key));

    logger.debug(
      "Restoring structured EEPROM data from session storage",
      key,
      structured_dump
    );
    await focus.writeKeyboardConfiguration(structured_dump);
    sessionStorage.removeItem(key);
  };
}

async function DFUUtilBootloader(port, filename, options) {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const logger = new Log();

  const formatID = (desc) => {
    return desc.vendorId.toString(16) + ":" + desc.productId.toString(16);
  };

  const dfuUtil = path.join(
    getStaticPath(),
    "dfu-util",
    process.platform,
    "dfu-util"
  );

  let dyld_library_path = "";
  // dfu-util on darwin needs to know where its custom libusb is
  if (process.platform === "darwin") {
    dyld_library_path = path.join(
      getStaticPath(),
      "dfu-util",
      process.platform
    );
  }

  const runCommand = async (args) => {
    const timeout = 1000 * 60 * 5;
    return new Promise((resolve, reject) => {
      logger.debug("running dfu-util", args);
      const child = spawn(dfuUtil, args, {
        env: { ...process.env, DYLD_LIBRARY_PATH: dyld_library_path },
      });
      child.stdout.on("data", (data) => {
        logger.debug("dfu-util:stdout:", data.toString());
      });
      child.stderr.on("data", (data) => {
        logger.debug("dfu-util:stderr:", data.toString());
      });
      const timer = setTimeout(() => {
        child.kill();
        reject("dfu-util timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        console.log("dfu-util exited with code", code);
        if (code == 0 || code == 251) {
          resolve();
        } else {
          reject("dfu-util exited abnormally with an error code of " + code);
        }
      });
    });
  };

  logger.debug("launching dfu-util...");
  await callback("flash");
  await runCommand([
    "--device",
    formatID(device.usb) + "," + formatID(device.usb.bootloader),
    "--alt",
    "0",
    "--intf",
    "0",
    "--reset",
    "--download",
    filename,
  ]);
}

async function DFUUtil(port, filename, options) {
  const logger = new Log();
  const focusCommands = new FocusCommands(options);
  const device = options.device;
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await callback("save-eeprom");
  const saveKey = await focusCommands.saveEEPROM();

  await callback("bootloaderTrigger");
  await focusCommands.reboot();

  await callback("bootloaderWait");
  const bootloaderFound = await options.focus.waitForBootloader(options.device);

  if (!bootloaderFound) {
    throw new Error("Bootloader not found");
  }

  try {
    await port.close();
  } catch (_) {
    /* ignore the error */
  }
  await delay(1000);

  await DFUUtilBootloader(port, filename, options);

  await callback("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await callback("restore-eeprom");
  await focusCommands.restoreEEPROM(saveKey);
}

async function AvrDude(_, port, filename, options) {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const timeout = 1000 * 60 * 5;
  const focusCommands = new FocusCommands(options);
  const logger = new Log();

  const runCommand = async (args) => {
    await callback("flash");
    return new Promise((resolve, reject) => {
      const avrdude = path.join(
        getStaticPath(),
        "avrdude",
        process.platform,
        "avrdude"
      );
      logger.debug("running avrdude", args);
      const child = spawn(avrdude, args);
      child.stdout.on("data", (data) => {
        logger.debug("avrdude:stdout:", data.toString());
      });
      child.stderr.on("data", (data) => {
        logger.debug("avrdude:stderr:", data.toString());
      });
      const timer = setTimeout(() => {
        child.kill();
        reject("avrdude timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          resolve();
        } else {
          reject("avrdude exited abnormally");
        }
      });
    });
  };

  await callback("save-eeprom");
  const saveKey = await focusCommands.saveEEPROM();

  try {
    await port.close();
  } catch (_) {
    /* ignore the error */
  }
  await delay(1000);

  logger.debug("launching avrdude...");
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
    "-Uflash:w:" + filename + ":i",
  ]);

  await callback("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await callback("restore-eeprom");
  await focusCommands.restoreEEPROM(saveKey);
}

async function Avr109Bootloader(board, port, filename, options) {
  // We do not check if the external flasher exists here. The caller is
  // responsible for doing that.
  const preferExternalFlasher = options && options.preferExternalFlasher;
  if (preferExternalFlasher) return AvrDude(board, port, filename, options);

  const logger = new Log();

  const avrgirl = new AvrGirl({
    board: board,
    debug: true,
    manualReset: true,
  });

  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await callback("flash");
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async (error) => {
        if (error) {
          logger.error(error);
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
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const focusCommands = new FocusCommands(options);
  const logger = new Log();

  await callback("save-eeprom");
  const saveKey = await focusCommands.saveEEPROM();

  await callback("bootloaderTrigger");
  await focusCommands.reboot();

  await callback("bootloaderWait");
  const bootloaderFound = await options.focus.waitForBootloader(options.device);
  if (!bootloaderFound) {
    throw new Error("Bootloader not found");
  }

  await Avr109Bootloader(board, bootloaderFound, filename, options);

  await callback("reconnect");
  await options.focus.reconnectToKeyboard(options.device);

  await callback("restore-eeprom");
  await focusCommands.restoreEEPROM(saveKey);
}

async function teensy(filename, options) {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const device = options.device;
  const focusCommands = new FocusCommands(options);
  const logger = new Log();

  await callback("save-eeprom");
  const saveKey = await focusCommands.saveEEPROM();

  await callback("flash");
  await TeensyLoader.upload(0x16c0, 0x0478, filename);

  await callback("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await callback("restore-eeprom");
  await focusCommands.restoreEEPROM(saveKey);
}

async function DFUProgrammer(filename, options, mcu = "atmega32u4") {
  const callback = options
    ? options.callback
    : function () {
        return;
      };
  const timeout = options.timeout || 10000;
  const device = options.device;
  const focusCommands = new FocusCommands(options);
  const logger = new Log();

  const runCommand = async (args) => {
    return new Promise((resolve, reject) => {
      logger.debug("Running dfu-programmer", args);
      const child = spawn("dfu-programmer", args);
      child.stdout.on("data", (data) => {
        logger.debug("dfu-programmer:stdout:", data.toString());
      });
      child.stderr.on("data", (data) => {
        logger.debug("dfu-programmer:stderr:", data.toString());
      });
      const timer = setTimeout(() => {
        child.kill();
        reject("dfu-programmer timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          resolve();
        } else {
          reject("dfu-programmer exited abnormally");
        }
      });
    });
  };

  await callback("save-eeprom");
  const saveKey = await focusCommands.saveEEPROM();

  await callback("flash");
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

  await callback("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await callback("restore-eeprom");
  await focusCommands.restoreEEPROM(saveKey);
}

export {
  Avr109,
  Avr109Bootloader,
  teensy,
  DFUProgrammer,
  DFUUtil,
  DFUUtilBootloader,
  FocusCommands,
};
