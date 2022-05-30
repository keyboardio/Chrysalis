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

import Focus from "@api/focus";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import MenuItem from "@mui/material/MenuItem";
import MenuList from "@mui/material/MenuList";
import Typography from "@mui/material/Typography";
import { ipcRenderer } from "electron";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";

const focus = new Focus();

export const BackupImport = (props) => {
  const { t } = useTranslation();

  const library = ipcRenderer.sendSync(
    "backups.list-library",
    focus.focusDeviceDescriptor.info
  );
  const selectBackupItem = (item) => () => {
    const [layoutFileData, error] = ipcRenderer.sendSync(
      "backups.load-file",
      focus.focusDeviceDescriptor.info,
      item
    );

    if (error) {
      // TODO(anyone): show toast
      console.error(error);
      return;
    }

    const layoutData = loadLayout("$userData/" + item, layoutFileData);
    if (layoutData != null) props.setLayout(item, layoutData);
  };

  const formatName = (name) => {
    const ts = new Date(parseInt(name));

    return ts.toISOString();
  };

  const { layoutName } = props;

  if (library.length == 0) return null;

  const layouts = library.map((name) => {
    const label = formatName(name);

    return (
      <MenuItem
        selected={layoutName == name}
        value={name}
        key={`backup-item-${name}`}
        onClick={selectBackupItem(name)}
      >
        {label}
      </MenuItem>
    );
  });

  return (
    <Box sx={{ sb: 2 }}>
      <Typography variant="h5">{t("editor.sharing.loadFromBackup")}</Typography>
      <MenuList>{layouts}</MenuList>

      <Divider />
    </Box>
  );
};
