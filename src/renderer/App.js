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

import React, { useState, useEffect } from "react";
import { spawn } from "child_process";

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
import makeStyles from "@mui/styles/makeStyles";

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
import ConfirmationDialog from "./components/ConfirmationDialog";
import { history, navigate } from "./routerHistory";

import { isDevelopment } from "./config";

let focus = new Focus();
if (isDevelopment) {
  focus.debug = true;
}

const settingsLanguage = settings.get("ui.language");
if (settingsLanguage) i18n.changeLanguage(settingsLanguage);

const App = (props) => {
  const logger = new Log();

  const [darkMode, setDarkMode] = useState(settings.get("ui.darkMode"));
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState(null);
  const [pages, setPages] = useState({});
  const [contextBar, setContextBar] = useState(false);
  const [cancelPendingOpen, setCancelPendingOpen] = useState(false);

  localStorage.clear();

  toast.configure({
    position: "bottom-left",
    autoClose: false,
    newestOnTop: true,
    draggable: false,
    closeOnClick: false,
  });
  let flashing = false;

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
    setContextBar(false);
    setCancelPendingOpen(false);
    setConnected(false);
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
      setConnected(false);
      setDevice(null);
      setPages({});

      await navigate("/keyboard-select");
    }
  };

  const onKeyboardConnect = async (port) => {
    focus.close();

    if (!port.path) {
      setConnected(true);
      setPages({});
      setDevice(port.device);

      await navigate("/welcome");
      return [];
    }

    logger.log("Connecting to", port.path);
    await focus.open(port.path, port.device);
    if (process.platform == "darwin") {
      await spawn("stty", ["-f", port.path, "clocal"]);
    }

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

    setConnected(true);
    setDevice(null);
    setPages(pages);

    await navigate(pages.keymap || pages.colormap ? "/editor" : "/welcome");
    return commands;
  };

  const onKeyboardDisconnect = async () => {
    focus.close();
    setConnected(false);
    setDevice(null);
    setPages({});

    localStorage.clear();
    await navigate("/keyboard-select");
  };

  const cancelContext = (dirty) => {
    if (dirty) {
      setCancelPendingOpen(true);
    } else {
      doCancelContext();
    }
  };
  const doCancelContext = () => {
    setContextBar(false);
    setCancelPendingOpen(false);
  };
  const cancelContextCancellation = () => {
    setCancelPendingOpen(false);
  };
  const startContext = () => {
    setContextBar(true);
  };

  let focus = new Focus();
  const deviceInfo = focus?.device?.info || device?.info;
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
        <div sx={{ display: "flex", flexDirection: "column" }}>
          <LocationProvider history={history}>
            <CssBaseline />
            <Header
              contextBar={contextBar}
              connected={connected}
              pages={pages}
              device={deviceInfo}
              cancelContext={cancelContext}
            />
            <main sx={{ flexGrow: 1, overflow: "auto" }}>
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
                <Editor
                  path="/editor"
                  onDisconnect={onKeyboardDisconnect}
                  startContext={startContext}
                  cancelContext={cancelContext}
                  inContext={contextBar}
                />
                <FirmwareUpdate
                  path="/firmware-update"
                  device={device}
                  toggleFlashing={toggleFlashing}
                  onDisconnect={onKeyboardDisconnect}
                />
                <Preferences
                  connected={connected}
                  path="/preferences"
                  startContext={startContext}
                  cancelContext={cancelContext}
                  inContext={contextBar}
                />
                <SystemInfo path="/system-info" />
                <ChangeLog path="/changelog" />
                />
              </Router>
            </main>
          </LocationProvider>
          <ConfirmationDialog
            title={i18n.t("app.cancelPending.title")}
            open={cancelPendingOpen}
            onConfirm={doCancelContext}
            onCancel={cancelContextCancellation}
          >
            {i18n.t("app.cancelPending.content")}
          </ConfirmationDialog>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
};

export default App;
