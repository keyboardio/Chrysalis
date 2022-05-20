// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018-2022  Keyboardio, Inc.
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

import Box from "@mui/material/Box";
import React from "react";

export const DeviceImage = (props) => {
  const focusDeviceDescriptor = props.focusDeviceDescriptor;
  if (focusDeviceDescriptor?.components) {
    const Keymap = focusDeviceDescriptor.components?.keymap;
    return (
      <Box
        sx={{
          display: "block",
          align: "center",
          mx: "auto",
          maxWidth: "250px",
          maxHeight: "100px",
          marginBottom: 2,
          justifyContent: "center",
          "&>.layer": {
            display: "flex",
            margin: "auto",
            maxWidth: "250px",
            maxHeight: "100px",
            minWidth: "inherit",
            minHeight: "inherit",
          },
          "&>layer .key *": {
            fill: "#00000088",
            stroke: "#00000088",
          },
        }}
      >
        <Keymap index={0} />
      </Box>
    );
  } else {
    return "";
  }
};
