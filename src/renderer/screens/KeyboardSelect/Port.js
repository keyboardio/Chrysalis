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
import { FormControl, Select, Typography } from "@material-ui/core";
import { DeviceItem } from "./DeviceItem";
import i18n from "../../i18n";

export const Port = ({
  devices,
  classes,
  selectedPortIndex,
  setSelectedPortIndex
}) => {
  const setPort = e => setSelectedPortIndex(e.target.value);
  return devices.length > 0 ? (
    <FormControl className={classes.selectControl}>
      <Select
        value={selectedPortIndex}
        classes={{ select: classes.selectControl }}
        onChange={setPort}
      >
        {devices.map((device, index) => (
          <DeviceItem
            device={device}
            index={index}
            key={index}
            classes={classes}
          />
        ))}
      </Select>
    </FormControl>
  ) : (
    <Typography variant="body1" color="error" className={classes.error}>
      {i18n.t("keyboardSelect.noDevices")}
    </Typography>
  );
};
