// -*- mode: js-jsx -*-
/* Chrysalis -- Kaleidoscope Command Center
 * Copyright (C) 2022  Keyboardio, Inc.
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

import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DiscFullIcon from "@mui/icons-material/DiscFull";
import Typography from "@mui/material/Typography";
import React from "react";
import { useTranslation } from "react-i18next";

import LayerNames from "@api/focus/layernames";

export const LayerNamesStorageAlert = (props) => {
  const { t } = useTranslation();

  if (props.layerNames.storageSize == 0) return null;

  const L = new LayerNames();
  const used = L.getStoredSize(props.layerNames);

  if (used <= props.layerNames.storageSize) return null;

  return (
    <Alert
      severity="error"
      icon={<DiscFullIcon fontSize="inherit" />}
      sx={{
        zIndex: "modal",
        position: "relative",
      }}
    >
      <Typography component="p">
        {t("editor.layernames.out_of_space", {
          overflow: used - props.layerNames.storageSize,
        })}
      </Typography>
    </Alert>
  );
};
