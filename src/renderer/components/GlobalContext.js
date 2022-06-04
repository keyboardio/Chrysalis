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

import { ipcRenderer } from "electron";
import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = (props) => {
  const [theme, setTheme] = useState("system");
  const [connected, setConnected] = useState(false);
  const [focusDeviceDescriptor, setFocusDeviceDescriptor] = useState(null);
  const [activeDevice, setActiveDevice] = useState(null);

  const getDarkMode = () => {
    if (theme == "system") {
      return ipcRenderer.sendSync("native-theme.should-use-dark-colors");
    }
    return theme == "dark";
  };

  const state = {
    connected: [connected, setConnected],
    darkMode: getDarkMode,
    theme: [theme, setTheme],
    focusDeviceDescriptor: [focusDeviceDescriptor, setFocusDeviceDescriptor],
    activeDevice: [activeDevice, setActiveDevice],
  };

  return (
    <GlobalContext.Provider value={{ state }}>
      {props.children}
    </GlobalContext.Provider>
  );
};
