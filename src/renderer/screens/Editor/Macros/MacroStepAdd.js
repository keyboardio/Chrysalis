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

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Divider from "@mui/material/Divider";
import Fab from "@mui/material/Fab";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import AddIcon from "@mui/icons-material/Add";

import { KeymapDB } from "@api/keymap";

const MacroStepAdd = (props) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { addStep } = props;
  const { t } = useTranslation();

  const db = new KeymapDB();

  const openMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const selectType = (stepType) => () => {
    const defaults = {
      INTERVAL: 0,
      WAIT: 0,
      KEYDOWN: db.lookup(0),
      KEYUP: db.lookup(0),
      TAP: db.lookup(),
    };
    const step = { type: stepType };
    if (defaults[stepType] !== undefined) {
      step.value = defaults[stepType];
    } else {
      return closeMenu();
    }

    addStep(step);
    closeMenu();
  };

  return (
    <React.Fragment>
      <Fab
        onClick={openMenu}
        size="small"
        color="success"
        sx={{
          m: 0.5,
        }}
      >
        <AddIcon />
      </Fab>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <MenuItem onClick={selectType("TAP")}>
          {t("editor.macros.steps.TAP")}
        </MenuItem>
        <MenuItem onClick={selectType("KEYDOWN")}>
          {t("editor.macros.steps.KEYDOWN")}
        </MenuItem>
        <MenuItem onClick={selectType("KEYUP")}>
          {t("editor.macros.steps.KEYUP")}
        </MenuItem>
        <MenuItem onClick={selectType("WAIT")}>
          {t("editor.macros.steps.WAIT")}
        </MenuItem>
        <MenuItem onClick={selectType("INTERVAL")}>
          {t("editor.macros.steps.INTERVAL")}
        </MenuItem>
        <Divider />
        <MenuItem onClick={closeMenu}>{t("dialog.close")}</MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default MacroStepAdd;
