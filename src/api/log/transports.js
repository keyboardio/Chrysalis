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

import { ipcRenderer } from "electron";
import winston from "winston";
import { LEVEL, MESSAGE, SPLAT } from "triple-beam";
import TransportStream from "winston-transport";

export class Ipc extends TransportStream {
  constructor(opts) {
    super(opts);

    this.port = new MessageChannel().port1;
  }

  log(info, next) {
    setImmediate(() => this.emit("logged", info));

    ipcRenderer.invoke("logging.store-info", info[LEVEL], info[MESSAGE]);

    if (next) {
      next();
    }
  }
}

export class BrowserConsole extends TransportStream {
  methods = {
    debug: "debug",
    error: "error",
    info: "info",
    warn: "warn",
  };

  log(info, next) {
    setImmediate(() => this.emit("logged", info));

    const m = this.methods[info.level] || "log";
    const cleanMsg = Object.assign({}, info);
    delete cleanMsg[LEVEL];
    delete cleanMsg[MESSAGE];
    delete cleanMsg[SPLAT];
    delete cleanMsg.timestamp;
    delete cleanMsg.message;
    console[m](info.timestamp, info.message, cleanMsg);

    if (next) {
      next();
    }
  }
}
