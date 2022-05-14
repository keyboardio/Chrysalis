// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020  Keyboardio, Inc.
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
import i18n from "i18next";

import Autocomplete from "@mui/material/Autocomplete";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import TextField from "@mui/material/TextField";

import { KeymapDB } from "@api/keymap";

const db = new KeymapDB();

class LayoutSelect extends React.Component {
  setLayout = (_, value) => {
    const layout = value || this.props.layout;
    this.props.setLayout(layout);
  };

  render() {
    const { className, layout } = this.props;

    const platforms = {
      linux: "Linux",
      win32: "Windows",
      darwin: "macOS",
    };
    const hostos = platforms[process.platform];

    const label = i18n.t("editor.sidebar.keypicker.hostLayout", {
      hostos: hostos,
    });

    return (
      <div className={className}>
        <FormControl>
          <Autocomplete
            value={layout}
            groupBy={(option) => db.getLayoutLanguage(option)}
            onChange={this.setLayout}
            options={db.getSupportedLayouts()}
            getOptionLabel={(option) => option}
            disableClearable
            renderInput={(params) => (
              <TextField {...params} label={label} variant="outlined" />
            )}
          />
          <FormHelperText>
            {i18n.t("editor.sidebar.keypicker.hostHelp")}
          </FormHelperText>
        </FormControl>
      </div>
    );
  }
}

export { LayoutSelect as default };
