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
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import useTheme from "@mui/material/styles/useTheme";

const db = new KeymapDB();

const KeyButton = (props) => {
  const { classes, keyObj, onKeyChange, currentKey, noHint, title } = props;
  const theme = useTheme();

  const active = keyObj?.code == currentKey?.code;

  const buttonColor = active ? theme.palette.primary.light : theme.palette.background.paper;

  const textColor = theme.palette.getContrastText(buttonColor);

  const onClick = (keyCode) => {
    return () => {
      onKeyChange(keyCode);
    };
  };

  const wrapWithTooltip = (button) => {
    // <Tooltip> doesn't work around <Button> without a <span> or <div>.
    return !title ? (
      button
    ) : (
      <Tooltip title={title}>
        <span>{button}</span>
      </Tooltip>
    );
  };

  const label = db.format(keyObj, { keycapSize: props.keycapSize || "full" });
  return wrapWithTooltip(
    <Button
      variant="outlined"
      size="small"
      color={active ? "primary" : "secondary"}
    disabled={props.disabled}
      sx={{
        m: 0,
        px: 1,
        py: 1,
        color: textColor,
        borderColor: theme.palette.divider,
        borderRadius: 0,
        fontSize: 10,
        backgroundColor: buttonColor,
        minWidth: 48,
      }}
      onClick={onClick(keyObj.code)}
    >
      {!noHint && label.hint} {label.main}
    </Button>
  );
};

export default KeyButton;
