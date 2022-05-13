import { ipcRenderer } from "electron";
import Hardware from "../../api/hardware";

export const findNonSerialKeyboards = async (deviceList) => {
  return ipcRenderer.invoke("usb-scan-for-devices").then((devicesConnected) => {
    const devices = devicesConnected.map((device) => device.deviceDescriptor);
    devices.forEach((desc) => {
      Hardware.nonSerial.forEach((port) => {
        if (
          desc.idVendor == port.usb.vendorId &&
          desc.idProduct == port.usb.productId
        ) {
          let found = false;
          deviceList.forEach((port) => {
            if (
              port.focusDeviceDescriptor.usb.vendorId == desc.idVendor &&
              port.focusDeviceDescriptor.usb.productId == desc.idProduct
            ) {
              found = true;
            }
          });
          if (!found) {
            deviceList.push({
              accessible: true,
              port: port,
            });
          }
        }
      });
    });

    return deviceList;
  });
};
