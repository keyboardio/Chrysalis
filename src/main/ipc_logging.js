/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import { app, ipcMain } from "electron";
import fs from "fs";
import path from "path";
import winston from "winston";

export const registerLoggingHandlers = () => {
  const { format, transports } = winston;
  const fn = path.join(app.getPath("logs"), `${Date.now()}.json`);
  const logger = winston.createLogger({
    transports: [new transports.File({ level: "silly", filename: fn })],
    format: format.printf((info) => {
      return info.message;
    }),
  });
  console.info(`Logging to ${fn}`);

  const createLink = () => {
    // Create a symlink to the current file
    const latestFn = path.join(app.getPath("logs"), "current.json");
    try {
      fs.unlinkSync(latestFn);
      fs.symlinkSync(fn, latestFn);
    } catch (_) {
      // Ignore the error. If we don't have a symlink to delete, that's fine. If
      // we can't create one, that's also fine, not a fatal error, not even
      // worth reporting.
    }
  };

  const cullOldLogs = ({ keep } = { keep: 10 }) => {
    // Cull old log files, keep only the most recent 10
    const logs = fs
      .readdirSync(app.getPath("logs"))
      .filter((fn) => fn.match(/^[0-9]+\.json/))
      .sort();
    const cullable = logs.slice(0, logs.length - keep);
    for (const fn of cullable) {
      try {
        fs.unlinkSync(path.join(app.getPath("logs"), fn));
      } catch {
        // We don't care much if we can't remove old logfiles.
      }
    }
  };

  createLink();
  cullOldLogs({ keep: 10 });

  ipcMain.handle("logging.store-info", async (event, level, message) => {
    logger.log(level, message);
  });

  ipcMain.handle("logging.get-session-logs", async (event) => {
    return fs
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
  });
};
