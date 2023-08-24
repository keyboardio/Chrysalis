/* chrysalis-flash -- Keyboard flash helpers for Chrysalis
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import { logger } from "@api/log";
//import { SerialPort } from "serialport";
import AvrGirl from "avrgirl-arduino";
import { delay, reportUpdateStatus } from "./utils";

const flash = async (board, port, filename, options) => {
  const avrgirl = new AvrGirl({
    board: board,
    debug: true,
    manualReset: true,
  });

  const callback = options
    ? options.callback
    : function () {
        return;
      };

  await reportUpdateStatus(callback)("flash");
  return new Promise((resolve, reject) => {
    try {
      if (port.isOpen) {
        port.close();
      }
      avrgirl.flash(filename, async (error) => {
        if (error) {
          logger("flash").error("Error during flash", { error: error });
          if (avrgirl.connection.serialPort.isOpen) {
            try {
              avrgirl.connection.serialPort.close();
            } catch (_) {
              /* ignore the error */
            }
          }
          reject(error);
        } else {
          logger("flash").debug("flashing done");
          resolve();
        }
      });
    } catch (e) {
      logger("flash").error("Error during flash", { error: e });
      reject(e);
    }
  });
};

const fromHexString = (hexString) =>
  new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)));
//  <!-- Intel HEX parser by https://github.com/bminer/intel-hex.js -->
//Intel Hex record types
const DATA = 0,
  END_OF_FILE = 1,
  EXT_SEGMENT_ADDR = 2,
  START_SEGMENT_ADDR = 3,
  EXT_LINEAR_ADDR = 4,
  START_LINEAR_ADDR = 5;

const EMPTY_VALUE = 0xff;

/* intel_hex.parse(data)
        `data` - Intel Hex file (string in ASCII format or Buffer Object)
        `bufferSize` - the size of the Buffer containing the data (optional)

        returns an Object with the following properties:
                - data - data as a Buffer Object, padded with 0xFF
                        where data is empty.
                - startSegmentAddress - the address provided by the last
                        start segment address record; null, if not given
                - startLinearAddress - the address provided by the last
                        start linear address record; null, if not given
        Special thanks to: http://en.wikipedia.org/wiki/Intel_HEX
*/

function parseIntelHex(data) {
  //if(data instanceof Buffer)
  data = data.toString("ascii");
  //Initialization
  var buf = new Uint8Array(32768); //max. words in mega32u4
  var bufLength = 0, //Length of data in the buffer
    highAddress = 0, //upper address
    startSegmentAddress = null,
    startLinearAddress = null,
    lineNum = 0, //Line number in the Intel Hex string
    pos = 0; //Current position in the Intel Hex string
  const SMALLEST_LINE = 11;
  while (pos + SMALLEST_LINE <= data.length) {
    //Parse an entire line
    if (data.charAt(pos++) != ":")
      throw new Error(
        "Line " + (lineNum + 1) + " does not start with a colon (:)."
      );
    else lineNum++;
    //Number of bytes (hex digit pairs) in the data field
    var dataLength = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Get 16-bit address (big-endian)
    var lowAddress = parseInt(data.substr(pos, 4), 16);
    pos += 4;
    //Record type
    var recordType = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Data field (hex-encoded string)
    var dataField = data.substr(pos, dataLength * 2);
    var dataFieldBuf;
    if (dataLength) {
      dataFieldBuf = fromHexString(dataField);
    } else {
      dataFieldBuf = new Uint8Array();
    }
    pos += dataLength * 2;
    //Checksum
    var checksum = parseInt(data.substr(pos, 2), 16);
    pos += 2;
    //Validate checksum
    var calcChecksum =
      (dataLength + (lowAddress >> 8) + lowAddress + recordType) & 0xff;
    for (var i = 0; i < dataLength; i++)
      calcChecksum = (calcChecksum + dataFieldBuf[i]) & 0xff;
    calcChecksum = (0x100 - calcChecksum) & 0xff;
    if (checksum != calcChecksum)
      throw new Error(
        "Invalid checksum on line " +
          lineNum +
          ": got " +
          checksum +
          ", but expected " +
          calcChecksum
      );
    //Parse the record based on its recordType
    switch (recordType) {
      case DATA:
        var absoluteAddress = highAddress + lowAddress;
        //Expand buf, if necessary
        /*if(absoluteAddress + dataLength >= buf.length)
                                {
                                        var tmp = Buffer.alloc((absoluteAddress + dataLength) * 2);
                                        buf.copy(tmp, 0, 0, bufLength);
                                        buf = tmp;
                                }*/
        //Write over skipped bytes with EMPTY_VALUE
        if (absoluteAddress > bufLength)
          buf.fill(EMPTY_VALUE, bufLength, absoluteAddress);
        //Write the dataFieldBuf to buf
        //dataFieldBuf.copy(buf, absoluteAddress);
        dataFieldBuf.forEach(function (val, index) {
          buf[absoluteAddress + index] = val;
        });
        bufLength = Math.max(bufLength, absoluteAddress + dataLength);
        break;
      case END_OF_FILE:
        if (dataLength != 0)
          throw new Error("Invalid EOF record on line " + lineNum + ".");
        return {
          data: buf.slice(0, bufLength),
          startSegmentAddress: startSegmentAddress,
          startLinearAddress: startLinearAddress,
        };
      case EXT_SEGMENT_ADDR:
        if (dataLength != 2 || lowAddress != 0)
          throw new Error(
            "Invalid extended segment address record on line " + lineNum + "."
          );
        highAddress = parseInt(dataField, 16) << 4;
        break;
      case START_SEGMENT_ADDR:
        if (dataLength != 4 || lowAddress != 0)
          throw new Error(
            "Invalid start segment address record on line " + lineNum + "."
          );
        startSegmentAddress = parseInt(dataField, 16);
        break;
      case EXT_LINEAR_ADDR:
        if (dataLength != 2 || lowAddress != 0)
          throw new Error(
            "Invalid extended linear address record on line " + lineNum + "."
          );
        highAddress = parseInt(dataField, 16) << 16;
        break;
      case START_LINEAR_ADDR:
        if (dataLength != 4 || lowAddress != 0)
          throw new Error(
            "Invalid start linear address record on line " + lineNum + "."
          );
        startLinearAddress = parseInt(dataField, 16);
        break;
      default:
        throw new Error(
          "Invalid record type (" + recordType + ") on line " + lineNum
        );
    }
    //Advance to the next line
    if (data.charAt(pos) == "\r") pos++;
    if (data.charAt(pos) == "\n") pos++;
  }
  throw new Error("Unexpected end of input: missing or invalid EOF record.");
}

