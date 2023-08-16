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
let logLevel = "silly"; // Example log level

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

function getCallerLine() {
  const error = new Error();
  // Split the stack trace into lines and remove the first two lines
  const stackLines = error.stack.split("\n").slice(2);
  // The third line of the stack trace should be the caller's line
  const callerLine = stackLines[0];
  return callerLine;
}

function logMessage(method, message, meta, logLevel) {
  const callerLine = getCallerLine();
  const error = new Error();

  method(`${message} (called from ${callerLine})`, {
    data: meta,
  });
}

export const logger = (slot = "default") => {
  const logLevel = "silly"; // Example log level
  const currentLevel = levels[logLevel];

  return {
    error: (message, meta) =>
      logMessage(console.error, message, meta, currentLevel),
    warn: (message, meta) =>
      logMessage(console.warn, message, meta, currentLevel),
    info: (message, meta) =>
      logMessage(console.info, message, meta, currentLevel),
    http: (message, meta) =>
      logMessage(console.info, message, meta, currentLevel),
    verbose: (message, meta) =>
      logMessage(console.log, message, meta, currentLevel),
    debug: (message, meta) =>
      logMessage(console.debug, message, meta, currentLevel),
    silly: (message, meta) =>
      logMessage(console.log, message, meta, currentLevel),
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
