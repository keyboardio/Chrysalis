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

import { logger } from "@api/log";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { toast } from "@renderer/components/Toast";
import { ipcRenderer } from "electron";
import jsonStringify from "json-stringify-pretty-compact";
import React from "react";
import { useTranslation } from "react-i18next";

export const ExportToFile = (props) => {
  const { t } = useTranslation();
  const exportToFile = async () => {
    const { keymap, colormap } = props;
    const data = {
      keymaps: keymap.custom,
      colormaps: colormap.colorMap,
      palette: colormap.palette,
    };
    const error = await ipcRenderer.sendSync("file.save-with-dialog", {
      content: jsonStringify(data),
      title: t("editor.sharing.selectExportFile"),
      defaultPath: "Layout.json",
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
    if (error) {
      logger().error("Error saving a layout export", { error: error });
      toast.error(t("errors.saveFile", { error: error }));
    }
  };
  return (
    <Box sx={{ mb: 2 }}>
      <Button variant="outlined" onClick={exportToFile}>
        {t("editor.sharing.exportToFile")}
      </Button>
    </Box>
  );
};
