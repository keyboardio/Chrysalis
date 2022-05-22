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

import React, { useEffect } from "react";
import Button from "@mui/material/Button";

import { KeymapDB } from "@api/keymap";

const EditKey = (props) => {
  const { value, direction } = props;
  const db = new KeymapDB();

  useEffect(() => {
    const fkp_channel = new BroadcastChannel("floating-key-picker");
    fkp_channel.postMessage("show");

    return function cleanup() {
      fkp_channel.close();
    };
  });

  return <Button variant="outlined">{db.format(value).main}</Button>;
};

export default EditKey;
