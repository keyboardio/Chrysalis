import { delay } from "./utils";

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

export const flashDevice = async (writer, reader, flashData) => {
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
    switch (state) {
      case AVR109States.UNINITIALIZED:
        if (responseString !== "CATERIN") {
          console.log(
            'error: unexpected RX value in state 0, waited for "CATERIN"'
          );
          break;
        }

        await sendCommand(writer, AVR109_CMD_ENTER_PROG_MODE);
        state = AVR109States.PROGRAMMING_MODE;
        break;

      case AVR109States.PROGRAMMING_MODE:
        if (!deviceRespondedOk(responseString)) {
          console.log("error: unexpected RX value in state 1, waited for \r");
          break;
        }

        await setPageAddress(writer, address);
        state = AVR109States.FLASHING_PAGE;
        break;

      case AVR109States.FLASHING_PAGE:
        if (!deviceRespondedOk(responseString)) {
          console.log("error flashing page");
          break;
        }

        await flashPageToDevice(writer, flashData, pageStart);

        if (pageStart + PAGE_SIZE > flashData.data.length) {
          state = AVR109States.FLASHING_COMPLETE;
        } else {
          pageStart += PAGE_SIZE;
          address += PAGE_SIZE / 2; // TODO is the address always page_size/2?

          state = AVR109States.PROGRAMMING_MODE;
        }

        break;
      case AVR109States.FLASHING_COMPLETE:
        if (!deviceRespondedOk(responseString)) {
          console.log("NACK");
          break;
        }

        await sendCommand(writer, AVR109_CMD_LEAVE_PROG_MODE);
        state = AVR109States.LEFT_PROGRAMMING_MODE;
        break;
      case AVR109States.LEFT_PROGRAMMING_MODE:
        if (!deviceRespondedOk(responseString)) {
          console.log("NACK");
          break;
        }
        state = AVR109States.COMPLETE;
        await rebootToApplicationMode(writer, reader);

        break;
      default:
        console.log("error: unknown state");
        break;
    }
  }
};
const flashPageToDevice = async (writer, flashData, pageStart) => {
  const cmd = new Uint8Array([66, (PAGE_SIZE >> 8) & 255, PAGE_SIZE & 255, 70]); //flash page write command ('B' + 2bytes size + 'F')

  // If this is the last page and it's not aligned with page size,
  // pad the remaining bytes with 0xFF.
  // If the page is exactly PAGE_SIZE, the padding is a no-op.
  const data = flashData.data.slice(pageStart, pageStart + PAGE_SIZE); //take one page subarray. If the data is not one page in size, get what we can

  const pad = new Uint8Array(PAGE_SIZE - data.length); //create a new padding array
  pad.fill(255);
  const txx = Uint8Array.from([...cmd, ...data, ...pad]); //concat command, remaining data and padding

  //write control + flash data
  await writeToDevice(writer, txx);
};
export const setPageAddress = async (writer, address) => {
  const data = new Uint8Array([65, (address >> 8) & 255, address & 255]); // 'A' high low
  await writeToDevice(writer, data);
};
const deviceRespondedOk = (responseString) => {
  return responseString === AVR109_RESPONSE_OK;
};
export async function sendCommand(writer, command) {
  const commandAsArrayBuffer = encoder.encode(command);
  await writeToDevice(writer, commandAsArrayBuffer);
}
const writeToDevice = async (writer, data) => {
  console.log("writing", data);
  await writer.write(data);
  await delay(5);
};

export const rebootToApplicationMode = async (port, writer, reader) => {
  reader ||= port.readable?.getReader();
  writer ||= port.writable?.getWriter();
  console.log("Exiting bootloader");
  //finish flashing and exit bootloader
  await sendCommand(writer, AVR109_CMD_EXIT_BOOTLOADER);
  console.log("finished!");
  reader.cancel();
};