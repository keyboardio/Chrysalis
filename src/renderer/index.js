// -*- mode: js-jsx -*-
/* Bazecor -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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
import { MemoryRouter } from "react-router-dom";
import Electron from "electron";

import App from "./App";
import Error from "./Error";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import i18n from "./i18n";
import { I18nextProvider } from "react-i18next";

try {
  ReactDOM.render(
    <MemoryRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </MemoryRouter>,
    document.getElementById("app")
  );
} catch (e) {
  Electron.remote.getCurrentWebContents().openDevTools();
  ReactDOM.render(<Error error={e} />, document.getElementById("app"));
}
