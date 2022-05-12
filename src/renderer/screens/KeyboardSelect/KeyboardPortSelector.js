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

import KeyboardIcon from "@mui/icons-material/Keyboard";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Typography from "@mui/material/Typography";
import React from "react";
import i18n from "../../i18n";
export const KeyboardPortSelector = (props) => {
  const devices = props.devices;
  const selectedPortIndex = props.selectedPortIndex;
  const selectPort = props.selectPort;
  let deviceItems = null;
  if (devices?.length > 0) {
    deviceItems = devices.map((option, index) => {
      let label = option.path;
      if (option.focusDeviceDescriptor?.info) {
        label = (
          <ListItemText
            primary={option.focusDeviceDescriptor.info.displayName}
            secondary={option.path || i18n.t("keyboardSelect.unknown")}
          />
        );
      } else if (option.info) {
        label = <ListItemText primary={option.info.displayName} />;
      }

      const icon = (
        <ListItemIcon sx={{ marginRight: 2 }}>
          <Avatar>
            <KeyboardIcon />
          </Avatar>
        </ListItemIcon>
      );

      return (
        <MenuItem
          key={`device-${index}`}
          value={index}
          selected={index === selectedPortIndex}
        >
          {icon}
          {label}
        </MenuItem>
      );
    });
    return (
      <FormControl sx={{ display: "flex" }}>
        <Select
          value={selectedPortIndex}
          sx={{
            display: "flex",
            "& .MuiListItemIcon-root": { minWidth: "inherit" },
            "& .MuiListItemText-root": { display: "inline-block" },
          }}
          onChange={selectPort}
        >
          {deviceItems}
        </Select>
      </FormControl>
    );
  } else {
    return (
      <Typography
        variant="body1"
        color="error"
        sx={{ marginTop: 2, marginBottom: 2, textAlign: "center" }}
      >
        {i18n.t("keyboardSelect.noDevices")}
      </Typography>
    );
  }
};
