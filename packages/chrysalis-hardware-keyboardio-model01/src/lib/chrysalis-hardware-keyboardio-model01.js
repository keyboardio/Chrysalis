/* chrysalis-hardware-keyboardio-model01 -- Chrysalis Keyboardio Model01 support
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

import AvrGirl from "avrgirl-arduino"
import Keymap from "./components/Keymap"

const Model01 = {
    info: {
        vendor: "Keyboardio",
        product: "Model01",
        urls: [
            {
                name: "Homepage",
                url: "https://shop.keyboard.io/"
            },
            {
                name: "Forum",
                url: "https://community.keyboard.io/"
            },
            {
                name: "Chat",
                url: "https://discord.gg/4az77sf"
            }
        ]
    },
    usb: {
        vendorId: 0x1209,
        productId: 0x2301
    },
    keyboard: {
        rows: 4,
        columns: 16
    },
    messages: {
        preFlash:"If you wish to proceed, press and hold the " +
            "Prog key on your keyboard, and click the 'Upload' button."
    },
    components: {
        keymap: Keymap
    },

    flash: async (port, filename) => {
        const board = {
            name: "Keyboardio Model 01",
            baud: 9600,
            productId: ["0x2300", "0x2301"],
            protocol: "avr109",
            signature: new Buffer.from([0x43, 0x41, 0x54, 0x45, 0x52, 0x49, 0x4e])
        }

        return new Promise((resolve, reject) => {
            port.update({ baudRate: 1200 }, () => {
                console.log("baud update")
                setTimeout(() => {
                    port.set({ dtr: true }, () => {
                        console.log("dtr on")
                        setTimeout(() => {
                            port.set({ dtr: false }, () => {
                                console.log("dtr off")
                                setTimeout(() => {
                                    focus._port = null
                                    let avrgirl = new AvrGirl({
                                        board: board,
                                        debug: true,
                                        manualReset: true
                                    })

                                    avrgirl.flash(filename, error => {
                                        if (error) {
                                            console.log(error)
                                            try {
                                                avrgirl.connection.serialPort.close()
                                            } catch (e) {} // eslint-disable-line
                                            reject(error)
                                        } else {
                                            setTimeout(() => {
                                                avrgirl.connection.serialPort.close()
                                                resolve()
                                            }, 500)
                                        }
                                    })
                                }, 1000)
                            })
                        }, 250)
                    })
                }, 250)
            })
        })
    }
}

export { Model01 }
