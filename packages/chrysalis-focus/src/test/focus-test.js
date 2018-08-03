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

import "chai/register-expect"

import Focus from "../lib/chrysalis-focus"

import SerialPort from "serialport/test"
const MockBinding = SerialPort.Binding

describe("Focus", () => {
    let focus = new Focus()

    function emitData(response) {
        focus._port.binding.emitData(Buffer.from(response + "\r\n.\r\n"))
    }

    beforeEach(() => {
        MockBinding.createPort("/dev/ttyFake")
        focus.open("/dev/ttyFake")
    })

    afterEach(() => {
        MockBinding.reset()
    })

    describe("#help", () => {
        it ("parses the help correctly", (done) => {
            emitData("help\r\nversion")
            focus.command("help").then((commands) => {
                expect(commands).to.be.an("array").that.has.lengthOf(2)
                expect(commands).to.have.ordered.members(["help", "version"])
                done()
            })
        })
    })

    describe("#version", () => {
        it("parses the version correctly", (done) => {
            emitData("Kaleidoscope/latest Fake/Device | today")
            focus.command("version").then((version) => {
                expect(version).to.be.a("object")
                expect(version).to.deep.equal({
                    board: {
                        vendor: "Fake",
                        product: "Device"
                    },
                    firmware: {
                        name: "Kaleidoscope",
                        version: "latest",
                        date: "today"
                    }})
                done()
            })
        })
    })


    describe("#command", () => {
        it("should return a single response", (done) => {
            emitData("A response.")
            focus.request("test.command").then((data) => {
                expect(data).to.be.a("string")
                expect(data).to.equal("A response.")
                done()
            })
        })
    })

    describe("#addCommand", () => {
        it ("can add and call custom commands", (done) => {
            emitData("add-command")

            const myCommand = (s) => {
                return s.request("test-command")
            }

            focus.addCommands({myCommand: myCommand})
            focus.command("myCommand").then((data) => {
                expect(data).to.be.a("string")
                expect(data).to.equal("add-command")
                done()
            })
        })

        it ("can add and call a custom command object", (done) => {
            emitData("add-command-object")

            class MyCommand {
                focus(s) {
                    return s.request("test-command")
                }
            }

            focus.addCommands({myCommand: new MyCommand()})
            focus.command("myCommand").then((data) => {
                expect(data).to.be.a("string")
                expect(data).to.equal("add-command-object")
                done()
            })
        })
    })

    describe("#unknown-command", () => {
        it ("falls back to dumping data when calling with an unknown command", (done) => {
            emitData("fallback")

            focus.command("unknown-command").then((data) => {
                expect(data).to.be.a("string")
                expect(data).to.equal("fallback")
                done()
            })
        })
    })
})
