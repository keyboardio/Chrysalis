/* chrysalis-flash-raise -- Dygma Raise flash helper for Chrysalis
 * Copyright (C) 2019, 2020  DygmaLab SE
 *
 * This program is free software: you can redistribute it and/or modify it under
 * the terms of the GNU General Public License as published by the Free Software
 * Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT
 * ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS
 * FOR A PARTICULAR PURPOSE. See the GNU General Public License for more
 * details.
 *
 * You should have received a copy of the GNU General Public License along with
 * this program. If not, see <http://www.gnu.org/licenses/>.
 */

import async from "async";
import fs from "fs";
import Focus from "../../focus";

var MAX_MS = 2000;

const PACKET_SIZE = 4096;

const TYPE_DAT = 0x00;
const TYPE_ELA = 0x04;

var focus = new Focus();

/**
 * Writes data to the given bootloader serial port.
 * example of buffer
 * [[Int8Array]]: Int8Array(4096) [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, -128, -127, -126, -125, -124, -123, -122, -121, -120, -119, -1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, …]
 * [[Int16Array]]: Int16Array(2048) [12335, 12849, 13363, 13877, 14391, 14905, 15419, 15933, 27199, 27755, 28269, 28783, 29297, 29811, 30325, 30839, 31353, 31867, 32381, -32641, -32127, -31613, -31099, -30585, -119, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 257, 257, 257, 257, 257, 257, 513, 514, 514, 514, 770, 771, 771, 771, 1028, 1028, 1284, 1285, 1541, 1542, 1798, 1799, 2055, 2056, 2313, 2569, 2570, 2827, 3083, 3340, 3341, …]
 * [[Int32Array]]: Int32Array(1024) [842084399, 909456435, 976828471, 1044200507, 1818978879, 1886350957, 1953722993, 2021095029, 2088467065, -2139128195, -2071756159, -2004384123, 65417, 0, 0, 0, 0, 0, 0, 16842752, 16843009, 16843009, 33620225, 33686018, 50463234, 50529027, 67371779, 84149252, 100992261, 117835270, 134678279, 151586824, 168430089, 202050315, 218959116, 252644878, 286330896, 320016914, 353702932, 404166166, …]
 * [[Uint8Array]]: Uint8Array(4096) [47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131, 132, 133, 134, 135, 136, 137, 255, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 3, …]
 * @param {array} buffer - Arrays of data, that will write to bootloader
 * @param {function} cb - An optional callback to run once all the functions have completed.
 */
function write_cb(buffer, cb) {
  var buf = new Uint8Array(buffer);

  //the MAX transmission of a serial write is 200 bytes, we therefore
  //marshall the given buffer into 200 byte chunks, and serialise their execution.
  var send = [];

  var total = buf.length;

  var bufferTotal = 0;

  while (bufferTotal < buf.length) {
    var bufferSize = total < 200 ? total : 200;

    //closure to ensure our buffer is local.
    (function(buf2send) {
      send.push(async function(callback) {
        if (await focus._port.write(Buffer.from(buf2send))) {
          callback(null);
        } else {
          callback(true, "write");
        }
      });
    })(buffer.slice(bufferTotal, bufferTotal + bufferSize));

    bufferTotal += bufferSize;
    total -= bufferSize;
  }

  //execute!
  async.series(send, function(err, result) {
    cb(err);
    console.log(result);
  });
}

/**
 * Waits until all output data is transmitted to the serial port.
 * @param {function} callback - An optional callback to run once all the functions have completed.
 */
async function read_cb(callback) {
  var time = 0;

  var timeout = await function() {
    setTimeout(function() {
      time += 50;
      focus._port.drain(err => {
        if (err) {
          if (time > MAX_MS) {
            callback(true, "TIMED OUT");
          }
          timeout();
        } else {
          callback(null, "drain");
        }
      });
    }, 50);
  };
  timeout();
}

/**
 * Closes the connection to the bootloader.
 * @param {function} cb - An optional callback to run once all the functions have completed.
 */
function disconnect_cb(cb) {
  focus.close();
  cb(null, "");
}

function padToN(number, numberToPad) {
  var str = "";

  for (var i = 0; i < numberToPad; i++) str = str + "0";

  return (str + number).slice(-numberToPad);
}

function num2hexstr(number, paddedTo) {
  return padToN(number.toString(16), paddedTo);
}

function hex2byte(hex) {
  var bytes = [];

  for (var i = 0; i < hex.length; i += 2)
    bytes.push(parseInt(hex.substr(i, 2), 16));

  return bytes;
}

function str2ab(str) {
  var buf = new ArrayBuffer(str.length); // 2 bytes for each char
  var bufView = new Uint8Array(buf);
  for (var i = 0, strLen = str.length; i < strLen; i++) {
    bufView[i] = str.charCodeAt(i) & 0xff;
  }
  return buf;
}

