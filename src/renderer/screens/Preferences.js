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

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
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
import Portal from "@mui/material/Portal";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import {
  KeyboardSettings,
  AdvancedKeyboardSettings,
} from "./Preferences/KeyboardSettings";
import { BasicPreferences } from "./Preferences/Basic";
import { AdvancedPreferences } from "./Preferences/Advanced";
import i18n from "../i18n";

function Preferences(props) {
  const [advanced, setAdvanced] = useState(false);
  const darkMode = props.darkMode;
  const toggleDarkMode = props.toggleDarkMode;
  const toggleAdvanced = () => {
    setAdvanced(!advanced);
  };

  return (
    <Box sx={{ py: 2, px: 2, margin: "0 8" }}>
      <Portal container={props.titleElement}>
        {i18n.t("app.menu.preferences")}
      </Portal>
      <BasicPreferences darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {props.connected && (
        <KeyboardSettings
          startContext={props.startContext}
          cancelContext={props.cancelContext}
          inContext={props.inContext}
        />
      )}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: 4,
          "& button": {
            textTransform: "none",
            "& span svg": {
              marginLeft: "1.5em",
            },
          },
        }}
      >
        <Button onClick={toggleAdvanced}>
          {i18n.t("preferences.advanced")}
          {advanced ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Button>
      </Box>
      <Collapse in={advanced} timeout="auto" unmountOnExit>
        <AdvancedPreferences />
        {props.connected && (
          <AdvancedKeyboardSettings
            startContext={props.startContext}
            cancelContext={props.cancelContext}
            inContext={props.inContext}
          />
        )}
      </Collapse>
    </Box>
  );
}

export default Preferences;
