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
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
const { ipcRenderer } = require("electron");

const Store = require("electron-store");

function DevtoolsPreferences(props) {
  const focus = new Focus();
  const [devTools, setDevTools] = useState(false);
  const [verboseFocus, setVerboseFocus] = useState(focus.debug);
  const { t } = useTranslation();

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
    const focus = new Focus();
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
        {t.t("preferences.devtools")}
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
            label={t.t("preferences.devtools")}
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
            label={t.t("preferences.verboseFocus")}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export { DevtoolsPreferences };