/****************/
// 1.) reset mega32u4 into bootloader mode (user interaction required)
/****************/
async function handleReset(e) {
  if (!("serial" in navigator)) {
    // The Web Serial API is not supported.
    alert("Please use Chromium based browsers!");
  }
  e.preventDefault();
  const filters = [
    //{ usbVendorId: 0x2341, usbProductId: 0x8037 }
    //TODO: I think there are more possible PIDs...
  ];
  const port = await navigator.serial.requestPort({ filters });

  //open & close
  // Wait for the serial port to open.
  await port.open({ baudRate: 1200 });
  await delay(500);
  await port.close();
  await delay(500);
}

const AVR109_RESPONSE_OK = "\r";
const AVR109_CMD_ENTER_PROG_MODE = "P";
const AVR109_CMD_EXIT_BOOTLOADER = "E";
const AVR109_CMD_LEAVE_PROG_MODE = "L";
const AVR109_CMD_RETURN_SOFTWARE_ID = "S";
const PAGE_SIZE = 128;

const AVR109States = {
  UNINITIALIZED: 0,
  PROGRAMMING_MODE: 1,
  FLASHING_PAGE: 2,
  FLASHING_COMPLETE: 3,
  LEFT_PROGRAMMING_MODE: 4,
  COMPLETE: -1,
};

