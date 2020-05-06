// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019, 2020  Keyboardio, Inc.
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

import { useState, useEffect, useRef } from "react";
import usb from "usb";
import Focus from "../../api/focus";
import Hardware from "../../api/hardware";
import i18n from "../i18n";

/**
 * @param {Object} props
 * @param {Function} props.onConnect
 */
export const useKeyboards = ({ onConnect }) => {
  const [loading, setIsLoading] = useState(false);

  const [devices, setDevices] = useState(/** @type {Array<Object>} */ ([]));

  const focus = useRef(new Focus());

  const [scanFoundDevices, setScanFoundDevices] = useState(false);

  const [selectedPortIndex, setSelectedPortIndex] = useState(0);

  const [selectedDevice, setSelectedDevice] = useState(
    /** @type {?Object} */ (null)
  );

  const [error, setError] = useState(/** @type {?string} */ (null));

  const [opening, setOpening] = useState(false);

  const onKeyboardConnect = async () => {
    setOpening(true);
    if (selectedDevice) {
      try {
        await onConnect(selectedDevice);
      } catch (err) {
        setOpening(false);
        setError(err.toString());
      }
      i18n.refreshHardware(selectedDevice);
    } else {
      //show error?
    }
  };

  /**
   * @param {Array<Object>} deviceList
   */
  const findNonSerialKeyboards = deviceList => {
    const devices = usb.getDeviceList().map(device => device.deviceDescriptor);
    devices.forEach(desc => {
      Hardware.nonSerial.forEach(device => {
        if (
          desc.idVendor == device.usb.vendorId &&
          desc.idProduct == device.usb.productId
        ) {
          let found = false;
          deviceList.forEach(sDevice => {
            if (
              sDevice.device.usb.vendorId == desc.idVendor &&
              sDevice.device.usb.productId == desc.idProduct
            ) {
              found = true;
            }
          });
          if (!found) deviceList.push({ device: device });
        }
      });
    });
    return deviceList;
  };

  const findKeyboards = async () => {
    setIsLoading(true);
    focus.current
      .find(...Hardware.serial)
      .then(async devices => {
        let supported_devices = [];
        for (const device of devices) {
          device.accessible = await focus.current.isDeviceAccessible(device);
          if (
            device.accessible &&
            (await focus.current.isDeviceSupported(device))
          ) {
            supported_devices.push(device);
          } else if (!device.accessible) {
            supported_devices.push(device);
          }
        }
        const list = findNonSerialKeyboards(supported_devices);
        setDevices(list);
        setIsLoading(false);
        setScanFoundDevices(list.length > 0);
      })
      .catch(() => {
        // Do something with the error?
        const list = findNonSerialKeyboards([]);
        setDevices(list);
        setIsLoading(false);
        setScanFoundDevices(list.length > 0);
      });
  };

  /**
   * Whenever we find devices, return the state of devices found to
   * false after a short time to reset UI.
   */
  useEffect(() => {
    let timeout = null;
    if (scanFoundDevices) {
      timeout = setTimeout(() => {
        setScanFoundDevices(false);
      }, 1000);
    }
    return () => timeout && clearTimeout(timeout);
  }, [scanFoundDevices]);

  /**
   * Bind event listeners to USB attach/detach events, and remove them
   * when component is unmounted.
   */
  useEffect(() => {
    usb.on("attach", findKeyboards);
    usb.on("detach", findKeyboards);
    return () => {
      //@ts-ignore
      usb.off("attach", findKeyboards);
      //@ts-ignore
      usb.off("detach", findKeyboards);
    };
  }, []);

  // Keep selected device in sync if device list _or_ selection changes
  useEffect(() => {
    setSelectedDevice(devices[selectedPortIndex]);
  }, [devices, selectedPortIndex]);

  // Search for keyboards on initialization
  useEffect(() => {
    findKeyboards();
  }, []);

  return {
    loading,
    devices,
    findKeyboards,
    selectedDevice,
    selectedDeviceIsConnectedDevice:
      focus.current.device &&
      selectedDevice &&
      selectedDevice.device == focus.current.device,
    scanFoundDevices,
    selectedPortIndex,
    setSelectedPortIndex,
    error,
    opening,
    onKeyboardConnect
  };
};
