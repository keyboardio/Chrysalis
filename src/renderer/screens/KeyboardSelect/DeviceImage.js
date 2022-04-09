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

import Box from "@mui/material/Box";
import React from "react";

export const DeviceImage = (props) => {
  const device = props.device;
  if (device?.components) {
    const Keymap = device.components?.keymap;
    return (
      <Box
        sx={{
          display: "flex",
          align: "center",
          mx: "auto",
          maxWidth: "250px",
          maxHeight: "100px",
          marginBottom: 2,
          justifyContent: "center",
          "& *": {
            color: "#000000",
            stroke: "#000000",
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
