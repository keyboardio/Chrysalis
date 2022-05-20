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
import React, { useState, useEffect } from "react";
import i18n from "i18next";

import Box from "@mui/material/Box";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import Switch from "@mui/material/Switch";

import Collapsible from "../components/Collapsible";
import KeyButton from "../components/KeyButton";

import Focus from "@api/focus";
import { KeymapDB } from "@api/keymap";

const db = new KeymapDB();

const cancelKeyCode = 53630;

const OneShotKeys = (props) => {
  const [escCancel, setEscCancel] = useState(true);
  useEffect(() => {
    const focus = new Focus();
    focus.command("escape_oneshot.cancel_key").then((escCancel) => {
      if (escCancel.length == 0) {
        escCancel = false;
      } else {
        escCancel = parseInt(escCancel) == cancelKeyCode;
      }

      setEscCancel(escCancel);
    });
  }, []);

  const { classes, keymap, selectedKey, layer, onKeyChange } = props;
  const key = keymap.custom[layer][selectedKey];

  const toggleEscapeCancel = async (event) => {
    const focus = new Focus();
    const escCancel = event.target.checked;
    let newCancelKeyCode = cancelKeyCode;

    if (escCancel) {
      newCancelKeyCode = 41; // Esc
    }

    await focus.command("escape_oneshot.cancel_key", newCancelKeyCode);
    setEscCancel(escCancel);
  };

  const escCancelWidget = (
    <Switch checked={escCancel} color="primary" onChange={toggleEscapeCancel} />
  );
  return (
    <React.Fragment>
      <Collapsible
        expanded={key.code == cancelKeyCode || key.code == 41}
        title={i18n.t("editor.sidebar.oneshot.title")}
        help={i18n.t("editor.sidebar.oneshot.help")}
      >
        <KeyButton
          keyObj={db.lookup(cancelKeyCode)}
          onKeyChange={onKeyChange}
        />

        <Box
          sx={{
            m: "2 0",
          }}
        >
          <FormControl component="fieldset">
            <FormGroup row>
              <FormControlLabel
                control={escCancelWidget}
                label={i18n.t(
                  "editor.sidebar.oneshot.configuration.escCancelLabel"
                )}
              />
            </FormGroup>
            <FormHelperText>
              {i18n.t("editor.sidebar.oneshot.configuration.help")}
            </FormHelperText>
          </FormControl>
        </Box>
      </Collapsible>
    </React.Fragment>
  );
};

export { OneShotKeys as default };
