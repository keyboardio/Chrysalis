import { ipcRenderer } from "electron";
import Hardware from "../../api/hardware";
import Focus from "../../api/focus";

const findNonSerialKeyboards = async (deviceList) => {
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

export const findKeyboards = async () => {
  let focus = new Focus();

  return new Promise((resolve) => {
    focus
      .find(...Hardware.serial)
      .then(async (devices) => {
        let supported_devices = [];
        for (const device of devices) {
          device.accessible = await focus.isDeviceAccessible(device);
          if (device.accessible && (await focus.isDeviceSupported(device))) {
            supported_devices.push(device);
          } else if (!device.accessible) {
            supported_devices.push(device);
          }
        }
        const list = await findNonSerialKeyboards(supported_devices);
        resolve(list);
      })
      .catch(async (e) => {
        console.error(e);
        const list = await findNonSerialKeyboards([]);
        resolve(list);
      });
  });
};