const decoder = new TextDecoder();
const encoder = new TextEncoder();
/****************/
// 2.) open the new bootloader USB-serial (new USB-PID!); user interaction required
/****************/
async function handleSubmit(e) {
  if (!("serial" in navigator)) {
    // The Web Serial API is not supported.
    alert("Please use Chromium based browsers!");
  }
  e.preventDefault();

  let filecontents;
  const file = fileInput.files[0];
  const readerF = new FileReader();

  readerF.onload = async function (event) {
    filecontents = event.target.result;
  };

  const requestBootloaderPort = async () => {
    //request serial port
    const filters = [
      //  { usbVendorId: 0x2341, usbProductId: 0x0036 },
      //TODO: I think there are more possible PIDs...
    ];
    const port = await navigator.serial.requestPort({ filters });
    return port;
  };

  const flashHexToDevice = async (filecontents) => {
    //parse intel hex
    const flashData = parseIntelHex(filecontents);

    const port = await requestBootloaderPort();

    //open & close
    // Wait for the serial port to open.
    await port.open({ baudRate: 57600 });

    //open writing facilities
    const writer = port.writable.getWriter();
    //open reading stream
    const reader = port.readable.getReader();

    // Listen to data coming from the serial device.
    let state = AVR109States.UNINITIALIZED;
    let pageStart = 0;
    let address = 0;

    //trigger update by sending programmer ID command
    sendCommand(writer, AVR109_CMD_RETURN_SOFTWARE_ID);

    // eslint-disable-next-line no-constant-condition
    while (true) {
      // value is a Uint8Array.

      const { value, done } = await reader.read();
      if (done) {
        // Allow the serial port to be closed later.
        reader.releaseLock();
        writer.releaseLock();
        break;
      }
      // value is a Uint8Array.
      const responseString = decoder.decode(value);

      /****************/
      // 3.) flashing the .hex file (event driven by the received data from the ATMega32U4).
      /****************/
      if (state == AVR109States.UNINITIALIZED) {
        //1.) "S" => "CATERIN" - get programmer ID
        if (responseString?.equals("CATERIN")) {
          await sendCommand(writer, AVR109_CMD_ENTER_PROG_MODE);
          state = AVR109States.PROGRAMMING_MODE;
        } else {
          console.log(
            'error: unexpected RX value in state 0, waited for "CATERIN"'
          );
        }
      } else if (state == AVR109States.PROGRAMMING_MODE) {
        //2.) "P" => 13d - enter programming mode
        if (deviceRespondedOk(responseString)) {
          const data = new Uint8Array([
            0x41,
            (address >> 8) & 0xff,
            address & 0xff,
          ]); // 'A' high low
          await writeToDevice(writer, data);
          state = AVR109States.FLASHING_PAGE;
        } else {
          console.log("error: unexpected RX value in state 1, waited for \r");
        }
      } else if (state == AVR109States.FLASHING_PAGE) {
        //3.) now flash page
        let txx;
        let data;
        if (deviceRespondedOk(responseString)) {
          const cmd = new Uint8Array([0x42, 0x00, 0x80, 0x46]); //flash page write command ('B' + 2bytes size + 'F')

          //determine if this is the last page (maybe incomplete -> fill with 0xFF)
          if (pageStart + PAGE_SIZE > flashData.data.length) {
            data = flashData.data.slice(pageStart); //take the remaining bit
            const pad = new Uint8Array(PAGE_SIZE - data.length); //create a new padding array
            pad.fill(0xff);
            txx = Uint8Array.from([...cmd, ...data, ...pad]); //concat command, remaining data and padding
            state = AVR109States.FLASHING_COMPLETE;
          } else {
            data = flashData.data.slice(pageStart, pageStart + PAGE_SIZE); //take one page subarray
            txx = Uint8Array.from([...cmd, ...data]); //concate command with page data
            state = AVR109States.PROGRAMMING_MODE;
          }

          //write control + flash data
          await writeToDevice(writer, txx);
          pageStart += PAGE_SIZE;
          address += PAGE_SIZE / 2; // TODO is the address always page_size/2?
        } else {
          console.log("error: state 2");
        }
      } else if (state == AVR109States.FLASHING_COMPLETE) {
        //4.) last page sent, finish update
        if (deviceRespondedOk(responseString)) {
          await sendCommand(writer, AVR109_CMD_LEAVE_PROG_MODE);
          state = AVR109States.LEFT_PROGRAMMING_MODE;
        } else {
          console.log("NACK");
        }
      } else if (state == AVR109States.LEFT_PROGRAMMING_MODE) {
        //5.) left programming mode, exiting bootloader
        if (deviceRespondedOk(responseString)) {
          state = AVR109States.COMPLETE;

          await rebootToApplicationMode(port);
        } else {
          console.log("NACK");
        }
      }
    }
    await port.close();
  };
  readerF.readAsText(file);
}

const deviceRespondedOk = (responseString) => {
  return responseString?.equals(AVR109_RESPONSE_OK);
};

async function sendCommand(writer, command) {
  await writeToDevice(writer, command);
}

const writeToDevice = async (writer, data) => {
  await writer.write(data);
  await delay(5);
};

const rebootToApplicationMode = async (port, _) => {
  const reader = port.readable.getReader();
  const writer = port.writable.getWriter();
  console.log("Exiting bootloader");
  //finish flashing and exit bootloader
  await sendCommand(writer, AVR109_CMD_EXIT_BOOTLOADER);
  console.log("finished!");
  reader.cancel();
};

export const AVR109Flasher = { flash, rebootToApplicationMode };