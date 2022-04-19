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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";

import { KeymapDB } from "@api/keymap";

const db = new KeymapDB();

const KeyButtonList = (props) => {
  const { keys, onKeyChange, showHints } = props;

  const onClick = (keyCode) => {
    return () => {
      onKeyChange(keyCode);
    };
  };

  const buttons = keys.map((k, index) => {
    const key = "key-" + props.category + "-" + index.toString();
    const label = db.format(k, "full");
    return (
      <Button
        variant="contained"
        key={key}
        sx={{ m: 1 }}
        onClick={onClick(k.code)}
      >
        {showHints ? label.hint : ""} {label.main}
      </Button>
    );
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: 1,
      }}
    >
      {buttons}
    </Box>
  );
};

export default KeyButtonList;
