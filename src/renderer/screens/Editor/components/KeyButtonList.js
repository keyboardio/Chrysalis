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

import KeymapDB from "@api/focus/keymap/db";
import Box from "@mui/material/Box";
import React from "react";
import KeyButton from "./KeyButton";

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
    const label = db.format(k, { keycapSize: "full" });
    return <KeyButton keyObj={k} key={key} onKeyChange={onClick(k)} noHint={!showHints} disabled={props.disabled} />;
  });

  return (
    <Box
      sx={{
        flexGrow: 1,
        margin: 0,
      }}
    >
      {buttons}
    </Box>
  );
};

export default KeyButtonList;
