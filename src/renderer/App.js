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
import Box from "@mui/material/Box";

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
import Welcome from "./screens/Welcome";
import SystemInfo from "./screens/SystemInfo";
import ChangeLog from "./screens/ChangeLog";
import i18n from "@renderer/i18n";

import Header from "./components/Header";
import { history, navigate } from "./routerHistory";
import { hideContextBar } from "./components/ContextBar";
import { isDevelopment } from "./config";

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

  const [darkMode, setDarkMode] = useState(settings.get("ui.darkMode"));

  const [device, setDevice] = useState(null);
  const [pages, setPages] = useState({});

  localStorage.clear();

  let flashing = false;
  let focus = new Focus();
  const deviceInfo = focus?.device?.info || device?.info;

  const globalContext = useContext(GlobalContext);

  const handleDeviceDisconnect = async (sender, vid, pid) => {
    if (!focus.device) return;
    if (flashing) return;

    if (focus.device.usb.vendorId != vid || focus.device.usb.productId != pid) {
      return;
    }
    // Must await this to stop re-render of components reliant on `focus.device`
    // However, it only renders a blank screen. New route is rendered below.
    await navigate("./");

    if (!focus._port.isOpen) {
      toast.warning(i18n.t("errors.deviceDisconnected"));
    }

    await focus.close();
    hideContextBar();
    globalContext.state.connected = false;
    setDevice(null);
    setPages({});

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

  useEffect(() => {
    const darkmode_toggle_channel = new BroadcastChannel("ui.darkMode");
    darkmode_toggle_channel.onmessage = (event) => {
      setDarkMode(event.data);
    };
    return function cleanup() {
      darkmode_toggle_channel.close();
    };
  });

  const toggleFlashing = async () => {
    flashing = !flashing;
    if (!flashing) {
      globalContext.state.connected = false;
      setDevice(null);
      setPages({});

      await navigate("/keyboard-select");
    }
  };

  const onKeyboardConnect = async (port) => {
    focus.close();

    if (!port.path) {
      globalContext.state.connected = true;
      setPages({});
      setDevice(port.device);

      await navigate("/welcome");
      return [];
    }

    logger.log("Connecting to", port.path);
    await focus.open(port.path, port.device);

    let commands = [];
    let pages = [];
    if (!port.device.bootloader) {
      logger.log("Probing for Focus support...");
      try {
        commands = await focus.probe();
      } catch (e) {
        commands = [];
      }

      focus.setLayerSize(focus.device);
      pages = {
        keymap:
          commands.includes("keymap.custom") > 0 ||
          commands.includes("keymap.map") > 0,
        colormap:
          commands.includes("colormap.map") > 0 &&
          commands.includes("palette") > 0,
      };
    }

    globalContext.state.connected = true;
    setDevice(null);
    setPages(pages);

    await navigate(pages.keymap || pages.colormap ? "/editor" : "/welcome");
    return commands;
  };

  const onKeyboardDisconnect = async () => {
    focus.close();
    globalContext.state.connected = false;
    setDevice(null);
    setPages({});

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

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <LocationProvider history={history}>
            <CssBaseline />
            <Header pages={pages} device={deviceInfo} />
            <Box component="main" sx={{ flexGrow: 1, overflow: "auto" }}>
              <Router>
                <Welcome
                  path="/welcome"
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
                />
              </Router>
            </Box>
          </LocationProvider>
        </Box>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
