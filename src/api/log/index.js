/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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

global.chrysalis_log_instance = null;

class Log {
  constructor() {
    if (!global.chrysalis_log_instance) {
      global.chrysalis_log_instance = this;
      this._messages = [];
    }

    return global.chrysalis_log_instance;
  }

  _log(level, ...args) {
    const msg = {
      level: level,
      message: args
    };
    this._messages.push(msg);
  }

  log(...args) {
    this._log("log", ...args);
    console.log(...args);
  }

  error(...args) {
    this._log("error", ...args);
    console.error(...args);
  }

  warn(...args) {
    this._log("warn", ...args);
    console.warn(...args);
  }

  info(...args) {
    this._log("info", ...args);
    console.info(...args);
  }

  debug(...args) {
    this._log("debug", ...args);
    console.debug(...args);
  }

  messages() {
    return this._messages;
  }
}

export default Log;
