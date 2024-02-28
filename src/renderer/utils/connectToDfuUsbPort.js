import { Hardware, getDfuDevices } from "@api/hardware";
import logger from "@renderer/utils/Logger";

const connectToDfuUsbPort = async () => {
  let usb;
  try {
    const devices = await navigator.usb.getDevices();
    logger.log("devices", devices);
    usb = await navigator.usb.requestDevice({
      filters: getDfuDevices(),
    });
  } catch (e) {
    logger.error("Failed to open usb port", e);
  }

  return usb;
};

export { connectToDfuUsbPort };
