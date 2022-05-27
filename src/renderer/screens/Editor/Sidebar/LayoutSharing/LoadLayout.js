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

import KeymapDB from "@api/focus/keymap/db";
import Log from "@api/log";
import fs from "fs";
import { t } from "i18next";
import { toast } from "@renderer/components/Toast";

const db = new KeymapDB();

export const loadLayout = (fileName, fileData) => {
  const logger = new Log();

  if (!fileData) {
    try {
      fileData = fs.readFileSync(fileName);
    } catch (e) {
      logger.error("Unable to read layout", {
        filename: fileName,
        error: e.message,
      });
      toast.error(t("editor.sharing.errors.unableToLoad"));
      return null;
    }
  }

  if (!fileData) {
    logger.error("Unable to read layout", {
      filename: fileName,
    });

    toast.error(t("editor.sharing.errors.unableToLoad"));
    return null;
  }

  let layoutData;
  try {
    layoutData = JSON.parse(new TextDecoder().decode(fileData));
  } catch (e) {
    logger.error("Failed to parse layout JSON", {
      filename: fileName,
      error: e.message,
    });
    toast.error(t("editor.sharing.errors.parseFail"));
    return null;
  }

  const src_keymaps = layoutData.keymaps || layoutData.keymap.custom;

  let keymaps;
  try {
    keymaps = src_keymaps.map((layer) => {
      return layer.map((key) => {
        return db.lookup(key.keyCode || key.code);
      });
    });
  } catch (_) {
    logger.error("Layout file did not contain valid layout data", {
      filename: fileName,
    });
    toast.error(t("editor.sharing.errors.invalidLayoutData"));
    return null;
  }

  return {
    keymaps: keymaps,
    colormaps: layoutData.colormaps || layoutData.colormap?.colorMap,
    palette: layoutData.palette || layoutData.colormap?.palette,
  };
};
