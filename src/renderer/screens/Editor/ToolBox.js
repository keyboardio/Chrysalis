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

import FormatColorResetIcon from "@mui/icons-material/FormatColorReset";
import Box from "@mui/material/Box";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export const ToolBox = (props) => {
  const { t } = useTranslation();

  const onChange = (_, newTool) => {
    props.setTool(newTool || "select");
  };

  return (
    <Box sx={{ textAlign: "right", p: 1 }}>
      <ToggleButtonGroup
        color="primary"
        exclusive
        size="small"
        value={props.tool}
        onChange={onChange}
      >
        <ToggleButton value="eraser">
          <Tooltip title={t("editor.toolbox.eraser")}>
            <FormatColorResetIcon />
          </Tooltip>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};
