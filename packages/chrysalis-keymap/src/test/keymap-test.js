/* chrysalis-keymap -- Chrysalis keymap library
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

import "chai/register-expect"

import SerialPort from "serialport/test"
import Focus from "chrysalis-focus"
import Keymap from "../lib/chrysalis-keymap"
const MockBinding = SerialPort.Binding

describe("Keymap", () => {
    let port, focus, keymap

    function emitData(port, response) {
        port.binding.emitData(Buffer.from(response + "\r\n.\r\n"))
    }

    beforeEach(() => {
        MockBinding.createPort("/dev/ttyFake")

        port = new SerialPort("/dev/ttyFake")
        focus = new Focus(port)
        keymap = new Keymap(4)
        focus.addCommands({keymap: keymap})
    })

    afterEach(() => {
        MockBinding.reset()
    })

    describe("#keymap", () => {
        it ("parses the keymap correctly", (done) => {
            emitData(port, "1 2 3 4 5 6 7 8")
            focus.command("keymap").then((keymap) => {
                expect(keymap).to.be.an("array").that.has.lengthOf(2)
                expect(keymap).to.have.deep.ordered.members([[1, 2, 3, 4], [5, 6, 7, 8]])
                done()
            })
        })

        it ("correctly supports additional key parsers", (done) => {
            class KeyPrefixer {
                parse(k) {
                    return "Key_" + k.toString()
                }

                serialize(k) {
                    return k.substring(4)
                }
            }
            keymap.addKeyTransformers([new KeyPrefixer()])
            emitData(port, "1 2 3 4")
            focus.command("keymap").then((keymap) => {
                expect(keymap).to.have.deep.ordered.members([["Key_1", "Key_2", "Key_3", "Key_4"]])
                done()
            })
        })
    })
})
