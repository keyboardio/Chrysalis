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


const Store = require("@renderer/localStore");

export const setupLogging = async () => {};
export const collectLogs = async () => {};
let logLevel = "info";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

export const logger = (slot = "default") => {
  return {
    error: (message, meta) => {
      if (levels[logLevel] >= levels.error) console.error(message, meta);
    },
    warn: (message, meta) => {
      if (levels[logLevel] >= levels.warn) console.warn(message, meta);
    },
    info: (message, meta) => {
      if (levels[logLevel] >= levels.info) console.info(message, meta);
    },
    http: (message, meta) => {
      if (levels[logLevel] >= levels.http) console.info(message, meta);
    },
    verbose: (message, meta) => {
      if (levels[logLevel] >= levels.verbose) console.log(message, meta);
    },
    debug: (message, meta) => {
      if (levels[logLevel] >= levels.debug) console.debug(message, meta);
    },
    silly: (message, meta) => {
      if (levels[logLevel] >= levels.silly) console.log(message, meta);
    },
  };
};

export const getLogLevel = () => logLevel;

export const setLogLevel = (level) => {
  if (levels[level] !== undefined) {
    logLevel = level;
  } else {
    throw new Error(`Invalid log level: ${level}`);
  }
};