/**
 * Decodes hex line to object.
 * @param {string} line - One line from hex file.
 * @returns {object} Щbject for use in firmware.
 */
function ihex_decode(line) {
  var offset = 0;

  var byteCount = parseInt(line.substr(offset, 2), 16);
  offset += 2;
  var address = parseInt(line.substr(offset, 4), 16);
  offset += 4;
  var recordtype = parseInt(line.substr(offset, 2), 16);
  offset += 2;

  var byteData = hex2byte(line.substr(offset, byteCount * 2));

  var bytes = new ArrayBuffer(byteData.length);
  var bytesView = new Uint8Array(bytes, 0, byteData.length);

  for (var i = 0; i < byteData.length; i++) bytesView[i] = byteData[i];

  return {
    str: line,
    len: byteCount,
    address: address,
    type: recordtype,
    data: bytesView
  };
}

/**
 * Object arduino with flash method.
 */
export var arduino = {
  flash: function(file, finished) {
    var func_array = [];

    //CLEAR line
    func_array.push(function(callback) {
      write_cb(str2ab("N#"), callback);
    });
    func_array.push(function(callback) {
      read_cb(callback);
    });

    //ERASE device
    func_array.push(function(callback) {
      write_cb(str2ab("X00002000#"), callback);
    });
    func_array.push(function(callback) {
      read_cb(callback);
    });

    let fileData = fs.readFileSync(file, { encoding: "utf8" });
    fileData = fileData.replace(/(?:\r\n|\r|\n)/g, "");

    var lines = fileData.split(":");
    lines.splice(0, 1);

    var dataObjects = [];
    var total = 0;

    for (var i = 0; i < lines.length; i++) {
      var hex = ihex_decode(lines[i]);

      if (hex.type == TYPE_DAT || hex.type == TYPE_ELA) {
        total += hex.len;
        dataObjects.push(hex);
      }
    }

    var hexCount = 0;
    var address = dataObjects[0].address;

    if (address < 2000) {
      finished(
        true,
        "You're attempting to overwrite the bootloader... (0x" +
          padToN(num2hexstr(dataObjects[0].address), 8) +
          ")"
      );
      return;
    }

    i = 0;

    while (total > 0) {
      var bufferSize = total < PACKET_SIZE ? total : PACKET_SIZE;

      var buffer = new ArrayBuffer(bufferSize);

      var bufferTotal = 0;

      while (bufferTotal < bufferSize) {
        var currentHex = dataObjects[hexCount];

        if (bufferSize - currentHex.len < bufferTotal) {
          //break early, we cannot completely fill the buffer.
          bufferSize = bufferTotal;
          var t = buffer.slice(0, bufferTotal);
          buffer = t;
          break;
        }

        //check for Extended linear addressing...
        if (currentHex.type == TYPE_ELA) {
          if (bufferTotal > 0) {
            //break early, we're going to move to a different memory vector.
            bufferSize = bufferTotal;
            t = buffer.slice(0, bufferTotal);
            buffer = t;
            break;
          }

          //set the address if applicable...
          address = currentHex.address << 16;
        }

        new Uint8Array(buffer, bufferTotal, currentHex.len).set(
          currentHex.data
        );

        hexCount++;
        bufferTotal += currentHex.len;
      }

      //Closure to make sure we localise variables
      (function(localAddress, localBufferSize, localBuffer) {
        //tell the arduino we are writing at memory 20005000, for N bytes.
        func_array.push(function(callback) {
          write_cb(
            str2ab("S20005000," + num2hexstr(localBufferSize, 8) + "#"),
            callback
          );
        });

        //write our data.
        func_array.push(function(callback) {
          write_cb(localBuffer, callback);
        });

        //set our read pointer
        func_array.push(function(callback) {
          write_cb(str2ab("Y20005000,0#"), callback);
        });

        //wait for ACK
        func_array.push(function(callback) {
          read_cb(callback);
        });

        //copy N bytes to memory location Y.
        func_array.push(function(callback) {
          write_cb(
            str2ab(
              "Y" +
                num2hexstr(localAddress, 8) +
                "," +
                num2hexstr(localBufferSize, 8) +
                "#"
            ),
            callback
          );
        });

        //wait for ACK
        func_array.push(function(callback) {
          read_cb(callback);
        });
      })(address, bufferSize, buffer);

      total -= bufferSize;
      i++;
      address += bufferSize;
    }
    //CLEANUP
    func_array.push(function(callback) {
      write_cb(str2ab("WE000ED0C,05FA0004#"), callback);
    });

    //DISCONNECT
    func_array.push(function(callback) {
      disconnect_cb(callback);
    });

    //execute our functions in series!
    async.series(func_array, function(err, results) {
      if (err) finished(true, results);
      else finished(false, "");
    });
  }
};
