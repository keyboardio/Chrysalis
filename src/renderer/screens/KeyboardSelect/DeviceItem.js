//@ts-check
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

import React from "react";
import {
  Avatar,
  ListItemIcon,
  ListItemText,
  MenuItem
} from "@material-ui/core";
import { Keyboard as KeyboardIcon } from "@material-ui/icons";
import i18n from "../../i18n";

export const DeviceItem = ({
  device: { device, path, info },
  index,
  classes,
  selected
}) => {
  let label = path;
  if (device && device.info) {
    label = (
      <ListItemText
        primary={device.info.displayName}
        secondary={path || i18n.t("keyboardSelect.unknown")}
      />
    );
  } else if (info) {
    label = <ListItemText primary={info.displayName} />;
  }

  const icon = (
    <ListItemIcon>
      <Avatar className={path && classes.supported}>
        <KeyboardIcon />
      </Avatar>
    </ListItemIcon>
  );

  return (
    <MenuItem value={index} selected={selected}>
      {icon}
      {label}
    </MenuItem>
  );
};
