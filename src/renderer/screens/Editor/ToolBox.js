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
import Collapse from "@mui/material/Collapse";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import SpeedDial from "@mui/material/SpeedDial";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import SpeedDialAction from "@mui/material/SpeedDialAction";
import SvgIcon from "@mui/material/SvgIcon";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import SaveChangesButton from "@renderer/components/SaveChangesButton";

import CopyAllIcon from "@mui/icons-material/CopyAll";
import ConstructionIcon from "@mui/icons-material/Construction";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import FormatPaintIcon from "@mui/icons-material/FormatPaint";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LayersIcon from "@mui/icons-material/Layers";
import LayersClearIcon from "@mui/icons-material/LayersClear";
import MenuIcon from "@mui/icons-material/Menu";
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

  const [toolsOpen, setToolsOpen] = useState(false);

  const toggleTools = () => {
    setToolsOpen(!toolsOpen);
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
    <>
      <Box
        boxShadow={3}
        sx={{
          maxWidth: 104,
          bgcolor: "background.paper",
          borderRadius: "4px",
          position: "fixed",
          bottom: 108,
          left: 10,
          zIndex: (theme) => theme.zIndex.drawer - 1,
          display: "flex",
          flexDirection: "column",
          p: 1,
        }}
      >
        <Collapse in={toolsOpen}>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.75,
              mx: -1,
              py: 0.5,
              mt: -1,
              mb: 0.75,
              bgcolor: (theme) =>
                theme.palette.mode == "dark" ? "grey.700" : "grey.200",
              textAlign: "center",
            }}
          >
            Layer tools
          </Typography>
          <Box sx={{ textAlign: "center" }}>
            <ToggleButton size="small" sx={{ m: 0.25 }}>
              <Tooltip title="Copy layer" arrow>
                <CopyAllIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton size="small" sx={{ m: 0.25 }} disabled>
              <Tooltip title="Paste layer" arrow>
                <ContentPasteIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton size="small" sx={{ m: 0.25 }}>
              <Tooltip title="Clear layer" arrow>
                <LayersClearIcon />
              </Tooltip>
            </ToggleButton>
          </Box>
          <Typography
            variant="body2"
            sx={{
              opacity: 0.75,
              mx: -1,
              py: 0.5,
              my: 1,
              bgcolor: (theme) =>
                theme.palette.mode == "dark" ? "grey.700" : "grey.200",
              textAlign: "center",
            }}
          >
            Button tools
          </Typography>
          <Box>
            <ToggleButton size="small" sx={{ mx: 0.25 }}>
              <Tooltip title="Eraser" arrow>
                <EraserIcon />
              </Tooltip>
            </ToggleButton>
            <ToggleButton size="small" sx={{ mx: 0.25 }}>
              <Tooltip title="Paint" arrow>
                <FormatPaintIcon />
              </Tooltip>
            </ToggleButton>
          </Box>
          <Divider sx={{ my: 1, mx: -1 }} />
        </Collapse>
        <ToggleButton
          size="small"
          value="tools"
          sx={{ border: 0 }}
          selected={toolsOpen}
          onClick={toggleTools}
        >
          <Tooltip title="Toggle tools" arrow>
            {toolsOpen ? <KeyboardArrowDownIcon /> : <ConstructionIcon />}
          </Tooltip>
        </ToggleButton>
      </Box>
      <SaveChangesButton
        onClick={props.onSaveChanges}
        onError={props.onSaveChangesError}
        disabled={props.saveChangesDisabled}
      >
        {props.saveChangesTitle}
      </SaveChangesButton>
    </>
  );
};
