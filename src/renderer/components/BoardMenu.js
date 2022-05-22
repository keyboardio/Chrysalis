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

import Divider from "@mui/material/Divider";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Electron from "electron";
import React from "react";
import { useTranslation } from "react-i18next";

const openURL = (url, closeMenu) => {
  const shell = Electron.remote && Electron.remote.shell;

  if (!shell) return;

  return () => {
    shell.openExternal(url);
    closeMenu();
  };
};

export default function BoardMenu({ boardAnchor, boardClose, device }) {
  const { t, i18n } = useTranslation();

  return (
    <Menu anchorEl={boardAnchor} open={!!boardAnchor} onClose={boardClose}>
      <MenuItem disabled>{device.displayName}</MenuItem>
      <Divider variant="middle" />
      {device.urls.map(({ url, name }) => {
        return (
          <MenuItem key={name} onClick={openURL(url, boardClose)}>
            {t("app.deviceMenu." + name, name)}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
