/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import TeensyLoader from "teensy-loader"

async function Avr109(board, port, filename) {
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
                    } catch (_) { /* ignore the error */ }
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

async function teensy(filename, timeout = 15000, mcu = "atmega32u4") {
  return TeensyLoader.upload(0x16C0, 0x0478, filename)
}

export { Avr109, teensy }
