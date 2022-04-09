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

import React, { useEffect, useState } from "react";
const { ipcRenderer } = require("electron");

import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import FilledInput from "@mui/material/FilledInput";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import i18n from "../../i18n";

import Focus from "../../../api/focus";

const Store = require("electron-store");
const settings = new Store();

function AdvancedPreferences(props) {
  let focus = new Focus();
  const [devTools, setDevTools] = useState(false);
  const [advanced, setAdvanced] = useState(false);
  const [verboseFocus, setVerboseFocus] = useState(focus.debug);
  useEffect(() => {
    ipcRenderer.invoke("devtools-is-open").then((result) => {
      setDevTools(result);
    });
    ipcRenderer.on("devtools-opened", () => {
      setDevTools(true);
    });
    ipcRenderer.on("devtools-closed", () => {
      setDevTools(false);
    });

    // Cleanup when component unmounts.
    return () => {
      ipcRenderer.removeAllListeners("devtools-opened");
      ipcRenderer.removeAllListeners("devtools-closed");
    };
  });
  const toggleDevTools = (event) => {
    setDevTools(event.target.checked);
    if (event.target.checked) {
      ipcRenderer.send("show-devtools", true);
    } else {
      ipcRenderer.send("show-devtools", false);
    }
  };

  const toggleVerboseFocus = (event) => {
    setVerboseFocus(event.target.checked);
    let focus = new Focus();
    focus.debug = event.target.checked;
  };

  return (
    <div>
      <Typography
        variant="subtitle1"
        component="h2"
        sx={{
          marginTop: 4,
          marginBottom: 1,
        }}
      >
        {i18n.t("preferences.devtools")}
      </Typography>
      <Card>
        <CardContent>
          <FormControlLabel
            sx={{ display: "flex", marginRight: 2 }}
            control={
              <Switch
                checked={devTools}
                onChange={toggleDevTools}
                value="devtools"
                sx={{ mx: 3 }}
              />
            }
            labelPlacement="end"
            label={i18n.t("preferences.devtools")}
          />
          <FormControlLabel
            sx={{ display: "flex", marginRight: 2 }}
            control={
              <Switch
                checked={verboseFocus}
                onChange={toggleVerboseFocus}
                value="verboseFocus"
                sx={{ mx: 3 }}
              />
            }
            labelPlacement="end"
            label={i18n.t("preferences.verboseFocus")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { AdvancedPreferences };
