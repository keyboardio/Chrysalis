/* chrysalis-focus -- Chrysalis Focus protocol library
 * Copyright (C) 2018  Keyboardio, Inc.
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

import SerialPort from "serialport"
import Delimiter from "@serialport/parser-delimiter"

let instance = null

/** Class implementing the Focus protocol.
 *
 * The primary purpose of this class is to implement the Focus protocol, with a
 * way to extend it from the outside, without requiring one to subclass.
 *
 * ```javascript
 * import Focus from "@chrysalis-api/focus";
 * let focus = new Focus();
 * ```
 */
class Focus {
    /**
     * Return (or create a new) Focus singleton object.
     *
     * @constructor
     */
    constructor() {
        if (!instance) {
            instance = this
            this._commands = {
                help: this._help
            }
            this.timeout = 5000;
        }

        return instance
    }

    /**
     * Find devices that match certain criteria.
     *
     * Given a list of supported devices, look through the system and find
     * matching ones. Each argument must be an object with an `usb` property,
     * which in turn must have `productId` and `vendorId` properties. The method
     * will match these with USB devices on the system, and return a list of
     * matches.
     *
     * For example, a `device` descriptor may look like this:
     * ```json
     * const Model01 = {
     *   usb: {
     *     vendorId: 0x1209,
     *     productId: 0x2301
     *   },
     *   keyboard: {
     *     rows: 4,
     *     columns: 16
     *   }
     * }
     * ```
     *
     * @param {DEVICE} devices - List of supported, or sought-after devices.
     *
     * @returns {Promise<Array>} A list of port descriptors for matching
     * devices.
     *
     */
    async find(...devices) {
        let portList = await SerialPort.list()

        let found_devices = []

        for (let port of portList) {
            for (let device of devices) {
                if (parseInt("0x" + port.productId) == device.usb.productId &&
                    parseInt("0x" + port.vendorId) == device.usb.vendorId) {
                    port.device = device
                    if (!found_devices.includes(port))
                        found_devices.push(port)
                }
            }
        }

        return found_devices
    }

    /**
     * Open a device. This is a **required** step before doing any of the other
     * operations (save `find`).
     *
     * The argument can either be a `string`, a `SerialPort` object, or a device
     * descriptor (see `find` above).
     *
     * @param {OPTIONS} device - Either a path to the device, or a `SerialPort`
     * object, or a device descriptor.
     * @param {OPTIONS} info - The device descriptor, mandatory unless given as
     * the first argument.
     */
    async open(device, info) {
        if (typeof device == "string") {
            if (!info) throw new Error("Device descriptor argument is mandatory")
            this._port = new SerialPort(device)
        } else if (typeof device == "object") {
            if (device.hasOwnProperty("binding")) {
                if (!info) throw new Error("Device descriptor argument is mandatory")
                this._port = device
            } else {
                let devices = await this.find(device)
                if (devices && devices.length >= 1) {
                    this._port = new SerialPort(devices[0].comName)
                }
                info = device
            }
        } else {
            throw new Error("Invalid argument")
        }

        this.device = info
        this.parser = this._port.pipe(new Delimiter({ delimiter: "\r\n" }))
        this.result = ""
        this.callbacks = []
        this.parser.on("data", (data) => {
            data = data.toString("utf-8")
            if (data == ".") {
                let result = this.result,
                    resolve = this.callbacks.shift()

                this.result = ""
                if (resolve) {
                    resolve(result)
                }
            } else {
                if (this.result.length == 0) {
                    this.result = data
                } else {
                    this.result += "\r\n" + data
                }
            }
        })

        return this._port
    }

    /**
     * Close the currently opened device, if any.
     */
    close() {
        if (this._port) {
            this._port.close()
        }
        this._port = null
        this.device = null
    }

    /**
     * Probe for Focus support on an opened device.
     *
     * @returns {Promise<Boolean>}, signaling whether the probe was successful
     * or not.
     */
    async probe() {
        return await this.request("help");
    }

    async _write_parts(parts, cb) {
        if (!parts || parts.length == 0) {
            cb()
            return
        }

        let part = parts.shift()
        part += " "
        this._port.write(part)
        this._port.drain(() => {
            this._write(parts, cb)
        })
    }

    /**
     * Send a low-level request, and return the (mostly) unprocessed response.
     *
     * This method is close to the wire, as all it does, is format its
     * arguments, send the command, and return the results. The only processing
     * done on the results is making sure we don't read too much.
     *
     * @param {String} cmd - the command to send.
     * @param {String} args - optional arguments for the command.
     *
     * @returns {Promise<String>} The unprocessed response.
     *
     * @throws Will throw an error if the instance isn't connected to the
     * keyboard yet.
     */
    request(cmd, ...args) {
        return new Promise((resolve, reject) => {
            let timer = setTimeout(() => {
                reject("Communication timeout");
            }, this.timeout);
            this._request(cmd, ...args).then(data => {
                clearTimeout(timer);
                resolve(data);
            });
        })
    }

    async _request(cmd, ...args) {
        if (!this._port)
            throw "Device not connected!"

        let request = cmd
        if (args && args.length > 0) {
            request = request + " " + args.join(" ")
        }
        request += "\n"

        if (process.platform == "darwin") {
            let parts = request.split(" ")
            return new Promise((resolve, reject) => {
                setTimeout(async () => {
                    await this._port.flush()
                    this.callbacks.push(resolve)
                    await this._write_parts(parts, () => {})
                }, 500)
            })
        } else {
            return new Promise(resolve => {
                this.callbacks.push(resolve)
                this._port.write(request)
            })
        }
    }

    /**
     * Send a high-level command, and return a processed response.
     *
     * Commands registered with `addCommands` can be called by using this
     * method. If the command to be sent is recognised, it will send the command
     * through the registered handler. If it isn't known, falls back to
     * `request()`.
     *
     * @param {String} cmd - the command to send.
     * @param {String} args - optional arguments for the command.
     *
     * @returns {Promise<object>} The processed response.
     *
     * @throws Will throw an error if the instance isn't connected to the
     * keyboard yet.
     */
    async command(cmd, ...args) {
        if (typeof this._commands[cmd] == "function") {
            return this._commands[cmd](this, ...args)
        } else if (typeof this._commands[cmd] == "object") {
            return this._commands[cmd].focus(this, ...args)
        } else {
            return this.request(cmd, ...args)
        }
    }

    /**
     * Register new commands with the system.
     *
     * Commands can either be functions, or objects with a `.focus` method. Both
     * `.focus` and the command-function take the same arguments: `self` (the
     * `Focus` instance running the handler; to have access to the `request`
     * method) and any number of arguments, which are supposed to be the
     * arguments of the command the handler is executing.
     *
     * Handlers **must** return promises, the result of their commands,
     * post-processed in whatever way is most practical for the command in
     * question.
     *
     * @param {object} cmds - The command functions / objects to register, as
     * name-value pairs.
     */
    addCommands(cmds) {
        Object.assign(this._commands, cmds)
    }

    async _help(s) {
        let data = await s.request("help")
        return data.split(/\r?\n/).filter(v => v.length > 0)
    }
}

export default Focus
