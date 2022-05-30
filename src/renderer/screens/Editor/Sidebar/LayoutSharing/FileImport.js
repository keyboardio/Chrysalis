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

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { ipcRenderer } from "electron";
import React from "react";
import { useTranslation } from "react-i18next";
import { loadLayout } from "./LoadLayout";

export const FileImport = (props) => {
  const { t } = useTranslation();
  const importFromFile = () => {
    const [fileName, fileData] = ipcRenderer.sendSync("file-open", {
      title: t("editor.sharing.selectLoadFile"),
      filters: [
        {
          name: t("editor.sharing.dialog.layoutFiles"),
          extensions: ["json", "layout"],
        },
        {
          name: t("editor.sharing.dialog.allFiles"),
          extensions: ["*"],
        },
      ],
    });
    // If we have no filename, then the dialog was canceled.
    if (!fileName) return;
    const layoutData = loadLayout(fileName, fileData);
    if (layoutData != null) props.setLayout("custom", layoutData);
  };

  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={importFromFile}>
        {t("editor.sharing.loadFromFile")}
      </Button>
    </Box>
  );
};
