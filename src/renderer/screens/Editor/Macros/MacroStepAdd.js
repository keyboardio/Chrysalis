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

import React from "react";

import Avatar from "@mui/material/Avatar";
import { green } from "@mui/material/colors";
import AddIcon from "@mui/icons-material/Add";

const MacroStepAdd = (props) => {
  return (
    <Avatar
      component="a"
      sx={{
        bgcolor: green[500],
        width: 32,
        height: 32,
        m: 0.5,
      }}
    >
      <AddIcon />
    </Avatar>
  );
};

export default MacroStepAdd;
