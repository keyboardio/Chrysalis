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

import React, { useState, useEffect, useContext } from "react";

const { ipcRenderer } = require("electron");

const Store = require("electron-store");
const settings = new Store();

import Focus from "@api/focus";
import Log from "@api/log";
import "@api/keymap";
import "@api/colormap";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";
import { LocationProvider, Router } from "@gatsbyjs/reach-router";

import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  StyledEngineProvider,
  createTheme,
} from "@mui/material/styles";
import { GlobalContext } from "./components/GlobalContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import KeyboardSelect from "./screens/KeyboardSelect";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import Editor from "./screens/Editor/Editor";
import Preferences from "./screens/Preferences";
import FocusNotDetected from "./screens/FocusNotDetected";
import SystemInfo from "./screens/SystemInfo";
import ChangeLog from "./screens/ChangeLog";
import i18n from "@renderer/i18n";

import Header from "./components/Header";
import { history, navigate } from "./routerHistory";
import { hideContextBar } from "./components/ContextBar";
import { isDevelopment } from "./config";
import { ActiveDevice } from "./ActiveDevice";

toast.configure({
  position: "bottom-left",
  autoClose: false,
  newestOnTop: true,
  draggable: false,
  closeOnClick: false,
});

let focus = new Focus();
if (isDevelopment) {
  focus.debug = true;
}

const settingsLanguage = settings.get("ui.language");
if (settingsLanguage) i18n.changeLanguage(settingsLanguage);

const App = (props) => {
  const logger = new Log();

  localStorage.clear();

  let flashing = false;
  let focus = new Focus();

  const globalContext = useContext(GlobalContext);

  const [connected, setConnected] = globalContext.state.connected;
  const [device, setDevice] = globalContext.state.device;
  const [darkMode, setDarkMode] = globalContext.state.darkMode;
  const [activeDevice, setActiveDevice] = globalContext.state.activeDevice;

  setDarkMode(settings.get("ui.darkMode"));

  const handleDeviceDisconnect = async (sender, vid, pid) => {
    if (!focus.focusDeviceDescriptor) return;
    if (flashing) return;

    if (
      focus.focusDeviceDescriptor.usb.vendorId != vid ||
      focus.focusDeviceDescriptor.usb.productId != pid
    ) {
      return;
    }
    // Must await this to stop re-render of components reliant on `focus.focusDeviceDescriptor`
    // However, it only renders a blank screen. New route is rendered below.
    await navigate("./");

    if (!focus._port.isOpen) {
      toast.warning(i18n.t("errors.deviceDisconnected"));
    }

    await focus.close();
    hideContextBar();
    setConnected(false);
    setDevice(null);
    setActiveDevice(null);

    // Second call to `navigate` will actually render the proper route
    await navigate("/keyboard-select");
  };

  useEffect(() => {
    ipcRenderer.on("usb-device-disconnected", handleDeviceDisconnect);

    // Specify how to clean up after this effect:
    return function cleanup() {
      ipcRenderer.removeListener(
        "usb-device-disconnected",
        handleDeviceDisconnect
      );
    };
  });

  const toggleFlashing = async () => {
    flashing = !flashing;
    if (!flashing) {
      setConnected(false);
      setDevice(null);

      await navigate("/keyboard-select");
    }
  };

  const onKeyboardConnect = async (port) => {
    focus.close();
    console.log(port);
    if (!port.path) {
      setConnected(true);
      setDevice(port.focusDeviceDescriptor);
      i18n.refreshHardware(port.focusDeviceDescriptor);

      await navigate("/focus-not-detected");
      return [];
    }

    logger.log("Connecting to", port.path);
    await focus.open(port.path, port.focusDeviceDescriptor);

    let commands = [];
    // TODO: I'm not quite sure how to set activeDevice in a way that
    // I can access it in this context, since activeDevice is const
    const newActiveDevice = new ActiveDevice();
    setActiveDevice(newActiveDevice);

    if (!port.focusDeviceDescriptor.bootloader) {
      logger.log("Probing for Focus support...");
      commands = await newActiveDevice.focusCommands();
      focus.setLayerSize(focus.focusDeviceDescriptor);
    }

    setConnected(true);
    setDevice(null);

    await navigate(
      newActiveDevice.focusDetected() ? "/editor" : "/focus-not-detected"
    );
    return commands;
  };

  const onKeyboardDisconnect = async () => {
    focus.close();
    setConnected(false);
    setDevice(null);
    setActiveDevice(null);

    localStorage.clear();
    await navigate("/keyboard-select");
  };

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#EF5022",
      },
      secondary: {
        main: "#939597",
      },
    },
  });

  const deviceInfo = focus?.focusDeviceDescriptor?.info || device?.info;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <LocationProvider history={history}>
            <CssBaseline />
            <Header device={deviceInfo} />
            <main sx={{ flexGrow: 1, overflow: "auto" }}>
              <Router>
                <FocusNotDetected
                  path="/focus-not-detected"
                  device={device}
                  onConnect={onKeyboardConnect}
                />
                <KeyboardSelect
                  path="/keyboard-select"
                  onConnect={onKeyboardConnect}
                  onDisconnect={onKeyboardDisconnect}
                />
                <Editor path="/editor" onDisconnect={onKeyboardDisconnect} />
                <FirmwareUpdate
                  path="/firmware-update"
                  device={device}
                  toggleFlashing={toggleFlashing}
                  onDisconnect={onKeyboardDisconnect}
                />
                <Preferences path="/preferences" />
                <SystemInfo path="/system-info" />
                <ChangeLog path="/changelog" />
              </Router>
            </main>
          </LocationProvider>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
