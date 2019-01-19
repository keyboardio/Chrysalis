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

async function Avr109Bootloader(board, port, filename, timeouts) {
  timeouts = timeouts || {
    close: 500 // Time to wait (ms) between the end of flash and closing the
               // device
  }
  const avrgirl = new AvrGirl({
    board: board,
    debug: true,
    manualReset: true
  })

  return new Promise((resolve, reject) => {
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
        }, timeouts.close)
      }
    })
  })
}

async function Avr109(board, port, filename, timeouts) {
  timeouts = timeouts || {
    dtrToggle: 250,    // Time to wait (ms) between toggling DTR
    bootLoaderUp: 2000 // Time to wait for the boot loader to come up
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
                try {
                  Avr109Bootloader(board, port, filename, timeouts)
                  resolve()
                } catch (e) {
                  reject(e)
                }
              }, timeouts.bootLoaderUp)
            })
          }, timeouts.dtrToggle)
        })
      }, timeouts.dtrToggle)
    })
  })
}

async function teensy(filename) {
  return TeensyLoader.upload(0x16C0, 0x0478, filename)
}

export { Avr109, Avr109Bootloader, teensy }
