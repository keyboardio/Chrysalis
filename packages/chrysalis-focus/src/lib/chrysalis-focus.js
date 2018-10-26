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

/** Class implementing the Focus protocol.
 *
 * The primary purpose of this class is to implement the Focus protocol, with a
 * way to extend it from the outside, without requiring one to subclass.
 */
class Focus {
    /**
     * Create a new Focus object.
     *
     * Ideally, there should only be one instance in a single application.
     *
     * @constructor
     */
    constructor() {
        this._commands = {
            help: this._help,
            version: this._version
        }
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
     * @param {OPTIONS} opts - Either a path to the device, or a `SerialPort`
     * object, or a device descriptor.
     */
    async open(opts) {
        if (typeof opts == "string") {
            this._port = new SerialPort(opts)
        } else if (typeof opts == "object") {
            if (opts.hasOwnProperty("binding")) {
                this._port = opts
            } else {
                let devices = await this.find(opts)
                if (devices && devices.length >= 1) {
                    this._port = new SerialPort(devices[0].comName)
                }
            }
        }
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
    }

    async _write(parts, cb) {
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
    async request(cmd, ...args) {
        if (!this._port)
            throw "Device not connected!"

        let request = cmd
        if (args && args.length > 0) {
            request = request + " " + args.join(" ")
        }
        request += "\n"

        let parts = request.split(" ")

        const parser = this._port.pipe(new Delimiter({ delimiter: "\r\n.\r\n" }))
        return new Promise((resolve) => {
            this._write(parts, () => {
                parser.once("data", (data) => {
                    resolve(data.toString("utf-8"))
                })
            })
        })
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
        return data.split(/\r?\n/)
    }

    async _version(s) {
        let data = await s.request("version")

        let [fv, ...r] = data.split(" ")
        let [vp, date] = r.join(" ").split(" | ")

        fv = fv.split("/")
        vp = vp.split("/")

        return {
            board: {
                vendor: vp[0],
                product: vp[1]
            },
            firmware: {
                name: fv[0],
                version: fv[1],
                date: date
            }
        }
    }
}

export default Focus
