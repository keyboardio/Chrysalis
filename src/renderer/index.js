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

import { setupLogging } from "@api/log";

import React from "react";
import { createRoot } from "react-dom/client";

import "../styles/keymap.css";
import App from "./App";
import { GlobalContextProvider } from "./components/GlobalContext";
import { migrateDarkModeToTheme } from "./utils/darkMode";

import { Error } from "./Error";
import "./i18n"; // to initialize the i18n system
const { ipcRenderer } = require("electron");

setupLogging();
migrateDarkModeToTheme();

// Enable Hot Module Reload in dev
if (module.hot) module.hot.accept();

const container = document.getElementById("app");
const root = createRoot(container);

try {
  root.render(
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  );
} catch (e) {
  ipcRenderer.invoke("devtools.open");
  root.render(<Error error={e} />);
}
