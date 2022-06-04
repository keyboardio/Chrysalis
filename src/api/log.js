/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import fs from "fs";
import winston from "winston";
import { ipcRenderer } from "electron";

import { suppress } from "./log/format";
import { BrowserConsole } from "./log/transports";

const Store = require("electron-store");
const settings = new Store();

export const setupLogging = async () => {
  const { transports, format } = winston;

  const fn = await ipcRenderer.invoke("logging.get-filename");
  console.info("Logging to", fn);

  const fileLogger = new transports.File({ level: "silly", filename: fn });
  const logLevel = await settings.get("log.level", "info");

  winston.loggers.add("default", {
    transports: [new BrowserConsole({ level: logLevel }), fileLogger],
    format: format.combine(suppress(), format.timestamp(), format.json()),
  });

  winston.loggers.add("focus", {
    transports: [new BrowserConsole({ level: logLevel }), fileLogger],
    format: format.combine(
      format.label({ label: "focus" }),
      suppress(),
      format.timestamp(),
      format.json()
    ),
  });

  winston.loggers.add("flash", {
    transports: [new BrowserConsole({ level: logLevel }), fileLogger],
    format: format.combine(
      format.label({ label: "flash" }),
      suppress(),
      format.timestamp(),
      format.json()
    ),
  });
};

export const logger = (slot = "default") => {
  return winston.loggers.get(slot);
};

export const setLogLevel = (level) => {
  for (const slot of ["default", "focus", "flash"]) {
    const l = logger(slot);
    // Transport[0] is _always_ Console. We only want to adjust the console log
    // level. The file logs should contain everything.
    l.transports[0].level = level;
  }
  settings.set("log.level", level);
};

export const getLogLevel = () => {
  // Since we only set the log level via `setLogLevel`, and that sets it for all
  // slots, and we're only interested in the Console transport log level, we can
  // cheat here, and just return the log level of the first transport of the
  // default logger.
  return logger().transports[0].level;
};

export const collectLogs = async () => {
  const fn = await ipcRenderer.invoke("logging.get-filename");
  const logs = fs
    .readFileSync(fn, "UTF-8")
    .split(/\r?\n/)
    .filter((line) => line.length > 0)
    .map((line) => {
      try {
        return JSON.parse(line);
      } catch (_) {
        // We're collecting logs, and failed to parse a line. We could log the
        // event, but that wouldn't help discovery much, so we just ignore it.
      }
    });

  return logs;
};
