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

import React, { useState } from "react";
import i18n from "i18next";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Divider from "@mui/material/Divider";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Tooltip from "@mui/material/Tooltip";

import Keyboard104 from "../Keyboard104";
import Collapsible from "../components/Collapsible";
import { KeymapDB } from "@api/keymap";
import { addModifier, removeModifier } from "@api/keymap/db/modifiers";
import { GuiLabel } from "@api/keymap/db/base/gui";
import LayoutSelect from "./KeyPicker/LayoutSelect";

const db = new KeymapDB();

const KeyPicker = (props) => {
  const [pickerOpen, setPickerOpen] = useState(false);

  const isStandardKey = (props) => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    const code = key.baseCode || key.code;

    return code >= 4 && code <= 255 && !db.isInCategory(key.code, "dualuse");
  };

  const isOSM = () => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];

    return (
      db.isInCategory(key.code, "modifier") &&
      db.isInCategory(key.code, "oneshot")
    );
  };

  const isDualUse = () => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];

    return db.isInCategory(key.code, "dualuse");
  };

  const openPicker = () => {
    setPickerOpen(true);
  };

  const closePicker = () => {
    setPickerOpen(false);
  };

  const onKeyChange = (keyCode) => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];
    let offset = 0;
    if (key.baseCode) {
      offset = key.code - key.baseCode;
    }

    props.onKeyChange(parseInt(keyCode) + offset);
    closePicker();
  };

  const toggleModifier = (mod) => (event) => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey].code;

    if (event.target.checked) {
      props.onKeyChange(addModifier(key, mod));
    } else {
      props.onKeyChange(removeModifier(key, mod));
    }
  };

  const toggleOneShot = (event) => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey];

    if (event.target.checked) {
      props.onKeyChange(key.code - 224 + 49153);
    } else {
      props.onKeyChange(key.code - key.rangeStart + 224);
    }
  };

  const makeSwitch = (mod) => {
    const { selectedKey, keymap, layer } = props;
    const key = keymap.custom[layer][selectedKey].code;

    return (
      <Switch
        checked={db.isInCategory(key, mod)}
        color="primary"
        onChange={toggleModifier(mod)}
      />
    );
  };

  const { keymap, selectedKey, layer } = props;
  const key = keymap.custom[layer][selectedKey];

  let oneShot;
  if (db.isInCategory(key.baseCode || key.code, "modifier")) {
    const osmControl = (
      <Switch
        checked={db.isInCategory(key, "oneshot")}
        color="primary"
        onChange={toggleOneShot}
      />
    );

    oneShot = (
      <FormControl
        component="fieldset"
        sx={{ mt: 1 }}
        disabled={
          !db.isInCategory(key.code, "modifier") ||
          db.isInCategory(key.code, "dualuse")
        }
      >
        <FormGroup row>
          <Tooltip title={i18n.t("editor.sidebar.keypicker.oneshot.tooltip")}>
            <FormControlLabel
              control={osmControl}
              label={i18n.t("editor.sidebar.keypicker.oneshot.label")}
            />
          </Tooltip>
        </FormGroup>
      </FormControl>
    );
  }

  const isDU = db.isInCategory(key.code, "dualuse");

  return (
    <React.Fragment>
      <Collapsible
        expanded={isStandardKey(props) || isOSM() || isDualUse()}
        title={i18n.t("editor.sidebar.keypicker.title")}
        help={i18n.t("editor.sidebar.keypicker.help")}
      >
        <Box sx={{ mb: 2 }}>
          <Button variant="contained" onClick={openPicker}>
            {i18n.t("editor.sidebar.keypicker.pickAKey")}
          </Button>
        </Box>
        <Divider />
        <Box sx={{ margin: "2 0" }}>
          <InputLabel>{i18n.t("editor.sidebar.keypicker.mods")}</InputLabel>
          <FormHelperText>
            {i18n.t("editor.sidebar.keypicker.modsHelp")}
          </FormHelperText>
          <FormControl
            component="fieldset"
            sx={{ mt: 1 }}
            disabled={!isStandardKey(props)}
          >
            <FormGroup row>
              <FormControlLabel
                control={makeSwitch("shift")}
                label="Shift"
                disabled={key.baseCode == 225 || key.code == 225 || isDU}
              />
              <FormControlLabel
                control={makeSwitch("ctrl")}
                label="Control"
                disabled={key.baseCode == 224 || key.code == 224 || isDU}
              />
              <FormControlLabel
                control={makeSwitch("alt")}
                label="Alt"
                disabled={key.baseCode == 226 || key.code == 226 || isDU}
              />
              <FormControlLabel
                control={makeSwitch("gui")}
                label={GuiLabel.full}
                disabled={key.baseCode == 227 || key.code == 227 || isDU}
              />
              <FormControlLabel
                control={makeSwitch("altgr")}
                label="AltGr"
                disabled={key.baseCode == 230 || key.code == 230 || isDU}
              />
            </FormGroup>
          </FormControl>
          {oneShot}
        </Box>
        <Divider />
        <LayoutSelect
          sx={{ mt: 2 }}
          layout={props.layout}
          setLayout={props.setLayout}
        />
      </Collapsible>
      <Dialog open={pickerOpen} onClose={closePicker} fullWidth maxWidth="lg">
        <Keyboard104
          onKeySelect={onKeyChange}
          currentKeyCode={key.baseCode || key.code}
          keymap={keymap}
        />
      </Dialog>
    </React.Fragment>
  );
};

export { KeyPicker as default };
