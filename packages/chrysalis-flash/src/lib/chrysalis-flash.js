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

const delay = ms => new Promise(res => setTimeout(res, ms));

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
    avrgirl.flash(filename, async error => {
      if (error) {
        console.log(error)
        try {
          avrgirl.connection.serialPort.close()
        } catch (_) { /* ignore the error */ }
        reject(error)
      } else {
        await delay(timeouts.close);
        avrgirl.connection.serialPort.close()
        resolve()
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
    port.update({ baudRate: 1200 }, async () => {
      console.log("baud update")
      await delay(timeouts.dtrToggle)
      port.set({ dtr: true }, async () => {
        console.log("dtr on")
        await delay(timeouts.dtrToggle)
        port.set({ dtr: false }, async () => {
          console.log("dtr off")
          await delay(timeouts.bootLoaderUp)
          try {
            await Avr109Bootloader(board, port, filename, timeouts)
            resolve()
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  })
}

async function teensy(filename) {
  return TeensyLoader.upload(0x16C0, 0x0478, filename)
}

export { Avr109, Avr109Bootloader, teensy }
