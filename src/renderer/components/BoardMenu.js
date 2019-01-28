// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2018, 2019  Keyboardio, Inc.
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

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";

import BoardMenuItem from "./BoardMenuItem";

export default function BoardMenu({ boardAnchor, boardClose, device }) {
  return (
    <Menu anchorEl={boardAnchor} open={!!boardAnchor} onClose={boardClose}>
      <MenuItem disabled>{device.displayName}</MenuItem>
      <Divider variant="middle" />
      {device.urls.map(url => {
        return (
          <BoardMenuItem key={url.name} url={url} closeMenu={boardClose} />
        );
      })}
    </Menu>
  );
}
