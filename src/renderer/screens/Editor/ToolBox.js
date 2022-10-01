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

import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import Box from "@mui/material/Box";
import SvgIcon from "@mui/material/SvgIcon";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";

import React, { useState } from "react";
import { useTranslation } from "react-i18next";

// Sourced from: https://materialdesignicons.com/icon/eraser
const EraserIcon = React.forwardRef((props, ref) => (
  <SvgIcon {...props} ref={ref}>
    <path d="M16.24,3.56L21.19,8.5C21.97,9.29 21.97,10.55 21.19,11.34L12,20.53C10.44,22.09 7.91,22.09 6.34,20.53L2.81,17C2.03,16.21 2.03,14.95 2.81,14.16L13.41,3.56C14.2,2.78 15.46,2.78 16.24,3.56M4.22,15.58L7.76,19.11C8.54,19.9 9.8,19.9 10.59,19.11L14.12,15.58L9.17,10.63L4.22,15.58Z" />
  </SvgIcon>
));
EraserIcon.displayName = "EraserIcon";

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
            <EraserIcon />
          </Tooltip>
        </ToggleButton>
        {props.hasColormap && (
          <ToggleButton value="color-paint">
            <Tooltip title={t("editor.toolbox.color-paint")}>
              <FormatPaintIcon />
            </Tooltip>
          </ToggleButton>
        )}
      </ToggleButtonGroup>
    </Box>
  );
};
