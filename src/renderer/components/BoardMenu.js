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
import Electron from "electron";

import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Divider from "@material-ui/core/Divider";
import i18n from "../i18n";

const openURL = (url, closeMenu) => {
  const shell = Electron.remote && Electron.remote.shell;

  if (!shell) return;

  return () => {
    shell.openExternal(url);
    closeMenu();
  };
};

export default function BoardMenu({ boardAnchor, boardClose, device }) {
  return (
    <Menu anchorEl={boardAnchor} open={!!boardAnchor} onClose={boardClose}>
      <MenuItem disabled>{device.displayName}</MenuItem>
      <Divider variant="middle" />
      {device.urls.map(({ url, name }) => {
        return (
          <MenuItem key={name} onClick={openURL(url, boardClose)}>
            {i18n.app.deviceMenu[name] || name}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
