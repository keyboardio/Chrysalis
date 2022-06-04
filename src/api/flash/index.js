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

import { logger } from "@api/log";
import { getStaticPath } from "@renderer/config";
import AvrGirl from "avrgirl-arduino";
import { spawn } from "child_process";
import { ipcRenderer } from "electron";
import path from "path";
import TeensyLoader from "teensy-loader";
import { v4 as uuidv4 } from "uuid";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const toStep = (callback) => async (step) => {
  logger("flash").info("executing step", { step: step });
  return callback(step);
};

function FocusCommands(options) {
  this.reboot = async () => {
    const focus = options.focus;
    const timeouts = options?.timeouts || {
      dtrToggle: 500, // Time to wait (ms) between toggling DTR
      bootLoaderUp: 4000, // Time to wait for the boot loader to come up
    };
    const port = focus._port;

    const baudUpdate = () => {
      return new Promise((resolve) => {
        logger("flash").debug("baud update");
        port.update({ baudRate: 1200 }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    const dtrToggle = (state) => {
      return new Promise((resolve) => {
        logger("flash").debug(`dtr ${state ? "on" : "off"}`);
        port.set({ dtr: state }, async () => {
          await delay(timeouts.dtrToggle);
          resolve();
        });
      });
    };

    // Attempt rebooting the keyboard programmatically. We rely on focus doing
    // this, so it uses a shorter timeout, because if it succeeds, the keyboard
    // isn't coming back.
    //
    // We do not need to check if the command exists, focus handles that
    // transparently.
    try {
      await focus.command("device.reset");
    } catch (e) {
      // If there's a comms timeout, that's exactly what we want. the keyboard is rebooting.
      if ("Communication timeout" !== e) {
        logger("flash").error("Error while calling `device.reset`", {
          error: e,
        });
        throw e;
      }
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
    logger("flash").debug("Saving EEPROM to session storage", {
      key: key,
      eeprom: dump,
    });

    return key;
  };

  // Restores `eeprom.contents` in full, not caring about structure.
  this.restoreEEPROMContents = async (key) => {
    const focus = options.focus;
    const dump = sessionStorage.getItem(key);

    logger("flash").debug("Restoring EEPROM from session storage", {
      key: key,
      eeprom: dump,
    });
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
    logger("flash").debug("Writing structured EEPROM data to session storage", {
      key: key,
      eeprom: structured_dump,
    });
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

    logger("flash").debug(
      "Restoring structured EEPROM data from session storage",
      { key: key, eeprom: structured_dump }
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

  const formatID = (desc) => {
    return desc.vendorId.toString(16) + ":" + desc.productId.toString(16);
  };

  const dfuUtil = path.join(
    getStaticPath(),
    "dfu-util",
    `${process.platform}-${process.arch}`,
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
      logger("flash").debug("running dfu-util", { args: args });
      const child = spawn(dfuUtil, args, {
        env: { ...process.env, DYLD_LIBRARY_PATH: dyld_library_path },
      });
      child.stdout.on("data", (data) => {
        logger("flash").debug("dfu-util:stdout:", { data: data.toString() });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("dfu-util:stderr:", { data: data.toString() });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").error("dfu-util timed out");
        reject("dfu-util timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0 || code == 251) {
          logger("flash").debug("dfu-util done");
          resolve();
        } else {
          logger("flash").error("dfu-util exited abnormally", {
            exitCode: code,
          });
          reject("dfu-util exited abnormally with an error code of " + code);
        }
      });
    });
  };

  await toStep(callback)("flash");
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
  const focusCommands = new FocusCommands(options);
  const device = options.device;
  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await toStep(callback)("saveEEPROM");
  const saveKey = await focusCommands.saveEEPROM();

  await toStep(callback)("bootloaderTrigger");
  await focusCommands.reboot();

  await toStep(callback)("bootloaderWait");
  const bootloaderFound = await options.focus.waitForBootloader(options.device);

  if (!bootloaderFound) {
    logger("flash").error("bootloader not found");
    throw new Error("Bootloader not found");
  }
  if (port.isOpen) {
    try {
      await port.close();
    } catch (_) {
      /* ignore the error */
    }
  }

  await delay(1000);

  await DFUUtilBootloader(port, filename, options);

  await toStep(callback)("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await toStep(callback)("restoreEEPROM");
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

  const runCommand = async (args) => {
    await toStep(callback)("flash");
    return new Promise((resolve, reject) => {
      const avrdude = path.join(
        getStaticPath(),
        "avrdude",
        process.platform,
        "avrdude"
      );
      logger("flash").debug("running avrdude", { args: args });
      const child = spawn(avrdude, args);
      child.stdout.on("data", (data) => {
        logger("flash").debug("avrdude:stdout:", { data: data.toString() });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("avrdude:stderr:", { data: data.toString() });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").debug("avrdude timed out");
        reject("avrdude timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          logger("flash").debug("avrdude done");
          resolve();
        } else {
          logger("flash").error("avrdude exited abnormally", {
            errorCode: code,
          });
          reject("avrdude exited abnormally");
        }
      });
    });
  };

  await toStep(callback)("saveEEPROM");
  const saveKey = await focusCommands.saveEEPROM();

  try {
    await port.close();
  } catch (_) {
    /* ignore the error */
  }
  await delay(1000);

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

  await toStep(callback)("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await toStep(callback)("restoreEEPROM");
  await focusCommands.restoreEEPROM(saveKey);
}

async function Avr109Bootloader(board, port, filename, options) {
  // We do not check if the external flasher exists here. The caller is
  // responsible for doing that.
  const preferExternalFlasher = options && options.preferExternalFlasher;
  if (preferExternalFlasher) return AvrDude(board, port, filename, options);

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

  await toStep(callback)("flash");
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async (error) => {
        if (error) {
          logger("flash").error("Error during flash", { error: error });
          if (avrgirl.connection.serialPort.isOpen) {
            try {
              avrgirl.connection.serialPort.close();
            } catch (_) {
              /* ignore the error */
            }
          }
          reject(error);
        } else {
          logger("flash").debug("flashing done");
          resolve();
        }
      });
    } catch (e) {
      logger("flash").error("Error during flash", { error: e });
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

  await toStep(callback)("saveEEPROM");
  const saveKey = await focusCommands.saveEEPROM();

  await toStep(callback)("bootloaderTrigger");
  await focusCommands.reboot();

  await toStep(callback)("bootloaderWait");
  const bootloaderFound = await options.focus.waitForBootloader(options.device);
  if (!bootloaderFound) {
    logger("flash").error("bootloader not found");
    throw new Error("Bootloader not found");
  }

  await Avr109Bootloader(board, bootloaderFound, filename, options);

  await toStep(callback)("reconnect");
  await options.focus.reconnectToKeyboard(options.device);

  await toStep(callback)("restoreEEPROM");
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

  await toStep(callback)("saveEEPROM");
  const saveKey = await focusCommands.saveEEPROM();

  await toStep(callback)("flash");
  await TeensyLoader.upload(0x16c0, 0x0478, filename);

  await toStep(callback)("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await toStep(callback)("restoreEEPROM");
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

  const runCommand = async (args) => {
    return new Promise((resolve, reject) => {
      logger("flash").debug("Running dfu-programmer", { args: args });
      const child = spawn("dfu-programmer", args);
      child.stdout.on("data", (data) => {
        logger("flash").debug("dfu-programmer:stdout:", {
          data: data.toString(),
        });
      });
      child.stderr.on("data", (data) => {
        logger("flash").debug("dfu-programmer:stderr:", {
          data: data.toString(),
        });
      });
      const timer = setTimeout(() => {
        child.kill();
        logger("flash").error("dfu-programmer timed out");
        reject("dfu-programmer timed out");
      }, timeout);
      child.on("exit", (code) => {
        clearTimeout(timer);
        if (code == 0) {
          logger("flash").debug("dfu-programmer done");
          resolve();
        } else {
          logger("flash").error("dfu-programmer exited abnormally", {
            errorCode: code,
          });
          reject("dfu-programmer exited abnormally");
        }
      });
    });
  };

  await toStep(callback)("saveEEPROM");
  const saveKey = await focusCommands.saveEEPROM();

  await toStep(callback)("flash");
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

  await toStep(callback)("reconnect");
  await options.focus.reconnectToKeyboard(device);

  await toStep(callback)("restoreEEPROM");
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
