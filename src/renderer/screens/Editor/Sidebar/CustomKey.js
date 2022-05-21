// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2020-2022  Keyboardio, Inc.
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

import { KeymapDB } from "@api/keymap";
import FormControl from "@mui/material/FormControl";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import i18n from "i18next";
import React from "react";
import Collapsible from "../components/Collapsible";

const db = new KeymapDB();

const CustomKey = (props) => {
  const onKeyChange = (event) => {
    let value = event.target.value;
    if (value < 0) {
      value = 65535;
    }
    if (value > 65535) {
      value = 0;
    }
    props.onKeyChange(value);
  };

  const { keymap, selectedKey, layer } = props;
  const key = keymap.custom[layer][selectedKey];

  return (
    <React.Fragment>
      <Collapsible
        title={i18n.t("editor.sidebar.custom.title")}
        help={i18n.t("editor.sidebar.custom.help")}
        expanded={db.isInCategory(key.code, "unknown")}
      >
        <div>
          <FormControl>
            <InputLabel>{i18n.t("editor.sidebar.custom.label")}</InputLabel>
            <Input
              type="number"
              min={0}
              max={65535}
              value={key.code}
              onChange={onKeyChange}
            />
          </FormControl>
        </div>
      </Collapsible>
    </React.Fragment>
  );
};

export { CustomKey as default };
