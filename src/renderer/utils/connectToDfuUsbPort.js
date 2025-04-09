import { getDfuDevices, Hardware } from "@api/hardware";
import logger from "@renderer/utils/Logger";
import Focus from "@api/focus";

export const connectToDfuUsbPort = async (targetVid, targetPid) => {
  try {
    let filters = getDfuDevices();

    // If we have target VID/PID, only look for that specific device
    if (targetVid && targetPid) {
      filters = [
        {
          vendorId: targetVid,
          productId: targetPid,
        },
      ];
    }

    const usb = await navigator.usb.requestDevice({ filters });

    if (usb) {
      // Create and configure a new Focus instance
      const focus = new Focus();
      focus.in_bootloader = true;
      focus._port = usb;

      // Find the matching device from Hardware.devices
      const matchingDevice = Hardware.devices.find((device) => {
        if (!device.usb) return false;

        // Check bootloaders array first
        if (device.usb.bootloaders) {
          return device.usb.bootloaders.some(
            (bootloader) =>
              bootloader.vendorId === usb.vendorId && bootloader.productId === usb.productId
          );
        }

        // Fallback to legacy bootloader configuration
        return (
          device.usb.bootloader?.vendorId === usb.vendorId &&
          device.usb.bootloader?.productId === usb.productId
        );
      });

      if (matchingDevice) {
        // Set the full device descriptor
        focus.focusDeviceDescriptor = matchingDevice;
        return focus;
      }
    }
  } catch (e) {
    logger.error("Failed to open usb port", e);
  }

  return null;
};
