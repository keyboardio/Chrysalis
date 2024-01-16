import { Hardware, getDfuDevices } from "@api/hardware";

const connectToDfuUsbPort = async () => {
  let usb;
  try {
    const devices = await navigator.usb.getDevices();
    console.log("devices", devices);
    usb = await navigator.usb.requestDevice({
      filters: getDfuDevices(),
    });
  } catch (e) {
    console.error("Failed to open usb port", e);
  }

  return usb;
};

export { connectToDfuUsbPort };
