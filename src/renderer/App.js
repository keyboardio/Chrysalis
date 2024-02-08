// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Focus from "@api/focus";
import KeymapDB from "@api/focus/keymap/db";

import { LocationProvider, Router } from "@gatsbyjs/reach-router";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import React, { Suspense, useContext, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { useTranslation } from "react-i18next";
import "typeface-roboto/index.css";
import "typeface-source-code-pro/index.css";
import { ActiveDevice } from "./ActiveDevice";
import { hideContextBar } from "./components/ContextBar";
import { GlobalContext } from "./components/GlobalContext";
import Header from "./components/Header";
import Toast, { toast } from "./components/Toast";
import { history, navigate } from "./routerHistory";
import ChangeLog from "./screens/ChangeLog";
import Editor from "./screens/Editor";
import FirmwareUpdate from "./screens/FirmwareUpdate";
import FocusNotDetected from "./screens/FocusNotDetected";
import KeyboardSelect from "./screens/KeyboardSelect";
import LayoutCard from "./screens/LayoutCard";
import Preferences from "./screens/Preferences";
import SystemInfo from "./screens/SystemInfo";
import ImportExport from "./screens/ImportExport";

import { Store } from "@renderer/localStore";
const settings = new Store();

const App = (props) => {
  let flashing = false;
  const focus = new Focus();

  const { t, i18n } = useTranslation();

  const settingsLanguage = settings.get("ui.language");
  if (settingsLanguage && i18n.language !== settingsLanguage) i18n.changeLanguage(settingsLanguage);

  const globalContext = useContext(GlobalContext);

  const [connected, setConnected] = globalContext.state.connected;
  const [focusDeviceDescriptor, setFocusDeviceDescriptor] = globalContext.state.focusDeviceDescriptor;
  const [theme, setTheme] = globalContext.state.theme;
  const darkMode = globalContext.state.darkMode;
  const [activeDevice, setActiveDevice] = globalContext.state.activeDevice;
  const [bgColor, setBgColor] = useState(null);

  // TODO  useFirmwareAutoUpdate();

  const handleDeviceDisconnect = async (sender, vid, pid) => {
    if (!focus.focusDeviceDescriptor) return;
    if (flashing) return;

    if (focus.focusDeviceDescriptor.usb.vendorId != vid || focus.focusDeviceDescriptor.usb.productId != pid) {
      return;
    }
    // Must await this to stop re-render of components reliant on `focus.focusDeviceDescriptor`
    // However, it only renders a blank screen. New route is rendered below.
    await navigate("./");

    if (!focus?._port?.isOpen) {
      toast.warning(t("errors.deviceDisconnected"));
    }

    await focus.close();
    hideContextBar();
    setConnected(false);
    setFocusDeviceDescriptor(null);
    setActiveDevice(null);

    // Second call to `navigate` will actually render the proper route
    await navigate("/keyboard-select");
  };

  const handleNativeThemeUpdate = (event, v) => {
    if (theme != "system") return;

    // This enforces a re-render, without having to use another state.
    setTheme(null);
    setTheme("system");
  };

  useEffect(() => {
    async function setupLayout() {
      const layoutSetting = await settings.get("keyboard.layout", "English (US)");

      const db = new KeymapDB();
      await db.loadLayouts();
      await db.setLayout(layoutSetting);
    }
    setupLayout();
  }, []);

  useEffect(() => {
    setTheme(settings.get("ui.theme", "system"));
    if (!connected) {
      navigate("/keyboard-select");
    }
    // Specify how to clean up after this effect:
    return function cleanup() {};
  });

  const uiTheme = createTheme({
    palette: {
      mode: darkMode() ? "dark" : "light",
      primary: {
        main: "#EF5022",
      },
      secondary: {
        main: darkMode() ? "#ed91f3" : "#ab0edd",
      },
      background: {
        default: darkMode() ? "#353535" : "#f5f5f5",
      },
    },
    components: {
      MuiMenuItem: {
        defaultProps: {
          dense: true,
        },
      },
      MuiFormControlLabel: {
        styleOverrides: {
          label: {
            fontSize: "0.9rem", // Set the font size you want
          },
        },
      },
    },
  });

  useEffect(() => {
    setTheme(theme);
    setBgColor(uiTheme.palette.body);
  }, [theme, uiTheme, setTheme]);

  const toggleFlashing = async () => {
    flashing = !flashing;
  };

  const onKeyboardConnect = async (focus) => {
    if (focus === null) {
      return false;
    }
    if (focus?.focusDeviceDescriptor) {
      setConnected(true);
      setFocusDeviceDescriptor(focus.focusDeviceDescriptor);
      i18n.refreshHardware(focus.focusDeviceDescriptor);

      console.log("about to nav to focus not detected   ");
      //  await navigate("/focus-not-detected");
      //return false;
    } else {
      console.log("not connected");
    }
    const newActiveDevice = new ActiveDevice();
    setActiveDevice(newActiveDevice);

    if (focus.focusDeviceDescriptor?.bootloader) {
      setConnected(true);

      await navigate("/focus-not-detected");
      return true;
    }

    focus.setLayerSize(focus.focusDeviceDescriptor);

    i18n.refreshHardware(focus.focusDeviceDescriptor);
    setFocusDeviceDescriptor(null);

    await newActiveDevice.loadConfigFromDevice();
    setConnected(true);

    await navigate("/editor");
    return true;
  };

  const onKeyboardDisconnect = async () => {
    console.log("onKeyboardDisconnect called");
    if (activeDevice) {
      console.info("Disconnecting from keyboard", {
        activeDevice: activeDevice,
      });
    }
    await navigate("./");

    await focus.close();
    hideContextBar();
    setConnected(false);
    setFocusDeviceDescriptor(null);
    setActiveDevice(null);

    // Second call to `navigate` will actually render the proper route
    await navigate("/keyboard-select");
  };

  const deviceInfo = focus?.focusDeviceDescriptor?.info || focusDeviceDescriptor?.info;

  return (
    <Suspense>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={uiTheme}>
          <DndProvider backend={HTML5Backend}>
            <div>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  userSelect: "none",
                }}
              >
                <LocationProvider history={history}>
                  <CssBaseline />
                  <Header device={deviceInfo} />
                  <Box
                    component="main"
                    sx={{
                      flexGrow: 1,
                      overflow: "auto",
                      height: "100%",
                    }}
                  >
                    <Router id="router">
                      <FocusNotDetected
                        path="/focus-not-detected"
                        focusDeviceDescriptor={focusDeviceDescriptor}
                        onConnect={onKeyboardConnect}
                      />
                      <LayoutCard path="/layout-card" onDisconnect={onKeyboardDisconnect} />
                      <ImportExport path="/import-export" onDisconnect={onKeyboardDisconnect} />

                      <KeyboardSelect
                        path="/keyboard-select"
                        onConnect={onKeyboardConnect}
                        onDisconnect={onKeyboardDisconnect}
                      />
                      <Editor path="/editor" onDisconnect={onKeyboardDisconnect} />
                      <FirmwareUpdate
                        path="/firmware-update"
                        focusDeviceDescriptor={focusDeviceDescriptor}
                        toggleFlashing={toggleFlashing}
                        onDisconnect={onKeyboardDisconnect}
                      />
                      <Preferences path="/preferences" onDisconnect={onKeyboardDisconnect} />
                      <SystemInfo path="/system-info" />
                      <ChangeLog path="/changelog" />
                    </Router>
                  </Box>
                </LocationProvider>
              </Box>
              <Toast />
            </div>
          </DndProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Suspense>
  );
};

export default App;
