// -*- mode: js-jsx -*-
//@ts-check
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

import { useState, useEffect } from "react";
import usb from "usb";
import Focus from "../../api/focus";
import Hardware from "../../api/hardware";
import i18n from "../i18n";

/**
 * @param {Object} props
 * @param {Function} props.onConnect
 */
export const useKeyboards = ({ onConnect }) => {
  /**
   * @var {boolean} loading
   */
  const [loading, setIsLoading] = useState(false);
  /**
   *  @var {array} devices
   */
  const [devices, setDevices] = useState([]);
  /**
   * @var {Focus} focus
   */
  const [focus] = useState(new Focus());
  /**
   * @var {boolean} scanFoundDevices
   */
  const [scanFoundDevices, setScanFoundDeviecs] = useState(false);
  /**
   * @var {number|null} selectedPortIndex
   */
  const [selectedPortIndex, setSelectedPortIndex] = useState(null);
  /**
   * @var {Object|null} selecteDevice
   */
  const [selectedDevice, setSelectedDevice] = useState(null);
  /**
   * @var {boolean} findInitialDevice
   */
  const [findInitialDevice, setFindInitialDevice] = useState(true);
  /**
   * @var {string|null} error
   */
  const [error, setError] = useState(null);

  /**
   * @var {boolean} opening
   */
  const [opening, setOpening] = useState(false);

  const onKeyboardConnect = async () => {
    setOpening(true);
    try {
      await onConnect(selectedDevice);
    } catch (err) {
      setOpening(false);
      setError(err.toString());
    }

    i18n.refreshHardware(devices[selectedPortIndex]);
  };

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
    focus
      .find(...Hardware.serial)
      .then(async devices => {
        let supported_devices = [];
        for (const device of devices) {
          device.accessible = await focus.isDeviceAccessible(device);
          if (device.accessible && (await focus.isDeviceSupported(device))) {
            supported_devices.push(device);
          } else if (!device.accessible) {
            supported_devices.push(device);
          }
        }
        const list = findNonSerialKeyboards(supported_devices);
        setDevices(list);
        setIsLoading(false);
        setScanFoundDeviecs(list.length > 0);
      })
      .catch(() => {
        // Do something with the error?
        const list = findNonSerialKeyboards([]);
        setDevices(list);
        setIsLoading(false);
        setScanFoundDeviecs(list.length > 0);
      });
  };

  const scanDevices = () => {
    return findKeyboards().then(() =>
      setTimeout(() => {
        setScanFoundDeviecs(false);
      }, 1000)
    );
  };

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
  useEffect(() => {
    if (findInitialDevice) {
      if (!focus._port) return;
      setSelectedDevice(
        devices.find(device => !!device.path && device.path == focus._port.path)
      );
      setFindInitialDevice(false);
    }
  }, [devices]);

  useEffect(() => {
    if (!focus._port) return;
    setSelectedDevice(
      devices.find(device => !!device.path && device.path == focus._port.path)
    );
  }, [selectedPortIndex]);

  return {
    loading,
    devices,
    selectedDevice,
    selectedDeviceIsConnectedDevice:
      focus.device && selectedDevice && selectedDevice.device == focus.device,
    scanDevices,
    scanFoundDevices,
    selectedPortIndex,
    setSelectedPortIndex,
    error,
    opening,
    onKeyboardConnect
  };
};
