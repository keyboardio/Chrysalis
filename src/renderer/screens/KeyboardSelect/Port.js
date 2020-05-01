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
  FormControl,
  Select,
  Typography,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Avatar
} from "@material-ui/core";
import { Keyboard as KeyboardIcon } from "@material-ui/icons";
//import { DeviceItem } from "./DeviceItem";
import i18n from "../../i18n";

/**
 * @param {Object} props
 * @param {Object[]} props.devices
 * @param {Object} props.classes
 * @param {number} props.selectedPortIndex
 * @param {Function} props.setSelectedPortIndex
 */
export const Port = ({
  devices,
  classes,
  selectedPortIndex,
  setSelectedPortIndex
}) => {
  const setPort = e => setSelectedPortIndex(e.target.value);
  return devices.length > 0 ? (
    //<FormControl className={classes.selectControl}>
    <Select
      value={selectedPortIndex}
      classes={{ select: classes.selectControl }}
      onChange={setPort}
    >
      {devices.map(({ device: { device, path, info } }, index) => {
        //<DeviceItem
        //  device={device}
        //  index={index}
        //  key={`device-${index}`}
        //  classes={classes}
        //  selected={index === selectedPortIndex}
        ///>
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
          <MenuItem
            key={`device-${index}`}
            value={index}
            selected={index === selectedPortIndex}
          >
            {icon}
            {label}
          </MenuItem>
        );
      })}
    </Select>
  ) : (
    //</FormControl>
    <Typography variant="body1" color="error" className={classes.error}>
      {i18n.t("keyboardSelect.noDevices")}
    </Typography>
  );
};
