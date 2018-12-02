// -*- mode: js-jsx -*-
/* chrysalis-bundle-keyboardio -- Chrysalis Bundle for Keyboard.io
 * Copyright (C) 2018  Keyboardio, Inc.
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

import React from "react";
import ReactDOM from "react-dom";
import { SnackbarProvider } from "notistack";

// Use this App file for the main Chrysalis app
import App from "./App";
import "../styles/keymap.css";

// Use the following for the new UI mockup
//import "../styles/reset.css";
// import "./mockup/scss/app.scss";
// import App from "./mockup/components/App";

ReactDOM.render(
  <SnackbarProvider maxSnack={4}>
    <App />
  </SnackbarProvider>,
  document.getElementById("app")
);
