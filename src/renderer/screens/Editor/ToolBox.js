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
import Menu from "@mui/material/Menu";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SvgIcon from "@mui/material/SvgIcon";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import SaveChangesButton from "@renderer/components/SaveChangesButton";

import CopyAllIcon from "@mui/icons-material/CopyAll";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import LayersIcon from "@mui/icons-material/Layers";
import SmartButtonIcon from "@mui/icons-material/SmartButton";

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

  const [layerOpsOpen, setLayerOpsOpen] = useState(false);
  const [buttonOpsOpen, setButtonOpsOpen] = useState(false);

  const onLayerOpsToggle = () => {
    if (layerOpsOpen) {
      setLayerOpsOpen(false);
    } else {
      setButtonOpsOpen(false);
      setLayerOpsOpen(true);
    }
  };
  const onButtonOpsToggle = () => {
    if (buttonOpsOpen) {
      setButtonOpsOpen(false);
    } else {
      setLayerOpsOpen(false);
      setButtonOpsOpen(true);
    }
  };

  const onChange = (event, newTool) => {
    props.setTool(newTool || "select");
    /*
    if (newTool == "layers") {
      if (layerMenuOpen) {
        onLayerMenuClose();
      } else {
        onLayerMenuOpen(event);
      }
    }
    */
  };

  return (
    <Box
      sx={{
        p: 1,
        alignItems: "center",
        justifyContent: "flex-end",
        position: "fixed",
        bottom: 32,
        left: 32,
        zIndex: (theme) => theme.zIndex.drawer - 1,
      }}
    >
      <Box sx={{ ml: 1 }}>
        <SpeedDial
          direction="right"
          ariaLabel="layer operations"
          icon={<LayersIcon />}
          onClose={() => {}}
          onOpen={() => {}}
          onClick={onLayerOpsToggle}
          open={layerOpsOpen}
          FabProps={{
            size: "small",
            color: layerOpsOpen ? "success" : "info",
          }}
          sx={{
            mt: 0,
            mb: -1,
          }}
        >
          <SpeedDialAction icon={<CopyAllIcon />} tooltipTitle="Copy layer" />
          <SpeedDialAction
            icon={<ContentPasteIcon />}
            tooltipTitle="Paste layer"
          />
        </SpeedDial>
        <SpeedDial
          direction="right"
          ariaLabel="button operations"
          icon={<SmartButtonIcon />}
          onClose={() => {}}
          onOpen={() => {}}
          onClick={onButtonOpsToggle}
          open={buttonOpsOpen}
          FabProps={{
            size: "small",
            color: buttonOpsOpen ? "success" : "info",
          }}
          sx={{
            mt: 0,
            mb: -1,
          }}
        >
          <SpeedDialAction icon={<EraserIcon />} tooltipTitle="Erase" />
          <SpeedDialAction icon={<FormatPaintIcon />} tooltipTitle="Paint" />
        </SpeedDial>
      </Box>
      <SaveChangesButton
        onClick={props.onSaveChanges}
        onError={props.onSaveChangesError}
        disabled={props.saveChangesDisabled}
      >
        {props.saveChangesTitle}
      </SaveChangesButton>
    </Box>
  );
};
