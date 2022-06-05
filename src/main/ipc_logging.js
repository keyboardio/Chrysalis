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
