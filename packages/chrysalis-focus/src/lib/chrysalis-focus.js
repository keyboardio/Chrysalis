/* chrysalis-focus -- Chrysalis Focus protocol library
 * Copyright (C) 2018  Gergely Nagy
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

/**
 * The heart of Chrysalis, what binds every other piece together.
 *
 * @module chrysalis/focus
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
     * @param {DEVICE} devices... - List of supported, or sought-after devices.
     *
     * @returns {Promise<Array>} A list of port descriptors for matching
     * devices.
     *
     */
    find(...devices) {
        return new Promise((resolve) => {
            let found_devices = []
            SerialPort.list().then((portList) => {
                for (let port of portList) {
                    for (let device of devices) {
                        if (parseInt("0x" + port.productId) == device.usb.productId &&
                            parseInt("0x" + port.vendorId) == device.usb.vendorId) {
                            if (!found_devices.includes(port))
                                found_devices.push(port)
                        }
                    }
                }
                resolve(found_devices)
            })
        })
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
    open(opts) {
        if (typeof opts == "string") {
            this._port = new SerialPort(opts)
        } else if (typeof opts == "object") {
            if (opts.hasOwnProperty("binding")) {
                this._port = opts
            } else {
                this.find(opts).then((devices) => {
                    if (devices && devices.length >= 1)
                        this._port = new SerialPort(devices[0].comName)
                })
            }
        }
    }

    request(cmd, ...args) {
        let request = cmd
        if (args && args.length > 0) {
            request = request + " " + args.join(" ")
        }
        request += "\n"
        this._port.write(request)

        const parser = this._port.pipe(new Delimiter({ delimiter: "\r\n.\r\n" }))
        return new Promise((resolve) => {
            parser.once("data", function(data) {
                resolve(data.toString("utf-8"))
            })
        })
    }

    command(cmd, ...args) {
        if (typeof this._commands[cmd] == "function") {
            return this._commands[cmd](this, ...args)
        } else if (typeof this._commands[cmd] == "object") {
            return this._commands[cmd].focus(this, ...args)
        } else {
            return this.request(cmd, ...args)
        }
    }

    addCommands(cmds) {
        Object.assign(this._commands, cmds)
    }

    _help(s) {
        return new Promise((resolve) => {
            s.request("help").then((data) => {
                resolve(data.split(/\r?\n/))
            })
        })
    }

    _version(s) {
        return new Promise((resolve) => {
            s.request("version").then((data) => {
                let [fv, ...r] = data.split(" ")
                let [vp, date] = r.join(" ").split(" | ")

                fv = fv.split("/")
                vp = vp.split("/")

                resolve({
                    board: {
                        vendor: vp[0],
                        product: vp[1]
                    },
                    firmware: {
                        name: fv[0],
                        version: fv[1],
                        date: date
                    }
                })
            })
        })
    }
}

export default Focus
