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
import openURL from "@renderer/utils/openURL";
import React from "react";
import { useTranslation } from "react-i18next";

export default function BoardMenu({ boardAnchor, boardClose, device }) {
  const { t } = useTranslation();

  const onClick = (url) => () => {
    openURL(url)();
    boardClose();
  };

  return (
    <Menu anchorEl={boardAnchor} open={!!boardAnchor} onClose={boardClose}>
      <MenuItem disabled>{device.displayName}</MenuItem>
      <Divider variant="middle" />
      {device.urls.map(({ url, name }) => {
        return (
          <MenuItem key={name} onClick={onClick(url)}>
            {t("app.deviceMenu." + name, name)}
          </MenuItem>
        );
      })}
    </Menu>
  );
}
